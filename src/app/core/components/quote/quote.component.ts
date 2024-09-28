import { QuestionExtrasQuote } from '@shared/models';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  host: { class: 'block mt-4 mb-2' },
})
export class QuoteComponent {
  public readonly data = input.required<QuestionExtrasQuote>();
}
