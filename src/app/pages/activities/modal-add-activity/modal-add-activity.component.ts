import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivityService} from "../../../services/activity.service";
import {ProjectService} from "../../../services/project.service";
import {AuthService} from "../../../services/auth.service";
import {Project} from "../../../models/project";
import {Activity, ActivityInterface} from "../../../models/activity";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {start} from "repl";
import {Time} from "@angular/common";
import {validateEndTime, validateStartTime} from "../validators/time.validators";
// import * as moment from 'moment';
// import {Input, DoCheck, KeyValueDiffers} from '@angular/core';
// import {control} from "leaflet";
// import { PermitCard } from '../permit-card';
const moment = require('../../../../../node_modules/moment/moment.js');

@Component({
    selector: 'modal-add-activity',
    templateUrl: './modal-add-activity.component.html',
    styleUrls: ['./modal-add-activity.component.scss'],
    providers: [NgbModal, NgbModalConfig],
})

export class ModalAddActivityComponent implements OnInit {
    protected projectList = [];
    protected userId: number;
    protected date: MatDatepickerInputEvent<Date>;
    protected activityForm: FormGroup;
    qtyOfHours: any;
    err: boolean;

    dialogRef: NgbModalRef;

    @ViewChild("modalAddActivity", {static: false})
    modalAddActivity: ElementRef;


    @Output() public newActivity: EventEmitter<ActivityInterface> = new EventEmitter<ActivityInterface>();


    constructor(
        protected  activityService: ActivityService,
        protected  projectService: ProjectService,
        protected authService: AuthService,
        private modalService: NgbModal,
        private config: NgbModalConfig,
        private fb: FormBuilder,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    open() {
        this.dialogRef = this.modalService.open(this.modalAddActivity);
    }

    closeModal(data = null) {
        this.dialogRef.close(data);
    }

    ngOnInit() {
        this.authService.user$.subscribe(r => {
            this.userId = r.id;
        });
        this.getProjects();
        this.activityForm = this.fb.group({
            projectName: [''],
            date: [new Date()],
            description: [''],
            time: this.fb.array([
                this.addTimeFormGroup()
            ])
        });

        //     this.activityForm = new FormGroup({
        //         projectName: new FormControl(),
        //         date: new FormControl(new Date()),
        //         // hours: new FormControl(),
        //         description: new FormControl(),
        //         startTime: new FormControl('', (control: FormControl) => {
        //             try {
        //                 const endTime = this.activityForm.value.endTime;
        //                 if (!endTime)
        //                     return {endTimeUndefined: true}
        //             }
        //             catch (e) {
        //                 return {endTimeUndefined: true}
        //             }
        //
        //             try {
        //                 if (control.value.hour <= this.activityForm.value.endTime.hour)
        //                     return {ok: true}
        //             }
        //             catch (e) {
        //                 return
        //             }
        //             return {endTimeUndefined: true}
        //         }),
        //         endTime: new FormControl('', (control: FormControl) => {
        //             try {
        //                 const startTime = this.activityForm.value.time.startTime;
        //                 if (!startTime){
        //                     return {startTimeUndefined: true}
        //                 }
        //             }
        //             catch (e) {
        //                 return {startTimeUndefined: true}
        //             }
        //
        //             try {
        //                 if (control.value.hour >= this.activityForm.value.time.startTime.hour){
        //                     return {ok: true};
        //                 }
        //                 else {
        //                     return {endTimeIsLess: true}
        //                 }
        //             }
        //             catch (e) {
        //                 return {endTimeUndefined: true}
        //             }
        //         }),
        //     }, {updateOn: 'change'});
    }

    addTimeGroupClick() {
        (<FormArray>this.activityForm.get('time')).push(this.addTimeFormGroup());
    }

    addTimeFormGroup() : FormGroup {
        return this.fb.group({
            startTime: ['', [(c) => validateStartTime(c, this.activityForm)]],
            endTime: ['',[(c) =>validateEndTime(c, this.activityForm)]]
        });
    }

    events: string[] = [];


    submitCreateActivityForm(): void {
        const val = this.activityForm.value;
        const startTime = new Date(val.date.toUTCString());
        startTime.setHours(+val.time.startTime.hour);
        startTime.setMinutes(+val.time.startTime.minute);
        startTime.setSeconds(+val.time.startTime.second);
        const endTime = new Date(val.date.toUTCString());
        endTime.setHours(+val.time.startTime.hour);
        endTime.setMinutes(+val.time.startTime.minute);
        endTime.setSeconds(+val.time.startTime.second);
        const projectData = val.projectName.split(',', 2);
        const hours = 3;

        // TODO Remove UserID and fix
        // TODO implement description
        const activity: Activity = new Activity(0, 1,
            this.userId, val.description, hours, startTime, endTime);

        this.activityService.createActivity(activity).subscribe(
            result => {
                const activity = new Activity(0, result.projectId, result.userId,
                    result.description, result.hours, result.timeStart, result.timeEnd);

                this.newActivity.emit(activity);
            }
        );
        this.closeModal(activity);
    }

    getProjects() {
        this.projectService.getProjectList()
            .subscribe(
                result => {
                    this.projectList = result.map(
                        item => new Project(item.id, item.title)
                    );
                    this.activityForm.controls.projectName.patchValue(this.projectList[0].id);
                }
            );
    }

    onTimeChange(event: any) {
        console.log();
        try {
            const start = 1
        } catch (e) {
            console.log("ERROR");
            console.log(e);
        }
        // t = Time
        // const start = new Time
    }


    endTimeUpdate(time = 1) {
        try {
            const value = this.activityForm.value;
            const start = value.time.startTime.hour * 60 + value.time.startTime.minute;
            const end = value.endTime.hour * 60 + value.endTime.minute;
            this.qtyOfHours = (end - start) / 60;
            if (end < start) {
                this.err = false;
            } else this.err = true;
        } catch (e) {
            console.log("ERROR");
            console.log(e);
        }
        // return time.hour * 60 + time.minute
    }

}
