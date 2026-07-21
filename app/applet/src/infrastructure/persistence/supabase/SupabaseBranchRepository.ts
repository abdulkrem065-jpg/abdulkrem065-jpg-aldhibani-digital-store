import { SupabaseClient } from '@supabase/supabase-js';
import { IBranchRepository } from '../../../../domain/organization/repositories/IBranchRepository';
import { Branch } from '../../../../domain/organization/aggregates/Branch';
import { BranchId } from '../../../../domain/shared/valueobjects/BranchId';
import { OrganizationId } from '../../../../domain/shared/valueobjects/OrganizationId';
import { Address } from '../../../../domain/shared/valueobjects/Address';
import { RepositoryError } from '../errors/RepositoryError';

export class SupabaseBranchRepository implements IBranchRepository {
    constructor(private readonly supabase: SupabaseClient) {}

    private toDomain(record: any): Branch {
        const branch = Object.create(Branch.prototype);
        Object.assign(branch, {
            id: new BranchId(record.id),
            _organizationId: new OrganizationId(record.organization_id),
            _name: record.name,
            _address: new Address(record.street, record.city, record.state, record.country, record.postal_code),
            _isActive: record.is_active,
            _domainEvents: []
        });
        return branch;
    }

    private toPersistence(branch: Branch): any {
        return {
            id: branch.id.value,
            organization_id: branch.organizationId.value,
            name: branch.name,
            street: branch.address.street,
            city: branch.address.city,
            state: branch.address.state,
            country: branch.address.country,
            postal_code: branch.address.postalCode,
            is_active: branch.isActive
        };
    }

    async findById(id: BranchId): Promise<Branch | null> {
        try {
            const { data, error } = await this.supabase
                .from('branches')
                .select('*')
                .eq('id', id.value)
                .single();

            if (error) {
                if (error.code === 'PGRST116') return null; // Not found
                throw error;
            }

            return data ? this.toDomain(data) : null;
        } catch (error) {
            throw new RepositoryError(`Error finding branch by id: ${id.value}`, error as Error);
        }
    }

    async exists(id: BranchId): Promise<boolean> {
        try {
            const { count, error } = await this.supabase
                .from('branches')
                .select('*', { count: 'exact', head: true })
                .eq('id', id.value);

            if (error) throw error;
            return (count ?? 0) > 0;
        } catch (error) {
            throw new RepositoryError(`Error checking branch existence: ${id.value}`, error as Error);
        }
    }

    async save(branch: Branch): Promise<void> {
        try {
            const record = this.toPersistence(branch);
            const { error } = await this.supabase
                .from('branches')
                .upsert(record);

            if (error) throw error;

            if ('clearDomainEvents' in branch && typeof branch.clearDomainEvents === 'function') {
                branch.clearDomainEvents();
            }
        } catch (error) {
            throw new RepositoryError(`Error saving branch: ${branch.id.value}`, error as Error);
        }
    }

    async delete(id: BranchId): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('branches')
                .delete()
                .eq('id', id.value);

            if (error) throw error;
        } catch (error) {
            throw new RepositoryError(`Error deleting branch: ${id.value}`, error as Error);
        }
    }

    async findAll(): Promise<Branch[]> {
        try {
            const { data, error } = await this.supabase
                .from('branches')
                .select('*');

            if (error) throw error;
            return (data || []).map(record => this.toDomain(record));
        } catch (error) {
            throw new RepositoryError('Error fetching all branches', error as Error);
        }
    }
}
