import { NextFunction, Request, Response } from "express";
import {
  ClassNotFoundException,
  InvalidRequestBodyException,
  StudentAlreadyEnrolledException,
  StudentNotFoundException,
} from "./exceptions";
import Errors from "./constants";

type ErrorHandlerType = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => Response;

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof InvalidRequestBodyException) {
    return res.status(400).json({
      error: Errors.ValidationError,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof StudentNotFoundException) {
    return res.status(404).json({
      error: Errors.StudentNotFound,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  if (error instanceof ClassNotFoundException) {
    return res.status(404).json({
      error: Errors.ClassNotFound,
      data: undefined,
      success: false,
    });
  }

  if (error instanceof StudentAlreadyEnrolledException) {
    return res.status(400).json({
      error: Errors.StudentAlreadyEnrolled,
      data: undefined,
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    error: Errors.ServerError,
    data: undefined,
    success: false,
    message: error.message,
  });
}

export { errorHandler, ErrorHandlerType };
