import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { NgModule } from '@angular/core';

import { QuestionRepository } from './question/question.repository';
import { PingRepository } from './ping/ping.repository';

const REPOSITORIES = [QuestionRepository, PingRepository];

@NgModule({
  providers: [provideAngularQuery(new QueryClient()), ...REPOSITORIES],
})
export class ApiModule {}
