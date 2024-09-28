import { QuestionResponseDto, QuestionRequestDto } from '@shared/models';

export interface ChatResponse {
  data: QuestionResponseDto;
  type: 'chat';
}
export interface UserResponse {
  data: QuestionRequestDto;
  type: 'user';
}

export interface Reminder {
  type: 'reminder';
}

export type Conversation = ChatResponse | UserResponse | Reminder;
