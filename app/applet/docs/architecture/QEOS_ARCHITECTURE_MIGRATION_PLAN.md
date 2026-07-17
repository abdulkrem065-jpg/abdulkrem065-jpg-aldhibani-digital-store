# 🗺️ خطة الهجرة المعمارية إلى QEOS v1.0
**QEOS Architecture Migration Plan**

تم إعداد هذه الخطة بناءً على التدقيق المعماري الصادر في `QEOS_ARCHITECTURE_AUDIT_REPORT.md`. الهدف من هذه الخطة هو الانتقال الآمن والمنظم من البنية القديمة المشتتة إلى معمارية QEOS الموحدة (ذات الـ 20 طبقة)، دون فقدان أي معرفة سابقة وبدون كسر استقرار النظام.

---

## 1. 🚨 تصنيف المخالفات (Violation Classification)

بناءً على التقرير، تم تصنيف المخالفات المكتشفة كما يلي:

### 🔴 حرجة (Critical) - *يجب حلها فوراً قبل أي كتابة كود*
1. **تضارب الصلاحيات الدستورية (Authority Conflicts):** وجود 12 ملفاً قديماً يدعي أنه "دستور" (في `qaroni-os/`، `architecture/`، `qaroni-engine/`) مما يخلق بيئة متعارضة لوكلاء الذكاء الاصطناعي.
2. **عدم الامتثال الهيكلي (Structural Non-Compliance):** الهياكل الحالية لا تعكس أو تحترم هيكلية الطبقات العشرين (20-Layer Architecture) المنصوص عليها في QEOS.

### 🟡 متوسطة (Medium) - *يجب حلها بالتوازي مع تنظيم الهيكلة*
1. **تشتت سجلات القرارات (Scattered Decision Making):** وجود مجلدات ADR في 4 أماكن مختلفة.
2. **ازدواجية البروتوكولات (Protocol Duplication):** تكرار وثائق مثل `Rollback` و `Gap Analysis` في عدة مسارات.

### 🟢 منخفضة (Low) - *تُعالج أثناء مرحلة التوثيق النهائي*
1. **مصطلحات غير موحدة (Ambiguous Terminology):** استخدام مصطلحات مثل "Engine" و "OS" و "Gateway" بشكل عشوائي دون ربطها بالطبقات الرسمية (مثل Layer 13).

---

## 2. 🗂️ تحديد مصير الوثائق (Document Disposition)

تم تحديد الإجراء المناسب للوثائق الـ 162 الموجودة في المشروع:

### ✅ الاحتفاظ (Keep)
- `docs/architecture/QEOS_CONSTITUTION.md`
- `docs/architecture/QEOS_DEVELOPMENT_CONSTITUTION.md`
- `docs/architecture/adr/README.md`
- جميع ملفات `architecture/manifest/*` و `architecture/specification/*` و `architecture/database-blueprint/*` (مع تحديثها لاحقاً لربطها بالطبقات).

### 🔄 الدمج (Merge)
- جميع ملفات ADR القديمة (`architecture/ADR/*`, `architecture/adr/*`, `qaroni-os/adr/*`) تدمج وتُنقل إلى `docs/architecture/adr/`.
- وثائق بروتوكولات التراجع المتعددة (`Rollback`) تدمج في وثيقة بروتوكول واحدة تحت مسار `docs/architecture/`.

### 📦 الأرشفة (Archive) - *النقل إلى مجلد أرشيف دون الحذف*
- جميع الدساتير القديمة (Legacy Constitutions) في `qaroni-os/constitution/` و `architecture/constitution/` و `qaroni-engine/constitution/`.
- تقارير التدقيق والفحوصات القديمة (`reports/*` و `docs/*_REPORT.md` و `qaroni-engine/reports/*`).

### ♻️ الاستبدال (Replace)
- مسارات سير العمل القديمة مثل `architecture/DevelopmentWorkflow.md` تُستبدل رسمياً بما ورد في `QEOS_DEVELOPMENT_CONSTITUTION.md`.

---

## 3. 🏛️ المرجعيات الرسمية (Official References)

بمجرد اكتمال الهجرة، ستكون هذه هي المرجعيات الرسمية والوحيدة الحاكمة للمشروع:
1. **الدستور الأعلى:** `docs/architecture/QEOS_CONSTITUTION.md`
2. **الدستور التنفيذي والتطويري:** `docs/architecture/QEOS_DEVELOPMENT_CONSTITUTION.md`
3. **سجل القرارات الرسمي:** `docs/architecture/adr/`

---

## 4. 🛤️ خطة الهجرة التدريجية (Migration Roadmap)

### المرحلة 1: العزل والأرشفة (Isolation & Archiving)
- **الهدف:** القضاء على التضارب الدستوري وتجريد الوثائق القديمة من سلطتها.
- **الإجراء:** إنشاء مجلد `docs/archive/legacy/` ونقل كافة الدساتير القديمة والتقارير التاريخية إليه.

### المرحلة 2: توحيد المرجعيات (Consolidation of Authorities)
- **الهدف:** تجميع كل القرارات المعمارية في مكان واحد.
- **الإجراء:** تجميع كل ملفات الـ ADR المشتتة، إعادة صياغتها لتلائم القالب الجديد، ونقلها إلى `docs/architecture/adr/`. التخلص من مجلدات ADR المكررة.

### المرحلة 3: إعادة تعيين النطاقات (Domain Mapping to 20 Layers)
- **الهدف:** ربط المواصفات القديمة بهيكلية QEOS.
- **الإجراء:** تحديث ملفات `architecture/specification/*` لتتضمن ديباجة توضح إلى أي من الطبقات العشرين ينتمي هذا النطاق.

### المرحلة 4: التنظيف النهائي للبروتوكولات (Protocol Cleanup)
- **الهدف:** إزالة التكرار.
- **الإجراء:** دمج بروتوكولات `Rollback` وغيرها في ملفات قياسية موحدة.

---

## 5. 🛑 شروط الانتقال إلى المرحلة التالية (Exit Criteria)

تُعتبر خطة الهجرة مكتملة ويصبح النظام جاهزاً لكتابة الأكواد (Implementation) فقط إذا تحققت الشروط التالية:
- [ ] **التخلص من المخالفات الحرجة:** نسبة وجود تضارب دستوري = 0%.
- [ ] **نسبة الالتزام بدستور QEOS:** المعمارية مطابقة بنسبة ≥ 95%.
- [ ] **توحيد الـ ADR:** جميع القرارات المعمارية موجودة حصراً في `docs/architecture/adr/`.
- [ ] **أرشفة المكررات:** لا توجد أي مجلدات دساتير أو بروتوكولات متكررة خارج الأرشيف.
- [ ] **التصديق النهائي:** إصدار تقرير تدقيق جديد يؤكد الجاهزية.

**QEOS_MIGRATION_PLAN_ESTABLISHED**
