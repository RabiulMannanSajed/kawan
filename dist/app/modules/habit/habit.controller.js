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
exports.HabitController = void 0;
const catchAcync_1 = __importDefault(require("../../utils/catchAcync"));
const habit_service_1 = require("./habit.service");
//pc a habit max 2 hour
const CreteHabit = (0, catchAcync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield habit_service_1.HabitService.createHabitIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Habit is created successfully',
        data: result,
    });
}));
const getAllHabit = (0, catchAcync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield habit_service_1.HabitService.getAllHabitFromDB();
    res.status(200).json({
        success: true,
        message: 'Habit is created successfully',
        data: result,
    });
}));
const getSingleHabit = (0, catchAcync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await HabitService.createHabitIntoDB(req.body);
    //   res.status(200).json({
    //     success: true,
    //     message: 'Habit is created successfully',
    //     data: result,
    //   });
}));
// add the new data to start the habit
const updateHabit = (0, catchAcync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield habit_service_1.HabitService.updateHabitIntoDB(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Habit is created successfully',
        data: result,
    });
}));
// add the end time of today habit
const updateExistsHabitDate = (0, catchAcync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { habitId } = req.params;
    const result = yield habit_service_1.HabitService.updateExistsHabitDateIntoDB(id, habitId, req.body);
    res.status(200).json({
        success: true,
        message: 'Habit end date is updated successfully',
        data: result,
    });
}));
exports.HabitController = {
    CreteHabit,
    getAllHabit,
    getSingleHabit,
    updateHabit,
    updateExistsHabitDate,
};
