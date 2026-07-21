import { Entity } from '../../../domain/shared/core/Entity';
import { EntityId } from '../../../domain/shared/valueobjects/EntityId';
import { RepositoryError } from '../errors/RepositoryError';

export abstract class InMemoryRepository<TAggregate extends Entity<TId>, TId extends EntityId> {
    protected readonly store: Map<string, TAggregate> = new Map();

    public async findById(id: TId): Promise<TAggregate | null> {
        try {
            const aggregate = this.store.get(id.value);
            return aggregate || null;
        } catch (error) {
            throw new RepositoryError(`Error finding entity by id: ${id.value}`, error as Error);
        }
    }

    public async exists(id: TId): Promise<boolean> {
        try {
            return this.store.has(id.value);
        } catch (error) {
            throw new RepositoryError(`Error checking existence of entity by id: ${id.value}`, error as Error);
        }
    }

    public async save(aggregate: TAggregate): Promise<void> {
        try {
            this.store.set(aggregate.id.value, aggregate);
            
            // Simulating domain event extraction and clearing during persistence
            if ('clearDomainEvents' in aggregate && typeof aggregate.clearDomainEvents === 'function') {
                aggregate.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving entity with id: ${aggregate.id.value}`, error as Error);
        }
    }

    public async delete(id: TId): Promise<void> {
        try {
            this.store.delete(id.value);
        } catch (error) {
            throw new RepositoryError(`Error deleting entity with id: ${id.value}`, error as Error);
        }
    }

    public async findAll(): Promise<TAggregate[]> {
        try {
            return Array.from(this.store.values());
        } catch (error) {
            throw new RepositoryError(`Error retrieving all entities`, error as Error);
        }
    }
}
