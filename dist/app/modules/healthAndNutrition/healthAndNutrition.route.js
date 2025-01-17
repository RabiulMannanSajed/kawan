"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRouters = void 0;
const express_1 = __importDefault(require("express"));
const healthAndNutrition_controller_1 = require("./healthAndNutrition.controller");
const route = express_1.default.Router();
route.post('/create-health', healthAndNutrition_controller_1.HealthController.createHealth);
route.get('/', healthAndNutrition_controller_1.HealthController.getAllHealth);
route.get('/:id', healthAndNutrition_controller_1.HealthController.getSingleHealth);
route.patch('/:id', healthAndNutrition_controller_1.HealthController.updateHealth); // this with out meal any thing can update
route.patch('/addNewMeal/:id', healthAndNutrition_controller_1.HealthController.addNewMeal);
route.patch('/findTheCal/:id', healthAndNutrition_controller_1.HealthController.findTheCal);
route.patch('/weighGainOrLoss/:id', healthAndNutrition_controller_1.HealthController.weighGainOrLoss);
exports.HealthRouters = route;
