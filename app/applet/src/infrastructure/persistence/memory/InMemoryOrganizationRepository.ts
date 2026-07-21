import { IOrganizationRepository } from '../../../../domain/organization/repositories/IOrganizationRepository';
import { Organization } from '../../../../domain/organization/aggregates/Organization';
import { OrganizationId } from '../../../../domain/shared/valueobjects/OrganizationId';
import { InMemoryRepository } from './InMemoryRepository';

export class InMemoryOrganizationRepository 
    extends InMemoryRepository<Organization, OrganizationId> 
    implements IOrganizationRepository {}
