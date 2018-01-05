import { NgModule } from '@angular/core';
import { SanitizePipe } from './sanitize/sanitize';
import { SafeUrlPipe } from './safe-url/safe-url';
@NgModule({
	declarations: [SanitizePipe,
    SafeUrlPipe],
	imports: [],
	exports: [SanitizePipe,
    SafeUrlPipe]
})
export class PipesModule {}
