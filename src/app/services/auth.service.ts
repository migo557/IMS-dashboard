import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import {CommonHttpService} from "./common-http.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private userSource: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private commonHttp: CommonHttpService) {
    this.userSource = new BehaviorSubject<User>(null);
    this.user$ = this.userSource.asObservable();
  }

  public announceUserChange(user: User) {
    this.userSource.next(user);
  }
  //todo: Complete authentication service
}
