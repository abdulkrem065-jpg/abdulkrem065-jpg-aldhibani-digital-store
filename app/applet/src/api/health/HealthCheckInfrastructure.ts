import { Request, Response } from 'express';
import { ResponseFormatter } from '../formatters/ResponseFormatter';

export class HealthCheckInfrastructure {
    public static liveness(req: Request, res: Response): void {
        res.json(ResponseFormatter.success({ status: 'ALIVE', timestamp: new Date().toISOString() }));
    }

    public static readiness(req: Request, res: Response): void {
        res.json(ResponseFormatter.success({ status: 'READY', timestamp: new Date().toISOString() }));
    }
}
