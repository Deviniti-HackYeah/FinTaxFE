import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { NgModule } from '@angular/core';

import { QuestionRepository } from './question/question.repository';
import { HistoryRepository } from './history/history.repository';
import { PingRepository } from './ping/ping.repository';

const REPOSITORIES = [QuestionRepository, HistoryRepository, PingRepository];

@NgModule({
  providers: [provideAngularQuery(new QueryClient()), ...REPOSITORIES],
})
export class ApiModule {}
