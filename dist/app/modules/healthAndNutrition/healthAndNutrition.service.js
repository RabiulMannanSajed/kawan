"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const foodModel_1 = require("../../../modelTress/foodModel");
const user_model_1 = require("../user/user.model");
const healthAndNutrition_model_1 = require("./healthAndNutrition.model");
const healthAndNutrition_utils_1 = require("./healthAndNutrition.utils");
const createHealthIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield healthAndNutrition_model_1.Health.create(payload);
    return result;
});
const getAllHealthFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield healthAndNutrition_model_1.Health.find();
    return result;
});
const getSingleHealthFormDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield healthAndNutrition_model_1.Health.findById(id);
    return result;
});
const updateHealthIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
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
    const updatedHealth = yield healthAndNutrition_model_1.Health.findOneAndUpdate({ _id: id }, payload, {
        new: true, // Return the updated user document
    });
    if (!updatedHealth) {
        throw new Error('health not updated');
    }
    //TODO : when this health will update the hight and weight data then also update in the User collection
    //! this function is not working
    if (payload.hight || payload.weight) {
        try {
            const UserRecord = yield user_model_1.User.find({ user: updatedHealth.user });
            if (!UserRecord) {
                console.log('user dose not exists');
            }
            for (const userInfo of UserRecord) {
                const hight = updatedHealth.hight;
                const weight = updatedHealth.weight;
                userInfo.hight = hight;
                userInfo.weight = weight;
                yield userInfo.save();
            }
        }
        catch (error) {
            throw new Error('Failed to update associated User records.');
        }
    }
    console.log('updatedHealth', updatedHealth);
    return updatedHealth;
    // return null;
});
const addNewMealIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingHealthRecord = yield healthAndNutrition_model_1.Health.findById(id);
    if (!existingHealthRecord) {
        throw new Error('No record found for the provided ID');
    }
    const { Meal } = payload;
    const newMeals = Meal === null || Meal === void 0 ? void 0 : Meal.map((meal) => {
        const foodValue = meal.havingFood;
        const nutritionTotals = (0, foodModel_1.calculateTotalIntake)(foodValue);
        return Object.assign(Object.assign({}, meal), { totalCal: nutritionTotals.calories, GainCarbo: nutritionTotals.carbohydrates, GainFat: nutritionTotals.fats, GainProtein: nutritionTotals.proteins });
    });
    //! this is not working here
    // Push the new meal into the Meal array
    const updatedRecord = yield healthAndNutrition_model_1.Health.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $push: { Meal: newMeals } }, // MongoDB $push operator to add to the array
    { new: true });
    if (!updatedRecord) {
        throw new Error('Failed to update the record. Check the provided ID.');
    }
    return updatedRecord;
});
// find the daily cal base on date
const findTheCalFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const existingHealthRecord = yield healthAndNutrition_model_1.Health.findById(id);
    if (!existingHealthRecord) {
        throw new Error('No record found for the provided ID');
    }
    const dailyDate = (_b = (_a = payload.dailyCalCount) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.DailyDate;
    const targetDate = dailyDate
        ? new Date(dailyDate).toISOString().split('T')[0]
        : null;
    if (!targetDate) {
        console.log('No target date provided.');
        return;
    }
    const totalCalories = ((_c = existingHealthRecord.Meal) === null || _c === void 0 ? void 0 : _c.reduce((sum, mealInfo) => {
        const mealDate = new Date(mealInfo.havingTime)
            .toISOString()
            .split('T')[0];
        if (mealDate === targetDate) {
            return sum + (mealInfo.totalCal || 0);
        }
        return sum;
    }, 0)) || 0;
    // find RemainingCal
    const TodayCalGoal = (_f = (_e = (_d = payload.dailyCalCount) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.TodayCalGoal) !== null && _f !== void 0 ? _f : 0;
    const existingCal = TodayCalGoal - totalCalories;
    const calIntakeDaily = {
        TodayCalGoal: TodayCalGoal,
        TodayCalIntake: totalCalories,
        RemainingCal: existingCal,
        DailyDate: dailyDate,
    };
    const updatedRecord = yield healthAndNutrition_model_1.Health.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $push: { dailyCalCount: calIntakeDaily } }, // MongoDB $push operator to add to the array
    { new: true });
    return updatedRecord;
});
const weighGainOrLossFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //claculation
    const existingHealthRecord = yield healthAndNutrition_model_1.Health.findById(id);
    if (!existingHealthRecord) {
        throw new Error('No record found for the provided ID');
    }
    const maintenanceCalories = 2500;
    //user present W
    const currentWeightNumber = parseInt(existingHealthRecord === null || existingHealthRecord === void 0 ? void 0 : existingHealthRecord.weight);
    //user given W
    const targetWeightNumber = parseInt(payload.targetWeight);
    //this is function to calculateCalories
    const CaloriesSuggestion = (0, healthAndNutrition_utils_1.calculateCalories)(currentWeightNumber, targetWeightNumber, payload.duration, maintenanceCalories);
    // to upload those value in the database
    const updatedRecord = yield healthAndNutrition_model_1.Health.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, {
        $set: {
            targetWeight: payload.targetWeight, // Set the target weight
            TotalBaseOnDurationCal: CaloriesSuggestion.totalConsumedCalories, // Set the Total Calories based on duration
            parDayCal: CaloriesSuggestion.dailyCalories, // Set the per day calories for gain/loss
            duration: payload.duration, // Set the duration in days
        },
    }, { new: true });
    return updatedRecord;
});
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
exports.HealthServices = {
    findTheCalFromDB,
    addNewMealIntoDB,
    getAllHealthFromDB,
    createHealthIntoDB,
    updateHealthIntoDB,
    getSingleHealthFormDB,
    weighGainOrLossFromDB,
};
