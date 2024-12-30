"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookRouters = void 0;
const express_1 = __importDefault(require("express"));
const EBook_controller_1 = require("./EBook.controller");
const route = express_1.default.Router();
route.post('/create-ebook', EBook_controller_1.EBookController.createEbook);
route.get('/', EBook_controller_1.EBookController.getAllEbook);
exports.EBookRouters = route;
