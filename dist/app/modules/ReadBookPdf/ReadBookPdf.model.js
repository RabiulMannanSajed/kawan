"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadBookPdf = void 0;
const mongoose_1 = require("mongoose");
const ReadBooksPdfSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    ebookId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    title: {
        type: String,
    },
    cover: {
        type: String,
    },
    author: {
        type: String,
    },
    rating: {
        type: Number,
    },
    category: { type: String },
    favorite: {
        type: Boolean,
        default: false,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    book: [
        {
            pdfUrl: { type: String },
            finish: { type: Boolean, default: false },
        },
    ],
    audio: [
        {
            audioUrl: { type: String },
            finish: { type: Boolean, default: false },
        },
    ],
});
exports.ReadBookPdf = (0, mongoose_1.model)('ReadBookPdf', ReadBooksPdfSchema);
