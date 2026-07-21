import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ApiBootstrap } from '../../api/bootstrap/ApiBootstrap';
import { ApiDependencyInjectionIntegration } from '../../api/di/ApiDependencyInjectionIntegration';
import { Application } from './Application';
import { CompositionVerifier } from './CompositionVerifier';

import { SupabaseOrganizationRepository } from '../../infrastructure/persistence/supabase/SupabaseOrganizationRepository';
import { SupabaseBranchRepository } from '../../infrastructure/persistence/supabase/SupabaseBranchRepository';
import { SupabaseUserRepository } from '../../infrastructure/persistence/supabase/SupabaseUserRepository';
import { SupabaseRoleRepository } from '../../infrastructure/persistence/supabase/SupabaseRoleRepository';
import { SupabasePermissionRepository } from '../../infrastructure/persistence/supabase/SupabasePermissionRepository';

import { CreateOrganizationUseCase } from '../usecases/organization/CreateOrganizationUseCase';
import { DeactivateOrganizationUseCase } from '../usecases/organization/DeactivateOrganizationUseCase';
import { DeleteOrganizationUseCase } from '../usecases/organization/DeleteOrganizationUseCase';
import { GetOrganizationByIdUseCase } from '../usecases/organization/GetOrganizationByIdUseCase';
import { GetAllOrganizationsUseCase } from '../usecases/organization/GetAllOrganizationsUseCase';

import { CreateBranchUseCase } from '../usecases/organization/CreateBranchUseCase';
import { UpdateBranchAddressUseCase } from '../usecases/organization/UpdateBranchAddressUseCase';
import { DeactivateBranchUseCase } from '../usecases/organization/DeactivateBranchUseCase';
import { DeleteBranchUseCase } from '../usecases/organization/DeleteBranchUseCase';
import { GetBranchByIdUseCase } from '../usecases/organization/GetBranchByIdUseCase';
import { GetAllBranchesUseCase } from '../usecases/organization/GetAllBranchesUseCase';

import { RegisterUserUseCase } from '../usecases/iam/RegisterUserUseCase';
import { AssignRoleToUserUseCase } from '../usecases/iam/AssignRoleToUserUseCase';
import { RevokeRoleFromUserUseCase } from '../usecases/iam/RevokeRoleFromUserUseCase';
import { DeleteUserUseCase } from '../usecases/iam/DeleteUserUseCase';
import { GetUserByIdUseCase } from '../usecases/iam/GetUserByIdUseCase';
import { GetAllUsersUseCase } from '../usecases/iam/GetAllUsersUseCase';

import { CreateRoleUseCase } from '../usecases/iam/CreateRoleUseCase';
import { GrantPermissionToRoleUseCase } from '../usecases/iam/GrantPermissionToRoleUseCase';
import { RevokePermissionFromRoleUseCase } from '../usecases/iam/RevokePermissionFromRoleUseCase';
import { DeleteRoleUseCase } from '../usecases/iam/DeleteRoleUseCase';
import { GetRoleByIdUseCase } from '../usecases/iam/GetRoleByIdUseCase';
import { GetAllRolesUseCase } from '../usecases/iam/GetAllRolesUseCase';

import { DefinePermissionUseCase } from '../usecases/iam/DefinePermissionUseCase';
import { DeletePermissionUseCase } from '../usecases/iam/DeletePermissionUseCase';
import { GetPermissionByIdUseCase } from '../usecases/iam/GetPermissionByIdUseCase';
import { GetAllPermissionsUseCase } from '../usecases/iam/GetAllPermissionsUseCase';

export class ApplicationComposer {
    private state: any = {
        supabase: null,
        repositories: {},
        useCases: {},
        api: null
    };

    public static create(): ApplicationComposer {
        return new ApplicationComposer();
    }

    public registerInfrastructure(): this {
        const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:8000';
        const supabaseKey = process.env.SUPABASE_ANON_KEY || 'dummy_key';
        this.state.supabase = createClient(supabaseUrl, supabaseKey);
        return this;
    }

    public registerRepositories(): this {
        const db = this.state.supabase;
        this.state.repositories = {
            organization: new SupabaseOrganizationRepository(db),
            branch: new SupabaseBranchRepository(db),
            user: new SupabaseUserRepository(db),
            role: new SupabaseRoleRepository(db),
            permission: new SupabasePermissionRepository(db)
        };
        return this;
    }

    public registerUseCases(): this {
        const r = this.state.repositories;
        this.state.useCases = {
            createOrganization: new CreateOrganizationUseCase(r.organization),
            deactivateOrganization: new DeactivateOrganizationUseCase(r.organization),
            deleteOrganization: new DeleteOrganizationUseCase(r.organization),
            getOrganizationById: new GetOrganizationByIdUseCase(r.organization),
            getAllOrganizations: new GetAllOrganizationsUseCase(r.organization),

            createBranch: new CreateBranchUseCase(r.branch),
            updateBranchAddress: new UpdateBranchAddressUseCase(r.branch),
            deactivateBranch: new DeactivateBranchUseCase(r.branch),
            deleteBranch: new DeleteBranchUseCase(r.branch),
            getBranchById: new GetBranchByIdUseCase(r.branch),
            getAllBranches: new GetAllBranchesUseCase(r.branch),

            registerUser: new RegisterUserUseCase(r.user),
            assignRoleToUser: new AssignRoleToUserUseCase(r.user, r.role),
            revokeRoleFromUser: new RevokeRoleFromUserUseCase(r.user, r.role),
            deleteUser: new DeleteUserUseCase(r.user),
            getUserById: new GetUserByIdUseCase(r.user),
            getAllUsers: new GetAllUsersUseCase(r.user),

            createRole: new CreateRoleUseCase(r.role),
            grantPermissionToRole: new GrantPermissionToRoleUseCase(r.role, r.permission),
            revokePermissionFromRole: new RevokePermissionFromRoleUseCase(r.role, r.permission),
            deleteRole: new DeleteRoleUseCase(r.role),
            getRoleById: new GetRoleByIdUseCase(r.role),
            getAllRoles: new GetAllRolesUseCase(r.role),

            definePermission: new DefinePermissionUseCase(r.permission),
            deletePermission: new DeletePermissionUseCase(r.permission),
            getPermissionById: new GetPermissionByIdUseCase(r.permission),
            getAllPermissions: new GetAllPermissionsUseCase(r.permission)
        };
        return this;
    }

    public registerApi(): this {
        this.state.api = new ApiBootstrap();
        const resolver = ApiDependencyInjectionIntegration.getResolver();
        
        for (const [name, useCase] of Object.entries(this.state.useCases)) {
            resolver.register(name, useCase);
        }

        return this;
    }

    public verifyDependencyGraph(): this {
        CompositionVerifier.verify(this.state);
        return this;
    }

    public compose(): Application {
        return new Application(this.state.api, this.state.supabase);
    }
}
