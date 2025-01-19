"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPredefineHabit = void 0;
const mongoose_1 = require("mongoose");
const UserPredefineHabitSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User Id is not present '],
    },
    predefineHabitID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'PreDefineHabitId is not present '],
    },
    habitDescription: {
        type: String,
    },
    habitType: {
        type: String,
    },
    totalHabitPracticeDay: {
        type: Number,
    },
    dailyReminder: {
        type: Number,
    },
    dailyReminderNote: {
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
});
exports.UserPredefineHabit = (0, mongoose_1.model)('UserPredefineHabit', UserPredefineHabitSchema);
