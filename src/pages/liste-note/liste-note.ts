import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, LoadingController, AlertController  } from 'ionic-angular';
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
	listeNoteArchive: Note[] = [];
	errorMessage: string = 'En cours de chargement...';
	loading: any;
	homeFilter: string = "all";
	urlIframe: string = "http://localhost/beflex/oauth1/authorize"

  constructor(public alertCtrl: AlertController, private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController, public navCtrl: NavController, public noteApi: Notes, public api: Api) {
	}

	/* charge les notes dés que la page devient active */
	ionViewWillEnter() {
		this.api.getAuthData().then((data) => {
			if(data) {
				this.loadNote();
			}
			else {
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
		this.presentLoadingDefault();

		let postArgs = {
			'title': 'Nouvelle note',
			'author_id': this.api.getUserId(),
		};
		this.noteApi.post(postArgs).subscribe(
			data => {
				this.loading.dismiss();
				this.openNote(data.id);
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

	/* Load the list of all notes */
	loadNote() {
		this.presentLoadingDefault();

		this.noteApi.get().subscribe(
			data => {
				this.listeNote = [];
				this.listeNoteArchive = [];
				for (let item of data) {
					let userId = this.api.getUserId();
					/* Affiche les notes de l'utilisateur */
					if(userId == item.author_id) {
						/* Affiche seulement les notes non archivées */
						if(item.status == "publish") {
							this.listeNote.push(new Note(item));
						}
						if(item.status == "archive") {
							this.listeNoteArchive.push(new Note(item));
						}
					}
				}
				this.loading.dismiss();
			},
			error => {
				this.errorMessage = "Erreur lors du chargement, veuillez relancer l'application."
				this.loading.dismiss();
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

	restoreNote(note) {
		if ( ! note || note.length == 0 ) return;

		this.presentLoadingDefault();
		this.noteApi.restore(note.id).subscribe(
			data => {
				this.loading.dismiss();
				this.loadNote();
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
