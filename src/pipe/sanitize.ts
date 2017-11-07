import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sanitizeString'
})
export class SanitizeString implements PipeTransform {
	transform(value, args) {
		let newValue = value.replace(/ /g, '-');
		newValue = newValue.toLowerCase();
		newValue = this.cleanAccent(newValue);
		return newValue;
	}

	/**
	 * Supprime les accents
	 * @param  {string} str
	 * @return {string}
	 */
	cleanAccent(str) {
		str = str.replace(/[ÀÁÂÃÄÅ]/g,"a");
		str = str.replace(/[àáâãäå]/g,"a");
		str = str.replace(/[ÈÉÊË]/g,"e");
		str = str.replace(/[éèêë]/g,"e");
		return str;
	}
}
