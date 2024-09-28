import { Component, input } from '@angular/core';
import { ChatResponse } from '@core/models';

@Component({
  selector: 'app-bot-response',
  templateUrl: './bot-response.component.html',
  styleUrl: './bot-response.component.scss',
})
export class BotResponseComponent {
  public readonly message = input.required<ChatResponse>();
}
