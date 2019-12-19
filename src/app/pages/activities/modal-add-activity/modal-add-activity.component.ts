import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ActivityService} from "../../../services/activity.service";
import {ProjectService} from "../../../services/project.service";
import {AuthService} from "../../../services/auth.service";
import {Project} from "../../../models/project";
import {Activity, ActivityInterface} from "../../../models/activity";
import {NgbModal, NgbModalConfig, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'modal-add-activity',
  templateUrl: './modal-add-activity.component.html',
  styleUrls: ['./modal-add-activity.component.scss'],
  providers: [NgbModal, NgbModalConfig],
  // encapsulation: ViewEncapsulation.None,
})

export class ModalAddActivityComponent implements OnInit {
  protected projectList = [];
  protected userId: number;
  protected date: MatDatepickerInputEvent<Date>;
  protected activityForm: FormGroup;

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

    this.activityForm = new FormGroup({
      projectName: new FormControl(), // "", [Validators.required]
      date: new FormControl(new Date()),
      hours: new FormControl(),
      description: new FormControl(),
      startTime: new FormControl(),
      endTime: new FormControl(),
    }, { updateOn: 'change' });
  }

  events: string[] = [];


  submitCreateActivityForm(): void {
    let val = this.activityForm.value;
    const projectData = val.projectName.split(',',2);


    const partsStartTime =  val.startTime.toString().split(':');
    const partsHours =  val.hours.toString().split(':');
    const hoursInMinutes = parseInt(partsHours[0], 10) * 60 + parseInt(partsHours[1], 10);

    const startDateTime = val.date;
    startDateTime.setHours(parseInt(partsStartTime[0], 10), parseInt(partsStartTime[1], 10), 0);
    let endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + parseInt(partsHours[0], 10));
    endDateTime.setMinutes(endDateTime.getMinutes() + parseInt(partsHours[1], 10));

    // TODO Change user_id
    // TODO implement description
    const activity: Activity = new Activity(0, 1,
      this.userId, val.description, hoursInMinutes, startDateTime, endDateTime);

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
}
