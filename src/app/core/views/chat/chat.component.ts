import {
  DestroyRef,
  ElementRef,
  Component,
  viewChild,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { debounceTime, switchMap, interval, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '@core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  host: { class: 'flex flex-col h-full w-full' },
})
export class ChatComponent implements OnInit {
  private readonly _container = viewChild<ElementRef<HTMLElement>>('container');
  private readonly _chatService = inject(ChatService);
  private readonly _destroyRef = inject(DestroyRef);

  public readonly conversation$ = this._chatService.conversation$;
  public readonly loading$ = this._chatService.loading$;
  public readonly viewBlocked = signal<boolean>(false);

  public onSubmit(value: string): void {
    this._chatService.askQuestion(value);
  }

  public ngOnInit(): void {
    this._subscribeOnUserInactive();
    this._scrollAfterRender();
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

  private _scrollAfterRender(): void {
    this.conversation$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap(() =>
          interval(500).pipe(
            take(5),
            tap(() => {
              if (this._container()) {
                this._container()!.nativeElement.scrollTop =
                  this._container()!.nativeElement.scrollHeight;
              }
            }),
          ),
        ),
      )
      .subscribe();
  }
}
