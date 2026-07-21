import { IPermissionRepository } from '../../../../domain/iam/repositories/IPermissionRepository';
import { Permission } from '../../../../domain/iam/aggregates/Permission';
import { PermissionId } from '../../../../domain/iam/valueobjects/PermissionId';
import { InMemoryRepository } from './InMemoryRepository';

export class InMemoryPermissionRepository 
    extends InMemoryRepository<Permission, PermissionId> 
    implements IPermissionRepository {}
