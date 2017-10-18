import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../pipe/pipe.module';

import { SingleNotePage } from './single-note';
import { SingleLignePage } from '../single-ligne/single-ligne';

@NgModule({
  declarations: [
    SingleNotePage
  ],
  imports: [
    IonicPageModule.forChild(SingleNotePage),
		PipesModule
  ],
  exports: [
    SingleNotePage
  ],
})
export class SingleNotePageModule { }
