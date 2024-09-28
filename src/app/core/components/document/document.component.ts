import { QuestionExtrasDocument } from '@shared/models';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  host: { class: 'block mt-4 mb-2' },
})
export class DocumentComponent {
  public readonly data = input.required<QuestionExtrasDocument>();
}
