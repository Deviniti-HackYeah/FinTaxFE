import { environment } from '@environments/environment';
import { HistoryResponseDto } from '@shared/models';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HistoryRepository {
  private readonly _http = inject(HttpClient);

  public getHistory(sessionId: string): Observable<HistoryResponseDto> {
    return this._http.get<HistoryResponseDto>(
      `${environment.apiUrl}/history/${sessionId}`,
    );
  }
}
