import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { RoleId } from '../valueobjects/RoleId';
import { PermissionId } from '../valueobjects/PermissionId';

export class RolePermissionRevokedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'RolePermissionRevokedEvent';

    constructor(
        public readonly roleId: RoleId,
        public readonly permissionId: PermissionId
    ) {}
}
