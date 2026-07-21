import { ValidationError } from '../errors/ValidationError';

export class Percentage {
    public readonly value: number;

    constructor(value: number) {
        if (value === null || value === undefined || isNaN(value)) {
            throw new ValidationError('Percentage must be a valid number.');
        }
        if (value < 0 || value > 100) {
            throw new ValidationError('Percentage must be between 0 and 100.');
        }
        this.value = value;
        Object.freeze(this);
    }

    public equals(other: Percentage | null | undefined): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
