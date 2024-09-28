import { FormControl, Validators } from '@angular/forms';
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

  public readonly inputControl = new FormControl<string | null>(
    null,
    Validators.required,
  );

  public onSubmit(): void {
    this._chatService.startOver(this.inputControl.value!);
  }
}
