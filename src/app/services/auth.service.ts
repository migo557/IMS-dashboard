import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from "../models/user";
import {CommonHttpService} from "./common-http.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private userSource: BehaviorSubject<User>;
  public user$: Observable<User>;
  public user: User = new User(2);
  constructor(private commonHttp: CommonHttpService) {
    this.user = new User(1);
    console.log("success");
    this.userSource = new BehaviorSubject<User>(this.user);
    this.user$ = this.userSource.asObservable();
  }

  public announceUserChange(user: User) {
    this.userSource.next(user);
  }
  //todo: Complete authentication service
}
