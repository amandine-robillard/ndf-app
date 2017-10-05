import { Post } from '../models/post';

export class Note extends Post {

	private interfaceNote = {

	}

	constructor(fields: any) {
		super(fields);

		for (const f in fields) {
			if(this.interfaceNote[f]) {
				this[f] = fields[f];
			}
		}
	}

}
