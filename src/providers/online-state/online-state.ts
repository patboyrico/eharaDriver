import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the OnlineStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnlineStateProvider {

  private isOnline = new BehaviorSubject<boolean>(true);
  onlineStatus = this.isOnline.asObservable();

  changeOnlineStatus(value: boolean) {
    this.isOnline.next(value);
  }

  constructor(public http: HttpClient) {}

}
