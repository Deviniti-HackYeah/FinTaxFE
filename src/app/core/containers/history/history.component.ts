import { HistoryService } from '@core/services/history.service';
import { Component, inject } from '@angular/core';

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

  public readonly history$ = this._historyService.history;

  public removeHistory(sessionId: string): void {
    this._historyService.removeItem(sessionId);
  }
}
