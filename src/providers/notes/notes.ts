import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Note } from '../../models/note';
import { Api } from '../../providers/api/api';

@Injectable()
export class Notes {
	notes: Note[] = [];
	noteUrl: string = 'note';

	defaultNote: any = {
		"id": "0",
		"title": 'Nouvelle note'
	};

	constructor(public http: Http, public api: Api) {
	}

	get(param?: number) {
		let queryUrl = this.noteUrl;
		if(param) {
			queryUrl = this.noteUrl + '/' + param + '/details';
		}
		return this.api.get(queryUrl).map(res => res.json());
	}

	post(param?: object) {
		if (!param) {
			param = {};
		}
		return this.api.post(this.noteUrl, param).map(res => res.json());
	}

	add(item: Note) {
		this.notes.push(item);
	}

	delete(itemId: Note) {
		let param = {
			'id': itemId,
			'status': 'archive',
		}
		return this.api.post(this.noteUrl, param).map(res => res.json());
	}

	restore(itemId: Note) {
		let param = {
			'id': itemId,
			'status': 'publish',
		}
		return this.api.post(this.noteUrl, param).map(res => res.json());
	}
}
