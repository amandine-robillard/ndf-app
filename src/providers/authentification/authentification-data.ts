import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalAuth {
	globalAuth = {}

	constructor(private storage: Storage) {
	}

	getAuthData() {
		const promises = [];
		let keys = ['name_user', 'pass_user', 'url_web'];
		keys.forEach( key => promises.push(this.storage.get(key)) );

		return Promise.all(promises).then( values => {
			const result = {};

			values.map( (value, index) => {
				result[keys[index]] = value;
			});

			if ( result['name_user'] ) {
				this.globalAuth = {
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

	getDirectAuth() {
		return this.globalAuth;
	}
}
