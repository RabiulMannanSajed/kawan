"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const ChatSchema = new mongoose_1.Schema({
    FromEmail: {
        type: String,
        required: [true, 'From Email is required'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{value} is not valid ',
        },
    },
    ToEmail: {
        type: String,
        required: [true, 'To Email is required'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{value} is not valid ',
        },
    },
    Message: {
        type: String,
        required: [true, 'To Email is required'],
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    IsDelete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Chat = (0, mongoose_1.model)('chat', ChatSchema);
