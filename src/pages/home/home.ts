import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
	tab1Root: any = 'ListeNotePage';
	tab2Root: any = 'ConfigurationPage';

	tab1Title = "Mes notes";
	tab2Title = "Configurations";

	constructor() {}
}
