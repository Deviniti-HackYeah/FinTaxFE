import { DestroyRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '@core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  host: { class: 'flex flex-col h-full w-full' },
})
export class ChatComponent implements OnInit {
  private readonly _destroyRequest = inject(DestroyRef);
  private readonly _chatService = inject(ChatService);

  public readonly conversation$ = this._chatService.conversation$;
  public readonly loading$ = this._chatService.loading$;

  public readonly form = new FormGroup({
    input: new FormControl<string | null>(null, Validators.required),
  });

  public ngOnInit(): void {
    this.loading$
      .pipe(takeUntilDestroyed(this._destroyRequest))
      .subscribe((loading) => {
        if (loading) this.form.disable();
        else this.form.enable();
      });
  }

  public onSubmit(): void {
    this._chatService.askQuestion(this.form.get('input')!.value!);
    this.form.reset();
  }
}
