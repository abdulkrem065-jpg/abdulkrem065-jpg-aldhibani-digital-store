import { IOrganizationRepository } from '../../../domain/organization/repositories/IOrganizationRepository';
import { Organization } from '../../../domain/organization/aggregates/Organization';
import { OrganizationId } from '../../../domain/shared/valueobjects/OrganizationId';
import { ApplicationError } from '../../errors/ApplicationError';

export class CreateOrganizationUseCase {
    constructor(private readonly repository: IOrganizationRepository) {}
    async execute(id: string, name: string): Promise<void> {
        const orgId = new OrganizationId(id);
        if (await this.repository.exists(orgId)) {
            throw new ApplicationError(`Organization with id ${id} already exists.`);
        }
        const organization = Organization.create(orgId, name);
        await this.repository.save(organization);
    }
}

export class DeactivateOrganizationUseCase {
    constructor(private readonly repository: IOrganizationRepository) {}
    async execute(id: string): Promise<void> {
        const orgId = new OrganizationId(id);
        const organization = await this.repository.findById(orgId);
        if (!organization) {
            throw new ApplicationError(`Organization with id ${id} not found.`);
        }
        organization.deactivate();
        await this.repository.save(organization);
    }
}

export class DeleteOrganizationUseCase {
    constructor(private readonly repository: IOrganizationRepository) {}
    async execute(id: string): Promise<void> {
        const orgId = new OrganizationId(id);
        if (!(await this.repository.exists(orgId))) {
            throw new ApplicationError(`Organization with id ${id} not found.`);
        }
        await this.repository.delete(orgId);
    }
}

export class GetOrganizationByIdUseCase {
    constructor(private readonly repository: IOrganizationRepository) {}
    async execute(id: string): Promise<Organization | null> {
        return this.repository.findById(new OrganizationId(id));
    }
}

export class GetAllOrganizationsUseCase {
    constructor(private readonly repository: IOrganizationRepository) {}
    async execute(): Promise<Organization[]> {
        return this.repository.findAll();
    }
}
