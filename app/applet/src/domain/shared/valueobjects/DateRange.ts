import { ValidationError } from '../errors/ValidationError';

export class DateRange {
    public readonly startDate: Date;
    public readonly endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        if (!startDate) throw new ValidationError('Start date is required.');
        if (!endDate) throw new ValidationError('End date is required.');
        if (startDate.getTime() > endDate.getTime()) {
            throw new ValidationError('Start date cannot be after end date.');
        }
        // Clone dates to ensure immutability
        this.startDate = new Date(startDate.getTime());
        this.endDate = new Date(endDate.getTime());
        Object.freeze(this.startDate);
        Object.freeze(this.endDate);
        Object.freeze(this);
    }

    public contains(date: Date): boolean {
        return date.getTime() >= this.startDate.getTime() && date.getTime() <= this.endDate.getTime();
    }

    public overlaps(other: DateRange): boolean {
        return this.startDate.getTime() <= other.endDate.getTime() && other.startDate.getTime() <= this.endDate.getTime();
    }

    public equals(other: DateRange | null | undefined): boolean {
        if (!other) return false;
        return this.startDate.getTime() === other.startDate.getTime() &&
               this.endDate.getTime() === other.endDate.getTime();
    }
}
