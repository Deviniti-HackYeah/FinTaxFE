import { QuestionRepository } from '@api/repositories';
import { Injectable, inject } from '@angular/core';
import { Conversation } from '@core/models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  public readonly conversation$ = new BehaviorSubject<Conversation>([]);
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  public readonly sessionId$ = new BehaviorSubject<string>('');

  private readonly _questionRepo = inject(QuestionRepository);
  private readonly _router = inject(Router);

  public startOver(message: string): void {
    this.conversation$.next([{ data: { data: message }, type: 'user' }]);
    this.sessionId$.next(crypto.randomUUID());
    this._router.navigate(['/chat', this.sessionId$.value]);
    this.askQuestion(message);
  }

  public askQuestion(message: string): void {
    this.conversation$.next([
      ...this.conversation$.value,
      { data: { data: message }, type: 'user' },
    ]);

    this.loading$.next(true);

    this._questionRepo
      .postQuestion(this.sessionId$.value, { data: message })
      .subscribe({
        next: (response) => {
          this.loading$.next(false);
          this.conversation$.next([
            ...this.conversation$.value,
            { data: response, type: 'chat' },
          ]);
        },
      });
  }
}
