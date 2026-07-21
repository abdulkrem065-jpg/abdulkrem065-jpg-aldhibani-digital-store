import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { BranchId } from '../../shared/valueobjects/BranchId';

export class BranchDeactivatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'BranchDeactivatedEvent';

    constructor(
        public readonly branchId: BranchId
    ) {}
}
