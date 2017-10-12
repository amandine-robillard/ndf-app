import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sanitizeString'
})
export class SanitizeString implements PipeTransform {
	transform(value, args) {
		let newValue = value.replace(/ /g, '-');
		newValue = newValue.toLowerCase();
		return newValue;
	}
}
