import { HistoryRepository } from '@api/history/history.repository';
import { QuestionRepository } from '@api/repositories';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable, inject } from '@angular/core';
import { Conversation } from '@core/models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { HistoryService } from './history.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  public readonly conversation$ = new BehaviorSubject<Conversation[]>([]);
  public readonly sessionId$ = new BehaviorSubject<string | null>(null);
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  private readonly _translocoService = inject(TranslocoService);
  private readonly _questionRepo = inject(QuestionRepository);
  private readonly _historyRepo = inject(HistoryRepository);
  private readonly _historyService = inject(HistoryService);
  private readonly _router = inject(Router);

  public startOver(message: string): void {
    this.conversation$.next([]);
    this.sessionId$.next(crypto.randomUUID());
    this._router.navigate(['/chat', this.sessionId$.value]);
    this._historyService.addHistory({
      key: this.sessionId$.value!,
      name: message,
    });
    this.askQuestion(message);
  }

  public openFromHistory(key: string): void {
    this.sessionId$.next(key);
    this._router.navigate(['/chat', key]);
    this._historyRepo.getHistory(key).subscribe({
      next: (response) => {
        const conversation = response.map((item) => ({
          type: 'response_id' in item ? 'chat' : 'user',
          data: item,
        })) as Conversation[];
        this.conversation$.next(conversation);
      },
    });
  }

  public conversationReminder(): void {
    this.conversation$.next([
      ...this.conversation$.value,
      { type: 'reminder' },
    ]);
  }

  public askQuestion(message: string): void {
    if (!this.sessionId$.value) {
      return;
    }

    this.conversation$.next([
      ...this.conversation$.value,
      {
        data: { data: message, lang: this._translocoService.getActiveLang() },
        type: 'user',
      },
    ]);

    this.loading$.next(true);

    this._questionRepo
      .postQuestion(this.sessionId$.value, {
        lang: this._translocoService.getActiveLang(),
        data: message,
      })
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
