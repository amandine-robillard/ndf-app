import { Component } from '@angular/core';
import { AlertController, ModalController, IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../providers/notes/notes';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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

  constructor(public alertCtrl: AlertController, private modalCtrl: ModalController, public loadingCtrl: LoadingController, public navCtrl: NavController, public ligneApi: Lignes, public noteApi: Notes, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
		this.noteId = this.navParams.get('id');
		this.loadNote(this.noteId);
  }

	loadNote(id) {
		if ( ! id && id != 0 ) {
			this.navCtrl.push('HomePage');
		}
		else {
			this.presentLoadingDefault();
			this.noteApi.get(id).subscribe(
				data => {
					this.note = new Note(data);
					this.loading.dismiss();
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
					text: 'Exporter',
					handler: () => {
						console.log('Archive clicked');
					},
				},
				{
					text: 'Archiver',
					role: 'destructive',
					handler: () => {
						console.log('Destructive clicked');
					}
				},
				{
					text: 'Supprimer',
					role: 'destructive',
					handler: () => {
						console.log('Supprimer clicked');
					}
				},
				{
					text: 'Annuler',
					handler: () => {
						console.log('Archive clicked');
					},
				}
			]
		});
		actionSheet.present();
	}

	openLigne(ligneData) {
		let newModal = this.modalCtrl.create('SingleLignePage', { ligneData: ligneData });
		newModal.present();
	}

	/* Ajout d'une ligne */
	addLigne() {
		this.presentLoadingDefault();

		let ligneParams = {
			'parent_id' : this.noteId,
			'title' : 'Ligne de frais'
		}
		this.ligneApi.post(ligneParams).subscribe(
			data => {
				this.loading.dismiss();
				this.loadNote(this.noteId);
				// this.openNote(data.id);
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
}
