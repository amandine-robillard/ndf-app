import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../providers/notes/notes';

import { Entry } from '../../models/entry';
import { Entries } from '../../mocks/providers/entries';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-single-note',
  templateUrl: 'single-note.html'
})
export class SingleNotePage {
	note: Note;
	newNote: Boolean = false;
	errorMessage: string = 'En cours de chargement...';

	entries: Entry[];

  constructor(public navCtrl: NavController, public entry: Entries, public notes: Notes, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
		let id = navParams.get('id');
		if ( ! id && id != 0 ) {
			this.note = this.notes.defaultNote;
			this.newNote = true;
		} else {
			this.notes.get(id).subscribe(data => {
				this.note = data[0];
				console.log(data);
			}, error => {
				this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
			});
		}

		this.entries = this.entry.query();
		console.log(this.entries);
  }

	presentActionSheet() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Options avancées',
			buttons: [
				{
					text: 'Editer',
					handler: () => {
						console.log('Edited clicked');
					}
				},
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
					text: 'Annuler',
					handler: () => {
						console.log('Archive clicked');
					},
				}
			]
		});
		actionSheet.present();
	}

}
