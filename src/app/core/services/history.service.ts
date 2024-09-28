import { Injectable } from '@angular/core';
import { HistoryItem } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  public readonly history = new BehaviorSubject<HistoryItem[]>(
    this.getHistory(),
  );

  public getHistory(): HistoryItem[] {
    const rawHistory = localStorage.getItem('history');
    if (!rawHistory) return [];
    return JSON.parse(rawHistory);
  }

  public addHistory(item: HistoryItem): void {
    const history = this.getHistory();
    this.history.next([...history, item]);
    localStorage.setItem('history', JSON.stringify(this.history.value));
  }

  public removeItem(sessionId: string): void {
    const history = this.getHistory();
    const updatedHistory = history.filter((item) => item.key !== sessionId);
    this.history.next(updatedHistory);
    localStorage.setItem('history', JSON.stringify(updatedHistory));
  }
}
