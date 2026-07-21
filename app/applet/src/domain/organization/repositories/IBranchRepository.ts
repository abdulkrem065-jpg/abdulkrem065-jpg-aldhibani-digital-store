import { Branch } from '../aggregates/Branch';
import { BranchId } from '../../shared/valueobjects/BranchId';

export interface IBranchRepository {
    findById(id: BranchId): Promise<Branch | null>;
    exists(id: BranchId): Promise<boolean>;
    save(branch: Branch): Promise<void>;
    delete(id: BranchId): Promise<void>;
    findAll(): Promise<Branch[]>;
}
