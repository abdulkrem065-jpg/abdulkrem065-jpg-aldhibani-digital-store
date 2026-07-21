# QEOS CORE DOMAIN — AGGREGATE ROOTS IMPLEMENTATION REPORT

## Implemented Aggregates
The following foundational Core Aggregate Roots have been successfully implemented within their respective Bounded Contexts, strictly adhering to the QEOS Domain Entity Contract.

### Organization Context
- **`Organization`**: Represents the root tenant. 
  - **Invariants**: Name cannot be empty; cannot deactivate if already inactive.
  - **Events**: `OrganizationCreatedEvent`, `OrganizationDeactivatedEvent`.
- **`Branch`**: Represents a physical or logical division of an Organization.
  - **Invariants**: Requires a valid `OrganizationId` and `Address`; cannot deactivate if already inactive.
  - **Events**: `BranchCreatedEvent`, `BranchAddressUpdatedEvent`, `BranchDeactivatedEvent`.

### Identity & Access (IAM) Context
- **`User`**: Represents a human or service account associated with an Organization.
  - **Invariants**: Must possess an `OrganizationId`, `EmailAddress`, and `PersonName`; prevents assigning duplicate roles; prevents revoking unassigned roles.
  - **Events**: `UserRegisteredEvent`, `UserRoleAssignedEvent`, `UserRoleRevokedEvent`.
- **`Role`**: Represents a collection of Permissions.
  - **Invariants**: Must possess an `OrganizationId` and non-empty name; prevents granting duplicate permissions; prevents revoking ungranted permissions.
  - **Events**: `RoleCreatedEvent`, `RolePermissionGrantedEvent`, `RolePermissionRevokedEvent`.
- **`Permission`**: Represents an access right over a specific resource.
  - **Invariants**: Requires both a `resource` and an `action`.
  - **Events**: `PermissionDefinedEvent`.

## Entity Hierarchy & Base Classes
To support the Aggregates, the following pure Domain Base Classes were instantiated:
- **`IDomainEvent`**: Base interface for all state mutation events.
- **`Entity<TId>`**: Base class enforcing absolute Identity equality logic.
- **`AggregateRoot<TId>`**: Extends `Entity` and introduces an internal `_domainEvents` array. Provides protected `addDomainEvent` and public `clearDomainEvents` methods, prohibiting direct external state mutation and abstracting event publication logic.

## Validation & Invariant Enforcement Strategy
- **Self-validation**: Constructors remain private. Instantiation only occurs via static factory methods (`create`, `register`, `define`) which enforce preliminary validation before yielding an instance.
- **Immutability of references**: When passing lists (`roleIds`, `permissionIds`), the array is copied via the spread operator (`[...items]`) to prevent external mutability bugs. Value objects (`EmailAddress`, `Address`) passed to entities are intrinsically immutable.

## Remaining Roadmap
The Core Domain Entities and Value Objects are now structurally complete for Layer 2 Phase 4.

The subsequent phases required to complete Layer 2 are:
1. **Repository Contracts**: Abstract interfaces mapping Aggregate Roots to persistence capabilities.
2. **Domain Services**: Encapsulating rules that span across multiple Aggregate Roots.
3. **Application Services (Use Cases)**: Orchestrating the flow between Repositories and the newly created Aggregate Roots.

**Status:** Aggregate Implementations Complete. Waiting for authorization to proceed.
