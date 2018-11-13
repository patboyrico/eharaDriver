import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import * as GeoFire from "geofire";

import * as Firebase from "firebase";

import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { PickuprequestProvider } from '../pickuprequest/pickuprequest';

import { Rider } from '../../interfaces/rider.interface';

@Injectable()
export class DriverProvider {


  public base_url =  'http://172.104.216.175:8080/';
  public driver;

  public pickupRequest: boolean = false;
  public driverId: string = '2ULXHsUunHoX6HEdSdaX';

  public riderId: string;
  public rider: Observable<Rider>;

  dbLocationRef: any;
  geoFire: any;

  constructor(public http: HttpClient, public afs: AngularFireDatabase,
              public pickuprequest: PickuprequestProvider
      ) {
        //  this.dbLocationRef = (this.afs.list('driversAvailable/' + this.driverId));
        //  this.geoFire = new GeoFire(this.dbLocationRef.$ref);
      }

      updateDriverLocation(latitude, longitude)
      {
        // this.geoFire.set(this.driverId, [latitude, longitude])
        // .then(_ => console.log('location updated'))
        // .catch(err => console.log(err))
      }


}
