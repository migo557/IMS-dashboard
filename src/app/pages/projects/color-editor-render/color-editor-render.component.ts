import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DefaultEditor} from "ng2-smart-table";

@Component({
  selector: 'ngx-color-editor-render',
  templateUrl: './color-editor-render.component.html',
  styleUrls: ['./color-editor-render.component.scss']
})


export class ColorEditorRenderComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('name', { static: false }) name: ElementRef;
    @ViewChild('url', { static: false }) url: ElementRef;
    @ViewChild('htmlValue', { static: false }) htmlValue: ElementRef;

    constructor() {
        super();
    }

    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
            this.name.nativeElement.value = this.getUrlName();
            this.url.nativeElement.value = this.getUrlHref();
        }
    }

    updateValue() {
        const href = this.url.nativeElement.value;
        const name = this.name.nativeElement.value;
        this.cell.newValue = `<a href='${href}'>${name}</a>`;
    }

    getUrlName(): string {
        return this.htmlValue.nativeElement.innerText;
    }

    getUrlHref(): string {
        return this.htmlValue.nativeElement.querySelector('a').getAttribute('href');
    }
}
