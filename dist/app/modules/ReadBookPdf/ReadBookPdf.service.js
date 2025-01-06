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
exports.ReadBookPdfService = void 0;
const EBook_model_1 = require("../EBook/EBook.model");
const ReadBookPdf_model_1 = require("./ReadBookPdf.model");
// [
//   URL,
//   URL
// ]
// [
//   {
//     bookUrl,
//     finished
//   }
// ]
const createReadBookPdfIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    console.log(payload.ebookId);
    try {
        //  Fetch the EBook document
        const ebook = yield EBook_model_1.EBook.findById(payload.ebookId);
        if (!ebook || !ebook.book || !Array.isArray(ebook.book)) {
            throw new Error('EBook not found or invalid book field.');
        }
        if (!ebook || !ebook.audio || !Array.isArray(ebook.audio)) {
            throw new Error('EBook not found or invalid audio field.');
        }
        //  Transform the book array to include `finish: false`
        const bookArray = ebook.book.map((pdfUrl) => ({
            pdfUrl,
            finish: false,
        }));
        //  Transform the book array to include `finish: false`
        const audioArray = ebook.audio.map((audioUrl) => ({
            audioUrl,
            finish: false,
        }));
        //  Create the readBook document
        const readBookData = {
            userId: payload.userId,
            ebookId: payload.ebookId,
            book: bookArray,
            audio: audioArray,
            title: ebook.title,
            cover: ebook.cover,
            author: ebook.author,
            rating: ebook.rating,
            category: ebook.category,
        };
        const newReadBook = yield ReadBookPdf_model_1.ReadBookPdf.create(readBookData);
        // console.log('ReadBook document created:', newReadBook);
        return newReadBook;
        // return null;
    }
    catch (error) {
        console.error('Error creating ReadBook document:', error);
        throw error;
    }
});
const getAllReadBookPdfFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ReadBookPdf_model_1.ReadBookPdf.find();
        return result;
    }
    catch (error) {
        console.error('Error fetching chats from the database:', error);
        throw error;
    }
});
const getSingleReadBookPdf = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ReadBookPdf_model_1.ReadBookPdf.findById(id);
    return result;
});
//  to make the book favorite
const updateFavoriteReadBookPdf = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ReadBookPdf_model_1.ReadBookPdf.findByIdAndUpdate(id, { favorite: true }, { new: true });
    return result;
});
const deleteReadBookPdf = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ReadBookPdf_model_1.ReadBookPdf.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return result;
});
exports.ReadBookPdfService = {
    getAllReadBookPdfFromDB,
    deleteReadBookPdf,
    getSingleReadBookPdf,
    createReadBookPdfIntoDB,
    updateFavoriteReadBookPdf,
};
