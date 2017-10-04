import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../mocks/providers/notes';

@IonicPage()
@Component({
  selector: 'page-liste-note',
  templateUrl: 'liste-note.html'
})
export class ListeNotePage {
	listeNote: Note[];

  constructor(public navCtrl: NavController, public notes: Notes) {
		this.listeNote = this.notes.query();
		console.log(this.listeNote);
  }

	/* Open a cart */
	openNote(noteId) {
		this.navCtrl.push('SingleNotePage', {
			id: noteId,
		});
	}

	/* Create a new note */
	createNote() {
		this.navCtrl.push('SingleNotePage');
	}

}
