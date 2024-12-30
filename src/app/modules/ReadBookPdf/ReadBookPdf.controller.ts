import catchAsync from '../../utils/catchAcync';
import { ReadBookPdfService } from './ReadBookPdf.service';

const createReadBookPdf = catchAsync(async (req, res) => {
  const result = await ReadBookPdfService.createReadBookPdfIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Book marked  successfully',
    data: result,
  });
});

const getAllReadBook = catchAsync(async (req, res) => {
  const result = await ReadBookPdfService.getAllUserFromDB();
  res.status(200).json({
    success: true,
    message: 'All books are getS  successfully',
    data: result,
  });
});

export const ReadBookPdfController = {
  createReadBookPdf,
  getAllReadBook,
};
