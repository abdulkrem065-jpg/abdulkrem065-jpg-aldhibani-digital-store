import { Entity } from './Entity';
import { EntityId } from '../valueobjects/EntityId';
import { IDomainEvent } from './IDomainEvent';

export abstract class AggregateRoot<TId extends EntityId> extends Entity<TId> {
    private readonly _domainEvents: IDomainEvent[] = [];

    get domainEvents(): ReadonlyArray<IDomainEvent> {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        this._domainEvents.push(domainEvent);
    }

    public clearDomainEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
}
