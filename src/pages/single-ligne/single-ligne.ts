import { Component } from '@angular/core';
import { AlertController, LoadingController, IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { SingleNotePage } from '../single-note/single-note';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Type_Note } from '../../models/type-note';
import { Type_Notes } from '../../providers/type-note/type-note';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-single-ligne',
  templateUrl: 'single-ligne.html'
})
export class SingleLignePage {
	ligneId: any;
	ligne: Ligne;
	type_note: Type_Note[] = [];
	loading: any;

	editLigne: any;

  constructor(public navCtrl: NavController, private api: Api, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public type_noteApi: Type_Notes, public formBuilder: FormBuilder, public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
		this.presentLoadingDefault();
		this.ligne = this.navParams.get('ligneData');

		let noteTaxId = ( this.ligne['current_category']['term_taxonomy_id'] ) ? this.ligne['current_category']['term_taxonomy_id'] : '';
		this.editLigne = this.formBuilder.group({
			title: [this.ligne['title'], Validators.required],
			date: [this.ligne['date']['date_input']['iso8601']],
			distance: [this.ligne['distance']],
			tax_inclusive_amount: [this.ligne['tax_inclusive_amount']],
			tax_amount: [this.ligne['tax_amount']],
			type_note_id: [noteTaxId]
		});

		this.getAllTypeNote();

		this.api.getAuthData().then((data) => {
			if(! data) {
				this.navCtrl.push('LoginPage');
			}
		});
	}

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		this.loading.present();
	}

	getAllTypeNote() {
		this.type_noteApi.get().subscribe(
			data => {
				this.type_note = [];
				for (let item of data) {
					this.type_note.push(new Type_Note(item));
				}
				this.loading.dismiss();
			}
		)
	}

	cancelEdit() {
		this.viewCtrl.dismiss();
	}

	saveEdit(form) {
		this.presentLoadingDefault();

		let result = Object.assign(this.ligne, form.value); // On envoie les resultats sur l'objet initial

		result.taxonomy._type_note[0] = form.value.type_note_id;

		/* Conversion de la date en Mysql */
		result.date = this.isoToMysql(result.date);

		this.ligneApi.post(result).subscribe(
			data => {
				this.loading.dismiss();
				this.viewCtrl.dismiss(result);
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

	}

	isoToMysql(iso) {
		if ( iso == undefined ) {
			return;
		}
		iso.replace("T", " ");
		iso.replace("Z", "");
		return iso;
	}
}
