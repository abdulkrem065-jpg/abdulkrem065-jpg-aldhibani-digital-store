import { Request, Response, NextFunction } from 'express';

export class ValidationEntryLayer {
    public static validateSchema(schema: any) {
        return (req: Request, res: Response, next: NextFunction): void => {
            // Foundation for request DTO/Schema validation (e.g. via Zod)
            next();
        };
    }
}
