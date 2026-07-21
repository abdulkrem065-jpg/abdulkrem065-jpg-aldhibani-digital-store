import { ValidationError } from '../errors/ValidationError';

export class PersonName {
    public readonly firstName: string;
    public readonly lastName: string;

    constructor(firstName: string, lastName: string) {
        if (!firstName || firstName.trim().length === 0) {
            throw new ValidationError('First name cannot be empty.');
        }
        if (!lastName || lastName.trim().length === 0) {
            throw new ValidationError('Last name cannot be empty.');
        }
        this.firstName = firstName.trim();
        this.lastName = lastName.trim();
        Object.freeze(this);
    }

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public equals(other: PersonName | null | undefined): boolean {
        if (!other) return false;
        return this.firstName === other.firstName && this.lastName === other.lastName;
    }
}
