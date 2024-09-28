import {
  ChangeDetectionStrategy,
  HostBinding,
  Component,
  input,
} from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

export type Icon = keyof typeof icons;

/**
 * Allows rendering Lucide icons.
 * icons: https://lucide.dev/icons/
 */
@Component({
  template: `
    <lucide-angular
      [name]="name() || nameUntyped()"
      [strokeWidth]="strokeWidth()"
      [class]="classNames"
      [size]="size()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  selector: 'app-icon',
  standalone: true,
})
export class IconComponent {
  public readonly name = input<Icon>();

  public readonly nameUntyped = input<string>();

  public readonly size = input<string | number>(15);

  public readonly strokeWidth = input<string | number>(3);

  public readonly classes = input<ClassValue | ClassArray>([], {
    alias: 'class',
  });

  @HostBinding('class') public get classNames(): string {
    return combine('inline-flex', this.classes());
  }
}
