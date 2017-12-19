import { Component } from '@angular/core';
import { Platform, AlertController, LoadingController, IonicPage, NavParams, ViewController, NavController, ActionSheetController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { SingleNotePage } from '../single-note/single-note';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Type_Note } from '../../models/type-note';
import { Type_Notes } from '../../providers/type-note/type-note';

import { Media } from '../../providers/media/media';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from '../../providers/api/api';

import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;

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
	lastImage: any;

	editLigne: any;

  constructor(private media: Media, private platform: Platform, public actionsheet: ActionSheetController, private camera: Camera, public navCtrl: NavController, private api: Api, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public type_noteApi: Type_Notes, public formBuilder: FormBuilder, public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
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

	pictureAction() {
		let actionSheet = this.actionsheet.create({
			title: 'Select Image Source',
			buttons: [
				{
					text: 'Prendre une photo',
					handler: () => {
						this.openCamera();
						// this.takePicture(this.camera.PictureSourceType.CAMERA);
					}
				},
				{
					text: 'Depuis librairie',
					handler: () => {
						this.openCamera();
						// this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		actionSheet.present();
	}

	openCamera() {
		this.camera.getPicture({ quality: 40, destinationType: 0, encodingType: 0 }).then((imageData) => {

			let base64Image = 'data:image/jpeg;base64,' + imageData;
			var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
			var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);

			this.media.post( base64Image, this.ligne['id'], currentName ).then(
				(data) => {
					let response = JSON.parse(data.response);
					console.log(response);

					/* renvoyer une requete pour mettre this.ligne.thumbnail_id le response id */
				}
			)

		});
	}

}
