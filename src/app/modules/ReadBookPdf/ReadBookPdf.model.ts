import { model, Schema } from 'mongoose';
import { TReadBookPdf } from './ReadBookPdf.interface';

const ReadBooksPdfSchema = new Schema<TReadBookPdf>({
  userId: {
    type: Schema.Types.ObjectId,
  },
  ebookId: {
    type: Schema.Types.ObjectId,
  },

  title: {
    type: String,
  },
  cover: {
    type: String,
  },
  author: {
    type: String,
  },
  rating: {
    type: Number,
  },
  category: { type: String },

  favorite: {
    type: Boolean,
    default: false,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  book: [
    {
      pdfUrl: { type: String },
      finish: { type: Boolean, default: false },
    },
  ],
  audio: [
    {
      audioUrl: { type: String },
      finish: { type: Boolean, default: false },
    },
  ],
});
export const ReadBookPdf = model<TReadBookPdf>(
  'ReadBookPdf',
  ReadBooksPdfSchema,
);
