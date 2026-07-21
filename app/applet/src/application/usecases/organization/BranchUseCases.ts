import { IBranchRepository } from '../../../domain/organization/repositories/IBranchRepository';
import { Branch } from '../../../domain/organization/aggregates/Branch';
import { BranchId } from '../../../domain/shared/valueobjects/BranchId';
import { OrganizationId } from '../../../domain/shared/valueobjects/OrganizationId';
import { Address } from '../../../domain/shared/valueobjects/Address';
import { ApplicationError } from '../../errors/ApplicationError';

export class CreateBranchUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(id: string, organizationId: string, name: string, street: string, city: string, state: string, country: string, postalCode: string): Promise<void> {
        const branchId = new BranchId(id);
        if (await this.repository.exists(branchId)) {
            throw new ApplicationError(`Branch with id ${id} already exists.`);
        }
        const address = new Address(street, city, state, country, postalCode);
        const branch = Branch.create(branchId, new OrganizationId(organizationId), name, address);
        await this.repository.save(branch);
    }
}

export class UpdateBranchAddressUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(id: string, street: string, city: string, state: string, country: string, postalCode: string): Promise<void> {
        const branchId = new BranchId(id);
        const branch = await this.repository.findById(branchId);
        if (!branch) {
            throw new ApplicationError(`Branch with id ${id} not found.`);
        }
        const address = new Address(street, city, state, country, postalCode);
        branch.updateAddress(address);
        await this.repository.save(branch);
    }
}

export class DeactivateBranchUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(id: string): Promise<void> {
        const branchId = new BranchId(id);
        const branch = await this.repository.findById(branchId);
        if (!branch) {
            throw new ApplicationError(`Branch with id ${id} not found.`);
        }
        branch.deactivate();
        await this.repository.save(branch);
    }
}

export class DeleteBranchUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(id: string): Promise<void> {
        const branchId = new BranchId(id);
        if (!(await this.repository.exists(branchId))) {
            throw new ApplicationError(`Branch with id ${id} not found.`);
        }
        await this.repository.delete(branchId);
    }
}

export class GetBranchByIdUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(id: string): Promise<Branch | null> {
        return this.repository.findById(new BranchId(id));
    }
}

export class GetAllBranchesUseCase {
    constructor(private readonly repository: IBranchRepository) {}
    async execute(): Promise<Branch[]> {
        return this.repository.findAll();
    }
}
