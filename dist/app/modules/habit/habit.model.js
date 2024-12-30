"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habit = void 0;
const mongoose_1 = require("mongoose");
const DailyPracticeSchema = new mongoose_1.Schema({
    StartDate: {
        type: Date,
        required: [true, 'Add the time you start the habit '],
    },
    EndDate: { type: Date },
    workTime: { type: String },
});
const HabitSchema = new mongoose_1.Schema({
    HabitName: {
        type: String,
        required: [true, 'Habit name is required'],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'user',
    },
    Description: {
        type: String,
        required: [true, 'Description is required'],
    },
    DailyPractice: [DailyPracticeSchema],
}, {
    timestamps: true,
});
exports.Habit = (0, mongoose_1.model)('habit', HabitSchema);
