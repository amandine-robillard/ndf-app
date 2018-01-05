import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Type_Note } from '../../models/type-note';
import { ApiProvider } from '../../providers/api/api';


@Injectable()
export class TypeNoteProvider {
	Type_Note: Type_Note[] = [];
	Type_NoteUrl: string = 'type_note';

	constructor(public api: ApiProvider) {
	}

	get(param?: number) {
		let queryUrl = this.Type_NoteUrl;
		if(param) {
			queryUrl = this.Type_NoteUrl + '/' + param;
		}
		return this.api.get(queryUrl).map(res => res.json());
	}
}
