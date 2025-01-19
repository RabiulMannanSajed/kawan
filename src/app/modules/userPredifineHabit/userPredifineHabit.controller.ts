import catchAsync from '../../utils/catchAcync';
import { UserPredefineHabitService } from './userPredifineHabit.service';

const createUserPredefineHabit = catchAsync(async (req, res) => {
  const result = await UserPredefineHabitService.crateUserPredefineHabitIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'User Predefine Habit is created successfully',
    data: result,
  });
});

const getAllUserPredefineHabit = catchAsync(async (req, res) => {
  const result =
    await UserPredefineHabitService.getAllUserPredefineHabitFromDB();
  res.status(200).json({
    success: true,
    message: 'User Predefine Habit all data get successfully',
    data: result,
  });
});

const getSingleUserPredefineHabit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await UserPredefineHabitService.getSingleUserPredefineHabit(id);
  res.status(200).json({
    success: true,
    message: 'User Predefine Habit single  data get successfully',
    data: result,
  });
});

const deleteUserPredefineHabit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserPredefineHabitService.deleteUserPredefineHabit(id);
  res.status(200).json({
    success: true,
    message: 'User Predefine Habit single  data get successfully',
    data: result,
  });
});
export const UserPredefineHabitController = {
  createUserPredefineHabit,
  getAllUserPredefineHabit,
  getSingleUserPredefineHabit,
  deleteUserPredefineHabit,
};
