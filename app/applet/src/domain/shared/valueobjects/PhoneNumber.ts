import { ValidationError } from '../errors/ValidationError';

export class PhoneNumber {
    public readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new ValidationError('Phone number cannot be empty.');
        }
        // Basic validation: allows +, digits, spaces, hyphens, and parentheses.
        const phoneRegex = /^[+]?[\d\s\-()]{7,20}$/;
        if (!phoneRegex.test(value)) {
            throw new ValidationError(`Invalid phone number format: ${value}`);
        }
        this.value = value.trim();
        Object.freeze(this);
    }

    public equals(other: PhoneNumber | null | undefined): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
