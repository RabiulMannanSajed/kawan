"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBookPdf = void 0;
const mongoose_1 = require("mongoose");
const ReadBooksPdfSchema = new mongoose_1.Schema({
    userEmail: {
        // type: String,
        type: mongoose_1.Schema.Types.ObjectId,
    },
    ebookId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
});
exports.ReadBookPdf = (0, mongoose_1.model)('ReadBookPdf', ReadBooksPdfSchema);
