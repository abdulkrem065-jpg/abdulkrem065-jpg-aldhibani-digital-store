import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { BranchId } from '../../shared/valueobjects/BranchId';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';
import { Address } from '../../shared/valueobjects/Address';
import { ValidationError } from '../../shared/errors/ValidationError';
import { BranchCreatedEvent } from '../events/BranchCreatedEvent';
import { BranchAddressUpdatedEvent } from '../events/BranchAddressUpdatedEvent';
import { BranchDeactivatedEvent } from '../events/BranchDeactivatedEvent';

export class Branch extends AggregateRoot<BranchId> {
    private _organizationId: OrganizationId;
    private _name: string;
    private _address: Address;
    private _isActive: boolean;

    private constructor(id: BranchId, organizationId: OrganizationId, name: string, address: Address, isActive: boolean) {
        super(id);
        this._organizationId = organizationId;
        this._name = name;
        this._address = address;
        this._isActive = isActive;
    }

    public static create(id: BranchId, organizationId: OrganizationId, name: string, address: Address): Branch {
        if (!name || name.trim().length === 0) {
            throw new ValidationError('Branch name cannot be empty');
        }
        if (!address) {
            throw new ValidationError('Branch address must be provided');
        }
        const branch = new Branch(id, organizationId, name.trim(), address, true);
        branch.addDomainEvent(new BranchCreatedEvent(id, organizationId, name.trim()));
        return branch;
    }

    public updateAddress(newAddress: Address): void {
        if (!newAddress) {
            throw new ValidationError('New address cannot be null');
        }
        this._address = newAddress;
        this.addDomainEvent(new BranchAddressUpdatedEvent(this.id, newAddress));
    }

    public deactivate(): void {
        if (!this._isActive) {
            throw new ValidationError('Branch is already inactive');
        }
        this._isActive = false;
        this.addDomainEvent(new BranchDeactivatedEvent(this.id));
    }

    public get organizationId(): OrganizationId { return this._organizationId; }
    public get name(): string { return this._name; }
    public get address(): Address { return this._address; }
    public get isActive(): boolean { return this._isActive; }
}
