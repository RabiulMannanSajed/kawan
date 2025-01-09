import express from 'express';
import { HealthController } from './healthAndNutrition.controller';

const route = express.Router();

route.post('/create-health', HealthController.createHealth);

route.get('/', HealthController.getAllHealth);

route.get('/:id', HealthController.getSingleHealth);

route.patch('/:id', HealthController.updateHealth); // this with out meal any thing can update

// route.patch('/addNewMeal/:id', HealthController.addNewMeal);

export const HealthRouters = route;
