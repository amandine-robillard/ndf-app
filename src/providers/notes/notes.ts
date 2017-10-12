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
		"title": "Nouvelle note"
	};

	constructor(public http: Http, public api: Api) {
	}

	get(param?: number) {
		let queryUrl = this.noteUrl;
		if(param) {
			queryUrl = this.noteUrl + '/' + param;
		}
		return this.api.get(queryUrl).map(res => res.json());
	}

	add(item: Note) {
		this.notes.push(item);
	}

	delete(item: Note) {
		this.notes.splice(this.notes.indexOf(item), 1);
	}
}
