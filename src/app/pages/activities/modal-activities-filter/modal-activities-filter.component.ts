import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

    ngOnInit() { }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }


    onEventStartEndRange($event) {
        // this.updateFilter.emit($event);
        if ($event.start != null && $event.end != null) {
            const filter = new ActivityDateRangeFilter($event.start, $event.end);
            this.activityService.announceDateRangeFilter(filter);
        }
    }


}
