import {Component, OnInit, ViewChild} from '@angular/core';
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {ActivityFilter} from "../../models/activity-filter";
import {LocalDataSource} from "ng2-smart-table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModalAddActivityComponent} from "./modal-add-activity/modal-add-activity.component";
import { NbDateService } from '@nebular/theme';
import { Subscription } from "rxjs";
import {ActivityDateRangeFilter} from "../../models/activity-date-range-filter";


@Component({
    selector: 'activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})


export class ActivitiesComponent implements OnInit {
    private sub: Subscription = new Subscription();
    public dataSource: LocalDataSource = new LocalDataSource();

    @ViewChild(ModalAddActivityComponent, {static: false})
    private modalAddActivity: ModalAddActivityComponent;


    constructor(
        private activityService: ActivityService,
        private snackBar: MatSnackBar,
    ) {

    }

    ngOnInit() {
        console.log("activities initialized");
        let getActivitiesSub = this.getActivities()
            .subscribe(activities => {
                console.log("activities: ", activities);
                this.activityService.announceActivityList(activities);
            });

        let nextActivitiesSub = this.activityService.filteredList$
            .subscribe(activities => {
                console.log("next activities before if: ", activities);

                if (activities) {
                    console.log("next activities: ", activities);
                    this.dataSource = new LocalDataSource(activities);
                }
            });
        this.sub.add(getActivitiesSub);
        this.sub.add(nextActivitiesSub);
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
    }

    getActivities(activityFilter: ActivityFilter = null) {
        if (!activityFilter) {
            activityFilter = new ActivityFilter([],
                new ActivityDateRangeFilter(new Date("December 12, 2000"), new Date("December 12, 2030")))
        }

        return this.activityService.getActivityList(activityFilter);
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

    rangeFilterUpdated($event) {
        console.log("in activity: ",$event);
        const date1 = new Date("December 12, 2010");
        const date2 = new Date($event.end);
        console.log(date2);
        console.log(date1);

        if ($event.end) {
            const activityFilter = new ActivityFilter([], new ActivityDateRangeFilter($event.start, $event.end));
            this.getActivities(activityFilter);
        }
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
