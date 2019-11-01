import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Project, ProjectInterface} from "../../models/project";
import {ProjectHttpService} from "../../services/project-http.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'ngx-app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements AfterViewInit {
  userId : number;

  displayedColumns: string[] = ["id", "title", "edit"];
  public dataSource = new MatTableDataSource<ProjectInterface>([]); // output table

  @ViewChild(ModalAddProjectComponent, {static: false})
  private modalAddProject: ModalAddProjectComponent;

  constructor(
    private projectHttpService: ProjectHttpService,
    private authService: AuthService,
  ) { }

  ngAfterViewInit() {
    this.getProjects();
    this.authService.user$.subscribe(r => {
      this.userId = r.id;
    })
  }

  getProjects() {
    const self = this;
    this.projectHttpService.getProjectList(this.userId)
      .subscribe(
        result => {
          const projects = result.map(
            item => new Project(item.id, item.title),
          );
          self.dataSource = new MatTableDataSource<ProjectInterface>(projects);
        },
      );
  }


  public addNewProject(project: ProjectInterface) {
    this.dataSource.data = [project, ...this.dataSource.data]
  }
}
