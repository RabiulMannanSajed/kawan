import { model, Schema } from 'mongoose';
import { TReadBookPdf } from './ReadBookPdf.interface';

const ReadBooksPdfSchema = new Schema<TReadBookPdf>({
  userEmail: {
    // type: String,
    type: Schema.Types.ObjectId,
  },
  ebookId: {
    type: Schema.Types.ObjectId,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});
export const ReadBookPdf = model<TReadBookPdf>(
  'ReadBookPdf',
  ReadBooksPdfSchema,
);
