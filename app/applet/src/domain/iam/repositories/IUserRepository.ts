import { User } from '../aggregates/User';
import { UserId } from '../valueobjects/UserId';

export interface IUserRepository {
    findById(id: UserId): Promise<User | null>;
    exists(id: UserId): Promise<boolean>;
    save(user: User): Promise<void>;
    delete(id: UserId): Promise<void>;
    findAll(): Promise<User[]>;
}
