// src/middleware/apiResponseMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { ApiResponseClass } from "../response/apiResponse";

declare global {
  namespace Express {
    interface Response {
      apiResponse: (
        message: string,
        success: boolean,
        statusCode: number,
        data: any[]
      ) => void;
    }
  }
}

export const apiResponseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.apiResponse = (
    message: string,
    success: boolean,
    statusCode: number,
    data: any[]
  ) => {
    const response = new ApiResponseClass(message, success, statusCode, data);
    res.status(statusCode).json(response);
  };

  next();
};
