import { IRoleRepository } from '../../../../domain/iam/repositories/IRoleRepository';
import { Role } from '../../../../domain/iam/aggregates/Role';
import { RoleId } from '../../../../domain/iam/valueobjects/RoleId';
import { InMemoryRepository } from './InMemoryRepository';

export class InMemoryRoleRepository 
    extends InMemoryRepository<Role, RoleId> 
    implements IRoleRepository {}
