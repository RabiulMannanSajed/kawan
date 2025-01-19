import { TPredefineHabit } from './predefineHabit.interface';
import { PredefineHabit } from './predefineHabit.model';

const createPredefineHabitIntoDB = async (payload: TPredefineHabit) => {
  const result = await PredefineHabit.create(payload);
  return result;
};

//get all PredefineHabit
const getPredefineHabitFromDB = async () => {
  const result = await PredefineHabit.find();
  return result;
};

//get single PredefineHabit by id
const getSinglePredefineHabitFromDB = async (id: string) => {
  const result = await PredefineHabit.findById(id);
  return result;
};

export const PredefineHabitService = {
  createPredefineHabitIntoDB,
  getPredefineHabitFromDB,
  getSinglePredefineHabitFromDB,
};
