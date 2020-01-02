import {Injectable} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";
import {BehaviorSubject, Observable, of, combineLatest} from "rxjs";
import {catchError, first, switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityDateRangeFilter} from "../models/activity-date-range-filter";

@Injectable()
export class ActivityService {

    private projectIdsFilter: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public projectIdsFilter$: Observable<number[]> = this.projectIdsFilter.asObservable();
    public announceProjectIdsFilter = (list: number[]) => {
        this.projectIdsFilter.next(list);
    };

    private dateRangeFilter: BehaviorSubject<ActivityDateRangeFilter> = new BehaviorSubject<ActivityDateRangeFilter>(
        new ActivityDateRangeFilter(new Date(1900,11,1), new Date(2100, 1,1))
    );
    public dateRangeFilter$: Observable<ActivityDateRangeFilter> = this.dateRangeFilter.asObservable();
    public announceDateRangeFilter = (dateRangeFilter: ActivityDateRangeFilter) => {
        this.dateRangeFilter.next(dateRangeFilter);
    };


    public filteredList$ = combineLatest(
        this.projectIdsFilter$,
        this.dateRangeFilter$
    ).pipe(
        switchMap(([projectIdsFilter, dateRangeFilter]) => {
            return this.getActivityList(new ActivityFilter(projectIdsFilter, dateRangeFilter))
        })
    );

    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) { }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('timelog/getList/', activityFilter)
            .pipe(
                catchError((err) => {
                    console.log("ERROR in GetActivities List:", err);
                    this.snackBar.open("An error occured while trying to load your activities",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }


    createActivity(activity: Activity) {
        console.log(activity)
        return this.commonHttp.post<Activity>('timelog/create/', activity)
            .pipe(
                catchError((err) => {
                    console.log("ERROR in createActivity:", err);
                    this.snackBar.open("An error occured while trying to create a activity",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }

    removeActivity(activityId: number) {
        return this.commonHttp.get('/timelog/remove/' + activityId)
            .pipe(
                first(),
                catchError((err) => {
                    console.log("ERROR in Remove TimeLog:", err);
                    this.snackBar.open("An error occured while trying to remove your activitiy",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            );
    }

    updateActivity(activity) {
        return this.commonHttp.post('timelog/update', activity)
        // return this.commonHttp.post('api/timelog/update', activity)
            .pipe(
                first(),
                catchError((err) => {
                    console.log("ERROR in Remove TimeLog:", err);
                    this.snackBar.open("An error occured while trying to update your activitiy",
                        'OK', {
                            duration: 5000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            );
    }
}
