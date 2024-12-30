import { NextFunction, Request, RequestHandler, Response } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
export default catchAsync;

/*
 res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });

sendResponse = (res , data) =>{


}


*/
