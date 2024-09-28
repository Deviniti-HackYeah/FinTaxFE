import { DestroyRef, Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '@core/services';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  host: { class: 'flex flex-col h-full w-full' },
})
export class ChatComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _chatService = inject(ChatService);

  public readonly conversation$ = this._chatService.conversation$;
  public readonly loading$ = this._chatService.loading$;
  public readonly viewBlocked = signal<boolean>(false);

  public onSubmit(value: string): void {
    this._chatService.askQuestion(value);
  }

  public ngOnInit(): void {
    this._subscribeOnUserInactive();
  }

  private _subscribeOnUserInactive(): void {
    this.conversation$
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(30_000))
      .subscribe(() => {
        if (!this.viewBlocked()) {
          this._chatService.conversationReminder();
          this.viewBlocked.set(true);
        }
      });
  }
}
