# 📄 بيان تنفيذ الهجرة الرسمي (QEOS Migration Execution Manifest)

هذه الوثيقة هي **خطة التنفيذ الرسمية** للبدء في هجرة البنية التحتية التوثيقية للمشروع. 
⚠️ **ملاحظة:** لم يتم تنفيذ أي خطوة فعلية حتى الآن؛ هذا البيان للمراجعة والاعتماد فقط.

---

## 1. 📊 الملخص التنفيذي (Executive Summary)
- **عدد الوثائق الحالية:** 162 وثيقة معمارية.
- **عدد العمليات المطلوبة:** تقريباً 45 عملية (تتضمن أرشفة، دمج، وتحديث مراجع).
- **هل توجد عمليات خطرة؟** نعم، عمليات الدمج (Merge) تحمل مخاطر فقدان السياق أو تفاصيل القرارات السابقة إذا لم تُنفذ بدقة.
- **هل توجد ملفات لا يمكن المساس بها؟** نعم، الوثائق الخمس السيادية التالية غير قابلة للمساس أو التعديل الجوهري:
  - `docs/architecture/QEOS_CONSTITUTION.md`
  - `docs/architecture/QEOS_DEVELOPMENT_CONSTITUTION.md`
  - `docs/architecture/QEOS_ARCHITECTURE_AUDIT_REPORT.md`
  - `docs/architecture/QEOS_ARCHITECTURE_MIGRATION_PLAN.md`
  - `docs/architecture/QEOS_SOVEREIGN_REGISTRY.md`

---

## 2. 📋 مصفوفة التنفيذ (Execution Matrix)

| ID | الملف / المجلد | نوع الوثيقة | الإجراء المقترح | السبب | مستوى الخطورة |
|---|---|---|---|---|---|
| 01 | `qaroni-os/constitution/*` | Legacy Constitution | ARCHIVE | تعارض مباشر مع الدستور الأعلى | منخفض |
| 02 | `architecture/constitution/*` | Legacy Constitution | ARCHIVE | تعارض مباشر مع الدستور الأعلى | منخفض |
| 03 | `qaroni-engine/constitution/*` | Legacy Constitution | ARCHIVE | تعارض مباشر مع الدستور الأعلى | منخفض |
| 04 | `architecture/ADR/*` | Architecture Records | MERGE | توحيد سجل القرارات في مجلد واحد | عالي |
| 05 | `architecture/adr/*` | Architecture Records | MERGE | توحيد سجل القرارات في مجلد واحد | عالي |
| 06 | `qaroni-os/adr/*` | Architecture Records | MERGE | توحيد سجل القرارات في مجلد واحد | عالي |
| 07 | `architecture/Rollback.md` | Protocol | MERGE | ازدواجية في بروتوكولات التراجع | متوسط |
| 08 | `architecture/rollback/README.md` | Protocol | MERGE | ازدواجية في بروتوكولات التراجع | متوسط |
| 09 | `qaroni-engine/protocols/RollbackProtocol.md`| Protocol | MERGE | ازدواجية في بروتوكولات التراجع | متوسط |
| 10 | `architecture/GapAnalysisReport.md` | Report | MERGE | تكرار في تقارير الفجوات | منخفض |
| 11 | `architecture/specification/*` | Technical Spec | UPDATE REFERENCES | ربط النطاقات بالطبقات العشرين لـ QEOS | متوسط |
| 12 | `reports/*` و `docs/*_REPORT.md` | Report | ARCHIVE | تقارير تشخيصية منتهية الصلاحية | منخفض |

---

## 3. 🔗 تحليل التبعيات (Dependency Analysis)

- **ما الوثائق التي تعتمد عليها؟** تعتمد المواصفات الفنية (`architecture/specification/*`) على الدساتير القديمة الملغاة.
- **ما الوثائق التي ستتأثر؟** جميع وثائق التخطيط المستقبلية ووكلاء الذكاء الاصطناعي سيعتمدون مساراً واحداً موحداً بدلاً من التخبط بين المجلدات.
- **هل سيؤثر التعديل على الدستور؟** لا، جميع التعديلات تهدف إلى *الامتثال* لـ `QEOS_CONSTITUTION.md`، ولن يتم المساس به.
- **هل سيؤثر على ADR؟** نعم، سيتم توحيد كافة سجلات القرارات لتصبح متسلسلة ومنظمة ضمن `docs/architecture/adr/`.
- **هل سيؤثر على المعرفة؟** سيؤدي الدمج والأرشفة إلى تركيز المعرفة ومنع التشتت، ولن يتم فقدان المعرفة لأن الملفات القديمة ستنقل لمجلد الأرشيف `docs/archive/legacy/` وليس الحذف.

---

## 4. ⚠️ تحليل المخاطر (Risk Analysis)

- **Critical (حرج):** تعديل أو حذف الوثائق السيادية الخمس بطريق الخطأ. (احتمالية منخفضة لوجود حظر قاطع).
- **High (عالي):** فقدان تفاصيل تقنية هامة أثناء عملية دمج الـ ADRs أو بروتوكولات الـ Rollback المتعددة.
- **Medium (متوسط):** إخفاق في تحديث كافة الروابط المرجعية (Cross-references) داخل ملفات `architecture/specification/` مما يسبب روابط مكسورة.
- **Low (منخفض):** أرشفة الدساتير القديمة (العملية مجرد نقل، ولا يترتب عليها أي تأثير برمجي سلبي).

---

## 5. ⏪ خطة التراجع (Rollback Plan)

في حال فشل أي خطوة أو اكتشاف فقدان بيانات هامة:
1. **كيف يمكن الرجوع؟** سيتم تنفيذ كل موجة (Wave) كعملية Git منفصلة (Commit مستقل). يمكن إجراء `git revert` للموجة المحددة.
2. **ما الملفات التي يجب أخذ نسخة احتياطية منها؟** يجب أخذ نسخة احتياطية محلية (Zip) لمجلدات `architecture/`، `qaroni-os/`، و `qaroni-engine/` بالكامل قبل البدء.
3. **ما ترتيب الاستعادة؟** 
   - التراجع عن Wave 4 (تحديث المراجع).
   - التراجع عن Wave 3 و Wave 2 (استعادة دمج البروتوكولات والقرارات).
   - التراجع عن Wave 1 (إعادة الدساتير القديمة من الأرشيف).

---

## 6. 🌊 موجات التنفيذ (Migration Waves)

يتم التنفيذ على موجات مستقلة تماماً ولا يجوز دمجها:

### Wave 1: أرشفة الدساتير والتقارير القديمة (Isolation & Archiving)
- إنشاء مجلد `docs/archive/legacy/`.
- نقل كافة محتويات `qaroni-os/constitution/`، `architecture/constitution/`، و `qaroni-engine/constitution/` إليه.
- نقل التقارير القديمة المكررة إلى الأرشيف.
- **Status: Waiting for Human Approval 🟡**

### Wave 2: توحيد سجل القرارات المعمارية (ADR Consolidation)
- حصر جميع ملفات Markdown داخل مجلدات الـ ADR القديمة.
- دمجها أو نقلها بشكل منظم إلى `docs/architecture/adr/`.
- التخلص من مجلدات الـ ADR المكررة والفارغة.
- **Status: Waiting for Human Approval 🟡**

### Wave 3: دمج البروتوكولات المكررة (Protocol Merging)
- تحليل بروتوكولات الـ Rollback والـ Gap Analysis.
- استخلاص المعرفة منها في وثيقة موحدة لكل بروتوكول ضمن `docs/architecture/`.
- نقل النسخ المكررة إلى الأرشيف.
- **Status: Waiting for Human Approval 🟡**

### Wave 4: تحديث المراجع في المواصفات (Reference Updates)
- مسح ملفات `architecture/specification/*` و `architecture/manifest/*`.
- تعديل أي روابط تشير إلى الدساتير القديمة لتشير إلى `QEOS_CONSTITUTION.md`.
- إضافة ديباجة تصنيف الطبقة المعمارية لكل نطاق عمل.
- **Status: Waiting for Human Approval 🟡**

---

## 7. 🏁 الجاهزية النهائية (Final Readiness)

1. **هل توجد أي مخاطر تمنع التنفيذ؟** لا توجد مخاطر تمنع التنفيذ، شريطة الالتزام التام بأخذ نسخة احتياطية (Backup) قبل الموجة الأولى وتطبيق التنفيذ المتموج (Wave-by-Wave).
2. **هل توجد وثائق مجهولة؟** تم حصر 162 وثيقة معمارية بشكل كامل ومطابقتها.
3. **هل توجد تعارضات لم تُحل؟** التعارضات الحالية تتمثل في وجود الدساتير القديمة، وسيتم حلها بمجرد تنفيذ Wave 1 (الأرشفة).
4. **هل جميع العمليات قابلة للتراجع؟** نعم، كل العمليات تعتمد على النقل (Move) والدمج (Merge) المدعوم بنظام إدارة النسخ (Git)، ويمكن التراجع عن أي خطوة عبر `git revert`.
5. **هل النظام جاهز لتنفيذ Wave 1 فقط؟** نعم، النظام التوثيقي مُهيأ كلياً والموجة الأولى آمنة ومستقلة وتقتصر على الأرشفة.

---
**QEOS_MIGRATION_EXECUTION_MANIFEST_READY**
