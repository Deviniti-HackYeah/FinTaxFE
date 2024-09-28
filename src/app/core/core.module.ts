import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { HistoryComponent, ToolsComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';
import { ChatInputComponent } from './components';

const COMPONENTS = [
  ChatInputComponent,
  HistoryComponent,
  WelcomeComponent,
  ToolsComponent,
  HomeComponent,
  ChatComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CoreRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CoreModule {}
