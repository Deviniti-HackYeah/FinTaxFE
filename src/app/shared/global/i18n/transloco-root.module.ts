import { provideTransloco, TranslocoModule } from '@jsverse/transloco';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { NgModule } from '@angular/core';

import { TranslocoHttpLoader } from './transloco.loader';
import { DEFAULT_LANG } from './transloco.const';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideHttpClient(),
    provideTransloco({
      config: {
        prodMode: environment.production,
        availableLangs: ['pl', 'en'],
        reRenderOnLangChange: true,
        defaultLang: DEFAULT_LANG,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
