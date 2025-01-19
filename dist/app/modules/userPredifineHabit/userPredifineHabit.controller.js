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
exports.UserPredefineHabitController = void 0;
const catchAcync_1 = __importDefault(require("../../utils/catchAcync"));
const userPredifineHabit_service_1 = require("./userPredifineHabit.service");
const createUserPredefineHabit = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPredifineHabit_service_1.UserPredefineHabitService.crateUserPredefineHabitIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'User Predefine Habit is created successfully',
        data: result,
    });
}));
const getAllUserPredefineHabit = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userPredifineHabit_service_1.UserPredefineHabitService.getAllUserPredefineHabitFromDB();
    res.status(200).json({
        success: true,
        message: 'User Predefine Habit all data get successfully',
        data: result,
    });
}));
const getSingleUserPredefineHabit = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield userPredifineHabit_service_1.UserPredefineHabitService.getSingleUserPredefineHabit(id);
    res.status(200).json({
        success: true,
        message: 'User Predefine Habit single  data get successfully',
        data: result,
    });
}));
const deleteUserPredefineHabit = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield userPredifineHabit_service_1.UserPredefineHabitService.deleteUserPredefineHabit(id);
    res.status(200).json({
        success: true,
        message: 'User Predefine Habit single  data get successfully',
        data: result,
    });
}));
exports.UserPredefineHabitController = {
    createUserPredefineHabit,
    getAllUserPredefineHabit,
    getSingleUserPredefineHabit,
    deleteUserPredefineHabit,
};
