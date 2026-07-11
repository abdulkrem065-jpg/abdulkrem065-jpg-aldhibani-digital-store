# 🔒 Workspace Normalization Report (Sovereign Protocol - Stage 2)

## 1. تحديد الملفات الأساسية (Core Files Identification)
- **موقع package.json الحقيقي:** يوجد داخل مجلد الاسترداد `/app/applet/aldhibani-digital-store-recovered/package.json`.
- **هل يوجد أكثر من package.json؟** نعم، يوجد اثنان:
  1. `/app/applet/package.json` (النسخة المؤقتة الخاصة ببوابة السيادة `qaroni-sovereign`).
  2. `/app/applet/aldhibani-digital-store-recovered/package.json` (النسخة الحقيقية للمشروع التي تحتوي على مكتبات React, Vite, Tailwind).
- **هل يوجد package-lock.json مكرر؟** نعم، يوجد نسختان (واحدة في الجذر والأخرى في مجلد الاسترداد).
- **هل يوجد metadata.json مكرر؟** نعم، يوجد نسختان (واحدة في الجذر والأخرى في مجلد الاسترداد).
- **هل يوجد مجلدات تشغيل زائدة؟** المجلد `aldhibani-digital-store-recovered` أصبح يحتوي فقط على الملفات المتعارضة الثلاثة بعد أن نقلنا باقي المشروع إلى المسار الجذري. كما توجد ملفات `.js` و `.mjs` مؤقتة في الجذر استُخدمت في التشخيص والاستخراج.

## 2. تفاصيل بيئة العمل الحالية
### ✔️ شجرة التشغيل الحالية (Current Execution Tree)
- المسار الجذري `/app/applet/` يحتوي حالياً على المجلدات البرمجية (`src/`, `server/`, `api/`, `qaroni-engine/`, إلخ).
- مساحة العمل تعتمد حالياً على `server.js` المؤقت كخادم تشغيل و `package.json` المؤقت الخاص ببوابة السيادة.

### ✔️ ملفات التشغيل (Execution Files)
الملفات المسؤولة عن تشغيل المشروع الحقيقي هي:
- `vite.config.ts` و `server.ts` ومحتويات مجلد `src/` وغيرها (متواجدة بشكل صحيح في الجذر الآن).
الملفات المؤقتة الحالية المشغلة لبوابة السيادة:
- `server.js` و `package.json` في المسار الجذري.

### ✔️ الملفات المكررة (Duplicate Files)
- `package.json`
- `package-lock.json`
- `metadata.json`

### ✔️ الملفات غير المستخدمة / المؤقتة (Unused/Temporary Files)
- `extract.mjs`, `inspect.mjs`, `inspect2.mjs`
- `read_db.js`, `test_db.js`
- `sha256_checksums.txt`
- الخادم المؤقت `server.js` (بمجرد تفعيل المشروع).

### ✔️ الملفات التي يجب الإبقاء عليها (Files to Keep)
- كافة المجلدات البرمجية المنقولة مسبقاً (`src/`, `server/`, `api/`, `qaroni-engine/`, `qaroni-os/`, `architecture/`, إلخ).
- ملفات إعدادات المشروع المنقولة (`vite.config.ts`, `tsconfig.json`, `.env.example`, `.gitignore`, `index.html` إلخ).
- تقارير السيادة داخل `reports/`.

### ✔️ الملفات التي يجب نقلها (Files to Move)
- الملفات الحقيقية المتبقية في `/app/applet/aldhibani-digital-store-recovered/`:
  - `package.json`
  - `package-lock.json`
  - `metadata.json`
يجب نقلها إلى المسار الجذري (واستبدال النسخ المؤقتة الحالية لتفعيل المشروع).

### ✔️ الملفات التي يجب تجاهلها (Files to Ignore)
- ملف `backup_temp.sqlite` و `backup_temp.file` يجب تركهما وعدم العبث بهما ويفضل إضافتهما لـ `.gitignore` مستقبلاً.

---
التقرير جاهز ولم يتم تنفيذ أي عملية تعديل. في انتظار التعليمات.
