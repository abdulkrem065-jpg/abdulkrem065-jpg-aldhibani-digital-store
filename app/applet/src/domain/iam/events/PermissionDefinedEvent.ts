import { IDomainEvent } from '../../shared/core/IDomainEvent';
import { PermissionId } from '../valueobjects/PermissionId';

export class PermissionDefinedEvent implements IDomainEvent {
    public readonly occurredOn: Date = new Date();
    public readonly eventName = 'PermissionDefinedEvent';

    constructor(
        public readonly permissionId: PermissionId,
        public readonly resource: string,
        public readonly action: string
    ) {}
}
