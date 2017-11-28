import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import * as Crypto from 'crypto-js';
import * as Sha1 from 'hmacsha1';

declare var require: any;
const crypto = require('crypto');
var OAuth = require('./../../oauth1.0a.js');

const oauth = OAuth({
  consumer: { key: 'q26WQTTF4N68', secret: 'DqXxhhXCJ5KUAy3OMD7SqrimknXcaaUiFjwHU4IrOtQssmim'},
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

let base_url = 'http://localhost/beflex/';

let request_data = {
  url: base_url + 'oauth1/',
  method: 'POST',
	body: {}
};

// Note: The token is optional for some requests
let token = {
  key: '',
  secret: ''
};

@Injectable()
export class Authentification {
  constructor(public http: Http) {
  }

	post(url, data): void {
		request_data.url = base_url + 'oauth1/request';
		this.http.post(request_data.url, null, {
			headers: oauth.toHeader(oauth.authorize(request_data, token))
		}).subscribe(data => {
			console.log(data);
			// let storageData = {};
			// let tmpData = data.split( '&' );
			// for( let key in tmpData ) {
			// 	let tmp = tmpData[key].split( '=' );
			// 	localStorage.setItem( tmp[0], tmp[1] );
			// }

			// this.openAuthorize();

		}, err => {
			console.log(err);
		});
	}
}
