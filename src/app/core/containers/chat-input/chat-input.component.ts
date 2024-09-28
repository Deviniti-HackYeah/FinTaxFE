import {
  DestroyRef,
  Component,
  effect,
  output,
  signal,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VoiceService } from '@shared/services';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent implements OnInit {
  private readonly _voiceService = inject(VoiceService);
  private readonly _destroyRef = inject(DestroyRef);

  public readonly submitted = output<string>();
  public readonly disabled = input<boolean>();

  public isListening = signal<boolean>(false);

  public readonly form = new FormGroup({
    input: new FormControl<string | null>(null, Validators.required),
  });

  public readonly disabledEffect = effect(() => {
    if (this.disabled()) this.form.disable();
    else this.form.enable();
  });

  public ngOnInit(): void {
    this._voiceService.transcript$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((transcript) => this.form.get('input')!.setValue(transcript));
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.get('input')!.value!);
      this.form.reset();
    }
  }

  public switchListening(): void {
    this.isListening.update((listening) => {
      if (listening) this._voiceService.stopListening();
      else this._voiceService.startListening();
      return !listening;
    });
  }
}
