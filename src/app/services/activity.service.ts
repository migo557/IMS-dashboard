import {Injectable} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";
import {BehaviorSubject, Observable, of, combineLatest} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityDateRangeFilter} from "../models/activity-date-range-filter";
import {NbDateService} from "@nebular/theme";

@Injectable()
export class ActivityService {

    private activityList: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(null);
    public activities$: Observable<Activity[]> = this.activityList.asObservable();
    public announceActivityList = (list: Activity[]) => {
        this.activityList.next(list);
    };

    private projectIdsFilter: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    public projectIdsFilter$: Observable<number[]> = this.projectIdsFilter.asObservable();
    public announceProjectIdsFilter = (list: number[]) => {
        this.projectIdsFilter.next(list);
    };

    private dateRangeFilter: BehaviorSubject<ActivityDateRangeFilter> = new BehaviorSubject<ActivityDateRangeFilter>(
        new ActivityDateRangeFilter(new Date(2019,11,1), new Date(2020, 1,1))
    );
    public dateRangeFilter$: Observable<ActivityDateRangeFilter> = this.dateRangeFilter.asObservable();
    public announceDateRangeFilter = (dateRangeFilter: ActivityDateRangeFilter) => {
        this.dateRangeFilter.next(dateRangeFilter);
    };

    test: BehaviorSubject<any> = new BehaviorSubject<any>(2);
    public test$: Observable<any> = this.test.asObservable();
    public announceTest = (test: any) => {
        this.test.next(test);
    };

    public filteredTest = combineLatest(
        this.test$
    ).pipe(
        switchMap(([test]) => {
            console.log("Some TEST value was triggered! test:", test);
            return this.test;
        })
    );

    public filteredList$ = combineLatest(
        // this.projectIdsFilter$,
        this.dateRangeFilter$
    ).pipe(
        switchMap(([dateRangeFilter]) => {
            console.log("filteredList switchMap: Some value was triggere!", dateRangeFilter);
            return this.getActivityList(new ActivityFilter([], dateRangeFilter))
        })
    );

    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
        protected dateService: NbDateService<Date>,
    ) {
        const min = this.dateService.addDay(this.dateService.today(), -5);
        const max = this.dateService.addDay(this.dateService.today(), 5);
        const activityDateRangeFilter = new ActivityDateRangeFilter(min,max);
        this.dateRangeFilter = new BehaviorSubject<ActivityDateRangeFilter>(activityDateRangeFilter);
        this.projectIdsFilter = new BehaviorSubject<number[]>([]);
    }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('/api/timelog/getList/', activityFilter)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    this.snackBar.open("An error occured while trying to load your activities",
                        'OK', {
                            duration: 10000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }


    createActivity(activity: Activity) {
        return this.commonHttp.post<Activity>('/api/timelog/create/', activity);
    }

    // updateActivityList(activityFilter: ActivityFilter) {
    //     this.getActivityList(activityFilter).subscribe(list => {
    //         this.announceActivityList(list);
    //     })
    // }

    activityFilterChanged() {
        console.log("activity filter changed!!!");
        return combineLatest(
            this.projectIdsFilter$,
            this.dateRangeFilter$
        ).pipe(
            switchMap(([projectIdsFilter, dateRangeFilter]) => {
                console.log("Some value was triggere!");
                return this.getActivityList(new ActivityFilter(projectIdsFilter, dateRangeFilter))
            })
        ).subscribe(list => {
            this.announceActivityList(list);
        })
    }
}
