import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';

export class OrganizationDeactivatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'OrganizationDeactivatedEvent';

    constructor(
        public readonly organizationId: OrganizationId
    ) {}
}
