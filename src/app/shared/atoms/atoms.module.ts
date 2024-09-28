import { NgModule } from '@angular/core';

import { ChatBubbleImports } from './chat-bubble';
import { ControlImports } from './control';
import { LoadingImports } from './loading';
import { ButtonImports } from './button';
import { IconImports } from './icon';

const ATOMS = [
  ChatBubbleImports,
  ChatBubbleImports,
  ControlImports,
  LoadingImports,
  ButtonImports,
  IconImports,
];

@NgModule({ imports: ATOMS, exports: ATOMS })
export class AtomsModule {}
