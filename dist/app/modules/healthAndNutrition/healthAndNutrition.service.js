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
    // return updatedHealth;
    return null;
});
const addNewMealIntoDB = (id, 
// see when meal is optional the error is arive for the [number]
payload) => __awaiter(void 0, void 0, void 0, function* () {
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
    // //! this is not working here
    // Push the new meal into the Meal array
    const updatedRecord = yield healthAndNutrition_model_1.Health.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $push: { Meal: newMeals } }, // MongoDB $push operator to add to the array
    { new: true });
    if (!updatedRecord) {
        throw new Error('Failed to update the record. Check the provided ID.');
    }
    console.log('uprecord', updatedRecord);
    return updatedRecord;
});
exports.HealthServices = {
    addNewMealIntoDB,
    createHealthIntoDB,
    getAllHealthFromDB,
    getSingleHealthFormDB,
    updateHealthIntoDB,
};
