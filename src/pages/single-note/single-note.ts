import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';

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
	newNote: Boolean = false;
	errorMessage: string = 'En cours de chargement...';
	loading: any;

	listeLigne: Observable<any>;

  constructor(private modalCtrl: ModalController, public loadingCtrl: LoadingController, public navCtrl: NavController, public ligne: Lignes, public notes: Notes, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {

		let id = navParams.get('id');
		if ( ! id && id != 0 ) {
			// ICI, création d'une note, puis GET de la note
			// this.note = this.notes.defaultNote;
			// this.newNote = true;
			this.navCtrl.push('HomePage');
		}
		else {
			this.presentLoadingDefault();
			this.notes.get(id).subscribe(
				data => {
					this.note = data;
					console.log(data);
					this.loading.dismiss();
				},
				error => {
					this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
					this.loading.dismiss();
				}
			);
		}

		// this.lignes = this.ligne.get();
		// console.log(this.lignes);
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

	openLigne(ligneId) {
		let newModal = this.modalCtrl.create('SingleLignePage', { id: ligneId });
		newModal.present();
	}

	public updateValidationStatus(value: string) {
		console.log(value);
	}

}
