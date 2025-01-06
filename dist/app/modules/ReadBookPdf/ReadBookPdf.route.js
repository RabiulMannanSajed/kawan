"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBookPdfRouters = void 0;
const express_1 = __importDefault(require("express"));
const ReadBookPdf_controller_1 = require("./ReadBookPdf.controller");
const route = express_1.default.Router();
route.post('/create-ReadBookPdf', ReadBookPdf_controller_1.ReadBookPdfController.createReadBookPdf);
route.get('/', ReadBookPdf_controller_1.ReadBookPdfController.getAllReadBook);
route.patch('/:id', ReadBookPdf_controller_1.ReadBookPdfController.deleteReadBookPdf);
route.patch('/:id', ReadBookPdf_controller_1.ReadBookPdfController.favoriteReadBookPdf);
exports.ReadBookPdfRouters = route;
