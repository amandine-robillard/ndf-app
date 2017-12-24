import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';

import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';

@Injectable()
export class Media {
  constructor(private http: Http, private transfer: FileTransfer, private api: Api) {}

	post(fileEncoded: any, ligneId: any, currentName: string): any {
		let authData = window.btoa(this.api.globalAuth['login_user'] + ':' + this.api.globalAuth['pass_user']);
		let authorizationHeader = new Headers();
		authorizationHeader.append('Authorization', 'Basic ' + authData);

		let options: FileUploadOptions = {
			 fileKey: 'file',
			 fileName: 'capture-telephone.jpg',
			 headers: authorizationHeader
		}

		let t = this.transfer.create();
		console.log(t);
		return t.upload(fileEncoded, 'http://amandinerobillard.com/bwoogames/wp-json/wp/v2/media/', options);
	}

	get(id) {
		if(id == undefined) return;

		let jsonHeader = this.getHeaderAuth();
		let options = new RequestOptions({headers: jsonHeader});

		return this.http.get('http://amandinerobillard.com/bwoogames/wp-json/wp/v2/media/' + id, options).map(res => res.json());
	}

	getHeaderAuth() {
		let authorizationHeader = new Headers();
		let authData = window.btoa(this.api.globalAuth['login_user'] + ':' + this.api.globalAuth['pass_user']);
		authorizationHeader.append('Content-Type', 'application/json');
		authorizationHeader.append('Authorization', 'Basic ' + authData);

		return authorizationHeader;
	}

}
