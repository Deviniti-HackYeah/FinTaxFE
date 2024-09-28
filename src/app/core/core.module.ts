import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import {
  BotResponseComponent,
  ChatInputComponent,
  HistoryComponent,
  ToolsComponent,
} from './containers';
import {
  ReminderBoxComponent,
  DocumentComponent,
  SourceComponent,
  QuoteComponent,
} from './components';
import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { CoreRoutingModule } from './core-routing.module';

const COMPONENTS = [
  BotResponseComponent,
  ReminderBoxComponent,
  ChatInputComponent,
  DocumentComponent,
  HistoryComponent,
  WelcomeComponent,
  SourceComponent,
  QuoteComponent,
  ToolsComponent,
  HomeComponent,
  ChatComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CoreRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CoreModule {}
