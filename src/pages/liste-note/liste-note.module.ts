import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListeNotePage } from './liste-note';

@NgModule({
  declarations: [
    ListeNotePage,
  ],
  imports: [
    IonicPageModule.forChild(ListeNotePage),
    TranslateModule.forChild()
  ],
  exports: [
    ListeNotePage
  ]
})
export class ListeNotePageModule { }
