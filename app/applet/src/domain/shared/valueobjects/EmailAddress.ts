import { ValidationError } from '../errors/ValidationError';

export class EmailAddress {
    public readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new ValidationError('Email address cannot be empty.');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new ValidationError(`Invalid email address format: ${value}`);
        }
        this.value = value.trim().toLowerCase();
        Object.freeze(this);
    }

    public equals(other: EmailAddress | null | undefined): boolean {
        if (!other) return false;
        return this.value === other.value;
    }
}
