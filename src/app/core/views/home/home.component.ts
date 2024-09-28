import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { PingRepository } from '@api/index';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4 h-screen' },
})
export class HomeComponent implements OnInit {
  private readonly _pingRepo = inject(PingRepository);

  public ngOnInit(): void {
    this._pingRepo.ping().subscribe({
      next: (response) => console.info(response),
      error: (error) => console.error(error),
    });
  }
}
