import { Types } from 'mongoose';

export type FoodType =
  | 'Pancakes'
  | 'Eggs'
  | 'Cereal'
  | 'Smoothie'
  | 'Toast'
  | 'Sandwich'
  | 'Salad'
  | 'Pasta'
  | 'Burger'
  | 'Soup'
  | 'Steak'
  | 'Roast Chicken'
  | 'Pizza'
  | 'Seafood'
  | 'Nuts'
  | 'Chips'
  | 'Chocolate'
  | 'Granola Bar'
  | 'Apple'
  | 'Banana'
  | 'Orange'
  | 'Strawberry'
  | 'Mango'
  | 'Grapes'
  | 'Sushi'
  | 'Ramen'
  | 'Dumplings'
  | 'Pad Thai'
  | 'Spring Rolls'
  | 'Kimchi'
  | 'Pho'
  | 'Biryani'
  | 'Tandoori Chicken';

export type TMeal = {
  havingMeal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  havingFood: {
    quantity: string;
    foodType: FoodType;
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
