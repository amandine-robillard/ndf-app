import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
	ligne: Ligne;

	editLigne: any;

  constructor(public formBuilder: FormBuilder, public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
		this.ligne = this.navParams.get('ligneData');

		this.editLigne = this.formBuilder.group({
			title: [this.ligne['title'], Validators.required],
			distance: [this.ligne['distance']],
			tax_inclusive_amount: [this.ligne['tax_inclusive_amount']],
			tax_amount: [this.ligne['tax_amount']]
		});
	}

	cancelEdit() {
		this.viewCtrl.dismiss();
	}

	saveEdit(form) {
		let result = Object.assign(this.ligne, form.value); // On envoie les resultats sur l'objet initial
		this.viewCtrl.dismiss(result);
	}
}
