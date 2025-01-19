import { RequestHandler } from 'express';
import { HealthServices } from './healthAndNutrition.service';

const createHealth: RequestHandler = async (req, res, next) => {
  try {
    const result = await HealthServices.createHealthIntoDB(req.body);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Health is created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllHealth: RequestHandler = async (req, res, next) => {
  try {
    const result = await HealthServices.getAllHealthFromDB();
    res.status(200).json({
      success: true,
      message: 'health is get successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// TODO: find  by the user ID not the Health ID

const getSingleHealth: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HealthServices.getSingleHealthFormDB(id);
    res.status(200).json({
      success: true,
      message: `this id:${id} of the get successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateHealth: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HealthServices.updateHealthIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: `this id:${id} of the get successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addNewMeal: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HealthServices.addNewMealIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: `this id:${id} of the get successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const findTheCal: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HealthServices.findTheCalFromDB(id, req.body);
    res.status(200).json({
      success: true,
      message: `this id:${id} of the get successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const weighGainOrLoss: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await HealthServices.weighGainOrLossFromDB(id, req.body);
    res.status(200).json({
      success: true,
      message: `this id:${id} of the get successfully`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const HealthController = {
  findTheCal,
  addNewMeal,
  updateHealth,
  createHealth,
  getAllHealth,
  getSingleHealth,
  weighGainOrLoss,
};
