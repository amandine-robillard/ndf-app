import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';

import { Authentification } from '../../providers/authentification/authentification';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;

  tab1Title = "Mes notes";
  tab2Title = "Configurations";

  constructor( public navCtrl: NavController, public authApi: Authentification ) {
		this.authApi.post('http://localhost/beflex/oauth1/request', null);


    /* https://github.com/seanfisher/angular-oauth1-client */
  }
}
