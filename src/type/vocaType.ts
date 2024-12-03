import { UploadFile } from 'antd/es/upload/interface';
import { Dayjs } from 'dayjs';

export interface VocaListResponseJson {
  totalCount: number;
  list: VocaModel[];
  lastVisible: any;
}

export interface VocaRequestJson {
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  image: UploadFile[];
  sourceName: string;
  sourceLink: string;
  isUse: false;
  quizId: string | null;
}

export interface VocaResponseJson {
  id: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  imagePath: string;
  imageName: string;
  sourceName: string;
  sourceLink: string;
  isUse: false;
  createdDate: string;
  quizId: string | null;
}

export interface VocaResponseJson {
  id: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  imagePath: string;
  imageName: string;
  sourceName: string;
  sourceLink: string;
  isUse: false;
  createdDate: string;
  quizId: string | null;
}

export interface VocaModel extends VocaResponseJson {}

export interface CreateVocaRequestJson {
  vocaId: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  sourceName: string;
  sourceLink: string;
  imagePath: string;
  imageName: string;
  isUse: false;
  image: UploadFile[];
  createdDate: string;
  quizId: string | null;
}

export interface UpdateVocaRequestJson {
  vocaId?: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  sourceName: string;
  sourceLink: string;
  imagePath: string;
  imageName: string;
  isUse: false;
  image: string;
  createdDate: Dayjs;
  quizId: string | null;
}

export interface VocaFormValue {
  vocaId?: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  sourceName: string;
  sourceLink: string;
  imagePath: string;
  imageName: string;
  isUse: false;
  image: UploadFile[];
  quizId: string | null;
}
