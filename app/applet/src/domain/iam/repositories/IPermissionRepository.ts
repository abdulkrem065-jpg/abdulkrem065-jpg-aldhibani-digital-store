import { Permission } from '../aggregates/Permission';
import { PermissionId } from '../valueobjects/PermissionId';

export interface IPermissionRepository {
    findById(id: PermissionId): Promise<Permission | null>;
    exists(id: PermissionId): Promise<boolean>;
    save(permission: Permission): Promise<void>;
    delete(id: PermissionId): Promise<void>;
    findAll(): Promise<Permission[]>;
}
