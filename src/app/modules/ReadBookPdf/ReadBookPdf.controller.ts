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

const getSingleReadBookPdf = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReadBookPdfService.getSingleReadBookPdf(id);
  res.status(200).json({
    success: true,
    message: 'All books are getS  successfully',
    data: result,
  });
});

const favoriteReadBookPdf = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReadBookPdfService.updateFavoriteReadBookPdf(id);
  res.status(200).json({
    success: true,
    message: 'Favorite make successfully',
    data: result,
  });
});

//  this is will work as soft delete
const deleteReadBookPdf = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ReadBookPdfService.deleteReadBookPdf(id);
  res.status(200).json({
    success: true,
    message: 'All books are get successfully',
    data: result,
  });
});

export const ReadBookPdfController = {
  getSingleReadBookPdf,
  favoriteReadBookPdf,
  createReadBookPdf,
  deleteReadBookPdf,
  getAllReadBook,
};
