import { Router } from 'express';
import { ErrorMiddleware } from '../middleware/ErrorMiddleware';

export class ExceptionPipeline {
    public static configure(router: Router): void {
        router.use((req, res, next) => {
            const error = new Error('Not Found');
            (error as any).status = 404;
            next(error);
        });

        router.use(ErrorMiddleware.handle);
    }
}
