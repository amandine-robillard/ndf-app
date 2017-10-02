export class Note {

	constructor(fields: any) {
		for (const f in fields) {
			this[f] = fields[f];
		}
	}

}
