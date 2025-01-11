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
exports.ChatService = void 0;
const user_model_1 = require("../user/user.model");
const chat_model_1 = require("./chat.model");
const createChatIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check those email exists or not
    const formEmailExists = yield user_model_1.User.findOne({ email: payload.FromEmail });
    if (!formEmailExists) {
        throw new Error('this email dose not exists');
    }
    const toEmailExists = yield user_model_1.User.findOne({ email: payload.ToEmail });
    if (!toEmailExists) {
        throw new Error('this email dose not exists');
    }
    const result = yield chat_model_1.Chat.create(payload);
    return result;
});
const getAllChatFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // don't show those chat which is deleted
    try {
        const result = yield chat_model_1.Chat.find({ IsDelete: false });
        return result;
    }
    catch (error) {
        console.error('Error fetching chats from the database:', error);
        throw error;
    }
});
const deleteChatFormDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield chat_model_1.Chat.findByIdAndUpdate(id, { IsDelete: true }, { new: true });
    console.log(result);
    return result;
});
exports.ChatService = {
    createChatIntoDB,
    getAllChatFromDB,
    deleteChatFormDB,
};
