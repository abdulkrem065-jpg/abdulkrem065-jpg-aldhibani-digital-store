import { RouteRegistry } from '../routing/RouteRegistry';

export interface IApiModule {
    registerRoutes(registry: RouteRegistry): void;
}

export class ApiModuleRegistration {
    public static register(module: IApiModule, registry: RouteRegistry): void {
        module.registerRoutes(registry);
    }
}
