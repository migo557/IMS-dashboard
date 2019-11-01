import {Injectable} from '@angular/core';
import {Project, ProjectInterface} from "../models/project";
import {CommonHttpService} from "./common-http.service";

@Injectable()
export class ProjectHttpService {

  constructor(private commonHttp: CommonHttpService) { }

  createProject(project: Project) {
    return this.commonHttp.post('/api/project/create', project);
  }

  getProjectList(userId: Number) {
    // return this.commonHttp.get('/api/project/getList/', userId);
    return this.commonHttp.get<ProjectInterface[]>('/api/project/getList/', userId);
}

  // getProjectUserPermission(projectId: Number, userId: Number) {
  //   return this.http.get<ProjectUserPermissions>(this.baseUrl + `/api/project/getPermissions/projectId=${projectId}&userId=${userId}`);
  // }
}

