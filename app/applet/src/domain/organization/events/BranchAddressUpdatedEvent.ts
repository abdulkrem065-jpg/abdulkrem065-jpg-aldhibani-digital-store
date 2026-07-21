import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { BranchId } from '../../shared/valueobjects/BranchId';
import { Address } from '../../shared/valueobjects/Address';

export class BranchAddressUpdatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'BranchAddressUpdatedEvent';

    constructor(
        public readonly branchId: BranchId,
        public readonly address: Address
    ) {}
}
