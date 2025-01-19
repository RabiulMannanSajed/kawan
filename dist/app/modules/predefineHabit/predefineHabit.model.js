"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefineHabit = void 0;
const mongoose_1 = require("mongoose");
const PredefineHabitSchema = new mongoose_1.Schema({
    habitType: {
        type: String,
    },
    habitDescription: {
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
});
exports.PredefineHabit = (0, mongoose_1.model)('predefineHabit', PredefineHabitSchema);
