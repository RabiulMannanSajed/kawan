import { TReadBookPdf } from './ReadBookPdf.interface';
import { ReadBookPdf } from './ReadBookPdf.model';

const createReadBookPdfIntoDB = async (payload: TReadBookPdf) => {
  const result = await ReadBookPdf.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await ReadBookPdf.find().populate('user');
  return result;
};
export const ReadBookPdfService = {
  createReadBookPdfIntoDB,
  getAllUserFromDB,
};
