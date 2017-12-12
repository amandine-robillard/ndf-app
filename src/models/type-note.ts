import { Term_Model } from '../models/term-model';

export class Type_Note extends Term_Model {

	private interfaceTypeNote = {
		category_id: String,
		special_treatment: String,
	}

	constructor(fields: any) {
		super(fields);

		for (const f in fields) {
			if(this.interfaceTypeNote[f]) {
				this[f] = fields[f];
			}
		}

	}

}
