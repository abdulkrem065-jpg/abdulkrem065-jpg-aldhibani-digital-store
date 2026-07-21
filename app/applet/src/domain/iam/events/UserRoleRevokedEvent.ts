import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { UserId } from '../valueobjects/UserId';
import { RoleId } from '../valueobjects/RoleId';

export class UserRoleRevokedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'UserRoleRevokedEvent';

    constructor(
        public readonly userId: UserId,
        public readonly roleId: RoleId
    ) {}
}
