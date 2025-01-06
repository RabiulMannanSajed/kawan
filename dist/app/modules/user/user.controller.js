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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const catchAcync_1 = __importDefault(require("../../utils/catchAcync"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.createUserIntoDB(req.body);
        res.status(200).json({
            success: true,
            message: 'user is created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAllUserFromDB();
    //   res.status(200).json({
    //     success: true,
    //     message: 'all user data',
    //     date: result,
    //   });
    res.send(result);
}));
const getSingleUser = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserServices.getSingleUserFromDb(id);
    res.send(result);
}));
const updateUser = (0, catchAcync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.UserServices.updateUserIntoDB(id, req.body);
    res.send(result);
}));
exports.UserControllers = {
    getSingleUser,
    createUser,
    getAllUser,
    updateUser,
};
