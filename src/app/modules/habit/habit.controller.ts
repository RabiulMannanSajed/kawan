import catchAsync from '../../utils/catchAcync';
import { HabitService } from './habit.service';
//pc a habit max 2 hour

const CreteHabit = catchAsync(async (req, res, next) => {
  const result = await HabitService.createHabitIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Habit is created successfully',
    data: result,
  });
});

const getAllHabit = catchAsync(async (req, res, next) => {
  const result = await HabitService.getAllHabitFromDB();
  res.status(200).json({
    success: true,
    message: 'Habit is created successfully',
    data: result,
  });
});

const getSingleHabit = catchAsync(async (req, res, next) => {
  //   const result = await HabitService.createHabitIntoDB(req.body);
  //   res.status(200).json({
  //     success: true,
  //     message: 'Habit is created successfully',
  //     data: result,
  //   });
});

// add the new data to start the habit
const updateHabit = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await HabitService.updateHabitIntoDB(id, req.body);
  res.status(200).json({
    success: true,
    message: 'Habit is created successfully',
    data: result,
  });
});

// add the end time of today habit
const updateExistsHabitDate = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { habitId } = req.params;
  const result = await HabitService.updateExistsHabitDateIntoDB(
    id,
    habitId,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Habit end date is updated successfully',
    data: result,
  });
});
export const HabitController = {
  CreteHabit,
  getAllHabit,
  getSingleHabit,
  updateHabit,
  updateExistsHabitDate,
};
