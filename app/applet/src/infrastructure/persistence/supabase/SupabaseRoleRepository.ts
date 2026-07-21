import { SupabaseClient } from '@supabase/supabase-js';
import { IRoleRepository } from '../../../../domain/iam/repositories/IRoleRepository';
import { Role } from '../../../../domain/iam/aggregates/Role';
import { RoleId } from '../../../../domain/iam/valueobjects/RoleId';
import { OrganizationId } from '../../../../domain/shared/valueobjects/OrganizationId';
import { PermissionId } from '../../../../domain/iam/valueobjects/PermissionId';
import { RepositoryError } from '../errors/RepositoryError';

export class SupabaseRoleRepository implements IRoleRepository {
    constructor(private readonly supabase: SupabaseClient) {}

    private toDomain(record: any): Role {
        const role = Object.create(Role.prototype);
        Object.assign(role, {
            id: new RoleId(record.id),
            _organizationId: new OrganizationId(record.organization_id),
            _name: record.name,
            _permissionIds: (record.permission_ids || []).map((pId: string) => new PermissionId(pId)),
            _domainEvents: []
        });
        return role;
    }

    private toPersistence(role: Role): any {
        return {
            id: role.id.value,
            organization_id: role.organizationId.value,
            name: role.name,
            permission_ids: role.permissionIds.map(p => p.value)
        };
    }

    async findById(id: RoleId): Promise<Role | null> {
        try {
            const { data, error } = await this.supabase
                .from('roles')
                .select('*')
                .eq('id', id.value)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw error;
            }

            return data ? this.toDomain(data) : null;
        } catch (error) {
            throw new RepositoryError(`Error finding role by id: ${id.value}`, error as Error);
        }
    }

    async exists(id: RoleId): Promise<boolean> {
        try {
            const { count, error } = await this.supabase
                .from('roles')
                .select('*', { count: 'exact', head: true })
                .eq('id', id.value);

            if (error) throw error;
            return (count ?? 0) > 0;
        } catch (error) {
            throw new RepositoryError(`Error checking role existence: ${id.value}`, error as Error);
        }
    }

    async save(role: Role): Promise<void> {
        try {
            const record = this.toPersistence(role);
            const { error } = await this.supabase
                .from('roles')
                .upsert(record);

            if (error) throw error;

            if ('clearDomainEvents' in role && typeof role.clearDomainEvents === 'function') {
                role.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving role: ${role.id.value}`, error as Error);
        }
    }

    async delete(id: RoleId): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('roles')
                .delete()
                .eq('id', id.value);

            if (error) throw error;
        } catch (error) {
            throw new RepositoryError(`Error deleting role: ${id.value}`, error as Error);
        }
    }

    async findAll(): Promise<Role[]> {
        try {
            const { data, error } = await this.supabase
                .from('roles')
                .select('*');

            if (error) throw error;
            return (data || []).map(record => this.toDomain(record));
        } catch (error) {
            throw new RepositoryError('Error fetching all roles', error as Error);
        }
    }
}
