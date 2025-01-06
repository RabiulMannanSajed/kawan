"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBook = void 0;
const mongoose_1 = require("mongoose");
const EBookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
    },
    cover: {
        type: String,
        required: [true, 'Book Cover is required'],
    },
    author: {
        type: String,
        required: [true, 'Book author is required'],
    },
    rating: {
        type: Number,
        required: [true, 'Book Rating is required in Number'],
    },
    category: {
        type: String,
        required: [true, 'Book category is required'],
    },
    quickSummery: {
        type: String,
        required: [true, 'Book quick summery is required'],
    },
    aboutAuthor: {
        type: String,
        required: [true, 'Book About Author is required'],
    },
    publishDate: {
        type: String,
        required: [true, 'Book publishDate is required'],
    },
    language: {
        type: String,
        required: [true, 'Book language type is required'],
    },
    audio: {
        type: [String],
    },
    book: {
        type: [String],
    },
});
exports.EBook = (0, mongoose_1.model)('ebook', EBookSchema);
