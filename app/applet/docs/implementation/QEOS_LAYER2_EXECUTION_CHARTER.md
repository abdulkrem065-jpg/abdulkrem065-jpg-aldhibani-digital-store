# QEOS LAYER 2 — DOMAIN FOUNDATION EXECUTION CHARTER

## 1. Purpose of Layer 2
The Domain Foundation serves as the pure, undeniable heart of the QEOS business logic. It encapsulates the core business rules, entity behaviors, and state mutations entirely isolated from databases, frameworks, or delivery mechanisms. It acts as the absolute source of truth for the application's domain knowledge.

## 2. Architectural Boundaries
Layer 2 strictly adheres to Hexagonal Architecture (Ports and Adapters) and Domain-Driven Design (DDD) principles. It occupies the innermost circle. 
*   Dependencies strictly point inward.
*   The Domain Foundation depends on *nothing* outside of itself, except the QEOS Core Kernel contracts.

## 3. Relationship with Kernel
The Domain Foundation relies on the QEOS Core Kernel for systemic capabilities:
*   Uses `IEventBus` to publish domain events.
*   Uses `ILogger` for systemic telemetry.
*   Managed via the Dependency Injection container and loaded via the Plugin Loader.
*   Protected by the Security Engine.
The Kernel knows *nothing* about the Domain Layer.

## 4. Relationship with Future ERP Modules
Layer 2 establishes the base domain abstractions, shared kernels, and core identity/tenant structures. All future ERP modules (Ledger, Inventory, HR) will be modeled as specialized bounded contexts that extend, reference, or communicate with the foundational aggregates defined in Layer 2 via domain events or interface contracts.

## 5. Domain Purity Rules
*   **Zero Infrastructure:** No database queries, file system access, or network calls inside domain objects.
*   **No Framework Coupling:** No ORM decorators (e.g., `@Entity`, `@Column`), framework-specific base classes, or HTTP request/response objects.
*   **Behavior Richness:** No anemic domain models. Entities must encapsulate state and expose intent-revealing methods.

## 6. Forbidden Dependencies
*   Any database driver or ORM (e.g., TypeORM, Prisma, Mongoose, PostgreSQL).
*   Any web framework (e.g., Express, NestJS, React).
*   Any external API client.
*   Node.js standard library modules (e.g., `fs`, `http`, `net`), unless strictly for generic typing.

## 7. Allowed Dependencies
*   Typescript standard types.
*   QEOS Core Kernel Interfaces (e.g., `src/kernel/eventbus/interfaces`).
*   Pure, mathematically focused utility libraries with no I/O (e.g., precision decimal arithmetic), subject to architectural approval.

## 8. Entity Design Principles
*   Must possess a unique, immutable Identity (ID).
*   Mutable state must be fully encapsulated.
*   All state changes occur through domain-specific methods (e.g., `activateAccount()`, not `setStatus()`).
*   Invariants must be protected at all times.

## 9. Value Object Rules
*   Defined by their attributes, lacking conceptual identity.
*   **Strictly Immutable:** Any modification must result in the creation of a new Value Object.
*   Must be self-validating upon instantiation. If invalid, it throws a Domain Error.
*   Equality is determined by comparing structural properties, not memory references.

## 10. Aggregate Root Rules
*   Acts as the transactional boundary for state mutations.
*   Internal entities cannot be accessed directly from the outside; all operations go through the Aggregate Root.
*   Only Aggregate Roots possess global identity.
*   External objects hold references to the Aggregate Root by ID only.

## 11. Repository Contract Rules
*   Defined exclusively as pure TypeScript `interfaces` within the Domain Layer.
*   Implementation logic is strictly forbidden in Layer 2.
*   Interfaces should reflect collection-like operations (e.g., `save(aggregate)`, `findById(id)`).

## 12. Domain Service Rules
*   Used solely for domain logic that does not naturally reside within a single Entity or Value Object.
*   Must remain stateless.
*   Orchestrates multiple domain entities to fulfill a business rule.

## 13. Application Service Boundaries
*   Serves as the "Use Case" layer, orchestrating infrastructure and domain operations.
*   Fetches aggregates from repositories, invokes domain methods, and saves the aggregate.
*   Handles transaction boundaries.
*   Does not contain pure business rules.

## 14. Event Publication Rules
*   Domain Events are recorded internally within the Aggregate Root during state mutations.
*   Events represent facts that have already occurred (e.g., `OrderPlacedEvent`).
*   Events are dispatched to the Kernel `IEventBus` *only* after successful persistence by the Application Service / Unit of Work.

## 15. Error Handling Rules
*   Use specific, richly typed Domain Errors (e.g., `InsufficientFundsError`, not `Error("not enough money")`).
*   Errors must describe business violations, entirely free of infrastructure or database details (e.g., no SQL constraint errors).

## 16. Validation Strategy
*   "Always Valid State": It must be impossible to instantiate an invalid Entity or Value Object.
*   Validation happens aggressively at object creation (constructors or factories).
*   Fail fast and explicitly.

## 17. Testing Strategy
*   **100% Unit Test Coverage:** The Domain Layer must be exhaustively testable without any mocking of databases or web servers.
*   Tests must focus on behavior and invariant enforcement, not state structure.

## 18. Migration Strategy
*   Data migrations and schema definitions belong entirely in the Infrastructure layer.
*   Data retrieved from the infrastructure layer must be mapped/hydrated into pure Domain Objects before the Domain Layer interacts with it.

## 19. Implementation Phases
*   **Phase 1:** Core Types, Base Classes, and Custom Domain Errors.
*   **Phase 2:** Shared Value Objects (e.g., Money, Email, TenantId).
*   **Phase 3:** Core Aggregate Roots and Entities.
*   **Phase 4:** Domain Services and Repository Interfaces.
*   **Phase 5:** Application Services (Use Cases).

## 20. Completion Gates
*   Automated static analysis verifies zero forbidden dependencies (No ORM, UI, or HTTP in Domain).
*   100% Unit Test coverage on all Entities and Value Objects.
*   Human verification that models reflect Ubiquitous Language.
*   Sign-off from the Architect.
