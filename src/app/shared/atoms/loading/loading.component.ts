import { VariantProps, cva } from 'class-variance-authority';
import { Component, computed, input } from '@angular/core';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

const loadingVariants = cva(`daisy-loading daisy-loading-dots`, {
  variants: {
    size: {
      large: `daisy-loading-lg`,
      base: `daisy-loading-md`,
      small: `daisy-loading-sm`,
      tiny: `daisy-loading-xs`,
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export type LoadingVariant = VariantProps<typeof loadingVariants>;

@Component({
  template: '<span [class]="generated()"></span>',
  selector: 'app-loading',
  standalone: true,
})
export class LoadingComponent {
  public readonly size = input<LoadingVariant['size']>();

  public readonly classes = input<ClassValue | ClassArray>([], {
    alias: 'class',
  });

  public readonly generated = computed(() =>
    combine(
      loadingVariants({
        size: this.size(),
      }),
      this.classes(),
    ),
  );
}
