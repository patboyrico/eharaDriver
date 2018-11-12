import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthstateProvider {

  private loggedIn = new BehaviorSubject<boolean>(true);
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }


  constructor(public http: HttpClient) {
    console.log('Hello AuthstateProvider Provider');
  }

}
