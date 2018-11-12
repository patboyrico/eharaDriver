import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Rides } from '../../interfaces/rides.interface';
import { Driver } from '../../interfaces/driver.interface';



@Injectable()
export class RidesProvider {

  public RidesCollection: AngularFirestoreCollection<Rides>;
  public RiderCollection: AngularFirestoreCollection;


  public base_url =  'http://172.104.216.175:8080/';
  public rides: Observable<Rides[]>;
  public ride: Observable<Rides>;
  public rider: Observable<any[]>;

  public ridesConfirmed: boolean = false;
  public driverId: string = '2ULXHsUunHoX6HEdSdaX';

  public riderId: string;
  public riderLocation: firebase.firestore.GeoPoint;

  constructor(public http: HttpClient,  public afs: AngularFirestore ) {

    this.RidesCollection = this.afs.collection('driver');
    this.RiderCollection = this.afs.collection('users');

    // this.drivers = this.RidesCollection.snapshotChanges().pipe(
    //     map(actions => {
    //         return actions.map(a => {
    //           const data = a.payload.doc.data().driver_id;
    //           const id = a.payload.doc.id;
    //           return { id, ...data };
    //         })
    //     })
    // 

    this.getDriverRides();

    }


  getDriverRides()
  {
      
  }




  getRiderLocation(location)
  {
      this.riderLocation = location;
  }

  getRider(id)
  {
      this.riderId = id;
      this.RiderCollection.doc<any>(id).valueChanges()
      .subscribe(data => {
          this.rider = data;
          console.log(data);
      });
  }

}
