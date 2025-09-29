import { NextFunction, Request, Response } from "express";


interface CustomError extends Error {
  status?: number;
}

// Handler 404 Not Found
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error("Endpoint not found");
  error.status = 404;
  next(error);
};

// Handler Error Server
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
