export class Post {

	private interfacePost = {
		id: Number,
		parent_id: Number,
		author_id: Number,
		date: String,
		date_modified: String,
		title: String,
		slug: String,
		content: String,
		status: String,
		link: String,
		type: String,
		order: Number,
		comment_status: String,
		comment_count: Number,
		thumbnail_id: Number,
	};

	constructor(fields: any) {
		for (const f in fields) {
			if(this.interfacePost[f]) {
				this[f] = fields[f];
			}
		}
	}

}
