import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';

declare var require: any;
const crypto = require('crypto');
var OAuth = require('./../../oauth1.0a.js');

@Injectable()
export class Authentification {
  constructor(private api: Api, public http: Http) {}

	connect(url, id, password) {
		if (! url || ! id || ! password) {
			return;
		}
		let body;
		let options: any = {
			headers:  {
				'Authorization': '',
			}
		}

		let authData = window.btoa(id + ':' + password); // rajouter le compte du localstorage
		options.headers['Authorization'] = 'Basic ' + authData;

		return this.http.post(url + '/wp-json/wp/v2/users/me', body, options).map(res => res.json());
	}

}
