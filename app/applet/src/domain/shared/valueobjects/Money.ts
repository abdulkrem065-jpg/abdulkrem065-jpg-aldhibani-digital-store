import { ValidationError } from '../errors/ValidationError';
import { Currency } from './Currency';

export class Money {
    public readonly amount: number;
    public readonly currency: Currency;

    constructor(amount: number, currency: Currency) {
        if (amount === null || amount === undefined || isNaN(amount)) {
            throw new ValidationError('Money amount must be a valid number.');
        }
        if (!currency) {
            throw new ValidationError('Money must have a currency.');
        }
        this.amount = amount;
        this.currency = currency;
        Object.freeze(this);
    }

    public add(other: Money): Money {
        if (!this.currency.equals(other.currency)) {
            throw new ValidationError('Cannot add money of different currencies.');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public subtract(other: Money): Money {
        if (!this.currency.equals(other.currency)) {
            throw new ValidationError('Cannot subtract money of different currencies.');
        }
        return new Money(this.amount - other.amount, this.currency);
    }

    public equals(other: Money | null | undefined): boolean {
        if (!other) return false;
        return this.amount === other.amount && this.currency.equals(other.currency);
    }
}
