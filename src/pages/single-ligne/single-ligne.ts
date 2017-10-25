import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { SingleNotePage } from '../single-note/single-note';

import { Ligne } from '../../models/ligne';
import { Lignes } from '../../providers/lignes/lignes';

import { Type_Note } from '../../models/type-note';
import { Type_Notes } from '../../providers/type-note/type-note';

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
	type_note: Type_Note[] = [];

	editLigne: any;

  constructor(public type_noteApi: Type_Notes, public formBuilder: FormBuilder, public ligneApi: Lignes, public viewCtrl: ViewController, public navParams: NavParams) {
		this.ligne = this.navParams.get('ligneData');
		this.getAllTypeNote();

		this.editLigne = this.formBuilder.group({
			title: [this.ligne['title'], Validators.required],
			distance: [this.ligne['distance']],
			tax_inclusive_amount: [this.ligne['tax_inclusive_amount']],
			tax_amount: [this.ligne['tax_amount']],
			type_note_id: [this.ligne['taxonomy']['_type_note'][0]['term_taxonomy_id']]
		});


	}

	getAllTypeNote() {
		this.type_noteApi.get().subscribe(
			data => {
				this.type_note = [];
				for (let item of data) {
					this.type_note.push(new Type_Note(item));
				}
			}
		)
	}

	cancelEdit() {
		this.viewCtrl.dismiss();
	}

	saveEdit(form) {
		let result = Object.assign(this.ligne, form.value); // On envoie les resultats sur l'objet initial
		this.viewCtrl.dismiss(result);
	}
}
