import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Note } from '../../models/note';
import { Api } from '../../providers/api/api';

@Injectable()
export class Notes {
	notes: Note[] = [];
	noteUrl: string = 'note-de-frais';

	defaultNote: any = {
		"id": "0",
		"title": "Nouvelle note"
	};

	constructor(public http: Http, public api: Api) {
	}

	get(param?: number) {
		if(param) {
			this.noteUrl += '/' + param;
		}
		console.log(this.noteUrl);
		return this.api.get(this.noteUrl).map(res => res.json());
	}

	add(item: Note) {
		this.notes.push(item);
	}

	delete(item: Note) {
		this.notes.splice(this.notes.indexOf(item), 1);
	}
}
