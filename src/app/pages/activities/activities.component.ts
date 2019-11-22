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
        const nextActivitiesSub = this.activityService.filteredList$
            .subscribe(activities => {
                this.dataSource = new LocalDataSource(activities);
            });
        this.sub.add(nextActivitiesSub);
    }

    ngOnDestroy() {
        if(this.sub) {
            this.sub.unsubscribe();
        }
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
