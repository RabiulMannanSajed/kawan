"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBookService = void 0;
const EBook_model_1 = require("./EBook.model");
const createEBookIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield EBook_model_1.EBook.create(payload);
    return result;
});
const getAllEBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield EBook_model_1.EBook.find();
    return result;
});
exports.EBookService = {
    createEBookIntoDB,
    getAllEBookFromDB,
};
