import { Types } from 'mongoose';

export type TReadBookPdf = {
  userId: Types.ObjectId;
  ebookId: Types.ObjectId;

  title: string;
  cover: string;
  author: string;
  rating: number;
  category: string;

  book?: Array<{
    pdfUrl: string;
    finish: boolean;
  }>;
  audio?: Array<{
    audioUrl: string;
    finish: boolean;
  }>;
  favorite?: boolean;
  isDelete?: boolean;
  readData?: string;
};
