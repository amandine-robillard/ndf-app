export class Post {

	id: number;
	parent_id: number;

	constructor(fields: any) {
		this['id'] = fields['id'];
		this['parent_id'] = fields['parent_id'];
	}

	public displayId() {
		console.log(this.id);
	}

}
