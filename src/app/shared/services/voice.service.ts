import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let webkitSpeechRecognition: any;

@Injectable({ providedIn: 'root' })
export class VoiceService {
  public recognition: typeof webkitSpeechRecognition;
  public transcript$: Subject<string> = new Subject<string>();

  public startListening(): void {
    if (!this.recognition) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: {
        results: (typeof webkitSpeechRecognition)[][];
      }): void => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        this.transcript$.next(transcript);
      };

      this.recognition.onerror = (event: { error: string }): void => {
        console.error('Voice error', event.error);
      };
    }

    this.recognition.start();
  }

  public stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
