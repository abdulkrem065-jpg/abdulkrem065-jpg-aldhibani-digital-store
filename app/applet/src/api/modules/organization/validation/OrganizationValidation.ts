import { Request, Response, NextFunction } from 'express';

export class OrganizationValidation {
    public static validateCreate(req: Request, res: Response, next: NextFunction): void {
        const { name } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            const error = new Error('Organization name is required and must be a string.');
            error.name = 'ValidationError';
            next(error);
            return;
        }
        next();
    }
}
