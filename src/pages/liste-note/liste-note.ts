import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-liste-note',
  templateUrl: 'liste-note.html'
})
export class ListeNotePage {

  constructor(public navCtrl: NavController) {
  }

	/* Open a cart */
	openCard(cardId) {
		// alert('ID : ' + cardId);
		this.navCtrl.push('NotePage', {
			id: cardId,
		},
		{
			animate: true,
			animation: 'ios-transition'
		});
	}

	/* Create a new note */
	createNote() {
		this.navCtrl.push('NotePage');
	}
}
