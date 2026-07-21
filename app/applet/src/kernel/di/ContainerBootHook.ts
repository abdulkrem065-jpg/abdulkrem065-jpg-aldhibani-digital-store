import { IKernelHook } from '../bootstrap/interfaces';
import { IServiceContainer } from './interfaces';
import { IConfiguration } from '../config/interfaces';
import { ILogger } from '../logger/interfaces';
import { IEventBus } from '../eventbus/interfaces';

export class ContainerBootHook implements IKernelHook {
    public readonly name = 'ContainerBootHook';

    constructor(
        private container: IServiceContainer,
        private config: IConfiguration,
        private logger: ILogger,
        private eventBus: IEventBus
    ) {}

    public async execute(): Promise<void> {
        // Register kernel-managed singleton subsystems into the DI container
        this.container.registerInstance<IConfiguration>('IConfiguration', this.config);
        this.container.registerInstance<ILogger>('ILogger', this.logger);
        this.container.registerInstance<IEventBus>('IEventBus', this.eventBus);
        this.container.registerInstance<IServiceContainer>('IServiceContainer', this.container); // Self-registration for advanced factory uses

        // Build the dependency graph and lock registrations
        this.container.build();
        
        this.logger.info('IoC Container built and registrations frozen.');
    }
}
