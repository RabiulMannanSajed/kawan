import { Types } from 'mongoose';

export type THealth = {
  user: Types.ObjectId;

  fitnessLevel?: 'stay-healthy' | 'gain-weight' | 'lose-wight';

  BMI?: string;

  suggestion?: string; // this is based on BMI and the sfitnessLevel

  hight?: string;

  weight?: string;
};

/*
user table 
hight = 5.5 -> 1.45m

THealth create time 
hight = 6 -> 2m

*/
