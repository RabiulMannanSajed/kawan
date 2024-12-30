import { Types } from 'mongoose';

export type TDailyPractice = {
  StartDate: Date;
  EndDate?: Date;
  workTime: string;
};

export type THabit = {
  HabitName: string;
  user: Types.ObjectId; // user Id from user Table
  Description: string;
  DailyPractice: TDailyPractice[];
  Progress?: string;
  LastPerformed?: string;
};
