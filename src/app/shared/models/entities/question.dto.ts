export interface QuestionRequestDto {
  data: string;
}

export interface QuestionResponseDto {
  response: {
    agent_1: string;
    agent_2: string;
  };
  extras: (
    | QuestionExtrasDocument
    | QuestionExtrasSource
    | QuestionExtrasQuote
  )[];
}

// -------------------- QuestionExtras --------------------

export interface QuestionExtrasDocument {
  type: 'document';
  payload: {
    title: string;
    url: string;
  };
}

export interface QuestionExtrasSource {
  type: 'source';
  payload: {
    description: string;
    title: string;
    url: string;
  };
}

export interface QuestionExtrasQuote {
  type: 'quote';
  payload: {
    text: string;
  };
}
