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
	userName: string;
	loading: any;

	constructor(private storage: Storage, private api: Api, private authApi: Authentification, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController) {
	}

	ionViewWillEnter() {
		this.presentLoadingDefault();

		this.api.getAuthData().then((data) => {
			if(data) {
				this.getUserName();
			}
			else {
				this.navCtrl.push('LoginPage');
			}
		});
	}

	getUserName() {
		this.storage.get('url_web').then((data) => {
			this.loading.dismiss();
			this.userName = data;
		});
	}

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		this.loading.present();
	}

	logout() {
		this.storage.clear();
		this.navCtrl.push('LoginPage');
	}

}
