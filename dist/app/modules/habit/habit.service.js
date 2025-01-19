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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const habit_model_1 = require("./habit.model");
const createHabitIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield habit_model_1.Habit.create(payload);
    return result;
});
const getAllHabitFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield habit_model_1.Habit.find();
    return result;
});
const getSingleHabitFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await Habit.create(payload);
    //   return result;
});
const updateHabitIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // ... is spread oparetr
    const { DailyPractice } = payload, remainingHabitData = __rest(payload, ["DailyPractice"]);
    console.log(DailyPractice);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //* session-1 updating remainingHabitData
        const UpdateHabitData = yield habit_model_1.Habit.findByIdAndUpdate(id, remainingHabitData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!UpdateHabitData) {
            throw new Error('failed to update the Habit data ');
        }
        //  here the new start Date on the specific habit
        //* session -2 Update the data
        if (DailyPractice && Array.isArray(DailyPractice)) {
            for (const practice of DailyPractice) {
                yield habit_model_1.Habit.updateOne({ _id: id }, {
                    $push: {
                        DailyPractice: {
                            StartDate: practice.StartDate,
                        },
                    },
                }, { session });
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        const result = yield habit_model_1.Habit.findById(id);
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Failed to update the habit ');
    }
});
// add the today's end data of habit
const updateExistsHabitDateIntoDB = (id, // id of the created habit
habitId, // id of the created habit's today wark id
payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { DailyPractice } = payload;
    const habitExists = yield habit_model_1.Habit.findById(id); // check the habit exists in the database
    if (!habitExists) {
        throw new Error(' This is not a valid id ');
    }
    if (DailyPractice && Array.isArray(DailyPractice)) {
        for (const practice of DailyPractice) {
            yield habit_model_1.Habit.updateOne({
                _id: id,
                'DailyPractice._id': habitId, // Match the specific DailyPractice entry
            }, {
                $set: {
                    'DailyPractice.$.EndDate': practice.EndDate, // Update the EndDate field
                },
            });
        }
    }
    const updatedHabit = yield habit_model_1.Habit.findById(id);
    return updatedHabit;
});
exports.HabitService = {
    createHabitIntoDB,
    getAllHabitFromDB,
    getSingleHabitFromDB,
    updateHabitIntoDB,
    updateExistsHabitDateIntoDB,
};
