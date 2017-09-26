import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'note.html'
})
export class NotePage {
	listNote: any[];
	note: any[];

  constructor(public navCtrl: NavController, private navParams: NavParams) {
		this.listNote = [
			{
				id: '0',
				user: {
					avatar: 'assets/img/marty-avatar.png',
					name: 'Marty McFly'
				},
				title: 'Note 1',
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
				title: 'Note 2',
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
				title: 'Note 3',
				date: 'June 28, 1990',
				image: 'assets/img/advance-card-jp.jpg',
				content: 'Your scientists were so preoccupied with whether or not they could, that they didn\'t stop to think if they should.'
			}
		];

		let id = navParams.get('id');
		this.note = this.listNote[id];
	}

}
