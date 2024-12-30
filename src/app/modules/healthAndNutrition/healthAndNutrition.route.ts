import express from 'express';
import { HealthController } from './healthAndNutrition.controller';

const route = express.Router();

route.post('/create-health', HealthController.createHealth);

route.get('/', HealthController.getAllHealth);

route.get('/:id', HealthController.getSingleHealth);
route.patch('/:id', HealthController.updateHealth);

export const HealthRouters = route;
