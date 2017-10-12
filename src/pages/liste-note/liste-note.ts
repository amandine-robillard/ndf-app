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
  templateUrl: 'liste-note.html'
})
export class ListeNotePage {
	listeNote: Observable<any>;
	errorMessage: string = 'En cours de chargement...';
	loading: any;

  constructor(private nativePageTransitions: NativePageTransitions, public loadingCtrl: LoadingController, public navCtrl: NavController, public notes: Notes, public api: Api) {
		this.presentLoadingDefault();

		this.notes.get().subscribe(
			data => {
				this.listeNote = data;
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

	slidePage() {
		let options: NativeTransitionOptions = {
			direction: 'up',
	    duration: 500,
	    slowdownfactor: 3,
	    slidePixels: 20,
	    iosdelay: 100,
	    androiddelay: 150,
	    fixedPixelsTop: 0,
	    fixedPixelsBottom: 60
		};

		this.nativePageTransitions.slide(options)
		.then( ()=>{ console.log('ok'); } )
		.catch( ()=>{ console.log('non'); } );
		this.navCtrl.setRoot('SingleNotePage');
	}


	/* Open a cart */
	openNote(noteId) {
		// let options: NativeTransitionOptions = {
		// 	direction: 'left',
		// 	duration: 400,
		// 	slowdownfactor: -1,
		// 	iosdelay: 50
		// };
		// this.nativePageTransitions.slide(options)
		// .then(()=>{ console.log('success'); })
		// .catch(()=>{ console.log('error'); });

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
