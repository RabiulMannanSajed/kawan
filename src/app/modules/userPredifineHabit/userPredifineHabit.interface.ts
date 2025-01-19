import { Types } from 'mongoose';

export type TUserPredefineHabit = {
  userId: Types.ObjectId;
  predefineHabitID: Types.ObjectId;
  habitType?: string;
  habitDescription?: string;
  totalHabitPracticeDay?: number;
  dailyReminder?: number;
  dailyReminderNote?: string;
  isDelete?: boolean;
};
