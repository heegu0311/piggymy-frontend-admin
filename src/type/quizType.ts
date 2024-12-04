import { Dayjs } from 'dayjs';

export interface QuizListResponseJson {
  totalCount: number;
  list: QuizModel[];
}

export interface QuizRequestJson {
  title: string;
  vocaId?: number;
  answer?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  isUse: boolean;
}

export interface QuizResponseJson {
  id: number;
  title: string;
  vocaId?: number;
  answer?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  isUse: boolean;
  quizHistoryCount?: number;
  bookmarkCount?: number;
  hit?: number;
  bookmark?: boolean;
  createdDate?: string;
  modifiedDate?: string;
}

export interface QuizModel extends QuizResponseJson {}

export interface CreateQuizRequestJson {
  vocaId?: number;
  title: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isUse: boolean;
}

export interface UpdateQuizRequestJson {
  vocaId?: number;
  title: string;
  answer?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  isUse: boolean;
  quizHistoryCount?: number;
  bookmarkCount?: number;
  createdDate: Dayjs;
  modifiedDate?: string;
  hit?: number;
  bookmark?: boolean;
}

export interface QuizFormValue {
  vocaId?: number;
  title: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isUse: boolean;
  quizHistoryCount?: number;
  bookmarkCount?: number;
  createdDate: string;
  modifiedDate?: string;
  hit?: number;
  bookmark?: boolean;
}
