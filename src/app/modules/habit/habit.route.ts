import express from 'express';

import { HabitController } from './habit.controller';

const route = express.Router();

route.post('/create-habit', HabitController.CreteHabit);

route.get('/', HabitController.getAllHabit);

route.get('/:id', HabitController.getSingleHabit);

route.patch('/:id', HabitController.updateHabit);

route.put('/:id/:habitId', HabitController.updateExistsHabitDate);

export const HabitRoutes = route;
