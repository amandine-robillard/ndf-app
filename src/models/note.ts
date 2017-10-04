import { Post } from '../models/post';

export class Note extends Post {

	title: string = "Nouvelle Note";

	constructor(fields: any) {
		super(fields);
		this.displayId();

		this['title'] = fields['title'];
	}

	displayId() {
		super.displayId();
		console.log('ok');
	}

}
