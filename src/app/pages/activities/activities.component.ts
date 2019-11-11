import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Activity, ActivityInterface} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {ActivityFilter} from "../../models/activity-filter";
import {LocalDataSource} from "ng2-smart-table";
import { NgxSmartModalService } from 'ngx-smart-modal';
import {ProjectInterface} from "../../models/project";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModalAddActivityComponent} from "./modal-add-activity/modal-add-activity.component";


@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})


export class ActivitiesComponent implements AfterViewInit {

  public dataSource: LocalDataSource;
  private userId: number;

  @ViewChild(ModalAddActivityComponent, {static: false})
  private modalAddActivity: ModalAddActivityComponent;


  constructor(
    protected  activityHttpService: ActivityService,
    protected  authService: AuthService,
    protected ngxSmartModalService: NgxSmartModalService,
    private snackBar: MatSnackBar

  ) { }

  ngAfterViewInit() {
    this.authService.user$.subscribe(r => {
      this.userId = r.id;
    });
    this.getActivities();

  }



  getActivities(activityFilter: ActivityFilter=null){
    if (!activityFilter) {
      const date1 = new Date("December 12, 2000");
      const date2 = new Date("December 12, 2030");

      activityFilter = new ActivityFilter([],
        this.userId, date1, date2);
    }

    this.activityHttpService.getActivityList(activityFilter)
      .subscribe(
        result => {
          const activities = result.map(
            item => new Activity(item.id, item.projectId, item.userId,
              item.description, item.hours, item.timeStart, item.timeEnd),
            );
          this.dataSource = new LocalDataSource(activities);
          },
      );
  }

  open() {
    this.modalAddActivity.open();
    this.modalAddActivity.dialogRef.result.then(result => {
      if (result) {
        this.snackBar.open(`Activity for project "${result.projectName}" created.`, '', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      }
    })
  }

  public addNewActivity(project: ProjectInterface) {
    this.dataSource.add(project).then(r => r);
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Activity ID',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      hours: {
        title: 'hours',
        type: 'number',
      },
      timeStart: {
        title: 'Start Time',
      },
      timeEnd: {
        title: 'End Time',
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  // the function below is created for ngx + button
  onCreateConfirm(event): Activity {
    if (window.confirm('Are you sure you want to create a project?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
    return new Activity(event.data.id, event.data.title, null, null, null, null, null);
  }
}
