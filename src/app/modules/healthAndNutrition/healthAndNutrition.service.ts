import mongoose from 'mongoose';
import { calculateTotalIntake } from '../../../modelTress/foodModel';
import { User } from '../user/user.model';
import { THealth } from './healthAndNutrition.interface';
import { Health } from './healthAndNutrition.model';
import { calculateCalories } from './healthAndNutrition.utils';

const createHealthIntoDB = async (payload: THealth) => {
  const result = await Health.create(payload);
  return result;
};

const getAllHealthFromDB = async () => {
  const result = await Health.find();
  return result;
};

const getSingleHealthFormDB = async (id: string) => {
  const result = await Health.findById(id);
  return result;
};

const updateHealthIntoDB = async (id: string, payload: Partial<THealth>) => {
  if (payload.hight && typeof payload.hight !== 'string') {
    throw new Error('Hight must be a string.');
  }
  if (payload.weight && typeof payload.weight !== 'string') {
    throw new Error('weight must be a string.');
  }
  if (payload.fitnessLevel && typeof payload.fitnessLevel !== 'string') {
    throw new Error('weight must be a string.');
  }
  console.log(payload);
  const updatedHealth = await Health.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated user document
  });

  if (!updatedHealth) {
    throw new Error('health not updated');
  }

  //TODO : when this health will update the hight and weight data then also update in the User collection
  //! this function is not working
  if (payload.hight || payload.weight) {
    try {
      const UserRecord = await User.find({ user: updatedHealth.user });
      if (!UserRecord) {
        console.log('user dose not exists');
      }
      for (const userInfo of UserRecord) {
        const hight = updatedHealth.hight;
        const weight = updatedHealth.weight;

        userInfo.hight = hight;
        userInfo.weight = weight;
        await userInfo.save();
      }
    } catch (error) {
      throw new Error('Failed to update associated User records.');
    }
  }
  console.log('updatedHealth', updatedHealth);

  return updatedHealth;
  // return null;
};

const addNewMealIntoDB = async (id: string, payload: Partial<THealth>) => {
  const existingHealthRecord = await Health.findById(id);

  if (!existingHealthRecord) {
    throw new Error('No record found for the provided ID');
  }

  const { Meal } = payload;

  const newMeals = Meal?.map((meal) => {
    const foodValue = meal.havingFood;
    const nutritionTotals = calculateTotalIntake(foodValue);
    return {
      ...meal,
      totalCal: nutritionTotals.calories,
      GainCarbo: nutritionTotals.carbohydrates,
      GainFat: nutritionTotals.fats,
      GainProtein: nutritionTotals.proteins,
    };
  });

  //! this is not working here

  // Push the new meal into the Meal array
  const updatedRecord = await Health.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $push: { Meal: newMeals } }, // MongoDB $push operator to add to the array
    { new: true }, // Return the updated document
  );

  if (!updatedRecord) {
    throw new Error('Failed to update the record. Check the provided ID.');
  }

  return updatedRecord;
};

// find the daily cal base on date
const findTheCalFromDB = async (id: string, payload: Partial<THealth>) => {
  const existingHealthRecord = await Health.findById(id);

  if (!existingHealthRecord) {
    throw new Error('No record found for the provided ID');
  }

  const dailyDate = payload.dailyCalCount?.[0]?.DailyDate;
  const targetDate = dailyDate
    ? new Date(dailyDate).toISOString().split('T')[0]
    : null;

  if (!targetDate) {
    console.log('No target date provided.');
    return;
  }

  const totalCalories =
    existingHealthRecord.Meal?.reduce((sum, mealInfo) => {
      const mealDate = new Date(mealInfo.havingTime)
        .toISOString()
        .split('T')[0];
      if (mealDate === targetDate) {
        return sum + (mealInfo.totalCal || 0);
      }
      return sum;
    }, 0) || 0;

  // find RemainingCal
  const TodayCalGoal = payload.dailyCalCount?.[0]?.TodayCalGoal ?? 0;
  const existingCal = TodayCalGoal - totalCalories;

  const calIntakeDaily = {
    TodayCalGoal: TodayCalGoal,
    TodayCalIntake: totalCalories,
    RemainingCal: existingCal,
    DailyDate: dailyDate,
  };

  const updatedRecord = await Health.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $push: { dailyCalCount: calIntakeDaily } }, // MongoDB $push operator to add to the array
    { new: true }, // Return the updated document
  );
  return updatedRecord;
};

const weighGainOrLossFromDB = async (id: string, payload: Partial<THealth>) => {
  //claculation
  const existingHealthRecord = await Health.findById(id);

  if (!existingHealthRecord) {
    throw new Error('No record found for the provided ID');
  }
  const maintenanceCalories = 2500;
  //user present W
  const currentWeightNumber = parseInt(existingHealthRecord?.weight as string);
  //user given W
  const targetWeightNumber = parseInt(payload.targetWeight as string);

  //this is function to calculateCalories
  const CaloriesSuggestion = calculateCalories(
    currentWeightNumber,
    targetWeightNumber,
    payload.duration as number,
    maintenanceCalories,
  );

  // to upload those value in the database
  const updatedRecord = await Health.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    {
      $set: {
        targetWeight: payload.targetWeight, // Set the target weight
        TotalBaseOnDurationCal: CaloriesSuggestion.totalConsumedCalories, // Set the Total Calories based on duration
        parDayCal: CaloriesSuggestion.dailyCalories, // Set the per day calories for gain/loss
        duration: payload.duration, // Set the duration in days
      },
    },
    { new: true }, // Return the updated document
  );
  return updatedRecord;
};

// const findTheCalFromDB = async (
//   id: string,
//   payload: { dailyCalCount: { TodayCalGoal: number; DailyDate: string }[] },
// ) => {
//   const existingHealthRecord = await Health.findById(id);

//   if (!existingHealthRecord) {
//     throw new Error('No record found for the provided ID');
//   }

//   // Extract the first entry from dailyCalCount
//   const dailyCalEntry = payload.dailyCalCount?.[0];

//   if (
//     !dailyCalEntry ||
//     !dailyCalEntry.DailyDate ||
//     !dailyCalEntry.TodayCalGoal
//   ) {
//     throw new Error(
//       'Invalid or missing DailyDate or TodayCalGoal. Please provide valid data.',
//     );
//   }

//   const { TodayCalGoal, DailyDate } = dailyCalEntry;
//   const parsedDate = new Date(DailyDate);
//   if (isNaN(parsedDate.getTime())) {
//     throw new Error(
//       'Invalid or missing DailyDate. Please provide a valid date string.',
//     );
//   }

//   const targetDate = parsedDate.toISOString().split('T')[0];

//   // Filter meals matching the DailyDate
//   const mealsOnDate =
//     existingHealthRecord.Meal?.filter((meal) => {
//       if (!meal.havingTime) return false;
//       const mealDate = new Date(meal.havingTime).toISOString().split('T')[0];
//       return mealDate === targetDate;
//     }) || [];

//   // Sum up totalCal for the matched meals
//   const totalCalIntake = mealsOnDate.reduce((sum, meal) => {
//     return sum + (meal.totalCal || 0);
//   }, 0);

//   // Calculate remaining calories
//   const remainingCal = TodayCalGoal - totalCalIntake;

//   // Update dailyCalCount
//   const updatedDailyCalCount = existingHealthRecord.dailyCalCount || [];
//   const existingEntryIndex = updatedDailyCalCount.findIndex(
//     (entry) => entry.DailyDate === DailyDate,
//   );

//   if (existingEntryIndex > -1) {
//     // Update existing entry
//     updatedDailyCalCount[existingEntryIndex] = {
//       ...updatedDailyCalCount[existingEntryIndex],
//       TodayCalGoal,
//       TodayCalIntake: totalCalIntake,
//       RemainingCal: remainingCal,
//     };
//   } else {
//     // Insert new entry
//     updatedDailyCalCount.push({
//       TodayCalGoal,
//       TodayCalIntake: totalCalIntake,
//       RemainingCal: remainingCal,
//       DailyDate,
//     });
//   }

//   // Save the updated record
//   existingHealthRecord.dailyCalCount = updatedDailyCalCount;
//   await existingHealthRecord.save();
//   return {
//     data: existingHealthRecord.dailyCalCount,
//   };
// };

export const HealthServices = {
  findTheCalFromDB,
  addNewMealIntoDB,
  getAllHealthFromDB,
  createHealthIntoDB,
  updateHealthIntoDB,
  getSingleHealthFormDB,
  weighGainOrLossFromDB,
};
