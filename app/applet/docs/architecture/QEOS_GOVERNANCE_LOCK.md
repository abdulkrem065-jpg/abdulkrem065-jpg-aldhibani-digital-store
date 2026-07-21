# 🔒 قفل الحوكمة التنفيذي (QEOS Governance Lock)

## 1. حالة قفل الحوكمة (Governance Lock State)
يُعلن هذا البروتوكول أن النظام المعماري والحوكمي لمشروع QEOS قد أصبح في حالة **قفل كامل (Locked)**. لا يمكن تجاوز أو التحايل على أي وثيقة سيادية، وتُعتبر جميع الدساتير والقواعد المدرجة في `QEOS_CANONICAL_SOURCES.md` قوانين تنفيذية نافذة بصورة فورية على كافة المطورين ووكلاء الذكاء الاصطناعي.

## 2. بوابة الدخول الإلزامية (Mandatory Entry Gate)
يُحظر بدء أي عملية أو مهمة قبل اجتياز بوابة الدخول المعرفية التالية بالترتيب الصارم:
1. قراءة `QEOS_SYSTEM_CONTEXT.md` (لمعرفة الحالة الحية للنظام والمرحلة الحالية).
2. قراءة `QEOS_KNOWLEDGE_INDEX.md` (لفهم الفهرس وتسلسل الوثائق المطلوبة).
3. قراءة `QEOS_CANONICAL_SOURCES.md` (لتحديد السلطات المرجعية وفك النزاعات المحتملة).

## 3. مصفوفة صلاحيات التنفيذ (Execution Permission Matrix)
يحدد هذا الجدول من يُسمح له بتنفيذ المهام، وما هي البوابات (Gates) المطلوبة قبل التنفيذ:

| العملية (Operation) | المُنفِّذ المسموح له (Authorized Executor) | البوابات المطلوبة (Required Gates) |
|---------------------|--------------------------------------------|--------------------------------------|
| **كتابة كود** | Developer / AI Agent | Domain Gates, Layer Gates (`QEOS_CONSTRUCTION_ROADMAP.md`) |
| **تعديل وثيقة** | Governance Board / Architect / AI Agent | Document Lifecycle, Canonical Sources Authority |
| **إنشاء ADR** | Architect / Lead Engineer | Governance Approval, Architecture Enforcement |
| **نقل ملفات** | Execution Agent / Release Manager | Execution Transaction Protocol, Milestone Baseline |
| **حذف ملفات** | **ممنوع (Archiving Only)** | إذن من QEOS Architect، وفقاً لـ `QEOS_DOCUMENT_LIFECYCLE.md` |
| **تنفيذ Waves** | Execution Lead / AI Agent | Wave Verification Protocol, Milestone Approval |

## 4. العمليات المحظورة (Forbidden Operations)
العمليات التالية محظورة تماماً (Strictly Forbidden) ولا يمكن تنفيذها بدون قرار معماري رسمي (ADR) وموافقة بشرية صريحة:
1. إنشاء مكتبة تقنية جديدة أو قاعدة بيانات تتجاوز المسموح به في `QEOS_DEVELOPMENT_CONSTITUTION.md`.
2. إجراء استدعاء برمجي عكسي (Bottom-Up Call) ينتهك التراتبية المعتمدة.
3. التعديل المباشر أو الالتفاف على الدستور (`QEOS_CONSTITUTION.md`).
4. حذف وثائق أو ملفات سيادية أو أرشفتها دون توثيق النقل عبر `QEOS_EXECUTION_TRANSACTION.md`.
5. تنفيذ موجة ثانية (Wave 2) قبل إغلاق الموجة السابقة واعتماد الـ Milestone الخاص بها.

## 5. تسلسل التحقق الحوكمي (Governance Check Sequence)
قبل المضي قدماً في أي تنفيذ فعلي (كتابة، تعديل، نقل)، يجب اتباع التسلسل التالي:
1. **Identification:** حدد طبيعة المهمة والطبقة المعمارية (Layer) التي تستهدفها.
2. **Constitutional Check:** تأكد أن المهمة لا تخالف `QEOS_CONSTITUTION.md` و `QEOS_AI_AGENT_CONSTITUTION.md`.
3. **Canonical Resolution:** إذا وُجد تعارض في المراجع، استخدم `QEOS_CANONICAL_SOURCES.md` لتحديد الوثيقة النافذة.
4. **Execution Alignment:** تأكد أن الإجراء يتبع مسار المعاملات المُعرف في `QEOS_EXECUTION_TRANSACTION.md`.

## 6. قائمة التحقق قبل التنفيذ (Lock Verification Checklist)
يجب على أي وكيل ذكاء اصطناعي (AI Agent) أو مطور بشري اجتياز القائمة التالية قبل التنفيذ:
- [ ] هل قرأت `QEOS_SYSTEM_CONTEXT.md` واستوعبت المرحلة الراهنة؟
- [ ] هل العملية المطلوبة مُصرح بها وفقاً لـ (Execution Permission Matrix)؟
- [ ] هل العملية تخلو من أي انتهاك للـ (Forbidden Operations)؟
- [ ] هل المهمة موثقة كمعاملة ذرية (Atomic Transaction) في حال كانت عملية كبرى؟
- [ ] هل تم التحقق من عدم وجود تعارض مع دستور الذكاء الاصطناعي (`QEOS_AI_AGENT_CONSTITUTION.md`)؟

## 7. البيان الختامي لقفل الحوكمة (Final Governance Lock Statement)
> **"أي عملية تنفيذ خارج هذا البروتوكول تعتبر باطلة دستورياً، وتُرفض تلقائياً، ويُطبّق عليها أمر الإلغاء الفوري (Rollback)."**
