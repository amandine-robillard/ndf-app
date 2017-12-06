import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Authentification } from '../../providers/authentification/authentification';

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'login.html'
})
export class LoginPage {
	connectForm: any;

	constructor( private authApi: Authentification, public formBuilder: FormBuilder, private storage: Storage, public navCtrl: NavController ) {
		storage.get('id_user').then((val) => {
			if( val || val != undefined) {
				this.navCtrl.push('ListeNotePage');
			}
		});

		this.connectForm = this.formBuilder.group({
			url: ['', Validators.required],
			id: [],
			password: [],
		});
	}

	connect() {
		this.storage.get('id_user').then((val) => {
			if( ! val || val == undefined ) {
				let id = 'a';
				let password = 'sdsda';
				this.authApi.connect(id, password).subscribe(
					data => {
						console.log(data);
					},
					error => {
						console.log(error);
					}
				);
				// this.storage.set('id_user', '1');
			}
			// this.navCtrl.push('ListeNotePage');

		});

	}
}
