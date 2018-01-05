import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthentificationProvider {

  constructor(public http: Http) {}

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
