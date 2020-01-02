import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColorPickerModule} from "@syncfusion/ej2-angular-inputs";
import {MembersChipsComponent} from "./members-chips/members-chips.component";
import {ColorRenderComponent} from "./color-render/color-render.component";
import {ColorEditorRenderComponent} from "./color-editor-render/color-editor-render.component";
import {ColorPickerComponent} from "./color-picker/color-picker.component";
import {AuthService} from "../../services/auth.service";
import {ProjectService} from "../../services/project.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSmartModalService} from "ngx-smart-modal";
import {NgbModal, NgbModalConfig, NgbTimepicker} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
        ColorPickerComponent,
        ColorRenderComponent,
        ColorEditorRenderComponent,
    ],
    imports: [
        CommonModule,
        ColorPickerModule
    ],
    providers: [
        AuthService,
        ProjectService,
        MatSnackBar,
        NgxSmartModalService,
        NgbModal,
        NgbModalConfig,
        NgbTimepicker,
    ],
    exports: [
        ColorPickerComponent
    ],
    entryComponents: [
        MembersChipsComponent,
        ColorRenderComponent,
        ColorEditorRenderComponent,
    ]
})
export class ProjectsModule {
}
