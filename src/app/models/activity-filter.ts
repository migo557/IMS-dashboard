import {ActivityDateRangeFilter} from "./activity-date-range-filter";

interface ActivityFilterInterface {
  projectIds: number[];
  activityDateRangeFilter: ActivityDateRangeFilter;

}

export class ActivityFilter implements ActivityFilterInterface{
  projectIds: number[];
  activityDateRangeFilter: ActivityDateRangeFilter;

  constructor(projectIds: number[], activityDateRangeFilter: ActivityDateRangeFilter) {
    this.projectIds = projectIds;
    this.activityDateRangeFilter = activityDateRangeFilter;
  }
}
