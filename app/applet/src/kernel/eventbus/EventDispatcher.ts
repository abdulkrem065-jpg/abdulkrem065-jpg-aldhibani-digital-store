import { IEvent, IEventBus, IEventHandler, ISubscription, ISubscriptionOptions } from './interfaces';
import { EventSubscriberRegistry } from './EventSubscriberRegistry';
import { ILogger } from '../logger/interfaces';

export class EventDispatcher implements IEventBus {
    private readonly MAX_DISPATCH_DEPTH = 10;
    private dispatchDepth: number = 0;

    constructor(
        private registry: EventSubscriberRegistry,
        private logger: ILogger
    ) {}

    public subscribe<T extends IEvent>(eventName: string, handler: IEventHandler<T>, options?: ISubscriptionOptions): ISubscription {
        this.registry.register(eventName, handler as IEventHandler, options);
        
        return {
            unsubscribe: () => {
                this.registry.unregister(eventName, handler as IEventHandler);
            }
        };
    }

    public async dispatch<T extends IEvent>(event: T): Promise<void> {
        if (this.dispatchDepth >= this.MAX_DISPATCH_DEPTH) {
            this.logger.error(`[EventBus] Circular dispatch detected for event: ${event.name}`);
            return;
        }

        this.dispatchDepth++;
        
        try {
            const handlers = this.registry.getHandlers(event.name);
            
            if (handlers.length === 0) {
                this.logger.debug(`[EventBus] Dead-event detected (no subscribers) for: ${event.name}`);
                return;
            }

            for (const registered of handlers) {
                try {
                    if (registered.filter && !registered.filter(event)) {
                        continue;
                    }
                    await registered.handler.handle(event);
                } catch (error) {
                    this.logger.error(`[EventBus] Handler failed for event ${event.name}`, error as Error, {
                        eventId: event.metadata.id,
                        correlationId: event.metadata.correlationId
                    });
                    // Failure isolation: Do not stop subsequent handlers from executing
                }
            }
        } finally {
            this.dispatchDepth--;
        }
    }

    public dispatchAsync<T extends IEvent>(event: T): void {
        // Fire and forget, ensuring it doesn't block the caller
        setImmediate(() => {
            this.dispatch(event).catch(error => {
                this.logger.error(`[EventBus] Unhandled error in async dispatch for event ${event.name}`, error as Error);
            });
        });
    }
}
