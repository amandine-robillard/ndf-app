import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
	globalAuth = {}

  constructor(private storage: Storage, public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
		let jsonHeader = this.getHeaderAuth();
		options = new RequestOptions({headers: jsonHeader});

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

		return this.http.get(this.globalAuth['url_web'] + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: any) {
		if ( ! options ) {
			options  = {
				headers:  {
					'Authorization': '',
				}
			};
		}

		let authData = window.btoa(this.globalAuth['name_user'] + ':' + this.globalAuth['pass_user']); // rajouter le compte du localstorage
		options.headers['Authorization'] = 'Basic ' + authData;

		return this.http.post(this.globalAuth['url_web'] + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
		let jsonHeader = this.getHeaderAuth();
		options = new RequestOptions({headers: jsonHeader});

		return this.http.put(this.globalAuth['url_web'] + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
		let jsonHeader = this.getHeaderAuth();
		options = new RequestOptions({headers: jsonHeader});

		return this.http.delete(this.globalAuth['url_web'] + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.globalAuth['url_web'] + '/' + endpoint, body, options);
  }

	/* Construit l'authorization pour les requetes */
	getHeaderAuth() {
		let authorizationHeader = new Headers();
		let authData = window.btoa(this.globalAuth['name_user'] + ':' + this.globalAuth['pass_user']);
		authorizationHeader.append('Content-Type', 'application/json');
		authorizationHeader.append('Authorization', 'Basic ' + authData);

		return authorizationHeader;
	}

	/* Check si l'utilisateur est connecté. Enregistre ses données de connexion */
	getAuthData() {
		const promises = [];
		let keys = ['name_user', 'pass_user', 'url_web', 'id_user'];
		keys.forEach( key => promises.push(this.storage.get(key)) );

		return Promise.all(promises).then( values => {
			const result = {};

			values.map( (value, index) => {
				result[keys[index]] = value;
			});

			if ( result['name_user'] ) {
				this.globalAuth = {
					'id_user': result['id_user'],
					'name_user': result['name_user'],
					'pass_user': result['pass_user'],
					'url_web': result['url_web'] + '/wp-json/note_de_frais/v1',
				}
				return true;
			}
			else {
				return false;
			}
		});
	}

	getUserId() {
		if ( this.globalAuth['id_user'] ) {
			return this.globalAuth['id_user'];
		}
		else {
			return false;
		}
	}


}
