import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';
import { DbProvider } from '../../providers/db/db';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public error: any;

  public form = {
      username: null,
      password: null
  };

  public driverData;
  public driverId;
  public driverUserid;

  constructor(
              public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider, public token: TokenProvider,
              public loadCtrl: LoadingController, public db: DbProvider
    ) {
  }

  ionViewDidLoad() {
   
  }

  
  handleError(error) {
    if(error.status == 401)
    {
      this.error = 'The credentials do not match our records';
      //console.log(this.error);
    }
}

  handleResponse(data) {

      this.db.getDriverInfo(data.username).subscribe(
              resp => {
                  this.driverData = resp;
                  this.driverId = this.driverData.driver.id;
                  this.driverUserid = this.driverData.id;
              }
      );
      this.token.handle(data.access_token);
      this.navCtrl.setRoot(HomePage, {
        driver_data: this.driverData,
        driver_id: this.driverId,
        driverUserId: this.driverUserid
      });
  }

  toDash()
  {
    let loading = this.loadCtrl.create({
      content:'Logging In...'
    });

    loading.present();

    this.auth.login(this.form).subscribe(
     data => { 
       this.handleResponse(data);
        loading.dismiss();
     },
     error => { 
       this.handleError(error);
     loading.dismiss();
     }
    );

  }


}
