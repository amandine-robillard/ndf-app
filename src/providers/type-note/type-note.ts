import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Type_Note } from '../../models/type-note';
import { Api } from '../../providers/api/api';


@Injectable()
export class Type_Notes {
	Type_Note: Type_Note[] = [];
	Type_NoteUrl: string = 'type_note';

	constructor(public http: Http, public api: Api) {
	}

	get(param?: number) {
		let queryUrl = this.Type_NoteUrl;
		if(param) {
			queryUrl = this.Type_NoteUrl + '/' + param;
		}
		return this.api.get(queryUrl).map(res => res.json());
	}
}
