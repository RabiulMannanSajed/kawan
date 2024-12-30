"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("./chat.controller");
const route = express_1.default.Router();
route.post('/create-chat', chat_controller_1.ChatController.createChat);
route.get('/', chat_controller_1.ChatController.getAllChat);
route.patch('/:id', chat_controller_1.ChatController.deleteChat);
exports.ChatRoutes = route;
