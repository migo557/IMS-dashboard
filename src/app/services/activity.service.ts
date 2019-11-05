import {Injectable} from '@angular/core';
import {CommonHttpService} from "./common-http.service";
import {Activity, ActivityInterface} from "../models/activity";
import {ActivityFilter} from "../models/activity-filter";

@Injectable()
export class ActivityService {

  constructor(private commonHttp: CommonHttpService) { }

  getActivityList(activity: ActivityFilter) {
    return this.commonHttp.post<ActivityInterface[]>('/api/timelog/getList/', activity);
  }

  createActivity(activity: Activity) {
    return this.commonHttp.post<ActivityInterface>('/api/timelog/create/', activity);
  }
}
