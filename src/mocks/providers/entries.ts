import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Entry } from '../../models/entry';

@Injectable()
export class Entries {
	entries: Entry[] = [];

	constructor(public http: Http) {
		let entries = [
			{
				"id": 0,
				"title": "Entry 1"
			},
			{
				"id": 1,
				"title": "Entry 2"
			},
			{
				"id": 2,
				"title": "Entry 3"
			}
		];

		for (let item of entries) {
			this.entries.push(new Entry(item));
		}
	}

	query(params?: any) {
		if (!params) {
			return this.entries;
		}

		return this.entries.filter((item) => {
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

	add(item: Entry) {
		this.entries.push(item);
	}

	delete(item: Entry) {
		this.entries.splice(this.entries.indexOf(item), 1);
	}
}
