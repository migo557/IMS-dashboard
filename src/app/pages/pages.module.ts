import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProjectsComponent } from './projects/projects.component';
import { ModalAddProjectComponent } from './projects/modal-add-project/modal-add-project.component';
import { FormAddProjectComponent } from './projects/modal-add-project/form-add-project/form-add-project.component';
import {AuthService} from "../services/auth.service";
import {ProjectService} from "../services/project.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule, MatSnackBar} from "@angular/material/snack-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Ng2SmartTableModule} from "ng2-smart-table";
import { ActivitiesComponent } from './activities/activities.component';
import { ModalAddActivityComponent } from './activities/modal-add-activity/modal-add-activity.component';
import { ModalSelectProjectComponent } from './activities/modal-select-project/modal-select-project.component';
import {ActivityService} from "../services/activity.service";
import {NgxSmartModalModule, NgxSmartModalService} from "ngx-smart-modal";



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
  ],
  declarations: [
    PagesComponent,
    ProjectsComponent,
    ModalAddProjectComponent,
    FormAddProjectComponent,
    ActivitiesComponent,
    ModalAddActivityComponent,
    ModalSelectProjectComponent,
  ],
  providers: [
    AuthService,
    ProjectService,
    ActivityService,
    MatSnackBar,
    NgxSmartModalService,
  ],
})
export class PagesModule {
}
