import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { NotePage } from './note';

@NgModule({
  declarations: [
    NotePage,
  ],
  imports: [
    IonicPageModule.forChild(NotePage),
    TranslateModule.forChild()
  ],
  exports: [
    NotePage
  ]
})
export class NotePageModule { }
