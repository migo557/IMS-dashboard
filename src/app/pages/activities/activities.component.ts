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
import {
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
} from "./addons/smart-table-datepicker/smart-table-datepicker.component";


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
    ) { }

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
        actions: {
            add: false,
            edit: true,
            delete: true,
            position: 'right',
        },
        pager: {
            display: true,
        },
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            confirmSave:true,
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            // id: {
            //     title: 'Activity ID',
            //     type: 'number',
            // },
            userName: {
                title: 'User Name',
                type: 'string',
                filter: false,
            },
            projectTitle: {
                title: 'Project Title',
                type: 'string',
                filter: false,
            },
            description: {
                title: 'Description',
                type: 'string',
                filter: false,
            },
            date: {
                title: 'date',
                type: 'string',
                filter: false,
            },
            logs: {
                title: 'logs',
                type: 'string',
                filter: false,
            },
            // timeStart: {
            //     title: 'Start Time',
            //     type: 'custom',
            //     renderComponent: SmartTableDatepickerRenderComponent,
            //     width: '250px',
            //     filter: false,
            //     sortDirection: 'desc',
            //     editor: {
            //         type: 'custom',
            //         component: SmartTableDatepickerComponent,
            //     }
            // },
            // timeEnd: {
            //     title: 'End Time',
            //     type: 'custom',
            //     renderComponent: SmartTableDatepickerRenderComponent,
            //     width: '250px',
            //     filter: false,
            //     editor: {
            //         type: 'custom',
            //         component: SmartTableDatepickerComponent,
            //         config: {
            //             placeholder: 'End Time'
            //         }
            //     }
            // }
            // timeStart: {
            //     title: 'Start Time',
            //     filter: {
            //         type: 'daterange',
            //         config: {
            //             daterange: {
            //                 format: 'HH:MM dd/mm/yyyy',
            //             },
            //         }
            //     }
            // },
            // timeEnd: {
            //     title: 'End Time',
            //     filter: {
            //         type: 'daterange',
            //         config: {
            //             daterange: {
            //                 format: 'HH:MM dd/mm/yyyy',
            //             },
            //         }
            //     }
            // },
        },
    };

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            const deleted = this.activityService.removeActivity(event.data.id)
                .subscribe(r => {
                    if (r) {
                        event.confirm.resolve();
                        this.snackBar.open(`Activity with id"${event.data.id}" was successfully removed.`,
                            'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    }
                    else {
                        this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                });

        } else {
            this.snackBar.open(`Activity with id"${event.data.id}" was not removed.`,
                'OK', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            event.confirm.reject();
        }
    }

    onEditConfirm(event): void {
        if (window.confirm('Are you sure you want to save?')) {
            this.activityService.updateActivity(event.newData)
                .subscribe(r => {
                    if (r) {
                        event.confirm.resolve(event.newData);
                        this.snackBar.open(`Activity with id"${event.data.id}" was successfully updated.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                    else {
                        event.resolve(event.Data);
                        this.snackBar.open(`Activity with id"${event.data.id}" was not updated.`,
                            'OK', {
                                duration: 5000,
                                horizontalPosition: "center",
                                verticalPosition: "top"
                            });
                    }
                });
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
        return new Activity( event.data.title, null, 2, event.data.description, null, null);
    }
}
