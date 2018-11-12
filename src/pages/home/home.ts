import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { DriverProvider } from '../../providers/rider/rider';
import { RidesProvider } from '../../providers/rides/rides';
import { OnlineStateProvider } from '../../providers/online-state/online-state';
import { PickuprequestProvider } from '../../providers/pickuprequest/pickuprequest';


import { filter } from 'rxjs/operators';

import { Driver } from '../../interfaces/driver.interface';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   public lat:number;
   public long: number;
   public driverDetails: Driver;
   public isOnline: boolean = false;
   public driverId: string = '2ULXHsUunHoX6HEdSdaX';
   public pickupRequestState: boolean = false;

   public rider: any;

   public requestedRider;

  @ViewChild('map') mapElement: ElementRef;
  map: any;


  constructor(public navCtrl: NavController, public platform: Platform,
              public geo: Geolocation, public loadingCtrl: LoadingController,
              public driver: DriverProvider, public onlineState: OnlineStateProvider,
              public pickupRequest: PickuprequestProvider, public alertCtrl: AlertController,
              public rides: RidesProvider
              ) {
                console.log(this.driver.rider);
                 this.driver.getDriverRides(this.driverId);
                 console.log();
              }

    getRider()
    {
        
    }

  ionViewDidLoad() {  

    
    this.platform.ready().then(() => {
            
      let loading = this.loadingCtrl.create({
        content:'Locating...'
      });
  
      loading.present();

      let mapOptions = {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
      this.geo.getCurrentPosition().then(pos => {

        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(18);

      
    let driverMarker = new google.maps.Marker({
          position: latLng,
          title: 'Driver'
        });
        driverMarker.setMap(this.map);

        loading.dismiss();


      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

    const subscription = this.geo.watchPosition()
                              .pipe(filter((p) => p.coords !== undefined)) //Filter Out Errors
                              .subscribe(position => {
                              let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                              this.map.setCenter(latLng);
                              this.lat = position.coords.latitude;
                              this.long = position.coords.longitude;
                              this.updateDriverLocation( position.coords.latitude,  position.coords.longitude);
                              //console.log(this.long + ' ' + this.lat);
    });
  }

  // driverStatus()
  // {
  //     let driver = this.driverDetails = {
  //           username: 'Driver 1',
  //           latitude: this.lat,
  //           longitude: this.long,
  //           isOnline: this.isOnline,
  //           pickupRequest: false,
  //           inRide: false,
  //           visibility: 2
  //     }

  //   this.saveDriver(driver);
  // }


  
  // saveDriver(driver)
  // {
  //     this.driver.addDriver(driver);
  // }

  updateDriverLocation(latitude, longitude)
  {
      this.driver.updateDriverLocation(latitude, longitude, this.driverId);
  }

  updateDriverOnlineStatus($event)
  {
      this.isOnline = !this.isOnline;
     // console.log(this.isOnline);
      this.driver.updateDriverStatus(this.isOnline, this.driverId);
  }

  




}
