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
      quantity: {
        type: String, // e.g., "100g"
      },
      foodType: {
        type: String,
      },
      GainCal: {
        type: String,
      },
      GainProtein: {
        type: String,
      },
      GainFat: {
        type: String,
      },
      GainCarbo: {
        type: String,
      },
    },
  ],
  havingTime: {
    type: Date,
  },
  totalCal: { type: String },
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

healthySchema.pre('save', async function (next) {
  if (!this.user) {
    throw new Error('User is required');
  }

  try {
    // Get user data (height and weight)
    const user = await User.findById(this.user);

    if (!user || !user.hight || !user.weight) {
      throw new Error('User height or weight is missing');
    }

    this.BMI = calculateBMI(user?.hight, user?.weight);
    this.hight = user?.hight;
    this.weight = user?.weight;
    console.log(this);
    // Proceed with the save operation
    next();
  } catch (error: any) {
    return next(error);
  }
});

// this is for the update the user value
type TUpdateMeal = {
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

interface UpdateType {
  hight?: string;
  weight?: string;
  BMI?: string;
  suggestion?: string;
  Meal?: TUpdateMeal[];
}

// when user update the data this time calculate the Hight and the BMI
healthySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateType;
  console.log('form update', update);
  let hight = update.hight;

  if (update && update.hight) {
    console.log(`height ${update.hight}`);
    // if the hight is not given handle the case
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

  // if (update && update.Meal) {
  //   // update.Meal = update.Meal.map((meal) => ({
  //   //   ...meal,
  //   //   havingFood: Array.isArray(meal.havingFood)
  //   //     ? meal.havingFood
  //   //     : [meal.havingFood],
  //   // }));
  //   console.log('this is meal');
  //   console.log(update);
  // }
  next();
});

export const Health = model<THealth>('healths', healthySchema);
