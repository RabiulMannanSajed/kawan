import { model, Schema } from 'mongoose';
import { TDailyPractice, THabit } from './habit.interface';

const DailyPracticeSchema = new Schema<TDailyPractice>({
  StartDate: {
    type: Date,
    required: [true, 'Add the time you start the habit '],
  },
  EndDate: { type: Date },

  workTime: { type: String },
});

const HabitSchema = new Schema<THabit>(
  {
    HabitName: {
      type: String,
      required: [true, 'Habit name is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'user',
    },
    Description: {
      type: String,
      required: [true, 'Description is required'],
    },
    DailyPractice: [DailyPracticeSchema],
  },
  {
    timestamps: true,
  },
);

export const Habit = model<THabit>('habit', HabitSchema);
