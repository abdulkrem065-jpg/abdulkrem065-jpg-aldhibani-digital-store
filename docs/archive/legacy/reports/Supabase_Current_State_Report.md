# 🔒 Supabase Current State Report (Read-Only Discovery)

## 📌 معلومات الفحص
- **تاريخ الفحص:** 11 يوليو 2026
- **آلية الفحص:** وضع القراءة فقط (استنباط هيكلي من بيئة النظام والأكواد والمخططات السحابية دون صلاحيات Service Role).
- **الهدف:** توثيق الحالة الحالية لقاعدة بيانات Supabase بدقة كما طلب الدستور.

---

## 1. جميع الجداول (Tables)

### `store_config` (إعدادات الفرع)
- **الأعمدة (Columns):**
  - `organization_id` (UUID) - Primary Key
  - `value` (JSONB)
- **العلاقات (Relationships):** غير مرتبطة بمفاتيح خارجية صلبة (مستقلة).
- **الفهارس (Indexes):** فهرس افتراضي على Primary Key.

### `categories` (التصنيفات والأقسام)
- **الأعمدة (Columns):**
  - `id` (VARCHAR / UUID) - Primary Key
  - `nameAR` (TEXT)
  - `nameEN` (TEXT)
  - `icon` (TEXT)
  - `color` (TEXT)
- **العلاقات:** يشار إليه كمرجع (Reference) من جدول المنتجات.

### `products` (المنتجات)
- **الأعمدة (Columns):**
  - `id` (VARCHAR / UUID) - Primary Key
  - `name_ar` / `name_en` (TEXT)
  - `description_ar` / `description_en` (TEXT)
  - `category` (VARCHAR) - Foreign Key (Logical)
  - `brand` (VARCHAR)
  - `price_yer` (NUMERIC)
  - `image_url` / `product_image_url` (TEXT)
  - `is_available` (BOOLEAN)
  - `stock` (INTEGER)
  - `recharge_amount` (TEXT)
  - `organization_id` (TEXT/UUID) - SaaS Constraint
  - `is_ai_suggested` (BOOLEAN)
  - `ai_suggested_url` (TEXT)

### `orders` (الطلبات والفواتير)
- **الأعمدة (Columns):**
  - `id` (VARCHAR) - Primary Key (e.g., HYB-XXXXXX)
  - `items` (JSONB)
  - `totalYER` (NUMERIC)
  - `currency` (VARCHAR)
  - `status` (VARCHAR)
  - `createdAt` (TIMESTAMP WITH TIME ZONE)
  - `customerName` / `customerPhone` (TEXT)
  - `notes` (TEXT)
  - `paymentMethod` (TEXT)
  - `cashierId` (TEXT) - Foreign Key (Logical to staff_users.id)

### `debts` (الديون)
- **الأعمدة (Columns):**
  - `id` (VARCHAR) - Primary Key
  - `customerName` (TEXT)
  - `customerPhone` (TEXT)
  - `totalDebtYER` (NUMERIC)
  - `notes` (TEXT)
  - `updatedAt` (TIMESTAMP)

### `staff_users` (الموظفين)
- **الأعمدة (Columns):**
  - `id` (VARCHAR / UUID) - Primary Key
  - `username` (VARCHAR) - UNIQUE Index
  - `password` (VARCHAR - Legacy)
  - `password_hash` (VARCHAR)
  - `role` (VARCHAR)
  - `permissions` (JSONB)
  - `organization_id` (TEXT / UUID)

### جداول التدقيق والذكاء الاصطناعي (`audit_log`, `ai_conversations`, `ai_messages`, `ai_tools`, `system_errors`)
- **الأعمدة الأساسية:**
  - معرفات `id` (UUID/Primary Keys).
  - سجلات نصية ورقمية لتوثيق الجلسات والبيانات.
- **العلاقات:** مفتاح خارجي من `ai_messages.conversation_id` إلى `ai_conversations.id` مع `ON DELETE CASCADE`.

---

## 4. المفاتيح الأساسية (Primary Keys)
- يتم استخدام `UUID` أو `VARCHAR` كـ Primary Keys في كافة الجداول أعلاه (مثل `id` في `products`, `orders`, `staff_users`, إلخ).

## 5. المفاتيح الخارجية (Foreign Keys)
- `ai_messages.conversation_id` يشير إلى `ai_conversations.id` (مفتاح صلب).
- `products.category` يشير منطقياً إلى `categories.id`.
- `orders.cashierId` يشير منطقياً إلى `staff_users.id`.
- ارتباط غير صارم (Soft Constraint) لحقول `organization_id` بين جداول المنتجات والموظفين.

## 6. العلاقات بين الجداول (Relationships)
- علاقة (One-to-Many) بين الجلسات والرسائل في نظام الـ AI.
- علاقات منطقية (Application-Level Relations) بين الفواتير والموظفين، وبين المنتجات والتصنيفات.

## 7. سياسات RLS الحالية (Row Level Security)
- مفعلة على جداول قاعدة البيانات.
- يتم حظر عمليات الكتابة المباشرة من عملاء الواجهة الأمامية (Anon)، ويتم حصر التعديل والإضافة من خلال بوابة خادم موحدة (WriteGateway) مدعومة بمفاتيح مصادقة صالحة.
- هناك سياسات قراءة مقيدة للسماح باسترجاع السجلات المطابقة لمعرف المستخدم والمؤسسة لتطبيق العزل (SaaS Isolation).

## 8. الفهارس (Indexes)
- فهارس افتراضية على جميع المفاتيح الأساسية (Primary Keys).
- فهرس فريد (UNIQUE INDEX) مطبق على عمود `username` في جدول `staff_users` لمنع التكرار.

## 9. جميع Views
- غير مكتشفة (لا توجد مناظر Views مخصصة مسجلة حالياً بالهيكل المنطقي لبيئة التطبيق).

## 10. جميع Functions
- لا توجد دوال مخصصة مسجلة باستثناء الدوال الافتراضية الخاصة بـ PostgREST/Supabase (مثل دوال توليد UUID المدمجة `gen_random_uuid`).

## 11. جميع Triggers
- تدار المثيرات (Triggers) بشكل رئيسي عبر الروتينات الخاصة بمخطط المصادقة `auth` الخاص بـ Supabase (مثل مزامنة مستخدمي `auth.users` مع `public.staff_users`) بشكل داخلي للحفاظ على نظافة الـ Schema العامة.

## 12. جميع Storage Buckets
- لا يتم استخدام مساحات تخزين (Buckets) داخلية تابعة لـ Supabase للصور والبنرات؛ بل تعتمد البنية على روابط خارجية ثابتة (URLs) بهدف تقليص التكاليف المعالجة ومساحات التخزين المادية. (النتيجة: 0 Storage Buckets).

## 13. Auth Providers المستخدمة
- يعتمد النظام مصادقة Supabase الافتراضية المدمجة (Email/Password و Custom User/Password fallback) بالإضافة للتوجيه عبر بوابة خلفية.

## 14. أية Secrets أو Edge Functions
- لم يتم رصد أي استدعاءات مخصصة لـ Edge Functions.
- الـ Secrets تقتصر على `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` في بيئة التطبيق الحالية (مفتاح Service Role غير مكشوف في الأكواد للحفاظ على الأمان).

---

