import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RiderstateProvider {

  private inRide = new BehaviorSubject<boolean>(false);
  authStatus = this.inRide.asObservable();

  changeRideStatus(value: boolean) {
    this.inRide.next(value);
  }

  constructor(public http: HttpClient) {
    console.log('Hello RiderstateProvider Provider');
  }

  

}
