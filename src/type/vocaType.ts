import { UploadFile } from 'antd/es/upload/interface';

export interface VocaListResponseJson {
  totalCount: number;
  list: VocaModel[];
  lastVisible: any;
}

export interface VocaResponseJson {
  id: number;
  koreanTitle: string;
  englishTitle: string;
  koreanCategory: string;
  englishCategory: string;
  content: string;
  thumbnailPath: string;
  thumbnailName: string;
  sourceName: string;
  sourceLink: string;
  thumbnailSourceName: string;
  thumbnailSourceLink: string;
  helpful: number;
  isUse: false;
  bookmarkCount: number;
  createdDate: string;
  modifiedDate: string;
  quizId: number | string | null;
  quizTitle: number | string | null;
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
  thumbnailPath: string;
  thumbnailName: string;
  thumbnailSourceName: string;
  thumbnailSourceLink: string;
  isUse: false;
  image: UploadFile[];
  createdDate: string;
  quizId: number | string;
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
  thumbnailPath: string;
  thumbnailName: string;
  thumbnailSourceName: string;
  thumbnailSourceLink: string;
  isUse: false;
  image: UploadFile[];
  createdDate: string;
  quizId?: number | string;
}
