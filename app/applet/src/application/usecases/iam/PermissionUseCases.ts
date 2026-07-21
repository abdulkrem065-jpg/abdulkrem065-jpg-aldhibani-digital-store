import { IPermissionRepository } from '../../../domain/iam/repositories/IPermissionRepository';
import { Permission } from '../../../domain/iam/aggregates/Permission';
import { PermissionId } from '../../../domain/iam/valueobjects/PermissionId';
import { ApplicationError } from '../../errors/ApplicationError';

export class DefinePermissionUseCase {
    constructor(private readonly repository: IPermissionRepository) {}
    async execute(id: string, resource: string, action: string, description: string): Promise<void> {
        const permissionId = new PermissionId(id);
        if (await this.repository.exists(permissionId)) {
            throw new ApplicationError(`Permission with id ${id} already exists.`);
        }
        const permission = Permission.define(permissionId, resource, action, description);
        await this.repository.save(permission);
    }
}

export class DeletePermissionUseCase {
    constructor(private readonly repository: IPermissionRepository) {}
    async execute(id: string): Promise<void> {
        const permissionId = new PermissionId(id);
        if (!(await this.repository.exists(permissionId))) {
            throw new ApplicationError(`Permission with id ${id} not found.`);
        }
        await this.repository.delete(permissionId);
    }
}

export class GetPermissionByIdUseCase {
    constructor(private readonly repository: IPermissionRepository) {}
    async execute(id: string): Promise<Permission | null> {
        return this.repository.findById(new PermissionId(id));
    }
}

export class GetAllPermissionsUseCase {
    constructor(private readonly repository: IPermissionRepository) {}
    async execute(): Promise<Permission[]> {
        return this.repository.findAll();
    }
}
