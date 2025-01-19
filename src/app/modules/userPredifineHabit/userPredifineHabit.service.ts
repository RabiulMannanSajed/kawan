import { TPredefineHabit } from '../predefineHabit/predefineHabit.interface';
import { PredefineHabit } from '../predefineHabit/predefineHabit.model';
import { User } from '../user/user.model';
import { TUserPredefineHabit } from './userPredifineHabit.interface';
import { UserPredefineHabit } from './userPredifineHabit.model';

const crateUserPredefineHabitIntoDB = async (payload: TUserPredefineHabit) => {
  const userId = payload.userId;
  const predefineHabitID = payload.predefineHabitID;

  const findUser = await User.findById(userId);
  if (!findUser) {
    throw new Error('This user not present in the Database');
  }
  const findPredefineHabit = await PredefineHabit.findById(predefineHabitID);
  if (!findUser) {
    throw new Error('This Habit is not define in the Database');
  }
  //TODO: one can take one habit at one time

  const {
    habitType,
    habitDescription,
    totalHabitPracticeDay,
    dailyReminder,
    dailyReminderNote,
  } = findPredefineHabit as TPredefineHabit;

  const newUserHabit = new UserPredefineHabit({
    userId: userId,
    predefineHabitID: predefineHabitID,
    habitType,
    habitDescription,
    totalHabitPracticeDay,
    dailyReminder,
    dailyReminderNote,
    isDelete: false,
  });
  await newUserHabit.save();
  return newUserHabit;
};

// get all  UserPredefineHabit
const getAllUserPredefineHabitFromDB = async () => {
  const result = await UserPredefineHabit.find();
  return result;
};

// get single UserPredefineHabit
const getSingleUserPredefineHabit = async (id: string) => {
  const result = await UserPredefineHabit.findById(id);
  return result;
};
const deleteUserPredefineHabit = async (id: string) => {
  const result = await UserPredefineHabit.findByIdAndUpdate(
    id,
    { isDelete: true },
    { new: true },
  );
  return result;
};
export const UserPredefineHabitService = {
  crateUserPredefineHabitIntoDB,
  getAllUserPredefineHabitFromDB,
  getSingleUserPredefineHabit,
  deleteUserPredefineHabit,
};
