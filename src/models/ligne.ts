import { Post } from '../models/post';

export class Ligne extends Post {

	private interfaceNote = {
		category_name: String,
		vehicule: String,
		distance: Number,
		tax_inclusive_amount: Number,
		tax_amount: Number,
		associated_document_id: Array,
		taxonomy: Array
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
