import { UploadFile } from 'antd';
import { Dayjs } from 'dayjs';

export interface BannerRequestJson {
  image: UploadFile[];
  type: 'VOCA' | 'QUIZ';
  title: string;
  buttonName: string;
  moveQuizId: number | null;
  moveVocaId: number | null;
  exposureStartDate: Dayjs;
  exposureEndDate: Dayjs;
  createdDate: string;
  isUse: boolean;
}

export interface BannerResponseJson {
  id: number;
  type: 'VOCA' | 'QUIZ';
  title: string;
  imagePath: string;
  imageName: string;
  buttonName: string;
  moveQuizId: number | null;
  moveVocaId: number | null;
  exposureStartDate: string;
  exposureEndDate: string;
  createdDate: string;
  modifiedDate: string;
  isUse: boolean;
}

export interface BannerFormValue {
  createdDate: string;
  exposureDuration: Dayjs[];
  type: 'VOCA' | 'QUIZ';
  title: string;
  image: UploadFile[];
  buttonName: string;
  moveQuizId: number | null;
  moveVocaId: number | null;
  isUse: boolean;
}
