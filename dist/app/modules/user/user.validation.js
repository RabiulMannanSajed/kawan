"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
//  in the validation use the zod
const zod_1 = require("zod");
exports.createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string(),
        name: zod_1.z.string(),
        password: zod_1.z.string(),
        photo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
        bloodGroup: zod_1.z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        weight: zod_1.z.string().optional(),
        hight: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
    }),
});
exports.updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        photo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
        bloodGroup: zod_1.z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        weight: zod_1.z.string().optional(),
        hight: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
    }),
});
