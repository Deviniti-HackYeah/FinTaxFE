import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-reminder-box',
  templateUrl: './reminder-box.component.html',
  styleUrl: './reminder-box.component.scss',
})
export class ReminderBoxComponent {
  public readonly hasBeenConfirmed = signal<boolean>(false);
  public readonly confirmed = output<void>();

  public onConfirm(): void {
    this.hasBeenConfirmed.set(true);
    this.confirmed.emit();
  }
}
