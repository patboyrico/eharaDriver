import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';

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

  constructor(
              public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider, public token: TokenProvider
    ) {
  }

  ionViewDidLoad() {
   
  }

  handleResponse(data) {
      this.token.handle(data.access_token);
      this.navCtrl.setRoot(HomePage);
  }

  handleError(error) {
      if(error.status == 401)
      {
        this.error = 'The credentials do not match our records';
        //console.log(this.error);
      }
  }

  toDash()
  {
    this.auth.login(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
    );

  }


  facebookLogin()
  {

  }

  googleLogin()
  {

  }

}
