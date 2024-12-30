"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitRoutes = void 0;
const express_1 = __importDefault(require("express"));
const habit_controller_1 = require("./habit.controller");
const route = express_1.default.Router();
route.post('/create-habit', habit_controller_1.HabitController.CreteHabit);
route.get('/', habit_controller_1.HabitController.getAllHabit);
route.get('/:id', habit_controller_1.HabitController.getSingleHabit);
route.patch('/:id', habit_controller_1.HabitController.updateHabit);
route.put('/:id/:habitId', habit_controller_1.HabitController.updateExistsHabitDate);
exports.HabitRoutes = route;
