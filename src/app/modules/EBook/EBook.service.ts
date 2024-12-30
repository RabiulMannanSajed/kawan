import { EBook } from './EBook.model';

const createEBookIntoDB = async (payload: TEBook) => {
  const result = await EBook.create(payload);
  return result;
};
const getAllEBookFromDB = async () => {
  const result = await EBook.find();
  return result;
};
export const EBookService = {
  createEBookIntoDB,
  getAllEBookFromDB,
};
