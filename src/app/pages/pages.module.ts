import {NgModule} from '@angular/core';
import {NbCalendarModule, NbCardModule, NbDatepickerModule, NbInputModule, NbMenuModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {ECommerceModule} from './e-commerce/e-commerce.module';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {ProjectsComponent} from './projects/projects.component';
import {ModalAddProjectComponent} from './projects/modal-add-project/modal-add-project.component';
import {FormAddProjectComponent} from './projects/modal-add-project/form-add-project/form-add-project.component';
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule, MatSnackBar} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModal, NgbModalConfig, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {ActivitiesComponent} from './activities/activities.component';
import {ModalAddActivityComponent} from './activities/modal-add-activity/modal-add-activity.component';
import {ModalSelectProjectComponent} from './activities/modal-select-project/modal-select-project.component';
import {ActivityService} from "../services/activity.service";
import {NgxSmartModalModule, NgxSmartModalService} from "ngx-smart-modal";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ModalActivitiesFilterComponent} from './activities/modal-activities-filter/modal-activities-filter.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';


@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        ECommerceModule,
        MiscellaneousModule,
        HttpClientModule,
        MatTableModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NgbModule,
        MatIconModule,
        MatButtonModule,
        Ng2SmartTableModule,
        NgxSmartModalModule.forRoot(),
        MatFormFieldModule,
        MatInputModule,
        NbCalendarModule,
        NbDatepickerModule,
        NbCardModule,
        NbInputModule,
        FormsModule,
        AngularMultiSelectModule,

    ],
    declarations: [
        PagesComponent,
        ProjectsComponent,
        ModalAddProjectComponent,
        FormAddProjectComponent,
        ActivitiesComponent,
        ModalAddActivityComponent,
        ModalSelectProjectComponent,
        ModalActivitiesFilterComponent,
    ],
    providers: [
        AuthService,
        ProjectService,
        ActivityService,
        MatSnackBar,
        NgxSmartModalService,
        NgbModal,
        NgbModalConfig,
    ],
    entryComponents: [
        // ModalAddActivityComponent,
        // ActivitiesComponent,
    ]
})
export class PagesModule {
}
