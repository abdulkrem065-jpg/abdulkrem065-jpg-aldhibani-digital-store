import { SupabaseClient } from '@supabase/supabase-js';
import { IUserRepository } from '../../../../domain/iam/repositories/IUserRepository';
import { User } from '../../../../domain/iam/aggregates/User';
import { UserId } from '../../../../domain/iam/valueobjects/UserId';
import { OrganizationId } from '../../../../domain/shared/valueobjects/OrganizationId';
import { EmailAddress } from '../../../../domain/shared/valueobjects/EmailAddress';
import { PersonName } from '../../../../domain/shared/valueobjects/PersonName';
import { RoleId } from '../../../../domain/iam/valueobjects/RoleId';
import { RepositoryError } from '../errors/RepositoryError';

export class SupabaseUserRepository implements IUserRepository {
    constructor(private readonly supabase: SupabaseClient) {}

    private toDomain(record: any): User {
        const user = Object.create(User.prototype);
        Object.assign(user, {
            id: new UserId(record.id),
            _organizationId: new OrganizationId(record.organization_id),
            _email: new EmailAddress(record.email),
            _name: new PersonName(record.first_name, record.last_name),
            _roleIds: (record.role_ids || []).map((rId: string) => new RoleId(rId)),
            _isActive: record.is_active,
            _domainEvents: []
        });
        return user;
    }

    private toPersistence(user: User): any {
        return {
            id: user.id.value,
            organization_id: user.organizationId.value,
            email: user.email.value,
            first_name: user.name.firstName,
            last_name: user.name.lastName,
            role_ids: user.roleIds.map(r => r.value),
            is_active: user.isActive
        };
    }

    async findById(id: UserId): Promise<User | null> {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .eq('id', id.value)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw error;
            }

            return data ? this.toDomain(data) : null;
        } catch (error) {
            throw new RepositoryError(`Error finding user by id: ${id.value}`, error as Error);
        }
    }

    async exists(id: UserId): Promise<boolean> {
        try {
            const { count, error } = await this.supabase
                .from('users')
                .select('*', { count: 'exact', head: true })
                .eq('id', id.value);

            if (error) throw error;
            return (count ?? 0) > 0;
        } catch (error) {
            throw new RepositoryError(`Error checking user existence: ${id.value}`, error as Error);
        }
    }

    async save(user: User): Promise<void> {
        try {
            const record = this.toPersistence(user);
            const { error } = await this.supabase
                .from('users')
                .upsert(record);

            if (error) throw error;

            if ('clearDomainEvents' in user && typeof user.clearDomainEvents === 'function') {
                user.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving user: ${user.id.value}`, error as Error);
        }
    }

    async delete(id: UserId): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('users')
                .delete()
                .eq('id', id.value);

            if (error) throw error;
        } catch (error) {
            throw new RepositoryError(`Error deleting user: ${id.value}`, error as Error);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const { data, error } = await this.supabase
                .from('users')
                .select('*');

            if (error) throw error;
            return (data || []).map(record => this.toDomain(record));
        } catch (error) {
            throw new RepositoryError('Error fetching all users', error as Error);
        }
    }
}
