import { AtomsModule } from '@shared/atoms/atoms.module';
import { TypewriteDirective } from '@shared/directives';
import { TranslocoModule } from '@jsverse/transloco';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';

export const SHARED_MODULES = [
  TranslocoModule,
  CdkMenuModule,
  OverlayModule,
  CommonModule,
  AtomsModule,
];

export const SHARED_DIRECTIVES = [TypewriteDirective];

export const SHARED_PIPES = [];

export const SHARED_PROVIDERS = [];
