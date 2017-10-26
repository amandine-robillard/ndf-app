import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Ligne } from '../../models/ligne';
import { Note } from '../../models/note';
import { Api } from '../../providers/api/api';


@Injectable()
export class Lignes {
	lignes: Ligne[] = [];
	ligneUrl: string = 'ligne';

	constructor(public http: Http, public api: Api) {
	}

	get(param?: number) {
		let queryUrl = this.ligneUrl;
		if(param) {
			queryUrl = this.ligneUrl + '/' + param;
		}
		return this.api.get(queryUrl).map(res => res.json());
	}

	post(param?: object) {
		if (!param) {
			param = {};
		}
		return this.api.post(this.ligneUrl, param).map(res => res.json());
	}

	add(item: Ligne) {
		this.lignes.push(item);
	}

	delete(item: Ligne) {
		this.lignes.splice(this.lignes.indexOf(item), 1);
	}
}
