import { Post } from '../models/post';
import { Type_Note } from '../models/type-note';

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
				if ( f == 'taxonomy' ) {
					this[f] = {};
					this[f]['_type_note'] = this.setArray(fields[f]['_type_note']);
				}
				else if( f == 'satus' ) {
				}
				else {
					this[f] = fields[f];
				}
			}
		}

	}

	setArray(fields: Array<any>) {
		let children = [];
		for ( let item of fields ) {
			children.push(new Type_Note(item));
		}
		return children;
	}
}
