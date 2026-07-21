# QEOS DOMAIN ENTITY IMPLEMENTATION CONTRACT

This document serves as the absolute, non-negotiable architectural contract for every Domain Entity and Aggregate Root developed within the QEOS ecosystem.

## 1. Entity Responsibilities
An Entity is responsible exclusively for holding its own state and enforcing the business rules (invariants) that govern the transitions of that state. It must model a distinct business concept defined in the Ubiquitous Language.

## 2. Entity Lifecycle
The lifecycle of an Entity is strictly controlled:
*   **Creation:** Instantiated via a Factory Method or a guarded Constructor.
*   **Mutation:** Altered only through specific, intent-revealing behavior methods.
*   **Reconstitution:** Hydrated from infrastructure (e.g., database) via a specialized mapping process that bypasses initial business logic validation but strictly restores state.
*   **Archival/Deletion:** State transitions to a logically deleted or archived state; physical deletion is handled by infrastructure, not the domain.

## 3. Construction Rules
*   Public empty constructors are strictly forbidden.
*   Creation must enforce immediate validity; it must be impossible to instantiate an Entity in an invalid state.
*   Use static factory methods (e.g., `Order.create(...)`) to encapsulate complex creation logic and clearly indicate intent.

## 4. Identity Rules
*   Every Entity must possess a unique, immutable identifier (Identity).
*   Identity must be established at the moment of creation.
*   Two entities are considered equal if and only if their identities are identical, regardless of their internal state.
*   Identities should be modeled as Value Objects (e.g., `TenantId`, `OrderId`) to enforce type safety.

## 5. State Mutation Rules
*   Direct property setters (e.g., `setAmount(val)`) are forbidden.
*   State mutations must be executed through intent-revealing methods based on the Ubiquitous Language (e.g., `confirmPayment()`, `allocateStock()`).
*   State properties must be read-only from the outside.

## 6. Invariant Enforcement
*   Invariants (business rules that must always be true) must be enforced continuously.
*   If a method invocation violates an invariant, the method must abort and throw a specifically typed Domain Error immediately.
*   Entities must never temporarily enter an invalid state during an operation.

## 7. Validation Strategy
*   Validation of inherent attributes happens inside Value Objects.
*   Validation of cross-attribute constraints happens within the Entity itself.
*   Validation of cross-entity constraints happens within the Aggregate Root or a Domain Service.
*   Exceptions should be precise and domain-specific (e.g., `InsufficientStockError`).

## 8. Domain Event Publication Rules
*   Entities generate Domain Events to signal that a significant state mutation has occurred.
*   Events are accumulated internally within the Aggregate Root (e.g., `this.addDomainEvent(new OrderPlacedEvent(...))`).
*   Entities DO NOT dispatch events directly to the Event Bus. The Application Service or Unit of Work extracts the accumulated events and dispatches them after the transaction successfully commits.

## 9. Aggregate Interaction Rules
*   Entities that are not Aggregate Roots cannot be referenced directly from outside their Aggregate boundary.
*   Operations affecting multiple internal entities must be orchestrated by the Aggregate Root.
*   Aggregates reference other Aggregates exclusively by their Identity (ID), never by holding direct object references.

## 10. Value Object Interaction Rules
*   Entities should utilize Value Objects extensively to represent descriptive, immutable attributes (e.g., `Money`, `Address`).
*   Value Objects passed into Entities are immutable. To change the value, the Entity must replace the entire Value Object instance.

## 11. Repository Interaction Rules
*   Entities have zero awareness of Repositories.
*   An Entity must never invoke, inject, or reference a Repository.
*   Fetching and persisting Entities is the sole responsibility of the Application Service (Use Case).

## 12. Serialization Rules
*   Entities must not contain serialization decorators or infrastructure annotations (e.g., `@JSON`, `@Column`).
*   If an Entity needs to be serialized for persistence or API responses, a dedicated Mapper or Data Transfer Object (DTO) in the outer architectural layers must extract the necessary state.

## 13. Versioning Strategy
*   Changes to the structural schema of an Entity require careful consideration.
*   If a state mutation logic changes significantly, consider if it constitutes a new version of a business process or just an internal refinement.
*   Domain Events emitted by the Entity must be versioned if their payload structure changes.

## 14. Testing Obligations
*   Every Entity must have 100% unit test coverage.
*   Tests must verify successful state transitions, correct event generation, and failure scenarios (Invariant enforcement).
*   Tests must be pure unit tests with no infrastructure, database, or mocking frameworks required for the domain logic itself.

## 15. Forbidden Dependencies
*   No ORM or Database references.
*   No Web, HTTP, or API references.
*   No Dependency Injection container references.
*   No I/O operations (Disk, Network, Time-fetching where strict determinism is required should be passed as arguments).

## 16. Performance Constraints
*   Entity methods must be synchronously executable.
*   Complex, long-running calculations should be passed into the entity or handled by a Domain Service if they require external lookups.
*   Memory footprint should remain minimal; do not load unbounded collections inside an Entity.

## 17. Concurrency Expectations
*   Entities themselves are inherently thread-safe in a single-threaded Node.js execution context, but concurrent requests might target the same Entity.
*   Optimistic Concurrency Control (e.g., a `version` property) should be defined on the Aggregate Root to allow the Infrastructure layer to prevent lost updates.

## 18. Extensibility Rules
*   Use polymorphism and Strategy patterns carefully within the domain to handle varying business rules without bloating the Entity with conditional logic.
*   Avoid deep inheritance hierarchies. Prefer composition using Value Objects and internal Entities.

## 19. Verification Checklist
Before an Entity is considered complete, it must pass the following:
* [ ] Does it enforce all its invariants?
* [ ] Is state only mutated via intent-revealing methods?
* [ ] Are all dependencies pure (no infrastructure)?
* [ ] Does it use Value Objects for complex properties?
* [ ] Are Domain Events accumulated internally rather than dispatched directly?
* [ ] Is it fully covered by unit tests?

## 20. Definition of a Valid QEOS Entity
A valid QEOS Entity is a pure TypeScript object that uniquely identifies a core business concept, entirely encapsulates its mutable state, aggressively protects its business invariants without reliance on external infrastructure, and communicates its lifecycle changes exclusively through internal accumulation of strictly typed Domain Events.
