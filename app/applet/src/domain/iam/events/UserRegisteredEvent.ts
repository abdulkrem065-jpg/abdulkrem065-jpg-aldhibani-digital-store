import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { UserId } from '../valueobjects/UserId';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';
import { EmailAddress } from '../../shared/valueobjects/EmailAddress';

export class UserRegisteredEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'UserRegisteredEvent';

    constructor(
        public readonly userId: UserId,
        public readonly organizationId: OrganizationId,
        public readonly email: EmailAddress
    ) {}
}
