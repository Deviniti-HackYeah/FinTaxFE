import { booleanAttribute, HostBinding, Directive, input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

const inputVariants = cva(
  `daisy-input flex w-full items-center gap-2 [&_input]:w-full [&_input]:grow`,
  {
    variants: {
      variant: {
        base: ``,
        bordered: `daisy-input-bordered`,
      },
      mode: {
        base: ``,
        primary: `daisy-input-primary`,
        secondary: `daisy-input-secondary`,
        accent: `daisy-input-accent`,
        ghost: `daisy-input-ghost`,
      },
      severity: {
        none: ``,
        success: `daisy-input-success`,
        warning: `daisy-input-warning`,
        danger: `daisy-input-error`,
        info: `daisy-input-info`,
      },
      size: {
        large: `daisy-input-lg`,
        base: `daisy-input-md`,
        small: `daisy-input-sm`,
        tiny: `daisy-input-xs`,
      },
      error: {
        auto: `[&.ng-invalid.ng-touched]:daisy-input-error`,
        native: `invalid:daisy-input-error`,
        false: ``,
      },
      disabled: {
        true: `daisy-input-disabled`,
      },
    },
    defaultVariants: {
      variant: 'bordered',
      mode: 'base',
      severity: 'none',
      size: 'base',
      error: 'auto',
      disabled: false,
    },
  },
);

export type InputVariant = VariantProps<typeof inputVariants>;

@Directive({
  selector: 'input[appInput], label[appInput]',
  standalone: true,
})
export class InputDirective {
  public readonly variant = input<InputVariant['variant']>();

  public readonly mode = input<InputVariant['mode']>();

  public readonly severity = input<InputVariant['severity']>();

  public readonly size = input<InputVariant['size']>();

  public readonly error = input<InputVariant['error']>();

  public readonly disabled = input<InputVariant['disabled'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly classes = input<ClassValue | ClassArray>([], {
    alias: 'class',
  });

  @HostBinding('class') public get classNames(): string {
    return combine(
      inputVariants({
        variant: this.variant(),
        mode: this.mode(),
        severity: this.severity(),
        size: this.size(),
        error: this.error(),
        disabled: this.disabled(),
      }),
      this.classes(),
    );
  }
}
