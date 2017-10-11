
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Note } from '../../models/note';
import { Api } from '../../providers/api/api';

@Injectable()
export class Notes {
	notes: Note[] = [];

	defaultNote: any = {
		"id": "0",
		"title": "Nouvelle note"
	};

	constructor(public http: Http, public api: Api) {
		let notes = [
			{
				"id": 0,
				"title": "Note 1",
				"date": "20171008",
				"date_modified": "201710081050",
				"validation_status": "payee",
				"tax_inclusive_amount": "10",
				"tax_amount": "11"
			},
			{
				"id": 1,
				"title": "Note 2",
				"date": "20171008",
				"date_modified": "201710081050",
				"validation_status": "en-cours",
				"tax_inclusive_amount": "9",
				"tax_amount": "13"
			},
			{
				"id": 2,
				"title": "Note 3",
				"date": "20171008",
				"date_modified": "201710081050",
				"validation_status": "refusee",
				"tax_inclusive_amount": "9",
				"tax_amount": "13"
			}
		];

		for (let item of notes) {
			this.notes.push(new Note(item));
		}
	}

	query(params?: any) {
		return this.api.get('note-de-frais').map(res => res.json());

		// return this.api.get('note-de-frais')
		// .map(res => res.json())
		// .subscribe(data => {
		// 	return data;
		// });

		// if (!params) {
		// 	return this.notes;
		// }
		//
		// return this.notes.filter((item) => {
		// 	for (let key in params) {
		// 		let field = item[key];
		// 		if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
		// 			return item;
		// 		} else if (field == params[key]) {
		// 			return item;
		// 		}
		// 	}
		// 	return null;
		// });
	}

	add(item: Note) {
		this.notes.push(item);
	}

	delete(item: Note) {
		this.notes.splice(this.notes.indexOf(item), 1);
	}
}
