import express, { Express, Router } from 'express';
import { ApiConfigurationLoader } from '../config/ApiConfigurationLoader';
import { ApiBootVerification } from '../verification/ApiBootVerification';
import { RequestPipeline } from '../pipeline/RequestPipeline';
import { ResponsePipeline } from '../pipeline/ResponsePipeline';
import { ExceptionPipeline } from '../pipeline/ExceptionPipeline';
import { ApiRouterManager } from '../routing/ApiRouterManager';
import { RouteRegistry, HttpMethod } from '../routing/RouteRegistry';
import { VersioningArchitecture } from '../routing/VersioningArchitecture';
import { HealthCheckInfrastructure } from '../health/HealthCheckInfrastructure';
import { ApiLifecycleHookManager } from '../lifecycle/ApiLifecycleHook';

export class ApiBootstrap {
    private app: Express;
    private registry: RouteRegistry;
    private lifecycle: ApiLifecycleHookManager;

    constructor() {
        this.app = express();
        this.registry = new RouteRegistry();
        this.lifecycle = new ApiLifecycleHookManager();
    }

    public async run(): Promise<void> {
        await this.lifecycle.triggerStarting();

        const config = ApiConfigurationLoader.load();
        ApiBootVerification.verify(config);

        // Parsers
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        const globalRouter = Router();
        
        RequestPipeline.configure(globalRouter);
        globalRouter.use(ResponsePipeline.intercept);

        // Base Diagnostics
        this.registry.register({
            path: '/health/liveness',
            method: HttpMethod.GET,
            handler: HealthCheckInfrastructure.liveness
        });
        this.registry.register({
            path: '/health/readiness',
            method: HttpMethod.GET,
            handler: HealthCheckInfrastructure.readiness
        });

        // Resolve Router
        const baseRouter = ApiRouterManager.buildRouter(this.registry);
        const versionedRouter = VersioningArchitecture.applyVersion('v1', baseRouter);
        
        globalRouter.use(config.basePath, versionedRouter);

        ExceptionPipeline.configure(globalRouter);

        this.app.use(globalRouter);

        await this.lifecycle.triggerStarted();
    }

    public getApp(): Express {
        return this.app;
    }

    public getRegistry(): RouteRegistry {
        return this.registry;
    }

    public getLifecycleManager(): ApiLifecycleHookManager {
        return this.lifecycle;
    }
}
