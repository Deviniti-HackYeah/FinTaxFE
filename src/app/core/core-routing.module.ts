import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { inject, NgModule } from '@angular/core';

import { WelcomeComponent, ChatComponent, HomeComponent } from './views';
import { ChatService } from './services';

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
        path: 'chat/:sessionId',
        component: ChatComponent,
        resolve: {
          data: (route: ActivatedRouteSnapshot): void => {
            const service = inject(ChatService);
            service.sessionId$.next(route.params['sessionId']);
          },
        },
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
