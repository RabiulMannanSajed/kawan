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
exports.HealthController = void 0;
const healthAndNutrition_service_1 = require("./healthAndNutrition.service");
const createHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield healthAndNutrition_service_1.HealthServices.createHealthIntoDB(req.body);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Health is created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield healthAndNutrition_service_1.HealthServices.getAllHealthFromDB();
        res.status(200).json({
            success: true,
            message: 'health is get successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// TODO: find  by the user ID not the Health ID
const getSingleHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield healthAndNutrition_service_1.HealthServices.getSingleHealthFormDB(id);
        res.status(200).json({
            success: true,
            message: `this id:${id} of the get successfully`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield healthAndNutrition_service_1.HealthServices.updateHealthIntoDB(id, req.body);
        res.status(200).json({
            success: true,
            message: `this id:${id} of the get successfully`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const addNewMeal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield healthAndNutrition_service_1.HealthServices.addNewMealIntoDB(id, req.body);
        res.status(200).json({
            success: true,
            message: `this id:${id} of the get successfully`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const findTheCal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield healthAndNutrition_service_1.HealthServices.findTheCalFromDB(id, req.body);
        res.status(200).json({
            success: true,
            message: `this id:${id} of the get successfully`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const weighGainOrLoss = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield healthAndNutrition_service_1.HealthServices.weighGainOrLossFromDB(id, req.body);
        res.status(200).json({
            success: true,
            message: `this id:${id} of the get successfully`,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.HealthController = {
    findTheCal,
    addNewMeal,
    updateHealth,
    createHealth,
    getAllHealth,
    getSingleHealth,
    weighGainOrLoss,
};
