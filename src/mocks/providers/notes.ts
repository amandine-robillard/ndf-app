import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Note } from '../../models/note';

@Injectable()
export class Notes {
	notes: Note[] = [];

	defaultNote: any = {
		"id": "0",
		"title": "Nouvelle note"
	};

	constructor(public http: Http) {
		let notes = [
			{
				"id": 0,
				"title": "Note 1"
			},
			{
				"id": 1,
				"title": "Note 2"
			},
			{
				"id": 2,
				"title": "Note 3"
			}
		];

		for (let item of notes) {
			this.notes.push(new Note(item));
		}
	}

	query(params?: any) {
		if (!params) {
			return this.notes;
		}

		return this.notes.filter((item) => {
			for (let key in params) {
				let field = item[key];
				if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
					return item;
				} else if (field == params[key]) {
					return item;
				}
			}
			return null;
		});
	}

	add(item: Note) {
		this.notes.push(item);
	}

	delete(item: Note) {
		this.notes.splice(this.notes.indexOf(item), 1);
	}
}
