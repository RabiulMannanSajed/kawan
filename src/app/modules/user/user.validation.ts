//  in the validation use the zod
import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
    photo: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    weight: z.string().optional(),
    hight: z.string().optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    password: z.string().optional(),
    photo: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    weight: z.string().optional(),
    hight: z.string().optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
  }),
});
