import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleLignePage } from './single-ligne';

@NgModule({
  declarations: [
    SingleLignePage,
  ],
  imports: [
    IonicPageModule.forChild(SingleLignePage),
  ],
})
export class SingleLignePageModule {}
