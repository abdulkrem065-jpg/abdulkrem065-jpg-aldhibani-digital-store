import { ValidationError } from '../errors/ValidationError';

export class Address {
    public readonly street: string;
    public readonly city: string;
    public readonly state: string;
    public readonly country: string;
    public readonly postalCode: string;

    constructor(street: string, city: string, state: string, country: string, postalCode: string) {
        if (!street || street.trim().length === 0) throw new ValidationError('Street cannot be empty.');
        if (!city || city.trim().length === 0) throw new ValidationError('City cannot be empty.');
        if (!country || country.trim().length === 0) throw new ValidationError('Country cannot be empty.');

        this.street = street.trim();
        this.city = city.trim();
        this.state = state ? state.trim() : '';
        this.country = country.trim();
        this.postalCode = postalCode ? postalCode.trim() : '';
        Object.freeze(this);
    }

    public equals(other: Address | null | undefined): boolean {
        if (!other) return false;
        return this.street === other.street &&
               this.city === other.city &&
               this.state === other.state &&
               this.country === other.country &&
               this.postalCode === other.postalCode;
    }
}
