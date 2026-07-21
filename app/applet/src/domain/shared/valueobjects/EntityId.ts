import { ValidationError } from '../errors/ValidationError';

export class EntityId {
    public readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new ValidationError('EntityId cannot be empty');
        }
        this.value = value.trim();
        Object.freeze(this);
    }

    public equals(other: EntityId | null | undefined): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
