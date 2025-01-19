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
exports.UserPredefineHabitService = void 0;
const predefineHabit_model_1 = require("../predefineHabit/predefineHabit.model");
const user_model_1 = require("../user/user.model");
const userPredifineHabit_model_1 = require("./userPredifineHabit.model");
const crateUserPredefineHabitIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = payload.userId;
    const predefineHabitID = payload.predefineHabitID;
    const findUser = yield user_model_1.User.findById(userId);
    if (!findUser) {
        throw new Error('This user not present in the Database');
    }
    const findPredefineHabit = yield predefineHabit_model_1.PredefineHabit.findById(predefineHabitID);
    if (!findUser) {
        throw new Error('This Habit is not define in the Database');
    }
    //TODO: one can take one habit at one time
    const { habitType, habitDescription, totalHabitPracticeDay, dailyReminder, dailyReminderNote, } = findPredefineHabit;
    const newUserHabit = new userPredifineHabit_model_1.UserPredefineHabit({
        userId: userId,
        predefineHabitID: predefineHabitID,
        habitType,
        habitDescription,
        totalHabitPracticeDay,
        dailyReminder,
        dailyReminderNote,
        isDelete: false,
    });
    yield newUserHabit.save();
    return newUserHabit;
});
// get all  UserPredefineHabit
const getAllUserPredefineHabitFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPredifineHabit_model_1.UserPredefineHabit.find();
    return result;
});
// get single UserPredefineHabit
const getSingleUserPredefineHabit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPredifineHabit_model_1.UserPredefineHabit.findById(id);
    return result;
});
const deleteUserPredefineHabit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPredifineHabit_model_1.UserPredefineHabit.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return result;
});
exports.UserPredefineHabitService = {
    crateUserPredefineHabitIntoDB,
    getAllUserPredefineHabitFromDB,
    getSingleUserPredefineHabit,
    deleteUserPredefineHabit,
};
