import { environment } from '@environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PingResponseDto } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable()
export class PingRepository {
  private readonly _http = inject(HttpClient);

  public ping(): Observable<PingResponseDto> {
    return this._http.get<PingResponseDto>(`${environment.apiUrl}`);
  }
}
