import { IKernelHook } from '../bootstrap/interfaces';
import { EventDispatcher } from './EventDispatcher';
import { EventSubscriberRegistry } from './EventSubscriberRegistry';
import { ILogger } from '../logger/interfaces';
import { IEventBus } from './interfaces';

export class EventBusBootHook implements IKernelHook {
    public readonly name = 'EventBusBootHook';
    public eventBus: IEventBus | null = null;

    constructor(
        private logger: ILogger
    ) {}

    public async execute(): Promise<void> {
        const registry = new EventSubscriberRegistry();
        this.eventBus = new EventDispatcher(registry, this.logger);
        
        this.logger.info('Event Bus subsystem initialized successfully.');
    }
}
