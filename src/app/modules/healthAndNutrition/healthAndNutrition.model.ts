import { model, Schema } from 'mongoose';
import { THealth, TMeal } from './healthAndNutrition.interface';
import { User } from '../user/user.model';
import { calculateBMI } from '../utils/calculetBMI';
import { calculateHight } from '../utils/calculetHight';
import { suggestionOfBMI } from '../../../modelTress/trainModel';

const mealSchema = new Schema<TMeal>({
  //! not check the enum type
  havingMeal: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
  },
  havingFood: [
    {
      foodType: {
        type: String,
      },
      quantity: {
        type: Number, // e.g., "100g"
      },
    },
  ],

  GainProtein: {
    type: Number,
  },
  GainFat: {
    type: Number,
  },
  GainCarbo: {
    type: Number,
  },
  totalCal: { type: Number },
  havingTime: {
    type: Date,
  },
});

const healthySchema = new Schema<THealth>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    BMI: {
      type: String,
    },
    hight: {
      type: String,
    },
    weight: {
      type: String,
    },
    suggestion: {
      type: String,
    },
    fitnessLevel: {
      type: String,
      enum: ['stay-healthy', 'gain-weight', 'lose-wight'],
      default: 'stay-healthy',
    },
    Meal: {
      type: [mealSchema], // Array of meal sub-schemas
    },
  },
  {
    timestamps: true,
  },
);

// this is for the update the user value
type TUpdateMeal = {
  havingMeal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  havingFood: {
    quantity: Number;
    foodType: string;
  }[];
  GainCal?: string;
  GainProtein?: string;
  GainFat?: string;
  GainCarbo?: string;
  totalCal: string;
  havingTime: Date;
};

interface UpdateType {
  hight?: string;
  weight?: string;
  BMI?: string;
  suggestion?: string;
  Meal?: TUpdateMeal[];
}

// this update for the health

healthySchema.pre('save', async function (next) {
  // if (!this.user) {
  //   throw new Error('User is required');
  // }

  // let hight;
  // let weight;
  // // Get user data (height and weight)
  // const user = await User.findById(this.user);

  // if (!user || !user.hight || !user.weight) {
  //   throw new Error('User height or weight is missing');
  // }
  const updateHight = await calculateHight(this.hight as string);
  const userBMI = calculateBMI(updateHight, this.weight as string);
  const getSuggestion = await suggestionOfBMI(userBMI);
  this.BMI = userBMI;
  this.suggestion = getSuggestion;
  this.hight = updateHight;
  next();
});

// when user update the data this time calculate the Hight and the BMI
healthySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateType;
  let hight = update.hight;

  if (update && update.hight) {
    const updateHight = await calculateHight(hight as string);
    const updateBMI = calculateBMI(updateHight, update.weight as string);

    // this suggestion from Model
    const getSuggestion = await suggestionOfBMI(updateBMI);

    update.hight = updateHight;
    update.BMI = updateBMI;
    update.suggestion = getSuggestion;

    this.setUpdate(update);
  }

  //* this is for the meals

  if (update && update.Meal) {
    console.log('Meal', update.Meal);
  }
  next();
});

export const Health = model<THealth>('healths', healthySchema);
