import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { PermissionId } from '../valueobjects/PermissionId';
import { ValidationError } from '../../shared/errors/ValidationError';
import { PermissionDefinedEvent } from '../events/PermissionDefinedEvent';

export class Permission extends AggregateRoot<PermissionId> {
    private _resource: string;
    private _action: string;
    private _description: string;

    private constructor(id: PermissionId, resource: string, action: string, description: string) {
        super(id);
        this._resource = resource;
        this._action = action;
        this._description = description;
    }

    public static define(id: PermissionId, resource: string, action: string, description: string): Permission {
        if (!resource || resource.trim().length === 0) throw new ValidationError('Resource cannot be empty');
        if (!action || action.trim().length === 0) throw new ValidationError('Action cannot be empty');
        
        const permission = new Permission(id, resource.trim(), action.trim(), description ? description.trim() : '');
        permission.addDomainEvent(new PermissionDefinedEvent(id, resource.trim(), action.trim()));
        return permission;
    }

    public get resource(): string { return this._resource; }
    public get action(): string { return this._action; }
    public get description(): string { return this._description; }
}
