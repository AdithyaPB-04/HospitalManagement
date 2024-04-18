// import { Request, Response, NextFunction } from "express";

// export class ErrorHandler extends Error {
//     statusCode: number;
//     constructor(message: string, statusCode: number) {
//         super(message);
//         this.statusCode = statusCode;
//     }
// }

// export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
//     err.message = err.message || "Internal Server Error";
//     err.statusCode = err.statusCode || 500;

//     if (err.code === 11000) {
//         const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//         err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "JsonWebTokenError") {
//         const message = `Json Web Token is invalid, Try Again!`;
//         err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "TokenExpiredError") {
//         const message = `Json Web Token is Expired, Try Again!`;
//         err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "CastError") {
//         const message = `Invalid ${err.path}`;
//         err = new ErrorHandler(message, 400);
//     }
//     return res.status(err.statusCode).json({
//         message: err.message
//     });
// };
