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
exports.Health = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const calculetBMI_1 = require("../utils/calculetBMI");
const calculetHight_1 = require("../utils/calculetHight");
const trainModel_1 = require("../../../modelTress/trainModel");
const mealSchema = new mongoose_1.Schema({
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
const healthySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
healthySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.user) {
            throw new Error('User is required');
        }
        try {
            // Get user data (height and weight)
            const user = yield user_model_1.User.findById(this.user);
            if (!user || !user.hight || !user.weight) {
                throw new Error('User height or weight is missing');
            }
            this.BMI = (0, calculetBMI_1.calculateBMI)(user === null || user === void 0 ? void 0 : user.hight, user === null || user === void 0 ? void 0 : user.weight);
            this.hight = user === null || user === void 0 ? void 0 : user.hight;
            this.weight = user === null || user === void 0 ? void 0 : user.weight;
            console.log(this);
            // Proceed with the save operation
            next();
        }
        catch (error) {
            return next(error);
        }
    });
});
// when user update the data this time calculate the Hight and the BMI
healthySchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        console.log('form update', update);
        let hight = update.hight;
        if (update && update.hight) {
            console.log(`height ${update.hight}`);
            // if the hight is not given handle the case
            const updateHight = yield (0, calculetHight_1.calculateHight)(hight);
            const updateBMI = (0, calculetBMI_1.calculateBMI)(updateHight, update.weight);
            // this suggestion from Model
            const getSuggestion = yield (0, trainModel_1.suggestionOfBMI)(updateBMI);
            update.hight = updateHight;
            update.BMI = updateBMI;
            update.suggestion = getSuggestion;
            this.setUpdate(update);
        }
        //* this is for the meals
        if (update && update.Meal) {
            update.Meal = update.Meal.map((meal) => (Object.assign(Object.assign({}, meal), { havingFood: Array.isArray(meal.havingFood)
                    ? meal.havingFood
                    : [meal.havingFood] })));
            console.log(update);
        }
        next();
    });
});
exports.Health = (0, mongoose_1.model)('healths', healthySchema);
