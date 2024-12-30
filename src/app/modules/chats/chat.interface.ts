import { Types } from 'mongoose';

export type TChat = {
  FromEmail: string;

  ToEmail: string;

  Message: string;

  isRead?: boolean;

  IsDelete?: boolean;
};
