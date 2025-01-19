import { model, Schema } from 'mongoose';
import { TUserPredefineHabit } from './userPredifineHabit.interface';

const UserPredefineHabitSchema = new Schema<TUserPredefineHabit>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User Id is not present '],
  },
  predefineHabitID: {
    type: Schema.Types.ObjectId,
    required: [true, 'PreDefineHabitId is not present '],
  },
  habitDescription: {
    type: String,
  },
  habitType: {
    type: String,
  },
  totalHabitPracticeDay: {
    type: Number,
  },
  dailyReminder: {
    type: Number,
  },
  dailyReminderNote: {
    type: String,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

export const UserPredefineHabit = model<TUserPredefineHabit>(
  'UserPredefineHabit',
  UserPredefineHabitSchema,
);
