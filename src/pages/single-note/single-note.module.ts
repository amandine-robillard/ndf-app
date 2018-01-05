import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleNotePage } from './single-note';

@NgModule({
  declarations: [
    SingleNotePage,
  ],
  imports: [
    IonicPageModule.forChild(SingleNotePage),
  ],
})
export class SingleNotePageModule {}
