import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
// import { Camera } from '@ionic-native/camera';
// import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

import { Notes } from '../providers/notes/notes';
import { Lignes } from '../providers/lignes/lignes';
import { Type_Notes } from '../providers/type-note/type-note';
import { Api } from '../providers/api/api';
import { Authentification } from '../providers/authentification/authentification';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
	],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
	exports: [
	],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	],
  providers: [
    Api,
    Notes,
		Lignes,
		Type_Notes,
		Authentification,
		InAppBrowser,
    // Camera,
    // GoogleMaps,
    SplashScreen,
    StatusBar,
		Camera,
		NativePageTransitions,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
