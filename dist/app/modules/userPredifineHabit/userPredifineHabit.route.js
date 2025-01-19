"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPredefineHabitRoute = void 0;
const express_1 = __importDefault(require("express"));
const userPredifineHabit_controller_1 = require("./userPredifineHabit.controller");
const route = express_1.default.Router();
route.post('/create-userPredefineHabit', userPredifineHabit_controller_1.UserPredefineHabitController.createUserPredefineHabit);
route.get('/', userPredifineHabit_controller_1.UserPredefineHabitController.getAllUserPredefineHabit);
route.get('/:id', userPredifineHabit_controller_1.UserPredefineHabitController.getSingleUserPredefineHabit);
route.patch('/:id', userPredifineHabit_controller_1.UserPredefineHabitController.deleteUserPredefineHabit);
exports.UserPredefineHabitRoute = route;
