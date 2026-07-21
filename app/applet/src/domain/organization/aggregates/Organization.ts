import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';
import { ValidationError } from '../../shared/errors/ValidationError';
import { OrganizationCreatedEvent } from '../events/OrganizationCreatedEvent';
import { OrganizationDeactivatedEvent } from '../events/OrganizationDeactivatedEvent';

export class Organization extends AggregateRoot<OrganizationId> {
    private _name: string;
    private _isActive: boolean;

    private constructor(id: OrganizationId, name: string, isActive: boolean) {
        super(id);
        this._name = name;
        this._isActive = isActive;
    }

    public static create(id: OrganizationId, name: string): Organization {
        if (!name || name.trim().length === 0) {
            throw new ValidationError('Organization name cannot be empty');
        }
        const organization = new Organization(id, name.trim(), true);
        organization.addDomainEvent(new OrganizationCreatedEvent(id, name.trim()));
        return organization;
    }

    public deactivate(): void {
        if (!this._isActive) {
            throw new ValidationError('Organization is already inactive');
        }
        this._isActive = false;
        this.addDomainEvent(new OrganizationDeactivatedEvent(this.id));
    }

    public get name(): string {
        return this._name;
    }

    public get isActive(): boolean {
        return this._isActive;
    }
}
