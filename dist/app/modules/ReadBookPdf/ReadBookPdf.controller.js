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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBookPdfController = void 0;
const catchAcync_1 = __importDefault(require("../../utils/catchAcync"));
const ReadBookPdf_service_1 = require("./ReadBookPdf.service");
const createReadBookPdf = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ReadBookPdf_service_1.ReadBookPdfService.createReadBookPdfIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'Book marked  successfully',
        data: result,
    });
}));
const getAllReadBook = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ReadBookPdf_service_1.ReadBookPdfService.getAllReadBookPdfFromDB();
    res.status(200).json({
        success: true,
        message: 'All books are getS  successfully',
        data: result,
    });
}));
const getSingleReadBookPdf = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ReadBookPdf_service_1.ReadBookPdfService.getSingleReadBookPdf(id);
    res.status(200).json({
        success: true,
        message: 'All books are getS  successfully',
        data: result,
    });
}));
const favoriteReadBookPdf = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ReadBookPdf_service_1.ReadBookPdfService.updateFavoriteReadBookPdf(id);
    res.status(200).json({
        success: true,
        message: 'Favorite make successfully',
        data: result,
    });
}));
//  this is will work as soft delete
const deleteReadBookPdf = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield ReadBookPdf_service_1.ReadBookPdfService.deleteReadBookPdf(id);
    res.status(200).json({
        success: true,
        message: 'All books are get successfully',
        data: result,
    });
}));
exports.ReadBookPdfController = {
    getSingleReadBookPdf,
    favoriteReadBookPdf,
    createReadBookPdf,
    deleteReadBookPdf,
    getAllReadBook,
};
