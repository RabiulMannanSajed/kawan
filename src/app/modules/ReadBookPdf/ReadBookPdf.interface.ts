import { Types } from 'mongoose';

export type TReadBookPdf = {
  userId: Types.ObjectId; // those value come form Frontend
  ebookId: Types.ObjectId; // those value come form Frontend

  // backend will work
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
