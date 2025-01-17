"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post('/create-user', user_controller_1.UserControllers.createUser);
route.get('/', user_controller_1.UserControllers.getAllUser);
route.get('/:id', user_controller_1.UserControllers.getSingleUser);
route.patch('/:id', user_controller_1.UserControllers.updateUser);
exports.UserRouters = route;
