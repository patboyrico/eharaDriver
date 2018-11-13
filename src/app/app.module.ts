import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RidesPage } from '../pages/rides/rides';
import { EarningsPage } from '../pages/earnings/earnings';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { AuthstateProvider } from '../providers/authstate/authstate';
import { AuthProvider } from '../providers/auth/auth';
import { RiderstateProvider } from '../providers/riderstate/riderstate';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { TokenProvider } from '../providers/token/token';
import { PickuprequestProvider } from '../providers/pickuprequest/pickuprequest';
import { DriverProvider } from '../providers/rider/rider';
import { OnlineStateProvider } from '../providers/online-state/online-state';
import { DbProvider } from '../providers/db/db';
import { RidesProvider } from '../providers/rides/rides';
import { AngularFirestore } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RidesPage,
    EarningsPage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RidesPage,
    EarningsPage,
    EditProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthstateProvider,
    AuthProvider,
    RiderstateProvider,
    TokenProvider,
    PickuprequestProvider,
    DriverProvider,
    OnlineStateProvider,
    DbProvider,
    RidesProvider, 
    AngularFirestore
  ]
})
export class AppModule {}
