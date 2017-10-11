import { Post } from '../models/post';

export class Note extends Post {

	private interfaceNote = {
		validation_status: String,
		tax_inclusive_amount: Number,
		tax_amount: Number,
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
