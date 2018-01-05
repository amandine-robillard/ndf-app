import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeNotePage } from './liste-note';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ListeNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeNotePage),
		PipesModule
  ]
})
export class ListeNotePageModule {}
