import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../pipe/pipe.module';

import { ListeNotePage } from './liste-note';

@NgModule({
  declarations: [
    ListeNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeNotePage),
		PipesModule
  ],
  exports: [
    ListeNotePage
  ]
})
export class ListeNotePageModule { }
