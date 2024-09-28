import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, effect, output, input } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  public readonly submitted = output<string>();
  public readonly disabled = input<boolean>();

  public readonly form = new FormGroup({
    input: new FormControl<string | null>(null, Validators.required),
  });

  public readonly disabledEffect = effect(() => {
    if (this.disabled()) this.form.disable();
    else this.form.enable();
  });

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.get('input')!.value!);
      this.form.reset();
    }
  }
}
