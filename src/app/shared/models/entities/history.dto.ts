import { QuestionResponseDto, QuestionRequestDto } from './question.dto';

export type HistoryResponseDto = (QuestionResponseDto | QuestionRequestDto)[];
