import { Post } from '../models/post';
import { Ligne } from '../models/ligne';

export class Note extends Post {

	private interfaceNote = {
		validation_status: String,
		tax_inclusive_amount: Number,
		tax_amount: Number,
		children: Array,
	}

	constructor(fields: any) {
		super(fields);

		for (const f in fields) {
			if(this.interfaceNote[f]) {

				if ( f == 'children' ) {
					let children = [];
					for ( let item of fields['children'] ) {
						children.push(new Ligne(item));
					}
					this[f] = children;
				}
				else {
					this[f] = fields[f];
				}

			}
		}
	}

}
