import { HistoryRepository } from '@api/history/history.repository';
import { QuestionRepository } from '@api/repositories';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable, inject } from '@angular/core';
import { ChatResponse, Conversation } from '@core/models';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { HistoryService } from './history.service';

const responses: ChatResponse[] = [
  {
    type: 'chat',
    data: {
      response_id: '1',
      response: {
        agent_1:
          'Twoje zapytanie nie dotyczy wniosku PCC-3.\nNie musisz płacić podatku, ponieważ pożyczka od bliskiej rodziny (w tym od mamy) do kwoty 36 120 zł jest zwolniona z podatku.',
        agent_2: '',
      },
    },
  },
  {
    type: 'chat',
    data: {
      response_id: '2',
      response: {
        agent_1:
          'Twoje zapytanie dotyczy wniosku PCC-3.\nZakup samochodu o wartości 3000 zł wymaga złożenia deklaracji PCC-3, ponieważ wartość rynkowa przekracza 1000 zł, a nie ma zastosowania żadne z wymienionych zwolnień.',
        agent_2:
          'Dołączam dokument który pokazuje wniosek PCC-3, czy chcesz go wypełnić?',
      },
      extras: [
        {
          type: 'document',
          payload: {
            title: 'Wniosek PCC-3',
            url: 'https://www.podatki.gov.pl/media/4135/pcc-3-05-012.pdf',
          },
        },
      ],
    },
  },
  {
    type: 'chat',
    data: {
      response_id: '3',
      response: {
        agent_1: 'Jaki jest adres zamieszkania?',
        agent_2: '',
      },
    },
  },
  {
    type: 'chat',
    data: {
      response_id: '4',
      response: {
        agent_1: 'Podaj swój numer PESEL oraz imię i nazwisko',
        agent_2: '',
      },
    },
  },
  {
    type: 'chat',
    data: {
      response_id: '5',
      response: {
        agent_1:
          'Dziękuję. Na podstawie podanych przez ciebie informacji, wypełniłem wniosek PCC-3. Sprawdź czy wszystkie dane są poprawne.',
        agent_2:
          'Oto twój wypełniony wniosek. Pamiętaj o zapoznaniu się z pouczeniem.',
      },
      extras: [
        {
          type: 'quote',
          payload: {
            text: 'Pouczenie:\n\nZa podanie nieprawdy lub zatajenie prawdy i przez to narażenie podatku na uszczuplenie grozi odpowiedzialność przewidziana w Kodeksie karnym skarbowym.\nW przypadku niezapłacenia w obowiązującym terminie kwoty podatku od czynności cywilnoprawnych z poz. 53 lub wpłacenia jej w niepełnej wysokości, niniejsza deklaracja stanowi podstawę do wystawienia tytułu wykonawczego, zgodnie z przepisami ustawy z dnia 17 czerwca 1966 r. o postępowaniu egzekucyjnym w administracji (Dz. U. z 2023 r. poz. 2505).',
          },
        },
        {
          type: 'document',
          payload: {
            title: 'Wypełniony wniosek PCC-3',
            url: 'https://wildcard2.theliver.pl/xml',
          },
        },
      ],
    },
  },
];

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

    const questionIndex = Math.floor(this.conversation$.value.length / 2);

    setTimeout(() => {
      this.loading$.next(false);
      this.conversation$.next([
        ...this.conversation$.value,
        responses[questionIndex],
      ]);
    }, 1000);
  }
}
