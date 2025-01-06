"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookRouters = void 0;
const express_1 = require("express");
const EBook_controller_1 = require("./EBook.controller");
const route = (0, express_1.Router)();
route.post('/create-ebook', EBook_controller_1.EBookController.createEbook);
route.get('/', EBook_controller_1.EBookController.getAllEbook);
exports.EBookRouters = route;
