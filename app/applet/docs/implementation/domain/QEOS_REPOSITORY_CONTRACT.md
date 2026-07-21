# QEOS REPOSITORY CONTRACT SPECIFICATION

## 1. Repository Purpose
The purpose of a Repository is to provide an in-memory collection abstraction for Aggregate Roots. It isolates the Domain Layer from the complexities of data persistence, physical storage mechanisms, and infrastructure constraints, allowing domain logic to be executed against reconstituted entities as if they were part of an ordinary collection.

## 2. Repository Responsibilities
- Provide a strict, typed contract for retrieving and persisting a specific Aggregate Root type.
- Ensure that Aggregate Roots are reconstituted in a fully valid state from persistence, bypassing initial validation logic where necessary, but guaranteeing invariant satisfaction before releasing the object to the Domain.
- Act as the singular gateway between the Application Service (Use Case) and the Data Layer.

## 3. Aggregate Ownership Rules
- A Repository is mapped exactly 1:1 to an Aggregate Root.
- A Repository must NEVER return or accept internal Entities or Value Objects directly; it deals exclusively in complete Aggregate Roots.
- Saving an Aggregate Root via a Repository implies persisting its entire internal state, including all child entities.

## 4. Loading Strategy
- Operations must return the fully constructed Aggregate Root.
- Repositories are responsible for fetching all necessary internal entities of the Aggregate in a single logical operation (eager loading within the aggregate boundary) so that the Domain never encounters partial state or lazy-loading proxies.

## 5. Saving Strategy
- The `save` operation represents an "upsert" intent. It inserts the Aggregate if it does not exist, or updates it entirely if it does.
- The Repository must extract Domain Events from the Aggregate Root immediately before or during persistence and ensure they are forwarded to the Event Bus (or returned for the Application Service to dispatch) upon successful transaction commit.

## 6. Optimistic Concurrency Strategy
- Concurrent mutations to the same Aggregate Root must be strictly managed using Optimistic Concurrency Control (OCC).
- The Repository must enforce OCC. If an update detects that the underlying data has mutated since the Aggregate was loaded, the Repository MUST immediately abort the transaction and throw a `ConcurrencyConflictError`.

## 7. Version Handling
- Every Aggregate Root must maintain a `version` property (conceptually or explicitly).
- The Repository increments this version upon every successful `save`.
- The Domain logic must never manually manipulate the version. It is an infrastructure-managed artifact used for OCC.

## 8. Identity Lookup Rules
- The primary method for retrieval is by Identity (e.g., `findById(id: AggregateId)`).
- Identity lookups must be deterministic: they return exactly one Aggregate Root or `null`/`undefined` if the identity does not exist.

## 9. Pagination Rules
- Operations returning multiple Aggregate Roots (e.g., `findAll`, `findByTenantId`) must support Pagination.
- Pagination must be defined via generic abstractions (e.g., `Limit`, `Offset`, or `Cursor`) completely decoupled from database dialects like `LIMIT` or `SKIP`.
- The Repository must return a structured response containing both the subset of items and pagination metadata (e.g., `totalCount`, `nextCursor`).

## 10. Filtering Rules
- Complex filtering should be handled via Domain-specific Specification patterns or strict Filter DTOs.
- Repositories must not accept raw query strings, JSON query DSLs, or any infrastructure-specific query language as parameters.

## 11. Transaction Boundaries
- Repositories themselves DO NOT control systemic transactions. They participate in them.
- Transaction control (Begin, Commit, Rollback) is strictly the responsibility of the Application Service or a Unit of Work abstraction.

## 12. Error Contract
- Repositories must throw strictly typed Domain or Infrastructure errors, never raw database driver exceptions (e.g., throw `AggregateNotFoundError` instead of `MongoError` or `PostgresError`).
- Constraint violations at the database level must be caught and mapped to standard QEOS error objects.

## 13. Caching Policy
- Repositories should not inherently obscure business logic with caching unless absolutely required by performance constraints.
- If caching is implemented, the Repository must guarantee strong consistency or explicitly declare its eventual consistency guarantees to the caller. Cache invalidation is the responsibility of the repository implementation.

## 14. Security Expectations
- Repositories must respect multi-tenancy inherently. Any lookup that is scoped to a Tenant must enforce the `TenantId` isolation implicitly or explicitly.
- The Repository is blind to User-level permissions; authorization is enforced at the Security Engine and Application Service layers.

## 15. Performance Expectations
- The repository must map infrastructure structures to Domain Objects as efficiently as possible, minimizing object instantiation overhead.
- "N+1" query problems within an Aggregate boundary must be resolved by the infrastructure implementation of the Repository.

## 16. Testing Obligations
- The Repository interfaces are tested via Mocking or In-Memory implementations within the Application Service test suites.
- The concrete Infrastructure implementations of the Repositories must be tested via rigorous Integration Tests against a real physical database engine.

## 17. Forbidden Dependencies
- The Repository Interface (`src/domain/.../repositories/`) CANNOT import anything from `src/infrastructure/...`.
- The Repository Interface CANNOT reference Database schemas, ORM decorators, HTTP objects, or physical connection objects.

## 18. Verification Checklist
- [ ] Is the interface mapped 1:1 to an Aggregate Root?
- [ ] Are all parameters and return types pure Domain objects?
- [ ] Is Pagination implemented using abstract structures?
- [ ] Are Domain Events extracted during save?
- [ ] Does it enforce Optimistic Concurrency?

## 19. Completion Criteria
A Repository Contract is complete when it accurately models the persistence requirements of a specific Aggregate Root using exclusively Ubiquitous Language and pure TypeScript interfaces, strictly adhering to all boundaries defined in this document.

## 20. Canonical Repository Template
```typescript
// Conceptual Template for reference only. No concrete implementation.
interface IRepository<TAggregateRoot, TIdentity> {
    findById(id: TIdentity): Promise<TAggregateRoot | null>;
    save(aggregate: TAggregateRoot): Promise<void>;
    delete(id: TIdentity): Promise<void>;
}
```
