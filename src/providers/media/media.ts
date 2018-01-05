import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';

import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';

@Injectable()
export class MediaProvider {
  constructor(
		private http: Http,
		private transfer: FileTransfer,
		private api: ApiProvider
	) {}

	post(fileEncoded: any, ligneId: any, currentName: string): any {
		let authData = window.btoa(this.api.globalAuth['login_user'] + ':' + this.api.globalAuth['pass_user']);
		let authorizationHeader = new Headers();
		authorizationHeader.append('Authorization', 'Basic ' + authData);

		let options: FileUploadOptions = {
			 fileKey: 'file',
			 fileName: 'capture-telephone.jpg',
			 mimeType: "image/jpeg",
			 headers: authorizationHeader
		}

		let t = this.transfer.create();
		return t.upload(fileEncoded, this.api.globalAuth['url_web'] + '/wp-json/wp/v2/media/', options);
	}

	get(id) {
		if(id == undefined) return;

		let jsonHeader = this.getHeaderAuth();
		let options = new RequestOptions({headers: jsonHeader});

		return this.http.get(this.api.globalAuth['url_web'] + '/wp-json/wp/v2/media/' + id, options).map(res => res.json());
	}

	getHeaderAuth() {
		let authorizationHeader = new Headers();
		let authData = window.btoa(this.api.globalAuth['login_user'] + ':' + this.api.globalAuth['pass_user']);
		authorizationHeader.append('Content-Type', 'application/json');
		authorizationHeader.append('Authorization', 'Basic ' + authData);

		return authorizationHeader;
	}

}
