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
					this[f] = this.setArray(fields['children']);
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
			children.push(new Ligne(item));
		}
		return children;
	}

}
