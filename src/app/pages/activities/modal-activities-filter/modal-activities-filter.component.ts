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

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    @Output() public updateFilter: EventEmitter<ActivityFilter> = new EventEmitter<ActivityFilter>();

    onEventStartEndRange($event) {
        console.log("123", $event);
        // this.updateFilter.emit($event);
        if ($event.start != null && $event.end != null) {
            this.activityService.announceDateRangeFilter(new ActivityDateRangeFilter($event.start, $event.end));
            this.activityService.announceProjectIdsFilter([]);
            console.log("12321");
            console.log("111111");
            console.log("22222222");
        }
    }
}
