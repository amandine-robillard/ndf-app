import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-liste-note',
  templateUrl: 'liste-note.html'
})
export class ListeNotePage {
  cardItems: any[];

  constructor(public navCtrl: NavController) {
    this.cardItems = [
      {
				id: '0',
        user: {
          avatar: 'assets/img/marty-avatar.png',
          name: 'Marty McFly'
        },
        date: 'November 5, 1955',
        image: 'assets/img/advance-card-bttf.png',
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      },
      {
				id: '1',
        user: {
          avatar: 'assets/img/sarah-avatar.png.jpeg',
          name: 'Sarah Connor'
        },
        date: 'May 12, 1984',
        image: 'assets/img/advance-card-tmntr.jpg',
        content: 'I face the unknown future, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.'
      },
      {
				id: '2',
        user: {
          avatar: 'assets/img/ian-avatar.png',
          name: 'Dr. Ian Malcolm'
        },
        date: 'June 28, 1990',
        image: 'assets/img/advance-card-jp.jpg',
        content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
      }
    ];
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
