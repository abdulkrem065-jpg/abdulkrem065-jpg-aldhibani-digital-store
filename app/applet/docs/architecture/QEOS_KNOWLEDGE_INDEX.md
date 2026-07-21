# 🧭 الفهرس المعرفي الشامل لنظام QEOS
**QEOS Knowledge Index**

هذه الوثيقة ليست مواصفات فنية جديدة (Not another specification). إنها **نقطة الدخول الرسمية الوحيدة** (Official Entry Point) لكل مطور بشري وكل وكيل ذكاء اصطناعي (AI Agent) يعمل في مشروع QEOS.

---

## 1. مصدر الحقيقة الوحيد (Single Source of Truth)
جميع الوثائق المدرجة في هذا الفهرس تخضع لتسلسل هرمي صارم. **لا يُسمح لأي وثيقة، أو كود برمجي، أو قرار معماري أن يناقض أو يتعارض مع وثيقة ذات سلطة أعلى.** الدستور الأعلى (`QEOS_CONSTITUTION.md`) هو المرجع المطلق الذي تتبعه جميع الوثائق الأخرى. أي تعارض يُحل دائماً لصالح الوثيقة ذات السلطة الأعلى.

---

## 2. التسلسل الرسمي للقراءة (Official Documentation Reading Sequence)
يجب اتباع هذا التسلسل الإلزامي لفهم معمارية وحوكمة QEOS بشكل صحيح:

1. `QEOS_SYSTEM_CONTEXT.md` (السياق الحي السريع)
   ↓
2. `QEOS_CONSTITUTION.md` (الدستور الأعلى والطبقات العشرين)
   ↓
3. `QEOS_DEVELOPMENT_CONSTITUTION.md` (قواعد وممنوعات التطوير)
   ↓
4. `QEOS_SOVEREIGN_REGISTRY.md` (سجل السلطات والوثائق المعتمدة)
   ↓
5. `QEOS_BASELINE.md` (نقطة الأساس الحالية للمشروع)
   ↓
6. `QEOS_CONSTRUCTION_ROADMAP.md` (خارطة البناء للطبقات العشرين)
   ↓
7. `QEOS_DOCUMENT_LIFECYCLE.md` (قانون دورة حياة الوثائق)
   ↓
8. `QEOS_DOCUMENT_MANIFEST.md` (الفهرس الشامل)
   ↓
9. `QEOS_DOCUMENT_RELATIONSHIP_MAP.md` (خريطة العلاقات الهرمية)
   ↓
10. `QEOS_GOVERNANCE_ROADMAP.md` (خارطة التشغيل ومسار اتخاذ القرار)

---

## 3. تصنيف وتفاصيل الوثائق (Categories & Document Registry)

### أ) الوثائق السيادية (Sovereign Documents)

**1. QEOS_CONSTITUTION.md**
- **Purpose:** يحدد المعمارية السيادية ذات الـ 20 طبقة.
- **Authority level:** Supreme (الأعلى).
- **Depends on:** None.
- **Used by:** Everyone (AI & Humans).
- **Mandatory reading order:** 2.

**2. QEOS_SOVEREIGN_REGISTRY.md**
- **Purpose:** يسجل سلطة وحالة جميع الوثائق في المشروع.
- **Authority level:** Sovereign.
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Governance Board, AI Agents.
- **Mandatory reading order:** 4.

**3. QEOS_BASELINE.md**
- **Purpose:** نقطة الصفر المرجعية وحالة التجميد للمشروع.
- **Authority level:** Sovereign.
- **Depends on:** QEOS_SOVEREIGN_REGISTRY.md.
- **Used by:** Release Managers, QA.
- **Mandatory reading order:** 5.

**4. QEOS_DOCUMENT_MANIFEST.md**
- **Purpose:** الفهرس الرسمي لجميع الوثائق وحالاتها.
- **Authority level:** Sovereign.
- **Depends on:** QEOS_SOVEREIGN_REGISTRY.md.
- **Used by:** AI Agents, Developers.
- **Mandatory reading order:** 8.

### ب) وثائق الحوكمة (Governance Documents)

**5. QEOS_DEVELOPMENT_CONSTITUTION.md**
- **Purpose:** قوانين التطوير، الممنوعات، وشروط كتابة الكود.
- **Authority level:** High.
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Lead Engineers, Developers, Code Agents.
- **Mandatory reading order:** 3.

**6. QEOS_GOVERNANCE_ROADMAP.md**
- **Purpose:** خارطة تشغيل الوثائق المعمارية ودورة اتخاذ القرار.
- **Authority level:** High.
- **Depends on:** QEOS_SOVEREIGN_REGISTRY.md.
- **Used by:** Governance Board, Architects.
- **Mandatory reading order:** 10.

**7. QEOS_DOCUMENT_LIFECYCLE.md**
- **Purpose:** دورة حياة الوثائق وكيفية الاعتماد والاستبدال والأرشفة.
- **Authority level:** High.
- **Depends on:** QEOS_GOVERNANCE_ROADMAP.md.
- **Used by:** Document Creators.
- **Mandatory reading order:** 7.

**8. QEOS_DOCUMENT_RELATIONSHIP_MAP.md**
- **Purpose:** خريطة توضح الارتباطات والتبعيات بين الوثائق.
- **Authority level:** Medium.
- **Depends on:** QEOS_DOCUMENT_MANIFEST.md.
- **Used by:** AI Agents.
- **Mandatory reading order:** 9.

### ج) الوثائق المعمارية (Architecture Documents)

**9. QEOS_CONSTRUCTION_ROADMAP.md**
- **Purpose:** المرجع التنفيذي الوحيد لبناء النظام طبقة بطبقة.
- **Authority level:** High.
- **Depends on:** QEOS_DEVELOPMENT_CONSTITUTION.md.
- **Used by:** Lead Engineers, Developers.
- **Mandatory reading order:** 6.

### د) وثائق التنفيذ (Execution Documents)

**10. QEOS_EXECUTION_TRANSACTION.md**
- **Purpose:** بروتوكول تنفيذ العمليات كـ Transactions ذرية.
- **Authority level:** Medium.
- **Depends on:** QEOS_GOVERNANCE_ROADMAP.md.
- **Used by:** Execution Agents.
- **Mandatory reading order:** As needed (عند التنفيذ).

**11. QEOS_MILESTONE_1.md**
- **Purpose:** إعلان استقرار السيادة واكتمال مرحلة التنظيف الأولى.
- **Authority level:** Medium.
- **Depends on:** QEOS_BASELINE.md.
- **Used by:** Everyone.
- **Mandatory reading order:** Reference.

**12. QEOS_WAVE1_EXECUTION_REPORT.md**
- **Purpose:** تقرير التنفيذ الفعلي لـ Wave 1.
- **Authority level:** Low (Historical).
- **Depends on:** QEOS_MIGRATION_VERIFICATION_PROTOCOL.md.
- **Used by:** QA.
- **Mandatory reading order:** Reference.

### هـ) وثائق الهجرة (Migration Documents)

**13. QEOS_ARCHITECTURE_MIGRATION_PLAN.md**
- **Purpose:** خارطة الانتقال من النظام القديم المشتت.
- **Authority level:** High (خلال الهجرة).
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Migration Lead.
- **Mandatory reading order:** Reference.

**14. QEOS_MIGRATION_EXECUTION_MANIFEST.md**
- **Purpose:** الخطة التنفيذية الدقيقة لموجات الهجرة.
- **Authority level:** High.
- **Depends on:** QEOS_ARCHITECTURE_MIGRATION_PLAN.md.
- **Used by:** Execution Agents.
- **Mandatory reading order:** Reference.

**15. QEOS_MIGRATION_VERIFICATION_PROTOCOL.md**
- **Purpose:** بروتوكول فحص واعتماد موجات الهجرة.
- **Authority level:** High.
- **Depends on:** QEOS_MIGRATION_EXECUTION_MANIFEST.md.
- **Used by:** QA, Verification Agents.
- **Mandatory reading order:** Reference.

**16. QEOS_ARCHITECTURE_AUDIT_REPORT.md**
- **Purpose:** التقرير التشخيصي للفجوات قبل الهجرة.
- **Authority level:** Low (Historical).
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Migration Team.
- **Mandatory reading order:** Reference.

**17. QEOS_WAVE1_SIMULATION_REPORT.md (Archived)**
- **Purpose:** محاكاة الموجة الأولى.
- **Authority level:** None.
- **Depends on:** -
- **Used by:** -
- **Mandatory reading order:** N/A.

### و) وثائق سياق الذكاء الاصطناعي (AI Context Documents)

**18. QEOS_SYSTEM_CONTEXT.md**
- **Purpose:** ملخص تنفيذي حي ومباشر لحالة المشروع الحالية.
- **Authority level:** High.
- **Depends on:** QEOS_MILESTONE_1.md.
- **Used by:** AI Agents, Developers.
- **Mandatory reading order:** 1.

---

## 4. تسلسل إقلاع وكلاء الذكاء الاصطناعي (AI Bootstrap Sequence)
قبل أن يشرع أي وكيل ذكاء اصطناعي (AI Agent) في تنفيذ أي مهمة أو كتابة أي كود، **يجب عليه قراءة وتحميل الوثائق التالية بالترتيب الإلزامي**:
1. **`QEOS_KNOWLEDGE_INDEX.md`** (هذه الوثيقة - لفهم الخريطة المعرفية).
2. **`QEOS_SYSTEM_CONTEXT.md`** (لمعرفة الحالة الحية للنظام وآخر إنجاز).
3. **`QEOS_CONSTITUTION.md`** (لبرمجة حدود المعمارية في الذاكرة).
4. **`QEOS_DEVELOPMENT_CONSTITUTION.md`** (لمعرفة الممنوعات والشروط).
5. **`QEOS_CONSTRUCTION_ROADMAP.md`** (لمعرفة ما هي الطبقة المسموح ببنائها حالياً).

---

## 5. تسلسل إقلاع المطورين البشريين (Human Developer Bootstrap)
بالنسبة لأي مهندس جديد ينضم للمشروع، يجب عليه دراسة الوثائق التالية بالترتيب الإلزامي قبل كتابة أي كود:
1. **`QEOS_SYSTEM_CONTEXT.md`** (للحصول على صورة سريعة عن الوضع).
2. **`QEOS_CONSTITUTION.md`** (لفهم الـ 20 طبقة).
3. **`QEOS_DEVELOPMENT_CONSTITUTION.md`** (لفهم قواعد كتابة الكود المعتمدة).
4. **`QEOS_CONSTRUCTION_ROADMAP.md`** (لمعرفة المهام الحالية والمستقبلية).
5. **`QEOS_GOVERNANCE_ROADMAP.md`** (لمعرفة كيف يُقدم مقترح تقني وكيف يُعتمد).

### ز) وثائق أخرى (Other Documents)
**19. QEOS_CANONICAL_SOURCES.md**
- **Purpose:** قانون المصادر المعتمدة.
- **Authority level:** Supreme.
- **Depends on:** None.
- **Used by:** Everyone.

**20. QEOS_EXECUTION_PROTOCOL.md**
- **Purpose:** بروتوكول التنفيذ الرسمي.
- **Authority level:** Operational.
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Execution Agents.

**21. QEOS_ARCHITECTURE_ENFORCEMENT.md**
- **Purpose:** نظام الإلزام المعماري.
- **Authority level:** Operational.
- **Depends on:** QEOS_CONSTITUTION.md.
- **Used by:** Architects and AI Agents.
