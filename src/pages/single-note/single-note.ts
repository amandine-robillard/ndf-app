import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../mocks/providers/notes';

@IonicPage()
@Component({
  selector: 'page-single-note',
  templateUrl: 'single-note.html'
})
export class SingleNotePage {
	note: Note;
	newNote: Boolean = false;

  constructor(public navCtrl: NavController, public notes: Notes, public navParams: NavParams, public actionSheetCtrl: ActionSheetController) {
		let id = navParams.get('id');
		if ( ! id && id != 0 ) {
			this.note = this.notes.defaultNote;
			this.newNote = true;
		} else {
			this.note = this.notes.query({ "id": id });
			this.note = this.note[0];
		}
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
