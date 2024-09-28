import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { CoreRoutingModule } from './core-routing.module';
import { HistoryComponent } from './containers';

const COMPONENTS = [HomeComponent];

@NgModule({
  declarations: [
    ...COMPONENTS,
    HistoryComponent,
    WelcomeComponent,
    ChatComponent,
  ],
  imports: [CoreRoutingModule, SharedModule],
})
export class CoreModule {}
