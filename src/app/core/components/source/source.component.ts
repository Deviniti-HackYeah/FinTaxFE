import { QuestionExtrasSource } from '@shared/models';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrl: './source.component.scss',
  host: { class: 'block mt-4 mb-2' },
})
export class SourceComponent {
  public readonly data = input.required<QuestionExtrasSource>();
}
