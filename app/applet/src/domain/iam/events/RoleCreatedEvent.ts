import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { RoleId } from '../valueobjects/RoleId';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';

export class RoleCreatedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'RoleCreatedEvent';

    constructor(
        public readonly roleId: RoleId,
        public readonly organizationId: OrganizationId,
        public readonly name: string
    ) {}
}
