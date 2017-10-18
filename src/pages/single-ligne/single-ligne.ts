import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { SingleNotePage } from '../single-note/single-note';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-single-ligne',
  templateUrl: 'single-ligne.html'
})
export class SingleLignePage {
	ligneId: any;
	ligne: Observable<any>;

  constructor(public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
		this.ligneId = this.navParams.get('id');
		this.ligneApi.get(this.ligneId)
		.subscribe(
			data => {
				this.ligne = data;
				console.log(data);
			}
		);
	}

	cancelEdit() {
		this.viewCtrl.dismiss();
	}

	saveEdit() {

	}
}
