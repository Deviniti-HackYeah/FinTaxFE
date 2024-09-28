export interface QuestionRequestDto {
  data: string;
}

export interface QuestionResponseDto {
  response: {
    agent_1: string;
    agent_2: string;
  };
  sources: QuestionSource[];
  extras:
    | QuestionExtrasDocument
    | QuestionExtrasImage
    | QuestionExtrasQuote
    | QuestionExtrasLink
    | null;
}

// -------------------- QuestionSource --------------------

export interface QuestionSource {
  description: string;
  title: string;
  url: string;
}

// -------------------- QuestionExtras --------------------

export interface QuestionExtrasDocument {
  type: 'document';
  payload: {
    title: string;
    url: string;
  };
}

export interface QuestionExtrasImage {
  type: 'image';
  payload: {
    url: string;
  };
}

export interface QuestionExtrasQuote {
  type: 'quote';
  payload: {
    text: string;
  };
}

export interface QuestionExtrasLink {
  type: 'link';
  payload: {
    title: string;
    url: string;
  };
}
