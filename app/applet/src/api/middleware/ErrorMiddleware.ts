import { Request, Response, NextFunction } from 'express';
import { ResponseFormatter } from '../formatters/ResponseFormatter';
import { ApplicationError } from '../../application/errors/ApplicationError';

export class ErrorMiddleware {
    public static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(`[ErrorMiddleware] ${err.name}: ${err.message}`, err.stack);
        
        let statusCode = 500;
        let errorCode = 'INTERNAL_SERVER_ERROR';

        if (err instanceof ApplicationError) {
            statusCode = 400;
            errorCode = 'APPLICATION_ERROR';
        } else if (err.name === 'ValidationError') {
            statusCode = 422;
            errorCode = 'VALIDATION_ERROR';
        }

        const response = ResponseFormatter.error(err.message, errorCode);
        res.status(statusCode).json(response);
    }
}
