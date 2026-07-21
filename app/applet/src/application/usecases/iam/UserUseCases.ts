import { IUserRepository } from '../../../domain/iam/repositories/IUserRepository';
import { User } from '../../../domain/iam/aggregates/User';
import { UserId } from '../../../domain/iam/valueobjects/UserId';
import { RoleId } from '../../../domain/iam/valueobjects/RoleId';
import { OrganizationId } from '../../../domain/shared/valueobjects/OrganizationId';
import { EmailAddress } from '../../../domain/shared/valueobjects/EmailAddress';
import { PersonName } from '../../../domain/shared/valueobjects/PersonName';
import { ApplicationError } from '../../errors/ApplicationError';

export class RegisterUserUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(id: string, organizationId: string, email: string, firstName: string, lastName: string): Promise<void> {
        const userId = new UserId(id);
        if (await this.repository.exists(userId)) {
            throw new ApplicationError(`User with id ${id} already exists.`);
        }
        const user = User.register(
            userId,
            new OrganizationId(organizationId),
            new EmailAddress(email),
            new PersonName(firstName, lastName)
        );
        await this.repository.save(user);
    }
}

export class AssignRoleToUserUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(id: string, roleId: string): Promise<void> {
        const userId = new UserId(id);
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new ApplicationError(`User with id ${id} not found.`);
        }
        user.assignRole(new RoleId(roleId));
        await this.repository.save(user);
    }
}

export class RevokeRoleFromUserUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(id: string, roleId: string): Promise<void> {
        const userId = new UserId(id);
        const user = await this.repository.findById(userId);
        if (!user) {
            throw new ApplicationError(`User with id ${id} not found.`);
        }
        user.revokeRole(new RoleId(roleId));
        await this.repository.save(user);
    }
}

export class DeleteUserUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(id: string): Promise<void> {
        const userId = new UserId(id);
        if (!(await this.repository.exists(userId))) {
            throw new ApplicationError(`User with id ${id} not found.`);
        }
        await this.repository.delete(userId);
    }
}

export class GetUserByIdUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(id: string): Promise<User | null> {
        return this.repository.findById(new UserId(id));
    }
}

export class GetAllUsersUseCase {
    constructor(private readonly repository: IUserRepository) {}
    async execute(): Promise<User[]> {
        return this.repository.findAll();
    }
}
