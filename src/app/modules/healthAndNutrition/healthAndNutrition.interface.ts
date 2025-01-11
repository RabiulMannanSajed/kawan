import { Types } from 'mongoose';

export type TMeal = {
  havingMeal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';

  havingFood: {
    foodType: string;

    quantity: number;
  }[];

  GainProtein?: number;

  GainFat?: number;

  GainCarbo?: number;

  totalCal: number;

  havingTime: Date;
};

export type TDailyCalCount = {
  TodayCalGoal?: number;
  TodayCalIntake?: number;
  RemainingCal?: number;
  DailyDate?: string;
};

export type THealth = {
  user: Types.ObjectId;

  fitnessLevel?: 'stay-healthy' | 'gain-weight' | 'lose-wight';

  Meal?: TMeal[];

  // dailyCalCount?: TDailyCalCount[];
  dailyCalCount?: [
    {
      TodayCalGoal?: number;
      TodayCalIntake?: number;
      RemainingCal?: number;
      DailyDate?: Date;
    },
  ];

  BMI?: string;

  suggestion?: string;

  hight?: string;

  weight?: string;

  // TODO : new value
  targetWeight?: string;

  // for gain W  or Lose W
  TotalBaseOnDurationCal?: number; // this value base on the duration also take the user Given weight

  // gain/lose
  parDayCal?: number; // cal this value

  duration?: number;
};
