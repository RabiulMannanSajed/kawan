import { model, Schema } from 'mongoose';
import { TEBook } from './EBook.interface';

const EBookSchema = new Schema<TEBook>({
  title: {
    type: String,
    required: [true, 'Book title is required'],
  },
  cover: {
    type: String,
    required: [true, 'Book Cover is required'],
  },
  author: {
    type: String,
    required: [true, 'Book author is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Book Rating is required in Number'],
  },
  category: {
    type: String,
    required: [true, 'Book category is required'],
  },
  quickSummery: {
    type: String,
    required: [true, 'Book quick summery is required'],
  },
  aboutAuthor: {
    type: String,
    required: [true, 'Book About Author is required'],
  },

  publishDate: {
    type: String,
    required: [true, 'Book publishDate is required'],
  },
  language: {
    type: String,
    required: [true, 'Book language type is required'],
  },
  audio: {
    type: [String],
  },
  book: {
    type: [String],
  },
});

export const EBook = model<TEBook>('ebook', EBookSchema);
