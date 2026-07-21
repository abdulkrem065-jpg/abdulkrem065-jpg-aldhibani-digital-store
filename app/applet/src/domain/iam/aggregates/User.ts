import { AggregateRoot } from '../../shared/core/AggregateRoot';
import { UserId } from '../valueobjects/UserId';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';
import { EmailAddress } from '../../shared/valueobjects/EmailAddress';
import { PersonName } from '../../shared/valueobjects/PersonName';
import { RoleId } from '../valueobjects/RoleId';
import { ValidationError } from '../../shared/errors/ValidationError';
import { UserRegisteredEvent } from '../events/UserRegisteredEvent';
import { UserRoleAssignedEvent } from '../events/UserRoleAssignedEvent';
import { UserRoleRevokedEvent } from '../events/UserRoleRevokedEvent';

export class User extends AggregateRoot<UserId> {
    private _organizationId: OrganizationId;
    private _email: EmailAddress;
    private _name: PersonName;
    private _roleIds: RoleId[];
    private _isActive: boolean;

    private constructor(
        id: UserId, 
        organizationId: OrganizationId, 
        email: EmailAddress, 
        name: PersonName, 
        roleIds: RoleId[], 
        isActive: boolean
    ) {
        super(id);
        this._organizationId = organizationId;
        this._email = email;
        this._name = name;
        this._roleIds = [...roleIds];
        this._isActive = isActive;
    }

    public static register(id: UserId, organizationId: OrganizationId, email: EmailAddress, name: PersonName): User {
        const user = new User(id, organizationId, email, name, [], true);
        user.addDomainEvent(new UserRegisteredEvent(id, organizationId, email));
        return user;
    }

    public assignRole(roleId: RoleId): void {
        if (this._roleIds.some(r => r.equals(roleId))) {
            throw new ValidationError('User already has this role assigned');
        }
        this._roleIds.push(roleId);
        this.addDomainEvent(new UserRoleAssignedEvent(this.id, roleId));
    }

    public revokeRole(roleId: RoleId): void {
        const index = this._roleIds.findIndex(r => r.equals(roleId));
        if (index === -1) {
            throw new ValidationError('User does not have this role assigned');
        }
        this._roleIds.splice(index, 1);
        this.addDomainEvent(new UserRoleRevokedEvent(this.id, roleId));
    }

    public get organizationId(): OrganizationId { return this._organizationId; }
    public get email(): EmailAddress { return this._email; }
    public get name(): PersonName { return this._name; }
    public get roleIds(): ReadonlyArray<RoleId> { return this._roleIds; }
    public get isActive(): boolean { return this._isActive; }
}
