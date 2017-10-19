import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, LoadingController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { Note } from '../../models/note';
import { Notes } from '../../providers/notes/notes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-liste-note',
  templateUrl: 'liste-note.html',
})
export class ListeNotePage {
	listeNote: Note[] = [];
	errorMessage: string = 'En cours de chargement...';
	loading: any;

  constructor(private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController, public navCtrl: NavController, public noteApi: Notes, public api: Api) {
		this.presentLoadingDefault();

		this.noteApi.get().subscribe(
			data => {
				for (let item of data) {
					this.listeNote.push(new Note(item));
				}
				this.loading.dismiss();
			},
			error => {
				this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
				this.loading.dismiss();
			}
		);
  }

	presentLoadingDefault() {
		this.loading = this.loadingCtrl.create({
			spinner: 'crescent',
			content: 'Please wait...'
		});

		this.loading.present();
	}

	/* Open a cart */
	openNote(noteId) {
		let options: NativeTransitionOptions = {
			direction: 'left',
			duration: 400,
			slowdownfactor: -1,
			iosdelay: 50
		};
		this.nativePageTransitions.slide(options);
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
			this.noteApi.delete( item );
		}
	}

}
