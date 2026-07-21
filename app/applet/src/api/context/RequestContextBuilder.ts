import { Request } from 'express';

export interface RequestContext {
    requestId: string;
    userId?: string;
    tenantId?: string;
    clientIp: string;
    userAgent: string;
    timestamp: Date;
}

export class RequestContextBuilder {
    public static build(req: Request): RequestContext {
        return {
            requestId: (req.headers['x-request-id'] as string) || crypto.randomUUID(),
            userId: req.headers['x-user-id'] as string | undefined,
            tenantId: req.headers['x-tenant-id'] as string | undefined,
            clientIp: req.ip || req.socket.remoteAddress || 'unknown',
            userAgent: req.get('user-agent') || 'unknown',
            timestamp: new Date()
        };
    }
}
