import { booleanAttribute, Directive, computed, input } from '@angular/core';
import { VariantProps, cva } from 'class-variance-authority';
import { ClassArray, ClassValue } from 'clsx';
import { combine } from '@shared/utils';

const buttonVariants = cva(`daisy-btn`, {
  variants: {
    mode: {
      primary: `daisy-btn-primary`,
      secondary: `daisy-btn-secondary`,
      accent: `daisy-btn-accent`,
      ghost: `daisy-btn-ghost`,
      link: `daisy-btn-link`,
    },
    severity: {
      none: ``,
      neutral: `daisy-btn-neutral`,
      success: `daisy-btn-success`,
      warning: `daisy-btn-warning`,
      danger: `daisy-btn-error`,
      info: `daisy-btn-info`,
    },
    size: {
      large: `daisy-btn-lg`,
      base: `daisy-btn-md`,
      small: `daisy-btn-sm`,
      tiny: `daisy-btn-xs`,
    },
    outline: {
      true: `daisy-btn-outline`,
    },
    disabled: {
      true: `daisy-btn-disabled`,
    },
    icon: {
      true: `daisy-btn-square`,
    },
    active: {
      true: `daisy-btn-active`,
    },
    glass: {
      true: `daisy-glass`,
    },
  },
  defaultVariants: {
    mode: 'primary',
    severity: 'none',
    size: 'base',
    outline: false,
    disabled: false,
    glass: false,
    active: false,
    icon: false,
  },
});

export type ButtonVariant = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[appButton], a[appButton]',
  host: { '[class]': '_generated()' },
  standalone: true,
})
export class ButtonDirective {
  public readonly mode = input<ButtonVariant['mode']>();

  public readonly severity = input<ButtonVariant['severity']>();

  public readonly size = input<ButtonVariant['size']>();

  public readonly outline = input<ButtonVariant['outline'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly disabled = input<ButtonVariant['disabled'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly icon = input<ButtonVariant['icon'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly active = input<ButtonVariant['active'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly glass = input<ButtonVariant['glass'], string>(false, {
    transform: booleanAttribute,
  });

  public readonly classes = input<ClassValue | ClassArray>([], {
    alias: 'class',
  });

  protected readonly _generated = computed(() =>
    combine(
      buttonVariants({
        mode: this.mode(),
        severity: this.severity(),
        size: this.size(),
        outline: this.outline(),
        disabled: this.disabled(),
        icon: this.icon(),
        active: this.active(),
        glass: this.glass(),
      }),
      this.classes(),
    ),
  );
}
