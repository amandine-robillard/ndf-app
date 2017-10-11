import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Note } from '../../models/note';
import { Notes } from '../../providers/notes/notes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-liste-note',
  templateUrl: 'liste-note.html'
})
export class ListeNotePage {
	listeNote: Observable<any>;
	errorMessage: string = 'En cours de chargement...';

  constructor(public navCtrl: NavController, public notes: Notes, public api: Api) {
		this.notes.get().subscribe(data => {
			this.listeNote = data;
		}, error => {
			this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
		});
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

	deleteNote(item: Note) {
		if (item) {
			this.notes.delete( item );
		}
	}

}
