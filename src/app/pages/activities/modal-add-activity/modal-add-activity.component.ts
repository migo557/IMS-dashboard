import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray, FormBuilder, AbstractControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivityService} from "../../../services/activity.service";
import {ProjectService} from "../../../services/project.service";
import {AuthService} from "../../../services/auth.service";
import {Project} from "../../../models/project";
// import {Time} from "../../../models/Time";
import {Activity, ActivityInterface} from "../../../models/activity";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {start} from "repl";
import {Time} from "@angular/common";
import {validateEndTime, validateStartTime} from "../validators/time.validators";
import {NgbTime} from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
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

        this.activityForm.valueChanges.subscribe((data) => {
            let difference = 0;
            for (let time of (<FormArray>this.activityForm.get('time')).value) {
                try {
                    if (time.endTime.hour > time.startTime.hour) {
                        difference += (time.endTime.hour - time.startTime.hour) * 60;
                        const minutes = time.endTime.minute - time.startTime.minute;
                        difference += minutes;
                    } else if (time.endTime.hour == time.startTime.hour) {
                        difference += time.endTime.minute - time.startTime.minute;
                    } else {
                        difference += time.endTime.minute - time.startTime.minute;
                    }
                } catch (e) {
                    console.error("Not all parameters have been initialized yet: ", e);
                }
            }
            this.qtyOfHours = difference;
        })
    }

    addTimeGroupClick() {
        (<FormArray>this.activityForm.get('time')).push(this.addTimeFormGroup());
    }


    addTimeFormGroup(): FormGroup {
        return this.fb.group({
            startTime: [null, [(c) => validateStartTime(c, this.activityForm)]],
            endTime: [null, [(c) => validateEndTime(c, this.activityForm)]]
        });
    }

    deleteTimeButtonClick(timeGroupIndex: number) {
        (<FormArray>this.activityForm.get('time')).removeAt(timeGroupIndex);
    }

    events: string[] = [];

    //TODO change data access
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


    startTimeUpdate($event, id) {
        if ($event)
            (<FormArray>this.activityForm.get('time')).at(id).patchValue($event);
    }

    endTimeUpdate($event, id) {
        if ($event)
            (<FormArray>this.activityForm.get('time')).at(id).patchValue($event);
    }
}
