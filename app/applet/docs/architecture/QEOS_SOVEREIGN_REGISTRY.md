# 🏛️ سجل السيادة المعماري (QEOS Sovereign Registry)

هذا السجل هو مصدر الحقيقة الوحيد (Single Source of Truth) لهيكلية نظام QEOS، ولا يُعتد بأي وثيقة أو كود يخالف ما ورد فيه.

## 1. المرجعيات العليا (Supreme References)

### A) الوثيقة العليا الحاكمة (Supreme Governing Document)
- **الوثيقة:** `QEOS_CONSTITUTION.md`
- **سلطتها:** المرجعية الأعلى والمطلقة في المشروع. تُعرّف الطبقات العشرين ولا يُسمح لأي وثيقة، قرار معماري، أو كود بمخالفتها.

### B) دستور التطوير (Development Constitution)
- **الوثيقة:** `QEOS_DEVELOPMENT_CONSTITUTION.md`
- **سلطتها:** المرجع التنفيذي الذي يُلزم بالتطوير وفقاً للدستور الأعلى، ويُعرّف قواعد التطوير الصارمة. يخضع تماماً لـ `QEOS_CONSTITUTION.md`.

### C) تقرير التدقيق (Audit Report)
- **الوثيقة:** `QEOS_ARCHITECTURE_AUDIT_REPORT.md`
- **سلطتها:** وثيقة تشخيصية توضح حالة النظام والمخالفات الموجودة لتصحيحها.

### D) خطة الهجرة (Migration Plan)
- **الوثيقة:** `QEOS_ARCHITECTURE_MIGRATION_PLAN.md`
- **سلطتها:** خارطة الطريق الإلزامية للانتقال من البنية القديمة إلى بنية QEOS المعتمدة.

---

## 2. مصفوفة سلطة الوثائق (Document Authority Matrix)

تم تحليل 162 وثيقة معمارية وتصنيف أبرز المجموعات كما يلي:

| اسم الوثيقة / المجلد | نوعها | سلطتها | حالتها | تعارض مع الدستور الأعلى؟ | الإجراء المستقبلي |
|---|---|---|---|---|---|
| `QEOS_CONSTITUTION.md` | Constitution | Supreme | Active | لا | المرجع الأساسي الأعلى |
| `QEOS_DEVELOPMENT_CONSTITUTION.md` | Constitution | High | Active | لا | المرجع التطويري التنفيذي |
| `docs/archive/legacy/qaroni-os/constitution/*` (9 files) | Legacy Constitution | None | Archived | نعم (تعارض صريح) | مؤرشفة |
| `docs/archive/legacy/architecture/constitution/*` (2 files) | Legacy Constitution | None | Archived | نعم (تعارض صريح) | مؤرشفة |
| `docs/archive/legacy/qaroni-engine/constitution/*` (1 file) | Legacy Constitution | None | Archived | نعم (تعارض صريح) | مؤرشفة |
| `architecture/ADR/*`, `architecture/adr/*`, `qaroni-os/adr/*` | Architecture Records | Medium | Review | ربما (قرارات قديمة) | دمج ونقل إلى `docs/architecture/adr/` |
| `architecture/manifest/*` | Technical Doc | Medium | Active | لا | تحديث وإبقاء |
| `architecture/database-blueprint/*` | Technical Doc | Medium | Active | لا | تحديث وإبقاء |
| `architecture/specification/*` | Technical Doc | Medium | Active | لا | ربط بالطبقات العشرين |
| `qaroni-engine/protocols/*` | Technical Doc | Medium | Review | ربما (تكرار) | دمج وتوحيد |
| `reports/*`, `docs/*_REPORT.md` | Report | Low | Archived | لا | أرشفة |

---

## 3. التصنيف الشامل للوثائق (Document Classification)

### 👑 Sovereign Documents (وثائق سيادية)
- `docs/architecture/QEOS_CONSTITUTION.md`
- `docs/architecture/QEOS_SOVEREIGN_REGISTRY.md` (هذا السجل)

### 📜 Governing Documents (وثائق حوكمة)
- `docs/architecture/QEOS_DEVELOPMENT_CONSTITUTION.md`
- `docs/architecture/QEOS_ARCHITECTURE_MIGRATION_PLAN.md`
- `docs/architecture/QEOS_ARCHITECTURE_AUDIT_REPORT.md`

### 🏗️ Architecture Records (ADR)
- `docs/architecture/adr/README.md`
- *(مستقبلاً: جميع ملفات الـ ADR المعتمدة ستنقل هنا)*

### ⚙️ Technical Documents (وثائق تقنية)
- `architecture/manifest/*`
- `architecture/database-blueprint/*`
- `architecture/specification/*`
- `architecture/contracts/*`
- `architecture/execution-framework/*`
- `qaroni-engine/architecture/*`
- `qaroni-engine/protocols/*`

### 🗑️ Archived Documents (وثائق مؤرشفة - تمت ضمن Wave 1)
- `docs/archive/legacy/qaroni-os/constitution/*`
- `docs/archive/legacy/architecture/constitution/*`
- `docs/archive/legacy/qaroni-engine/constitution/*`
- `docs/archive/legacy/reports/*`

### 🔄 Deprecated / Candidate Removal (وثائق مهملة / مرشحة للأرشفة)
- `architecture/ADR/*` (المجلدات القديمة)
- `architecture/adr/*` (المجلدات القديمة)
- `qaroni-os/adr/*`

---

## 4. الوثائق التي تتطلب الدمج (Documents Requiring Consolidation)

- **قرارات ADR المشتتة:** جميع الملفات الموجودة في `architecture/ADR`، `architecture/adr`، و `qaroni-os/adr`.
- **بروتوكولات التراجع (Rollback):** (`architecture/Rollback.md`، `architecture/rollback/README.md`، `qaroni-engine/protocols/RollbackProtocol.md`، `architecture/contracts/RollbackContracts.md`).
- **تقارير الفجوات (Gap Analysis):** (`architecture/GapAnalysisReport.md` و `architecture/reports/GapAnalysisReport.md`).
- **بروتوكولات التحقق والتنفيذ:** الوثائق المشتتة بين `architecture/execution-framework` و `qaroni-engine/protocols`.

---

## 5. القواعد الحاكمة للسجل (Registry Rules)

تُعتبر هذه القواعد قطعية الدلالة والتنفيذ. لا يُسمح مستقبلاً بإنشاء أي مما يلي إلا عبر اقتراح يُسجل ويُعتمد رسمياً ويوثق في **QEOS Sovereign Registry**:
1. 🚫 **لا دستور جديد:** يُمنع منعاً باتاً إنشاء أي ملف يحمل اسم دستور (Constitution) في أي مكان في المشروع.
2. 🚫 **لا طبقة جديدة:** تُمنع إضافة أو استحداث أي طبقة معمارية تتجاوز الـ 20 طبقة المعتمدة.
3. 🚫 **لا قرار معماري:** يجب توثيق أي قرار هندسي أو هيكلي جوهري عبر `docs/architecture/adr/` حصراً.
4. 🚫 **لا نمط تصميم:** يُمنع إدخال أنماط تصميم هيكلية جديدة تتعارض مع السيادة المعمارية المحددة في هذا السجل.
