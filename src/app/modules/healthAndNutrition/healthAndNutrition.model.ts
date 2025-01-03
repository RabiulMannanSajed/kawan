import { model, Schema } from 'mongoose';
import { THealth } from './healthAndNutrition.interface';
import { User } from '../user/user.model';
import { calculateBMI } from '../utils/calculetBMI';
import { calculateHight } from '../utils/calculetHight';
// import { suggestionOfBMI } from '../../../modelTress/trainModel';

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
  },
  {
    timestamps: true,
  },
);

// this is when user first time create the of the user update the user
// Pre save hook to calculate BMI
// this is when create the user
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

interface UpdateType {
  hight?: string;
  weight?: string;
  BMI?: string;
  suggestion?: string;
}

// when user update the data this time calculate the Hight and the BMI
healthySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateType;
  console.log(update);
  let hight = update.hight;
  if (update) {
    console.log(`height ${update.hight}`);
    // if the hight is not given handle the case
    const updateHight = await calculateHight(hight as string);
    const updateBMI = calculateBMI(updateHight, update.weight as string);

    // this suggestion from Model
    // const getSuggestion = await suggestionOfBMI(updateBMI);

    update.hight = updateHight;
    update.BMI = updateBMI;
    // update.suggestion = getSuggestion;

    this.setUpdate(update);
  }
  next();
});

export const Health = model<THealth>('healths', healthySchema);
