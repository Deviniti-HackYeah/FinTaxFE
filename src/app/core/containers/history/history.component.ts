import { HistoryService } from '@core/services/history.service';
import { Component, inject } from '@angular/core';
import { ChatService } from '@core/services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
  host: {
    class: 'size-full bg-lighter p-4 pl-6 flex flex-col overflow-hidden',
  },
})
export class HistoryComponent {
  private readonly _historyService = inject(HistoryService);
  private readonly _chatService = inject(ChatService);

  public readonly history$ = this._historyService.history;

  public removeHistory(sessionId: string): void {
    this._historyService.removeItem(sessionId);
  }

  public goToChat(sessionId: string): void {
    this._chatService.openFromHistory(sessionId);
  }
}
