import { IBranchRepository } from '../../../../domain/organization/repositories/IBranchRepository';
import { Branch } from '../../../../domain/organization/aggregates/Branch';
import { BranchId } from '../../../../domain/shared/valueobjects/BranchId';
import { InMemoryRepository } from './InMemoryRepository';

export class InMemoryBranchRepository 
    extends InMemoryRepository<Branch, BranchId> 
    implements IBranchRepository {}
