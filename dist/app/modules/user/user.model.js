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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const calculetHight_1 = require("../utils/calculetHight");
//  this work like validation
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    photo: {
        type: String,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: "{VALUE} is not valid user this one of them 'male', 'female', 'other'",
        },
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    weight: {
        type: String,
    },
    hight: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    contactNo: {
        type: String,
    },
}, {
    timestamps: true,
});
//*  this will convert the hight into m
// Pre-findOneAndUpdate middleware for updates
UserSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        if (update && typeof update.hight === 'string') {
            let updateHight = yield (0, calculetHight_1.calculateHight)(update.hight);
            update.hight = updateHight;
            this.setUpdate(update); // Apply the updated value
        }
        next();
    });
});
// * here define the table name 'user'
exports.User = (0, mongoose_1.model)('user', UserSchema);
