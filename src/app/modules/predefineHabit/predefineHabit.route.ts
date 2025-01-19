import express from 'express';
import { PredefineHabitController } from './predefineHabit.controller';

const route = express.Router();

route.post(
  '/create-predefineHabit',
  PredefineHabitController.createPredefineHabit,
);

route.get('/', PredefineHabitController.getPredefineHabit);

route.get('/:id', PredefineHabitController.getSinglePredefineHabit);

export const PredefineHabitRoute = route;
