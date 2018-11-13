import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PickuprequestProvider } from '../pickuprequest/pickuprequest';

import * as firebase from 'firebase';
import { Rides } from '../../interfaces/rides.interface';
import { Rider } from '../../interfaces/rider.interface';

@Injectable()
export class DriverProvider {


  public base_url =  'http://172.104.216.175:8080/';
  public driver;

  public pickupRequest: boolean = false;
  public driverId: string = '2ULXHsUunHoX6HEdSdaX';

  public riderId: string;
  public rider: Observable<Rider>;



  constructor(public http: HttpClient, public afs: AngularFireDatabase,
              public pickuprequest: PickuprequestProvider
      ) {
           
      }

      updateDriverLocation(latitude, longitude, id)
      {
        this.afs.database.ref('driversAvailable/' + id + '/l').set({
              0 : latitude,
              1 : longitude
        });
      }


}
