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
exports.ChatController = void 0;
const catchAcync_1 = __importDefault(require("../../utils/catchAcync"));
const chat_service_1 = require("./chat.service");
const createChat = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield chat_service_1.ChatService.createChatIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: 'message send successfully',
        data: result,
    });
}));
const getAllChat = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield chat_service_1.ChatService.getAllChatFromDB();
    res.status(200).json({
        success: true,
        message: 'message send successfully',
        data: result,
    });
}));
const deleteChat = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield chat_service_1.ChatService.deleteChatFormDB(id);
    res.status(200).json({
        success: true,
        message: 'message send successfully',
        data: result,
    });
}));
exports.ChatController = {
    createChat,
    getAllChat,
    deleteChat,
};
