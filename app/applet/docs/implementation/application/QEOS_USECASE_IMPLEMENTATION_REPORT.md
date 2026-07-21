# QEOS APPLICATION LAYER — USE CASE IMPLEMENTATION REPORT

## Architecture & Responsibilities
The Application Layer has been implemented to orchestrate Domain execution using pure Use Cases (Interactors).
- **Domain Centricity**: All business logic and validations remain securely inside the Aggregate Roots (`Organization`, `Branch`, `User`, `Role`, `Permission`). The Use Cases strictly coordinate the retrieval of aggregates, invocation of domain logic, and persistence.
- **Infrastructure Agnosticism**: The Use Cases depend solely on the abstract `IRepository` interfaces (e.g., `IOrganizationRepository`), remaining completely decoupled from UI, HTTP, ORM, or SQL infrastructure.
- **No Side Effects**: Controllers, UI components, and API routes have been strictly avoided in this phase.

## Implemented Use Cases

### Organization Context
- **Organization**:
  - `CreateOrganizationUseCase`
  - `DeactivateOrganizationUseCase`
  - `DeleteOrganizationUseCase`
  - `GetOrganizationByIdUseCase`
  - `GetAllOrganizationsUseCase`
- **Branch**:
  - `CreateBranchUseCase`
  - `UpdateBranchAddressUseCase`
  - `DeactivateBranchUseCase`
  - `DeleteBranchUseCase`
  - `GetBranchByIdUseCase`
  - `GetAllBranchesUseCase`

### Identity & Access Management (IAM) Context
- **User**:
  - `RegisterUserUseCase`
  - `AssignRoleToUserUseCase`
  - `RevokeRoleFromUserUseCase`
  - `DeleteUserUseCase`
  - `GetUserByIdUseCase`
  - `GetAllUsersUseCase`
- **Role**:
  - `CreateRoleUseCase`
  - `GrantPermissionToRoleUseCase`
  - `RevokePermissionFromRoleUseCase`
  - `DeleteRoleUseCase`
  - `GetRoleByIdUseCase`
  - `GetAllRolesUseCase`
- **Permission**:
  - `DefinePermissionUseCase`
  - `DeletePermissionUseCase`
  - `GetPermissionByIdUseCase`
  - `GetAllPermissionsUseCase`

## Error Handling
An application-level `ApplicationError` has been implemented to standardize errors thrown when a Use Case cannot proceed (e.g., `Entity already exists`, `Entity not found`). These errors prevent corrupt state transitions from reaching the Domain.

## Status
**Use Case Layer Complete.**

Awaiting authorization for the next phase.
