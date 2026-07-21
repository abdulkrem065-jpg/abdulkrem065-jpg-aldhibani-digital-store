import { Request, Response, NextFunction } from 'express';

export class ResponsePipeline {
    public static intercept(req: Request, res: Response, next: NextFunction): void {
        // Intercept responses for global formatting adjustments if necessary
        next();
    }
}
