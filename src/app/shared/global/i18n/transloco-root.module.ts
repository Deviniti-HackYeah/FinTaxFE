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
        defaultLang: localStorage.getItem('lang') || DEFAULT_LANG,
        availableLangs: ['pl', 'en', 'ua'],
        prodMode: environment.production,
        reRenderOnLangChange: true,
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
