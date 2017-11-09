import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController  } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
	constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController) {}
}
