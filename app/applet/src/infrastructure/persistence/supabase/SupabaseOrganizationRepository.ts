import { SupabaseClient } from '@supabase/supabase-js';
import { IOrganizationRepository } from '../../../../domain/organization/repositories/IOrganizationRepository';
import { Organization } from '../../../../domain/organization/aggregates/Organization';
import { OrganizationId } from '../../../../domain/shared/valueobjects/OrganizationId';
import { RepositoryError } from '../errors/RepositoryError';

export class SupabaseOrganizationRepository implements IOrganizationRepository {
    constructor(private readonly supabase: SupabaseClient) {}

    private toDomain(record: any): Organization {
        const org = Object.create(Organization.prototype);
        Object.assign(org, {
            id: new OrganizationId(record.id),
            _name: record.name,
            _isActive: record.is_active,
            _domainEvents: []
        });
        return org;
    }

    private toPersistence(org: Organization): any {
        return {
            id: org.id.value,
            name: org.name,
            is_active: org.isActive
        };
    }

    async findById(id: OrganizationId): Promise<Organization | null> {
        try {
            const { data, error } = await this.supabase
                .from('organizations')
                .select('*')
                .eq('id', id.value)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw error;
            }

            return data ? this.toDomain(data) : null;
        } catch (error) {
            throw new RepositoryError(`Error finding organization by id: ${id.value}`, error as Error);
        }
    }

    async exists(id: OrganizationId): Promise<boolean> {
        try {
            const { count, error } = await this.supabase
                .from('organizations')
                .select('*', { count: 'exact', head: true })
                .eq('id', id.value);

            if (error) throw error;
            return (count ?? 0) > 0;
        } catch (error) {
            throw new RepositoryError(`Error checking organization existence: ${id.value}`, error as Error);
        }
    }

    async save(organization: Organization): Promise<void> {
        try {
            const record = this.toPersistence(organization);
            const { error } = await this.supabase
                .from('organizations')
                .upsert(record);

            if (error) throw error;

            if ('clearDomainEvents' in organization && typeof organization.clearDomainEvents === 'function') {
                organization.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving organization: ${organization.id.value}`, error as Error);
        }
    }

    async delete(id: OrganizationId): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('organizations')
                .delete()
                .eq('id', id.value);

            if (error) throw error;
        } catch (error) {
            throw new RepositoryError(`Error deleting organization: ${id.value}`, error as Error);
        }
    }

    async findAll(): Promise<Organization[]> {
        try {
            const { data, error } = await this.supabase
                .from('organizations')
                .select('*');

            if (error) throw error;
            return (data || []).map(record => this.toDomain(record));
        } catch (error) {
            throw new RepositoryError('Error fetching all organizations', error as Error);
        }
    }
}
