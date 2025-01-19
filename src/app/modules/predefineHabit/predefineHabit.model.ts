import { model, Schema } from 'mongoose';
import { TPredefineHabit } from './predefineHabit.interface';

const PredefineHabitSchema = new Schema<TPredefineHabit>({
  habitType: {
    type: String,
  },
  habitDescription: {
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
});

export const PredefineHabit = model<TPredefineHabit>(
  'predefineHabit',
  PredefineHabitSchema,
);
