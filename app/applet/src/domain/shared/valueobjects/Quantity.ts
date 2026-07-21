import { ValidationError } from '../errors/ValidationError';

export class Quantity {
    public readonly value: number;

    constructor(value: number) {
        if (value === null || value === undefined || isNaN(value)) {
            throw new ValidationError('Quantity must be a valid number.');
        }
        if (value < 0) {
            throw new ValidationError('Quantity cannot be negative.');
        }
        this.value = value;
        Object.freeze(this);
    }

    public add(other: Quantity): Quantity {
        return new Quantity(this.value + other.value);
    }

    public subtract(other: Quantity): Quantity {
        const newValue = this.value - other.value;
        if (newValue < 0) {
            throw new ValidationError('Subtraction results in negative quantity.');
        }
        return new Quantity(newValue);
    }

    public equals(other: Quantity | null | undefined): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
