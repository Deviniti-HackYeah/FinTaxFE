import { TranslocoService } from '@jsverse/transloco';
import { Component, inject } from '@angular/core';
import { ChatService } from '@core/services';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  host: { class: 'flex flex-col h-full w-full' },
})
export class WelcomeComponent {
  private readonly _translocoService = inject(TranslocoService);
  private readonly _chatService = inject(ChatService);

  private readonly _actionKeys = new Array(6)
    .fill(null)
    .map((_, index) => `QUICK_ACTION_${index + 1}`);

  public readonly actions$ = of(this._actionKeys).pipe(
    switchMap((action) => this._translocoService.selectTranslate(action)),
  );

  public onSubmit(value: string): void {
    this._chatService.startOver(value);
  }

  public onAction(action: string): void {
    this._chatService.startOver(action);
  }
}
