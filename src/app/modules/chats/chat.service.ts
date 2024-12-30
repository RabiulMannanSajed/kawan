import { User } from '../user/user.model';
import { TChat } from './chat.interface';
import { Chat } from './chat.model';

const createChatIntoDB = async (payload: TChat) => {
  console.log(payload);

  // check those email exists or not
  const formEmailExists = await User.findOne({ email: payload.FromEmail });
  if (!formEmailExists) {
    throw new Error('this email dose not exists');
  }

  const toEmailExists = await User.findOne({ email: payload.ToEmail });
  if (!toEmailExists) {
    throw new Error('this email dose not exists');
  }

  const result = await Chat.create(payload);
  return result;
};

const getAllChatFromDB = async () => {
  // don't show those chat which is deleted
  try {
    const result = await Chat.find({ IsDelete: false });
    // const result = await Chat.find();
    return result;
  } catch (error) {
    console.error('Error fetching chats from the database:', error);
    throw error;
  }
};

const deleteChatFormDB = async (id: string) => {
  const result = await Chat.findByIdAndUpdate(
    id,
    { IsDelete: true },
    { new: true },
  );
  console.log(result);
  return result;
};

export const ChatService = {
  createChatIntoDB,
  getAllChatFromDB,
  deleteChatFormDB,
};
