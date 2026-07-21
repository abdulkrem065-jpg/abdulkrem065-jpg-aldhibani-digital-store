import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { UserId } from '../valueobjects/UserId';
import { RoleId } from '../valueobjects/RoleId';

export class UserRoleAssignedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'UserRoleAssignedEvent';

    constructor(
        public readonly userId: UserId,
        public readonly roleId: RoleId
    ) {}
}
