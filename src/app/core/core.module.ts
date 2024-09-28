import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import {
  ReminderBoxComponent,
  DocumentComponent,
  SourceComponent,
  QuoteComponent,
} from './components';
import {
  ChatInputComponent,
  HistoryComponent,
  ToolsComponent,
} from './containers';
import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { CoreRoutingModule } from './core-routing.module';

const COMPONENTS = [
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
