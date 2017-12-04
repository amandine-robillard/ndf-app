import { NgModule } from '@angular/core';
import { SanitizeString } from './sanitize';
import { safeUrl } from './safeUrl';

@NgModule({
  declarations: [
    SanitizeString,
		safeUrl
  ],
  imports: [

  ],
  exports: [
    SanitizeString,
		safeUrl
  ]
})
export class PipesModule { }
