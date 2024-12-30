import catchAsync from '../../utils/catchAcync';
import { ChatService } from './chat.service';

const createChat = catchAsync(async (req, res) => {
  const result = await ChatService.createChatIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'message send successfully',
    data: result,
  });
});

const getAllChat = catchAsync(async (req, res) => {
  const result = await ChatService.getAllChatFromDB();
  res.status(200).json({
    success: true,
    message: 'message send successfully',
    data: result,
  });
});

const deleteChat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ChatService.deleteChatFormDB(id);
  res.status(200).json({
    success: true,
    message: 'message send successfully',
    data: result,
  });
});

export const ChatController = {
  createChat,
  getAllChat,
  deleteChat,
};
