import { Component } from '@angular/core';
import { AlertController, ModalController, IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../providers/notes/notes';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-single-note',
  templateUrl: 'single-note.html',
})
export class SingleNotePage {
	note: Note;
	noteId: number;
	errorMessage: string = 'En cours de chargement...';
	loading: any;

	listeLigne: Observable<any>;

  constructor( private api: Api, public alertCtrl: AlertController, private modalCtrl: ModalController, public loadingCtrl: LoadingController, public navCtrl: NavController, public ligneApi: Lignes, public noteApi: Notes, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
		this.api.getAuthData().then((data) => {
			if(data) {
				this.noteId = this.navParams.get('id');
				this.loadNote(this.noteId);
			}
			else {
				this.navCtrl.push('LoginPage');
			}
		});
	}

	loadNote(id) {
		if ( ! id && id != 0 ) {
			this.navCtrl.push('HomePage');
		}
		else {
			this.presentLoadingDefault();
			this.noteApi.get(id).subscribe(
				data => {
					this.loading.dismiss();
					let userId = this.api.getUserId();
					if(data.author_id == userId) {
						this.note = new Note(data);
					}
					else {
						this.navCtrl.push('ListeNotePage');
					}
				},
				error => {
					this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
					this.loading.dismiss();
				}
			);
		}
	}

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		this.loading.present();
	}

	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options avancées',
			buttons: [
				{
					text: 'Archiver',
					role: 'destructive',
					handler: () => {
						this.deleteNote(this.note);
					}
				},
				{
					text: 'Annuler',
					handler: () => {
					},
				}
			]
		});
		actionSheet.present();
	}

	openLigne(ligneData) {
		event.stopPropagation();

		let newModal = this.modalCtrl.create('SingleLignePage', { ligneData: ligneData });
		newModal.onDidDismiss(data => {
			this.loadNote(this.noteId);
		});
		newModal.present();
	}

	/* Ajout d'une ligne */
	addLigne() {
		this.presentLoadingDefault();

		let authorId = this.api.getUserId();
		let ligneParams = {
			'parent_id' : this.noteId,
			'author_id' : authorId,
			'title' : 'Ligne de frais'
		}
		this.ligneApi.post(ligneParams).subscribe(
			data => {
				this.loading.dismiss();
				this.loadNote(this.noteId);
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

	/* Archive d'une note */
	deleteNote(note) {
		if ( ! note || note.length == 0 ) return;

		this.presentLoadingDefault();
		this.noteApi.delete(note.id).subscribe(
			data => {
				this.loading.dismiss();
				this.navCtrl.push('ListeNotePage');
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

	/* Supression d'une ligne */
	deleteLigne(ligne) {
		if ( ! ligne || ligne.length == 0 ) return;

		this.presentLoadingDefault();
		this.ligneApi.delete(ligne.id).subscribe(
			data => {
				this.loading.dismiss();
				this.loadNote(this.noteId);
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

	/* Modifie le status d'une note */
	public updateValidationStatus(value: string) {
		if ( ! this.note['validation_status'] && ! value ) return;

		this.presentLoadingDefault();

		this.note['validation_status'] = value;
		this.noteApi.post(this.note).subscribe(
			data => {
				this.loading.dismiss();
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

	public ligneOptions(ligne) {
		event.stopPropagation();
		if ( ! ligne || ligne.length == 0 ) return;

		let actionSheet = this.actionSheetCtrl.create({
			title: ligne.title,
			buttons: [
				{
					text: 'Supprimer',
					role: 'destructive',
					handler: () => {
						this.deleteLigne(ligne);
					}
				},
				{
					text: 'Annuler',
					handler: () => {},
				}
			]
		});
		actionSheet.present();
	}
}
