import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';

export class OrganizationCreatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'OrganizationCreatedEvent';

    constructor(
        public readonly organizationId: OrganizationId,
        public readonly name: string
    ) {}
}
