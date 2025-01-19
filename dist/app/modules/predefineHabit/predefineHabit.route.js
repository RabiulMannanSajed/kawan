"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredefineHabitRoute = void 0;
const express_1 = __importDefault(require("express"));
const predefineHabit_controller_1 = require("./predefineHabit.controller");
const route = express_1.default.Router();
route.post('/create-predefineHabit', predefineHabit_controller_1.PredefineHabitController.createPredefineHabit);
route.get('/', predefineHabit_controller_1.PredefineHabitController.getPredefineHabit);
route.get('/:id', predefineHabit_controller_1.PredefineHabitController.getSinglePredefineHabit);
exports.PredefineHabitRoute = route;
