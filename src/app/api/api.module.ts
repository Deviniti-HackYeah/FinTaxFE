import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { NgModule } from '@angular/core';

import { QuestionRepository } from './question/question.repository';

const REPOSITORIES = [QuestionRepository];

@NgModule({
  providers: [provideAngularQuery(new QueryClient()), ...REPOSITORIES],
})
export class ApiModule {}
