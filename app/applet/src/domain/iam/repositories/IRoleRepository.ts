import { Role } from '../aggregates/Role';
import { RoleId } from '../valueobjects/RoleId';

export interface IRoleRepository {
    findById(id: RoleId): Promise<Role | null>;
    exists(id: RoleId): Promise<boolean>;
    save(role: Role): Promise<void>;
    delete(id: RoleId): Promise<void>;
    findAll(): Promise<Role[]>;
}
