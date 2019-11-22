import {Injectable} from '@angular/core';
import {Project, ProjectInterface} from "../models/project";
import {CommonHttpService} from "./common-http.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../models/user";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ProjectService {

    private projectSource: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
    public project$: Observable<Project[]> = this.projectSource.asObservable();
    public announceProjectList = (list: Project[]) => {
        this.projectSource.next(list);
    };


    constructor(
        private commonHttp: CommonHttpService,
        private snackBar: MatSnackBar,
    ) { }

    createProject(project: Project) {
        return this.commonHttp.post<ProjectInterface>('/api/project/create', project);
    }

    getProjectList() {
        return this.commonHttp.get<ProjectInterface[]>('/api/project/getList/')
            .pipe(
                catchError((err) => {
                    this.snackBar.open("An error occured while trying to load your projects",
                        'OK', {
                            duration: 10000,
                            horizontalPosition: "center",
                            verticalPosition: "top"
                        });
                    return of(null);
                })
            )
    }

    public announceProjectData(data) {
        this.projectSource.next(data);
    }
}

