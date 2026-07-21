import { SupabaseClient } from '@supabase/supabase-js';
import { IPermissionRepository } from '../../../../domain/iam/repositories/IPermissionRepository';
import { Permission } from '../../../../domain/iam/aggregates/Permission';
import { PermissionId } from '../../../../domain/iam/valueobjects/PermissionId';
import { RepositoryError } from '../errors/RepositoryError';

export class SupabasePermissionRepository implements IPermissionRepository {
    constructor(private readonly supabase: SupabaseClient) {}

    private toDomain(record: any): Permission {
        const permission = Object.create(Permission.prototype);
        Object.assign(permission, {
            id: new PermissionId(record.id),
            _resource: record.resource,
            _action: record.action,
            _description: record.description,
            _domainEvents: []
        });
        return permission;
    }

    private toPersistence(permission: Permission): any {
        return {
            id: permission.id.value,
            resource: permission.resource,
            action: permission.action,
            description: permission.description
        };
    }

    async findById(id: PermissionId): Promise<Permission | null> {
        try {
            const { data, error } = await this.supabase
                .from('permissions')
                .select('*')
                .eq('id', id.value)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw error;
            }

            return data ? this.toDomain(data) : null;
        } catch (error) {
            throw new RepositoryError(`Error finding permission by id: ${id.value}`, error as Error);
        }
    }

    async exists(id: PermissionId): Promise<boolean> {
        try {
            const { count, error } = await this.supabase
                .from('permissions')
                .select('*', { count: 'exact', head: true })
                .eq('id', id.value);

            if (error) throw error;
            return (count ?? 0) > 0;
        } catch (error) {
            throw new RepositoryError(`Error checking permission existence: ${id.value}`, error as Error);
        }
    }

    async save(permission: Permission): Promise<void> {
        try {
            const record = this.toPersistence(permission);
            const { error } = await this.supabase
                .from('permissions')
                .upsert(record);

            if (error) throw error;

            if ('clearDomainEvents' in permission && typeof permission.clearDomainEvents === 'function') {
                permission.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving permission: ${permission.id.value}`, error as Error);
        }
    }

    async delete(id: PermissionId): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('permissions')
                .delete()
                .eq('id', id.value);

            if (error) throw error;
        } catch (error) {
            throw new RepositoryError(`Error deleting permission: ${id.value}`, error as Error);
        }
    }

    async findAll(): Promise<Permission[]> {
        try {
            const { data, error } = await this.supabase
                .from('permissions')
                .select('*');

            if (error) throw error;
            return (data || []).map(record => this.toDomain(record));
        } catch (error) {
            throw new RepositoryError('Error fetching all permissions', error as Error);
        }
    }
}
