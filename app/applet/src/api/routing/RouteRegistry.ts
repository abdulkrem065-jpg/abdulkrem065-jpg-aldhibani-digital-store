import { RequestHandler } from 'express';

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch'
}

export interface RouteDefinition {
    path: string;
    method: HttpMethod;
    handler: RequestHandler;
    middlewares?: RequestHandler[];
}

export class RouteRegistry {
    private routes: RouteDefinition[] = [];

    public register(route: RouteDefinition): void {
        this.routes.push(route);
    }

    public getRoutes(): RouteDefinition[] {
        return this.routes;
    }
}
