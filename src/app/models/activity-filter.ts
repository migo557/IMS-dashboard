interface ActivityFilterInterface {
  projectIds: number[];
  dateFrom: Date;
  dateTo: Date;
}

export class ActivityFilter implements ActivityFilterInterface{
  projectIds: number[];
  dateFrom: Date;
  dateTo: Date;

  constructor(projectIds: number[], dateFrom: Date, dateTo: Date) {
    this.projectIds = projectIds;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
