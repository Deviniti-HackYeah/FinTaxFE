import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChatComponent, HomeComponent, WelcomeComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: ':sessionId',
        component: ChatComponent,
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class CoreRoutingModule {}
