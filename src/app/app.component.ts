import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Config, Nav } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;

	pages: any[] = [
		{ title: 'Home', component: 'HomePage' },
		{ title: 'Liste Note', component: 'ListeNotePage' },
	];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, config: Config) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

	// ionViewDidLoad() {
	// 	this.platform.ready().then(() => {
	// 		this.statusBar.styleDefault();
	// 		this.splashScreen.hide();
	// 	});
	// }
}
