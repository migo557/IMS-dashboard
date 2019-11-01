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
import {ProjectHttpService} from "../services/project-http.service";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";


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
  ],
  declarations: [
    PagesComponent,
    ProjectsComponent,
    ModalAddProjectComponent,
    FormAddProjectComponent,
  ],
  providers: [
    AuthService,
    ProjectHttpService,
  ],
})
export class PagesModule {
}
