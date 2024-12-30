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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const healthAndNutrition_model_1 = require("../healthAndNutrition/healthAndNutrition.model");
const calculetBMI_1 = require("../utils/calculetBMI");
const user_model_1 = require("./user.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
// TODO return here next
const updateUserIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.hight && typeof payload.hight !== 'string') {
        throw new Error('Hight must be a string.');
    }
    if (payload.weight && typeof payload.weight !== 'string') {
        throw new Error('Weight must be a string.');
    }
    // Update the user record
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true, // Return the updated user document
    });
    if (!updatedUser) {
        throw new Error('User not found.');
    }
    // Check if `hight` or `weight` was updated
    if (payload.hight || payload.weight) {
        try {
            // Find associated health records
            const healthRecords = yield healthAndNutrition_model_1.Health.find({ user: id });
            for (const health of healthRecords) {
                const hight = updatedUser.hight; // Fetch the updated height
                const weight = updatedUser.weight; // Fetch the updated weight
                if (!hight || !weight) {
                    throw new Error('User height or weight is missing');
                }
                health.BMI = (0, calculetBMI_1.calculateBMI)(hight, weight);
                health.hight = hight;
                health.weight = weight;
                yield health.save(); // Save changes
            }
        }
        catch (error) {
            throw new Error('Failed to update associated health records.');
        }
    }
    return updatedUser;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    updateUserIntoDB,
};
