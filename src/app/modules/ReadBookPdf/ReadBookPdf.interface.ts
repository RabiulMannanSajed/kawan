import { Types } from 'mongoose';

export type TReadBookPdf = {
  userEmail: Types.ObjectId;
  ebookId: Types.ObjectId;
  favorite?: boolean;
  isDelete?: boolean;
  readData?: string;
};
