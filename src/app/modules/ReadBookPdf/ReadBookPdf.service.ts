import { EBook } from '../EBook/EBook.model';
import { TReadBookPdf } from './ReadBookPdf.interface';
import { ReadBookPdf } from './ReadBookPdf.model';

const createReadBookPdfIntoDB = async (payload: TReadBookPdf) => {
  const result = await ReadBookPdf.create(payload);

  console.log(payload);
  console.log(payload.ebookId);

  try {
    //  Fetch the EBook document
    const ebook = await EBook.findById(payload.ebookId);

    if (!ebook || !ebook.book || !Array.isArray(ebook.book)) {
      throw new Error('EBook not found or invalid book field.');
    }
    if (!ebook || !ebook.audio || !Array.isArray(ebook.audio)) {
      throw new Error('EBook not found or invalid audio field.');
    }

    //  Transform the book array to include `finish: false`
    const bookArray = ebook.book.map((pdfUrl) => ({
      pdfUrl,
      finish: false,
    }));
    //  Transform the book array to include `finish: false`
    const audioArray = ebook.audio.map((audioUrl) => ({
      audioUrl,
      finish: false,
    }));

    //  Create the readBook document
    const readBookData = {
      userId: payload.userId,
      ebookId: payload.ebookId,
      book: bookArray,
      audio: audioArray,
      title: ebook.title,
      cover: ebook.cover,
      author: ebook.author,
      rating: ebook.rating,
      category: ebook.category,
    };

    const newReadBook = await ReadBookPdf.create(readBookData);

    // console.log('ReadBook document created:', newReadBook);
    return newReadBook;
    // return null;
  } catch (error) {
    console.error('Error creating ReadBook document:', error);
    throw error;
  }
};

const getAllUserFromDB = async () => {
  const result = await ReadBookPdf.find();
  return result;
};

const getSingleReadBookPdf = async () => {};

export const ReadBookPdfService = {
  createReadBookPdfIntoDB,
  getAllUserFromDB,
};
