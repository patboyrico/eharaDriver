import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Driver } from '../../interfaces/driver.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PickuprequestProvider } from '../pickuprequest/pickuprequest';

import * as firebase from 'firebase';
import { Rides } from '../../interfaces/rides.interface';
import { Rider } from '../../interfaces/rider.interface';

@Injectable()
export class DriverProvider {

  public DriverCollection: AngularFirestoreCollection<Driver>;
  public RiderCollection: AngularFirestoreCollection<Rider>;


  public base_url =  'http://172.104.216.175:8080/';
  public drivers: Observable<Driver[]>;
  public driver: Observable<Driver>;
  public rides: Observable<Rides>;
  public pickupRequest: boolean = false;
  public driverId: string = '2ULXHsUunHoX6HEdSdaX';

  public riderId: string;
  public rider: Observable<Rider>;


  constructor(public http: HttpClient, public afs: AngularFirestore,
              public pickuprequest: PickuprequestProvider
      ) {
    this.DriverCollection = this.afs.collection<Driver>('drivers');
    this.RiderCollection = this.afs.collection('users');

    this.drivers = this.DriverCollection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
            })
        })
    )

    this.getDriverPickupRequest(this.driverId);
  }

  getDriver(id)
  {
     this.DriverCollection.doc<any>(id).valueChanges()
                    .subscribe(data => {
                        this.driver = data;
                    });

  }

  getDriverRides(id)
  {
    this.DriverCollection.doc<any>(id).valueChanges()
    .subscribe(data => {
        this.rides = data.rides.driver_user;
        this.getDriverRidesUserId(data.rides.driver_user.user_id);
    });
  }

  getDriverRidesUserId(id)
  {
      this.riderId = id;
      this.getDriverRidesUser(id);
  }

  getDriverRidesUser(id)
  {
    this.RiderCollection.doc<any>(id).valueChanges()
    .subscribe(data => {
        this.rider = data;
    });
  }


  getDriverPickupRequest(id)
  {
    this.DriverCollection.doc<Driver>(id).valueChanges()
                    .subscribe(data => {
                            this.pickuprequest.changePickupStatus(data.pickupRequest);
                    });

  }              

  updateDriverStatus(status, id: string)
  {
    return this.DriverCollection.doc(id).update({isOnline: status});
  }

  updateDriverPickupRequest(value: boolean, id: string)
  {
    return this.DriverCollection.doc(id).update({pickupRequest: value});
  }

  updateDriverInRide(value: boolean, id: string)
  {
    return this.DriverCollection.doc(id).update({inRide: value})
  }

  updateDriverLocation(latitude, longitude, id:string)
  {
    //console.log('Driver Location updated');
    return this.DriverCollection.doc(id).update({
              location: new firebase.firestore.GeoPoint(latitude, longitude)
            });
  }

}
