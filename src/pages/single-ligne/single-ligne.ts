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

import { File } from '@ionic-native/file';
// import { FilePath } from '@ionic-native/file-path';
// import { Transfer } from '@ionic-native/transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
	controlKm: boolean = false;
	noteTaxId: number;

	editLigne: any;

	options: CameraOptions = {
		quality: 100,
		destinationType: this.camera.DestinationType.DATA_URL,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE
	}

  constructor(private camera: Camera, public navCtrl: NavController, private api: Api, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public type_noteApi: Type_Notes, public formBuilder: FormBuilder, public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
		this.presentLoadingDefault();
		this.ligne = this.navParams.get('ligneData');

		this.noteTaxId = ( this.ligne['current_category']['term_taxonomy_id'] ) ? this.ligne['current_category']['term_taxonomy_id'] : '';

		this.editLigne = this.formBuilder.group({
			title: [this.ligne['title'], Validators.required],
			date: [this.ligne['date']['date_input']['iso8601']],
			distance: [this.ligne['distance']],
			tax_inclusive_amount: [this.ligne['tax_inclusive_amount']],
			tax_amount: [this.ligne['tax_amount']],
			type_note_id: [this.noteTaxId]
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
				this.changeType( this.noteTaxId );
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

		result.taxonomy._type_note = [];
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

	changeType(type: number): void {
		for (let mon_type of this.type_note) {
			if( mon_type['id'] == type ) {
				if( this.isKmCalculation( mon_type['special_treatment'] ) ) {
					this.controlKm = true;
				}
				else {
					this.controlKm = false;
				}
			}
		}
	}

	isKmCalculation( type_note ) {
		if( type_note.length > 0 && type_note != undefined && type_note == 'km_calculation' ) {
			return true;
		}
		else {
			return false;
		}
	}

	uploadPicture() {
		this.camera.getPicture(this.options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			let base64Image = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
			// Handle error
		});
	}

}
