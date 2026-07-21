import { Router } from 'express';
import { RouteRegistry } from './RouteRegistry';

export class ApiRouterManager {
    public static buildRouter(registry: RouteRegistry): Router {
        const router = Router();
        
        for (const route of registry.getRoutes()) {
            const handlers = [...(route.middlewares || []), route.handler];
            router[route.method](route.path, ...handlers);
        }

        return router;
    }
}
