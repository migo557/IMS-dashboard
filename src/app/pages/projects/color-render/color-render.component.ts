import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ViewCell} from "ng2-smart-table";

@Component({
    selector: 'ngx-color-render',
    templateUrl: './color-render.component.html',
    styleUrls: ['./color-render.component.scss']
})
export class ColorRenderComponent implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private zone:NgZone, private ref: ChangeDetectorRef) {
    }

    ngOnInit() {
        console.log('value color:', this.value);
        if (this.renderValue) this.renderValue = this.value.toString();

        setTimeout(() => {
            this.ref.markForCheck();
        });
    }

}
