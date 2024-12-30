import { model, Schema } from 'mongoose';
import { TChat } from './chat.interface';
import validator from 'validator';

const ChatSchema = new Schema<TChat>(
  {
    FromEmail: {
      type: String,
      required: [true, 'From Email is required'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{value} is not valid ',
      },
    },
    ToEmail: {
      type: String,
      required: [true, 'To Email is required'],
      validate: {
        validator: (value: string) => validator.isEmail(value),
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
  },
  {
    timestamps: true,
  },
);

export const Chat = model<TChat>('chat', ChatSchema);
