import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { ReminderBoxComponent, ChatInputComponent } from './components';
import { HistoryComponent, ToolsComponent } from './containers';
import { CoreRoutingModule } from './core-routing.module';

const COMPONENTS = [
  ReminderBoxComponent,
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
