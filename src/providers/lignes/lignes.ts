import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Ligne } from '../../models/ligne';
import { ApiProvider } from '../../providers/api/api';


@Injectable()
export class LignesProvider {
	lignes: Ligne[] = [];
	ligneUrl: string = 'ligne';

	constructor(public api: ApiProvider) {}

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

	delete(itemId: number) {
		let param = {
			'id': itemId,
			'status': 'trash',
		}
		return this.api.post(this.ligneUrl, param).map(res => res.json());
	}
}
