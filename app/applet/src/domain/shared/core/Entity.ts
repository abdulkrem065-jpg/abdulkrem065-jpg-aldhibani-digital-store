import { EntityId } from '../valueobjects/EntityId';

export abstract class Entity<TId extends EntityId> {
    public readonly id: TId;

    protected constructor(id: TId) {
        this.id = id;
    }

    public equals(other: Entity<TId> | null | undefined): boolean {
        if (!other) return false;
        if (this === other) return true;
        return this.id.equals(other.id);
    }
}
