export interface IEventMetadata {
    readonly id: string;
    readonly timestamp: string;
    readonly correlationId?: string;
    readonly source?: string;
}

export interface IEvent<T = any> {
    readonly name: string;
    readonly metadata: IEventMetadata;
    readonly payload: T;
}

export interface IEventHandler<T extends IEvent = IEvent> {
    handle(event: T): Promise<void> | void;
}

export interface ISubscription {
    unsubscribe(): void;
}

export interface ISubscriptionOptions {
    priority?: number;
    filter?: (event: IEvent) => boolean;
}

export interface IEventBus {
    subscribe<T extends IEvent>(eventName: string, handler: IEventHandler<T>, options?: ISubscriptionOptions): ISubscription;
    dispatch<T extends IEvent>(event: T): Promise<void>;
    dispatchAsync<T extends IEvent>(event: T): void;
}
