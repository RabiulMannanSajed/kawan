import { finished } from 'stream';
import { EBook } from '../EBook/EBook.model';
import { TReadBookPdf } from './ReadBookPdf.interface';
import { ReadBookPdf } from './ReadBookPdf.model';

const createReadBookPdfIntoDB = async (payload: TReadBookPdf) => {
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

const getAllReadBookPdfFromDB = async () => {
  try {
    const result = await ReadBookPdf.find();
    return result;
  } catch (error) {
    console.error('Error fetching chats from the database:', error);
    throw error;
  }
};

const getSingleReadBookPdf = async (id: string) => {
  const result = await ReadBookPdf.findById(id);
  return result;
};

//  to make the book favorite
const updateFavoriteReadBookPdf = async (id: string) => {
  const result = await ReadBookPdf.findByIdAndUpdate(
    id,
    { favorite: true },
    { new: true },
  );
  return result;
};

const deleteReadBookPdf = async (id: string) => {
  const result = await ReadBookPdf.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true },
  );
  return result;
};

export const ReadBookPdfService = {
  getAllReadBookPdfFromDB,
  deleteReadBookPdf,
  getSingleReadBookPdf,
  createReadBookPdfIntoDB,
  updateFavoriteReadBookPdf,
};
