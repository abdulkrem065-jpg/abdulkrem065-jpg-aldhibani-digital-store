import { IUserRepository } from '../../../../domain/iam/repositories/IUserRepository';
import { User } from '../../../../domain/iam/aggregates/User';
import { UserId } from '../../../../domain/iam/valueobjects/UserId';
import { InMemoryRepository } from './InMemoryRepository';

export class InMemoryUserRepository 
    extends InMemoryRepository<User, UserId> 
    implements IUserRepository {}
