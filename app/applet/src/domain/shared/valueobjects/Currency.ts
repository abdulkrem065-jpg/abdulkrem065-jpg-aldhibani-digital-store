import { ValidationError } from '../errors/ValidationError';

export class Currency {
    public readonly code: string;

    constructor(code: string) {
        if (!code || code.trim().length !== 3) {
            throw new ValidationError('Currency code must be exactly 3 characters.');
        }
        this.code = code.trim().toUpperCase();
        Object.freeze(this);
    }

    public equals(other: Currency | null | undefined): boolean {
        if (!other) return false;
        return this.code === other.code;
    }
}
