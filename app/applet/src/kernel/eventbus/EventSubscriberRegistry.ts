import { IEvent, IEventHandler, ISubscriptionOptions } from './interfaces';

export interface RegisteredHandler {
    handler: IEventHandler;
    priority: number;
    filter?: (event: IEvent) => boolean;
}

export class EventSubscriberRegistry {
    private handlers: Map<string, RegisteredHandler[]> = new Map();

    public register(eventName: string, handler: IEventHandler, options: ISubscriptionOptions = {}): void {
        const registeredHandler: RegisteredHandler = {
            handler,
            priority: options.priority ?? 0,
            filter: options.filter
        };

        if (!this.handlers.has(eventName)) {
            this.handlers.set(eventName, []);
        }

        const eventHandlers = this.handlers.get(eventName)!;
        eventHandlers.push(registeredHandler);
        
        // Sort handlers by priority descending (higher priority executes first)
        eventHandlers.sort((a, b) => b.priority - a.priority);
    }

    public unregister(eventName: string, handler: IEventHandler): void {
        const eventHandlers = this.handlers.get(eventName);
        if (eventHandlers) {
            this.handlers.set(
                eventName,
                eventHandlers.filter(h => h.handler !== handler)
            );
        }
    }

    public getHandlers(eventName: string): RegisteredHandler[] {
        return this.handlers.get(eventName) || [];
    }
}
