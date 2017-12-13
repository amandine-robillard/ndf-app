import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController  } from 'ionic-angular';


import { Authentification } from '../../providers/authentification/authentification';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
	avatarUrl: string;

	constructor(private storage: Storage, private api: Api, private authApi: Authentification, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController) {
		this.api.getAuthData().then((data) => {
			if(data) {
			}
			else {
				this.navCtrl.push('LoginPage');
			}
		});
	}

}
