"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsync;
/*
 res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });

sendResponse = (res , data) =>{


}


*/
