import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import { DriverProvider } from '../rider/rider';


@Injectable()
export class PickuprequestProvider {

  private pickupRequest = new BehaviorSubject<boolean>(false);
  public pickupStatus = this.pickupRequest.asObservable();

  changePickupStatus(value: boolean) {
    this.pickupRequest.next(value);
  }

  constructor(public http: HttpClient) {
    //console.log('Hello PickuprequestProvider Provider');
  }

}
