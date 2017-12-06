import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost/beflex/wp-json/note_de_frais/v1';

  constructor(private storage: Storage, public http: Http) {
  }

	isConnected() {
		this.storage.get('id_user').then((val) => {
			console.log('Your id is', val);
		});

		// this.navCtrl.push('Connexion');
	}

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

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

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: any) {
		// if ( ! options ) {
		// 	options  = {
		// 		headers:  {
		// 			'Authorization': '',
		// 		}
		// 	};
		// }
		// let authData = window.btoa('a:a'); // rajouter le compte du localstorage
		// options.headers['Authorization'] = 'Basic ' + authData;

    // return this.http.post('http://localhost/beflex/wp-json/wp/v2/posts', body, options);
		return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
