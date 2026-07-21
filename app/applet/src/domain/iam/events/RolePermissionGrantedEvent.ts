import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { RoleId } from '../valueobjects/RoleId';
import { PermissionId } from '../valueobjects/PermissionId';

export class RolePermissionGrantedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'RolePermissionGrantedEvent';

    constructor(
        public readonly roleId: RoleId,
        public readonly permissionId: PermissionId
    ) {}
}
