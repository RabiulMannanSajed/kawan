import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { HealthRouters } from '../modules/healthAndNutrition/healthAndNutrition.route';
import { HabitRoutes } from '../modules/habit/habit.route';
import { ChatRoutes } from '../modules/chats/chat.route';
import path from 'path';
import { EBookRouters } from '../modules/EBook/EBook.route';
import { ReadBookPdfRouters } from '../modules/ReadBookPdf/ReadBookPdf.route';
import { PredefineHabitRoute } from '../modules/predefineHabit/predefineHabit.route';
import { UserPredefineHabitRoute } from '../modules/userPredifineHabit/userPredifineHabit.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    route: UserRouters,
  },

  {
    path: '/health',
    route: HealthRouters,
  },

  {
    path: '/habit',
    route: HabitRoutes,
  },

  {
    path: '/chat',
    route: ChatRoutes,
  },
  {
    path: '/ebook',
    route: EBookRouters,
  },
  {
    path: '/readBookPdf',
    route: ReadBookPdfRouters,
  },
  {
    path: '/predefineHabit',
    route: PredefineHabitRoute,
  },
  {
    path: '/userPredefineHabit',
    route: UserPredefineHabitRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
