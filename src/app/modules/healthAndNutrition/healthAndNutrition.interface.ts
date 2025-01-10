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

export type THealth = {
  user: Types.ObjectId;

  fitnessLevel?: 'stay-healthy' | 'gain-weight' | 'lose-wight';

  Meal?: TMeal[];

  BMI?: string;

  suggestion?: string;

  hight?: string;

  weight?: string;
};
