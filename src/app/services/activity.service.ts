import {Injectable} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class ActivityService {

    private activitiesSource: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(null);
    public activities$: Observable<Activity[]> = this.activitiesSource.asObservable();


    constructor(
        private commonHttp: CommonHttpService,
        private authService: AuthService) { }


    getActivityList(activityFilter: ActivityFilter) {
        return this.commonHttp.post<Activity[]>('/api/timelog/getList/', activityFilter);
        // .pipe(
        //     catchError(err => {
        //
        //     })
        // )
    }


            // .subscribe(
            //     result => {
            //         return result.map(
            //             item => new Activity(item.id, item.projectId, item.userId,
            //                 item.description, item.hours, item.timeStart, item.timeEnd),
            //         );
            //     }
            // );

    public announceActivityData(data) {
        this.activitiesSource.next(data);
        console.log('data= ', data);
    }

    createActivity(activity: Activity) {
        return this.commonHttp.post<Activity>('/api/timelog/create/', activity);
    }
}
