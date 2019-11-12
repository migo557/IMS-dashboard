import {Injectable} from '@angular/core';
import {Project, ProjectInterface} from "../models/project";
import {CommonHttpService} from "./common-http.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";

@Injectable()
export class ProjectService {

  private projectsSource: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  public project$: Observable<Project> = this.projectsSource.asObservable();

  constructor(private commonHttp: CommonHttpService) { }

  createProject(project: Project) {
    return this.commonHttp.post<ProjectInterface>('/api/project/create', project);
  }

  getProjectList(userId: Number) {
    return this.commonHttp.get<ProjectInterface[]>('/api/project/getList/', userId);
  }
}

