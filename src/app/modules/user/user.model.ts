import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { calculateHight } from '../utils/calculetHight';

//  this work like validation
const UserSchema = new Schema<TUser>(
  {
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
        message:
          "{VALUE} is not valid user this one of them 'male', 'female', 'other'",
      },
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    weight: {
      type: String,
    },
    age: {
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
  },
  {
    timestamps: true,
  },
);

interface UpdateType {
  hight?: string;
}

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateType;
  console.log(update);
  if (update && update.hight) {
    const updatedHeight = await calculateHight(update.hight); // Convert height as needed
    update.hight = updatedHeight;
    this.setUpdate(update); // Apply the updated value
  }
  next();
});

export const User = model<TUser>('user', UserSchema);
