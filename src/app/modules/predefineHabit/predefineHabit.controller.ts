import catchAsync from '../../utils/catchAcync';
import { PredefineHabitService } from './predefineHabit.service';

const createPredefineHabit = catchAsync(async (req, res) => {
  const result = await PredefineHabitService.createPredefineHabitIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'PredefineHabit is created successfully',
    data: result,
  });
});
const getPredefineHabit = catchAsync(async (req, res) => {
  const result = await PredefineHabitService.getPredefineHabitFromDB();
  res.status(200).json({
    success: true,
    message: 'PredefineHabit all data get successfully',
    data: result,
  });
});
const getSinglePredefineHabit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PredefineHabitService.getSinglePredefineHabitFromDB(id);
  res.status(200).json({
    success: true,
    message: 'PredefineHabit single data get successfully',
    data: result,
  });
});

export const PredefineHabitController = {
  createPredefineHabit,
  getPredefineHabit,
  getSinglePredefineHabit,
};
