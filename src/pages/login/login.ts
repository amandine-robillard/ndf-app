import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthentificationProvider } from '../../providers/authentification/authentification';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	connectForm: FormGroup;
	loading: any;

	constructor(
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		private authApi: AuthentificationProvider,
		public formBuilder: FormBuilder,
		private storage: Storage,
		public navCtrl: NavController
	) {}

  ngOnInit() {
		this.storage.get('id_user').then((val) => {
			if( val || val != undefined) {
				this.navCtrl.push('HomePage');
			}
		});

		this.connectForm = this.formBuilder.group({
			// url: ['', Validators.compose([Validators.required, Validators.pattern( '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})' )])],
			url: ['', Validators.required],
			id: ['', Validators.required],
			password: ['', Validators.required],
		});

  }

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		this.loading.present();
	}

	logForm() {
		this.storage.get('id_user').then((val) => {
			if( ! val || val == undefined ) {

				let id = this.connectForm.value.id;
				let password = this.connectForm.value.password;
				let url = this.connectForm.value.url;

				this.presentLoadingDefault();
				this.authApi.connect(url, id, password).subscribe(
					data => {
						this.loading.dismiss();
						this.storage.set('url_web', url);
						this.storage.set('id_user', data.id);
						this.storage.set('login_user', data.username);
						this.storage.set('name_user', data.name);
						this.storage.set('pass_user', password);
						this.navCtrl.push('HomePage');
					},
					error => {
						this.loading.dismiss();
						const alert = this.alertCtrl.create({
							title: 'Erreur',
							subTitle: error,
							buttons: ['Ok']
						});
						alert.present();
					}
				);
			} else {
				this.navCtrl.push( 'HomePage' );
			}

		});
	}

}
