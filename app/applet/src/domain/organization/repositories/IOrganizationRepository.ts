import { Organization } from '../aggregates/Organization';
import { OrganizationId } from '../../shared/valueobjects/OrganizationId';

export interface IOrganizationRepository {
    findById(id: OrganizationId): Promise<Organization | null>;
    exists(id: OrganizationId): Promise<boolean>;
    save(organization: Organization): Promise<void>;
    delete(id: OrganizationId): Promise<void>;
    findAll(): Promise<Organization[]>;
}
