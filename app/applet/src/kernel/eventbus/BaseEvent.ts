import { IEvent, IEventMetadata } from './interfaces';

export abstract class BaseEvent<T = any> implements IEvent<T> {
    public readonly name: string;
    public readonly metadata: IEventMetadata;
    public readonly payload: T;

    constructor(name: string, payload: T, metadata: Partial<IEventMetadata> = {}) {
        this.name = name;
        this.payload = payload;
        this.metadata = {
            id: metadata.id || this.generateId(),
            timestamp: metadata.timestamp || new Date().toISOString(),
            correlationId: metadata.correlationId,
            source: metadata.source
        };
        // Enforce immutability
        Object.freeze(this.metadata);
        Object.freeze(this.payload);
        Object.freeze(this);
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
