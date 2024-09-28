import { NgModule } from '@angular/core';

import {
  SHARED_DIRECTIVES,
  SHARED_PROVIDERS,
  SHARED_MODULES,
  SHARED_PIPES,
} from './module';

@NgModule({
  exports: [...SHARED_DIRECTIVES, ...SHARED_MODULES, ...SHARED_PIPES],
  declarations: [...SHARED_DIRECTIVES, ...SHARED_PIPES],
  providers: [...SHARED_PROVIDERS],
  imports: [...SHARED_MODULES],
})
export class SharedModule {}
