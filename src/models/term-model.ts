export class Term_Model {

	private interfaceTermModel = {
		id: Number,
		type: String,
		term_taxonomy_id: Number,
		name: String,
		description: String,
		slug: String,
		parent_id: Number,
		post_id: String
	};

	constructor(fields: any) {
		for (const f in fields) {
			if(this.interfaceTermModel[f]) {
				this[f] = fields[f];
			}
		}
	}

}
