import { Types } from 'mongoose';

export type TMeal = {
  havingMeal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  havingFood: {
    quantity: string;
    foodType: string;
    GainCal?: string;
    GainProtein?: string;
    GainFat?: string;
    GainCarbo?: string;
  }[];
  totalCal: string;
  havingTime: Date;
};

export type THealth = {
  user: Types.ObjectId;

  fitnessLevel?: 'stay-healthy' | 'gain-weight' | 'lose-wight';

  Meal: TMeal[];

  BMI?: string;

  suggestion?: string;

  hight?: string;

  weight?: string;
};
