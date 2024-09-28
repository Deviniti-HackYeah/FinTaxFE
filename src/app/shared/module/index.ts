import { AtomsModule } from '@shared/atoms/atoms.module';
import { TypewriteDirective } from '@shared/directives';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';

export const SHARED_MODULES = [CommonModule, AtomsModule, TranslocoModule];

export const SHARED_DIRECTIVES = [TypewriteDirective];

export const SHARED_PIPES = [];

export const SHARED_PROVIDERS = [];
