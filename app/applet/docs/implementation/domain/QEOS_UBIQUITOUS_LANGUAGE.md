# QEOS UBIQUITOUS LANGUAGE

## 1. Official Business Vocabulary
The Ubiquitous Language defines the exact terminology used by all domain experts, engineers, and documentation within the QEOS ecosystem. It bridges the gap between business concepts and software implementation, ensuring a shared understanding without translation.

## 2. Canonical Entity Names
Entities possess a unique identity that persists over time.
*   `User`: An individual holding credentials to access the system.
*   `OrderLine`: A specific item and quantity within a customer order.
*   `JournalEntry`: A single debit or credit record within an accounting transaction.
*   `StockItem`: A tracked physical good residing in a specific location.

## 3. Canonical Aggregate Names
Aggregates are clusters of domain objects that can be treated as a single unit. The Aggregate Root is the only entity accessible from outside the boundary.
*   `Tenant`: The root organizational workspace.
*   `Account`: A financial ledger account.
*   `Order`: A customer's request to purchase goods.
*   `Inventory`: The holistic root managing all stock movements for a catalog item.
*   `Product`: The definition of a sellable item.

## 4. Canonical Value Object Names
Value Objects are immutable descriptors without conceptual identity.
*   `Money`: Represents an amount and its currency.
*   `TenantId`: A strictly formatted identifier for a Tenant.
*   `EmailAddress`: A validated email format.
*   `Address`: Physical location details (street, city, country).
*   `OrderStatus`: The current phase of an Order (e.g., Pending, Shipped).

## 5. Canonical Repository Names
Repositories manage the persistence and retrieval of Aggregate Roots.
*   `ITenantRepository`
*   `IAccountRepository`
*   `IOrderRepository`
*   `IInventoryRepository`
*   `IProductRepository`

## 6. Canonical Domain Service Names
Domain Services encapsulate business logic that spans multiple aggregates or doesn't naturally fit in a single entity.
*   `CurrencyExchangeService`: Handles currency conversions using current rates.
*   `OrderPricingService`: Calculates complex discounts and taxes for an Order.
*   `InventoryAllocationService`: Resolves conflicts when multiple orders request limited stock.

## 7. Canonical Domain Event Names
Events describe facts that have already occurred. They follow a `[Noun][PastTenseVerb]Event` format.
*   `TenantProvisionedEvent`
*   `OrderPlacedEvent`
*   `InventoryDepletedEvent`
*   `AccountCreditedEvent`
*   `UserAuthenticatedEvent`

## 8. Canonical Application Service Names
Application Services orchestrate use cases, delegating to the Domain and Infrastructure. Format is typically `[Entity][Action]UseCase` or `[Domain]ApplicationService`.
*   `PlaceOrderUseCase`
*   `ProvisionTenantUseCase`
*   `TransferFundsUseCase`
*   `IAMApplicationService`

## 9. Canonical Module Names
Modules (or Bounded Contexts) represent the highest level of systemic division.
*   `IAMModule` (Identity & Access Management)
*   `TenantModule`
*   `LedgerModule`
*   `InventoryModule`
*   `CommerceModule`
*   `AIModule`

## 10. Reserved Words
These words have strict architectural or systemic meanings and must not be used casually for business entities.
*   `Kernel`, `Plugin`, `Hook`, `HookResult`
*   `Dispatcher`, `Bus`, `Interceptor`
*   `State`, `Context`, `Session`

## 11. Forbidden Names
Names that cause ambiguity, technical coupling, or conflict with standard ubiquitous language.
*   `Manager` (unless specifically an infrastructural orchestrator, use `Service` or an action-based name).
*   `Helper`, `Utils`, `Common` (Indicates a lack of domain cohesion).
*   `Data`, `Record`, `Row`, `Model` (Indicates database-driven design rather than domain-driven design).
*   `CRUD` (Refers to database operations, not domain behaviors).

## 12. Naming Conventions
*   **Classes/Interfaces:** PascalCase (e.g., `OrderLine`).
*   **Interfaces (Contracts):** Prefixed with `I` (e.g., `IOrderRepository`).
*   **Methods/Properties:** camelCase (e.g., `calculateTotal()`).
*   **Constants/Enums:** UPPER_SNAKE_CASE (e.g., `ORDER_PENDING`).
*   **Domain Events:** `[Noun][PastTenseVerb]Event` (e.g., `OrderPlacedEvent`).
*   **Commands:** `[Verb][Noun]Command` (e.g., `PlaceOrderCommand`).

## 13. Arabic ↔ English Mapping
To ensure cross-language alignment for bilingual domain experts:
*   `Tenant` ↔ مساحة العمل / المستأجر
*   `Ledger` ↔ دفتر الأستاذ
*   `Account` ↔ حساب مالي
*   `Order` ↔ طلب بيع
*   `Inventory` ↔ المخزون
*   `Journal Entry` ↔ قيد يومية
*   `Aggregate Root` ↔ الجذر التجميعي
*   `Value Object` ↔ كائن القيمة

## 14. Business Glossary
*   **Tenant:** A discrete, isolated client organization utilizing the QEOS platform.
*   **Double-Entry:** An accounting principle where every transaction consists of at least one debit and one credit of equal total value.
*   **Fulfillment:** The end-to-end process of receiving, packing, and shipping an order to a customer.
*   **Allocation:** Reserving specific inventory quantities for a specific pending order.

## 15. Future ERP Terminology
Reserved for upcoming Bounded Contexts.
*   `Payroll`: Compensation calculation and disbursement.
*   `BillOfMaterials` (BOM): The recipe for manufacturing a product.
*   `Procurement`: The process of sourcing and purchasing raw materials.

## 16. Future AI Terminology
Reserved for the AI Operations Context.
*   `Agent`: An autonomous algorithmic unit capable of decision-making.
*   `Insight`: A derived conclusion drawn from ledger or commerce data.
*   `Task`: A system-generated directive assigned to a user or agent.
*   `Heuristic`: A rule-of-thumb algorithm used for fast, approximate estimations.

## 17. Consistency Rules
*   Once a term is defined in this document, it must be used exclusively and universally across all codebases, UI elements, APIs, and documentation.
*   Synonyms are strictly forbidden (e.g., do not use "Client" if the official term is "Customer", do not use "Cart" if the official term is "Order").

## 18. Verification Rules
*   Code Reviews must explicitly check for compliance with the Ubiquitous Language.
*   Domain Event schemas must be audited against the Canonical Domain Event Names rule.
*   Any new concept introduced during development must be formally added to this document before being merged into the master branch.
