import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../models/user";
import {CommonHttpService} from "./common-http.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userSource: BehaviorSubject<User>;
  public user$: Observable<User>;

  constructor(private commonHttp: CommonHttpService) {
    // this.userSource = new BehaviorSubject<User>(new User(1));
    this.userSource = new BehaviorSubject<User>(new User(1));
    this.user$ = this.userSource.asObservable();
  }

  public announceUserChange(user: User) {
    this.userSource.next(new User(1));
  }
  //todo: Complete authentication service
}
