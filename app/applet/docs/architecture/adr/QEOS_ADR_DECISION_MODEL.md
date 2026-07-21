# QEOS ADR DECISION MODEL

## I. ADR Decision Modeling

### 1. ADR-0001
**A. Decision Identity**
- **ADR ID:** ADR-0001
- **Title:** V5 Execution Roadmap and Governance Doctrine
- **Status:** Active

**B. Decision Type**
- Architecture, Governance, Security, Database

**C. Decision Scope**
- Global

**D. Decision Intent**
- Establish a highly hardened, enterprise-grade multi-tenant architecture and define the 11 phases to transition from legacy schemas to V5 compliance, including strict RLS lockdown.

**E. Decision Outcome**
- The system enforces a fail-closed tenant isolation model, hardens DB with RLS, restricts direct client writes, and enforces backend edge function operations for sensitive transactions.

**F. Architectural Owner**
- Constitution / Governance

**G. QEOS Layer Impact**
- Security Layer, Database Layer, API/Middleware Layer, Domain Logic Layer

**H. Dependencies**
- QEOS Constitution

**I. Reverse Dependencies**
- ADR-0002

**J. Decision Relationship**
- Complementary (to ADR-0002), Candidate for Merge

**K. Canonical Authority**
- Canonical

**L. Engineering Risk**
- Critical (If removed, the entire security posture and phase authorization model collapses).

---

### 2. ADR-0002
**A. Decision Identity**
- **ADR ID:** ADR-0002
- **Title:** RBAC Outside Database (Middleware Layer)
- **Status:** Active

**B. Decision Type**
- Security, Runtime, Middleware, Identity

**C. Decision Scope**
- Layer (Backend/Middleware)

**D. Decision Intent**
- Solve the problem of managing dynamic RBAC rules (schedules, financial limits) without constantly mutating core database schemas via migrations.

**E. Decision Outcome**
- Staff and agent roles are governed and evaluated at the Middleware/Gateway layer rather than relying exclusively on Database RLS for dynamic business rules.

**F. Architectural Owner**
- Security Layer / API Layer

**G. QEOS Layer Impact**
- API/Middleware Layer, Security Layer

**H. Dependencies**
- ADR-0001 (Relies on the DB being locked down so the Middleware can safely proxy requests)

**I. Reverse Dependencies**
- None

**J. Decision Relationship**
- Complementary (to ADR-0001), Candidate for Merge

**K. Canonical Authority**
- Canonical

**L. Engineering Risk**
- High (If removed, the dynamic permissions logic will fail, breaking staff access controls).

---

### 3. ADR-README-1
**A. Decision Identity**
- **ADR ID:** ADR-README-1
- **Title:** ADR Directory Index (architecture/ADR)
- **Status:** Duplicate

**B. Decision Type**
- Documentation

**C. Decision Scope**
- Local (Directory)

**D. Decision Intent**
- Provide an index of active architectural decisions in the legacy path.

**E. Decision Outcome**
- Lists active standards but creates knowledge fragmentation due to misplacement.

**F. Architectural Owner**
- Governance

**G. QEOS Layer Impact**
- None (Documentation only)

**H. Dependencies**
- None

**I. Reverse Dependencies**
- None

**J. Decision Relationship**
- Duplicate, Candidate for Merge

**K. Canonical Authority**
- Archive Candidate

**L. Engineering Risk**
- Low

---

### 4. ADR-README-2
**A. Decision Identity**
- **ADR ID:** ADR-README-2
- **Title:** ADR Directory Index (architecture/adr)
- **Status:** Duplicate

**B. Decision Type**
- Documentation

**C. Decision Scope**
- Local (Directory)

**D. Decision Intent**
- Provide a template and index for ADRs in an alternate legacy path.

**E. Decision Outcome**
- Explains the ADR process but duplicates the official index.

**F. Architectural Owner**
- Governance

**G. QEOS Layer Impact**
- None (Documentation only)

**H. Dependencies**
- None

**I. Reverse Dependencies**
- None

**J. Decision Relationship**
- Duplicate, Candidate for Merge

**K. Canonical Authority**
- Archive Candidate

**L. Engineering Risk**
- Low

---

### 5. ADR-README-3
**A. Decision Identity**
- **ADR ID:** ADR-README-3
- **Title:** ADR Directory Index (Nested official path)
- **Status:** Placeholder

**B. Decision Type**
- Documentation

**C. Decision Scope**
- Local (Directory)

**D. Decision Intent**
- Official guide on how to write ADRs and map them to the Constitution.

**E. Decision Outcome**
- Acts as the standard format for new decisions, but resides in a nested/duplicated path.

**F. Architectural Owner**
- Governance

**G. QEOS Layer Impact**
- None (Documentation only)

**H. Dependencies**
- QEOS_CONSTITUTION.md, QEOS_DEVELOPMENT_CONSTITUTION.md

**I. Reverse Dependencies**
- None

**J. Decision Relationship**
- Candidate for Merge

**K. Canonical Authority**
- Supporting

**L. Engineering Risk**
- Low

---

### 6. ADR-PLACEHOLDER
**A. Decision Identity**
- **ADR ID:** ADR-PLACEHOLDER
- **Title:** Legacy System ADR Placeholder
- **Status:** Legacy

**B. Decision Type**
- Documentation / Historical

**C. Decision Scope**
- Local

**D. Decision Intent**
- Document the legacy Qaroni OS ADR structure.

**E. Decision Outcome**
- Preserves historical traceability of older architectural traces.

**F. Architectural Owner**
- Governance (Legacy)

**G. QEOS Layer Impact**
- None

**H. Dependencies**
- Legacy QOC Article IV

**I. Reverse Dependencies**
- None

**J. Decision Relationship**
- Superseded

**K. Canonical Authority**
- Historical / Archive Candidate

**L. Engineering Risk**
- None

---

## II. Global Deliverables

### 1. Decision Dependency Graph
```text
[QEOS_CONSTITUTION]
       │
       ▼
  [ADR-0001] (V5 Execution Roadmap & DB Lockdown)
       │
       ▼
  [ADR-0002] (Dynamic RBAC in Middleware Layer)

[Documentation Indices]
- ADR-README-1 (Fragmented)
- ADR-README-2 (Fragmented)
- ADR-README-3 (Nested Template)
- ADR-PLACEHOLDER (Legacy)
```

### 2. Decision Clusters
- **Core Architecture & Security:** ADR-0001, ADR-0002
- **Documentation & Indexing:** ADR-README-1, ADR-README-2, ADR-README-3, ADR-PLACEHOLDER

### 3. Merge Candidates
- **ADR-0001 & ADR-0002:** Candidate for semantic merge into a unified "V5 Security & RBAC Architecture" ADR.
- **ADR-README-1, ADR-README-2, ADR-README-3, ADR-PLACEHOLDER:** Candidate to merge into a single canonical `docs/architecture/adr/README.md` and archive the rest.

### 4. Governance Risks
- **Duplicated Authority:** Multiple README indices spread across `architecture/ADR`, `architecture/adr`, and nested folders create confusion over the authoritative template.
- **Overlapping Responsibility:** ADR-0001 sets DB rules for RBAC, while ADR-0002 sets Middleware rules for RBAC. Without a consolidated document, developers might miss one part of the authorization flow.
- **Missing Authority:** Some ADRs lack explicit traceability to the exact Constitutional article they enforce.
- **Circular Dependency:** None detected.
- **Path Fragmentation:** Critical decisions are stored outside the canonical `docs/architecture/adr/` path.
