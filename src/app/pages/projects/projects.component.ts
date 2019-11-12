import { Component, OnInit, ViewChild} from '@angular/core';
import {ModalAddProjectComponent} from "./modal-add-project/modal-add-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Project, ProjectInterface} from "../../models/project";
import {ProjectService} from "../../services/project.service";
import {AuthService} from "../../services/auth.service";
import {LocalDataSource} from "ng2-smart-table";

@Component({
    selector: 'ngx-app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
    public dataSource: LocalDataSource = new LocalDataSource();
    private getProjectsObs: any;
    private nextProjectsObs: any;

    @ViewChild(ModalAddProjectComponent, {static: false})
    private modalAddProject: ModalAddProjectComponent;

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
        this.getProjectsObs = this.projectService.getProjectList()
            .subscribe(projects => {
                this.projectService.announceProjectData(projects);
            });

        this.nextProjectsObs = this.projectService.project$
            .subscribe(projects => {
                if (projects) {
                    this.dataSource = new LocalDataSource(projects);
                }
            });
    }


    open() {
        this.modalAddProject.open();
        this.modalAddProject.dialogRef.result.then(result => {
            if (result) {
                this.snackBar.open(`Project "${result.title}" created.`, '', {
                    duration: 5000,
                    horizontalPosition: "center",
                    verticalPosition: "top"
                });
            }
        })
    }

    public addNewProject(project: ProjectInterface) {
        this.dataSource.add(project).then(r => r);
    }


    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            id: {
                title: 'ID',
                type: 'number',
            },
            title: {
                title: 'Title',
                type: 'string',
            },
        },
    };

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
    }

// the function below is created for ngx + button
    onCreateConfirm(event): Project {
        if (window.confirm('Are you sure you want to create a project?')) {
            event.confirm.resolve();
        } else {
            event.confirm.reject();
        }
        return new Project(event.data.id, event.data.title);
    }
}
