import { Term_Model } from '../models/term-model';

export class Type_Note extends Term_Model {

	private interfaceNote = {
		category_id: String,
		special_treatment: String,
		name: String,
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
