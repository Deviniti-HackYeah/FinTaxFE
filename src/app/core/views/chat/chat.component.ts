import { DestroyRef, Component, inject } from '@angular/core';
import { ChatService } from '@core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  host: { class: 'flex flex-col h-full w-full' },
})
export class ChatComponent {
  private readonly _destroyRequest = inject(DestroyRef);
  private readonly _chatService = inject(ChatService);

  public readonly conversation$ = this._chatService.conversation$;
  public readonly loading$ = this._chatService.loading$;

  public onSubmit(value: string): void {
    this._chatService.askQuestion(value);
  }
}
