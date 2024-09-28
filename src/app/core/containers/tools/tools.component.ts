import { Component, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
  host: { class: 'flex gap-4 justify-end h-20' },
})
export class ToolsComponent {
  private readonly _translocoService = inject(TranslocoService);

  public readonly extrasOpen = signal<boolean>(false);

  public setLanguage(language: string): void {
    localStorage.setItem('lang', language);
    this._translocoService.setActiveLang(language);
  }
}
