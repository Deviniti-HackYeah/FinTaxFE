import { LucideAngularModule, icons } from 'lucide-angular';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { ApiModule } from '@api/api.module';
import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const GLOBAL_MODULES = [LucideAngularModule.pick(icons)];

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...GLOBAL_MODULES,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    ApiModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
