"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const healthAndNutrition_route_1 = require("../modules/healthAndNutrition/healthAndNutrition.route");
const habit_route_1 = require("../modules/habit/habit.route");
const chat_route_1 = require("../modules/chats/chat.route");
const EBook_route_1 = require("../modules/EBook/EBook.route");
const ReadBookPdf_route_1 = require("../modules/ReadBookPdf/ReadBookPdf.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.UserRouters,
    },
    {
        path: '/health',
        route: healthAndNutrition_route_1.HealthRouters,
    },
    {
        path: '/habit',
        route: habit_route_1.HabitRoutes,
    },
    {
        path: '/chat',
        route: chat_route_1.ChatRoutes,
    },
    {
        path: '/ebook',
        route: EBook_route_1.EBookRouters,
    },
    {
        path: '/readBookPdf',
        route: ReadBookPdf_route_1.ReadBookPdfRouters,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
