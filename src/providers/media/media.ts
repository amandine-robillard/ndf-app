import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import { Api } from '../../providers/api/api';
import { Observable } from 'rxjs/Observable';

import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer';

@Injectable()
export class Media {
  constructor(private transfer: FileTransfer, private api: Api) {}

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
		return t.upload(fileEncoded, 'http://amandinerobillard.com/bwoogames/wp-json/wp/v2/media/', options);
	}

}
