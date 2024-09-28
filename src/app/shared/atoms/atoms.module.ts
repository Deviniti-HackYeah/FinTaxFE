import { NgModule } from '@angular/core';

import { ControlImports } from './control';
import { ButtonImports } from './button';
import { IconImports } from './icon';

const ATOMS = [IconImports, ButtonImports, ControlImports];

@NgModule({ imports: ATOMS, exports: ATOMS })
export class AtomsModule {}
