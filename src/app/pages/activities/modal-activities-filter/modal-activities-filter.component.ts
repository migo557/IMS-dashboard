import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivityFilter} from "../../../models/activity-filter";
import {NbDateService} from "@nebular/theme";
import {ActivityService} from "../../../services/activity.service";
import {ActivityDateRangeFilter} from "../../../models/activity-date-range-filter";
import {Subscription} from "rxjs";

@Component({
    selector: 'modal-activities-filter',
    templateUrl: './modal-activities-filter.component.html',
    styleUrls: ['./modal-activities-filter.component.scss']
})
export class ModalActivitiesFilterComponent implements OnInit {
    private sub: Subscription = new Subscription();

    min: Date;
    max: Date;

    constructor(
        protected dateService: NbDateService<Date>,
        private activityService: ActivityService
    ) {
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);
    }

    ngOnInit() {
      this.sub.add(this.activityService.activityFilterChanged());
    }

    @Output() public updateFilter: EventEmitter<ActivityFilter> = new EventEmitter<ActivityFilter>();

    onEventStartEndRange($event) {
        console.log($event);
        this.updateFilter.emit($event);
      const date1 = $event.start;
      const date2 = $event.end;
      this.activityService.announceDateRangeFilter(new ActivityDateRangeFilter($event.start, $event.end));
      debugger

    }

    ngOnDestroy() {
      if (this.sub) {
        this.sub.unsubscribe();
      }
    }

}
