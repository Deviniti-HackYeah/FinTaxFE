import { Component, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ChatService } from '@core/services';
import { map } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
  host: { class: 'flex gap-4 justify-end h-20' },
})
export class ToolsComponent {
  private readonly _translocoService = inject(TranslocoService);
  private readonly _chatService = inject(ChatService);

  public readonly extras$ = this._chatService.conversation$.pipe(
    map((conversation) =>
      conversation
        .filter((item) => item.type === 'chat')
        .map(
          (item) =>
            item.data.extras?.map((extra) => ({
              id: item.data.response_id,
              ...extra,
            })) ?? [],
        )
        .filter((extras) => !!extras)
        .flat(),
    ),
  );

  public readonly extrasOpen = signal<boolean>(false);

  public setLanguage(language: string): void {
    localStorage.setItem('lang', language);
    this._translocoService.setActiveLang(language);
  }

  public scrollTo(id: string): void {
    const container = document.getElementById('chat-container');
    const element = document.getElementById(id);
    if (container && element) {
      container.scrollTo({
        top: element.offsetTop - container.offsetTop,
        behavior: 'smooth',
      });
    }
  }
}
