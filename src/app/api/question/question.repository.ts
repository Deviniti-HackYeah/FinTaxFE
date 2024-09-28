import { QuestionResponseDto, QuestionRequestDto } from '@shared/models';
import { environment } from '@environments/environment';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionRepository {
  private readonly _http = inject(HttpClient);

  public postQuestion(
    data: QuestionRequestDto,
  ): Observable<QuestionResponseDto> {
    return this._http.post<QuestionResponseDto>(
      `${environment.apiUrl}/question`,
      data,
    );
  }
}
