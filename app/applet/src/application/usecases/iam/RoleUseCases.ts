import { IRoleRepository } from '../../../domain/iam/repositories/IRoleRepository';
import { Role } from '../../../domain/iam/aggregates/Role';
import { RoleId } from '../../../domain/iam/valueobjects/RoleId';
import { OrganizationId } from '../../../domain/shared/valueobjects/OrganizationId';
import { PermissionId } from '../../../domain/iam/valueobjects/PermissionId';
import { ApplicationError } from '../../errors/ApplicationError';

export class CreateRoleUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(id: string, organizationId: string, name: string): Promise<void> {
        const roleId = new RoleId(id);
        if (await this.repository.exists(roleId)) {
            throw new ApplicationError(`Role with id ${id} already exists.`);
        }
        const role = Role.create(roleId, new OrganizationId(organizationId), name);
        await this.repository.save(role);
    }
}

export class GrantPermissionToRoleUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(id: string, permissionId: string): Promise<void> {
        const roleId = new RoleId(id);
        const role = await this.repository.findById(roleId);
        if (!role) {
            throw new ApplicationError(`Role with id ${id} not found.`);
        }
        role.grantPermission(new PermissionId(permissionId));
        await this.repository.save(role);
    }
}

export class RevokePermissionFromRoleUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(id: string, permissionId: string): Promise<void> {
        const roleId = new RoleId(id);
        const role = await this.repository.findById(roleId);
        if (!role) {
            throw new ApplicationError(`Role with id ${id} not found.`);
        }
        role.revokePermission(new PermissionId(permissionId));
        await this.repository.save(role);
    }
}

export class DeleteRoleUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(id: string): Promise<void> {
        const roleId = new RoleId(id);
        if (!(await this.repository.exists(roleId))) {
            throw new ApplicationError(`Role with id ${id} not found.`);
        }
        await this.repository.delete(roleId);
    }
}

export class GetRoleByIdUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(id: string): Promise<Role | null> {
        return this.repository.findById(new RoleId(id));
    }
}

export class GetAllRolesUseCase {
    constructor(private readonly repository: IRoleRepository) {}
    async execute(): Promise<Role[]> {
        return this.repository.findAll();
    }
}
