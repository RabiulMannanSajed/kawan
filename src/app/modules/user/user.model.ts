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

//*  this will convert the hight into m
// Pre-findOneAndUpdate middleware for updates
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update && typeof update.hight === 'string') {
    let updateHight = await calculateHight(update.hight);
    update.hight = updateHight;
    this.setUpdate(update); // Apply the updated value
  }

  next();
});

// * here define the table name 'user'
export const User = model<TUser>('user', UserSchema);
