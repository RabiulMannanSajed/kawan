import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAcync';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  //   res.status(200).json({
  //     success: true,
  //     message: 'all user data',
  //     date: result,
  //   });

  res.send(result);
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.updateUserIntoDB(id, req.body);

  res.send(result);
});

export const UserControllers = {
  createUser,
  getAllUser,
  updateUser,
};
