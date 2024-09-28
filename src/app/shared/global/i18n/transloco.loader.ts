import { TranslocoLoader, Translation } from '@jsverse/transloco';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly _http = inject(HttpClient);

  public getTranslation(lang: string): Observable<Translation> {
    return this._http.get<Translation>(`/i18n/${lang}.json`);
  }
}
