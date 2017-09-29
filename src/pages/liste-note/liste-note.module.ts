import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ListeNotePage } from './liste-note';

@NgModule({
  declarations: [
    ListeNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeNotePage),
  ],
  exports: [
    ListeNotePage
  ]
})
export class ListeNotePageModule { }
