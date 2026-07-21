import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { BranchId } from '../../shared/valueobjects/BranchId';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';

export class BranchCreatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'BranchCreatedEvent';

    constructor(
        public readonly branchId: BranchId,
        public readonly organizationId: OrganizationId,
        public readonly name: string
    ) {}
}
