/* ==========================================================================
   data/skills.js
   ملف بيانات المهارات — هذا هو الملف الوحيد الذي تعدّله لإضافة أو تعديل مهارة.

   لإضافة مجموعة جديدة: انسخ أي كائن من المصفوفة وعدّل قيمه.
   لإضافة مهارة داخل مجموعة: أضف سطرًا جديدًا داخل items.

   شرح الحقول:
     id    : اسم مختصر بالإنجليزية (يُستخدم داخليًا فقط).
     title : عنوان المجموعة — يبقى بالإنجليزية لأنه مصطلح تقني.
     icon  : اسم أيقونة من js/icons.js
     note  : جملة توضيحية قصيرة بلغتين { en, ar }.
     items : عناصر المجموعة — تبقى بالإنجليزية في اللغتين لأنها مصطلحات تقنية.
     open  : true لفتح المجموعة تلقائيًا عند تحميل الصفحة.
   ========================================================================== */

const SKILLS = [
  {
    id: 'auth',
    title: 'Authentication & Authorization',
    icon: 'lock',
    open: true,
    note: {
      en: 'Building authentication and permission layers for REST APIs.',
      ar: 'بناء طبقات الـ Authentication والصلاحيات في الـ REST APIs.',
    },
    items: [
      'User Authentication',
      'JWT Authentication',
      'Access & Refresh Tokens',
      // 'Role-Based Access Control',
      'Permissions',
      'Email Verification',
      'OTP-based verification',
      'OAuth / Access Token authentication',
      'Social Login integrations',
    ],
  },

  {
    id: 'rest',
    title: 'REST APIs',
    icon: 'swagger',
    note: {
      en: 'Designing and building complete REST APIs, with validation, permissions and documentation.',
      ar: 'تصميم وبناء REST APIs متكاملة مع الـ validation والصلاحيات والتوثيق.',
    },
    items: [
      'REST API design',
      'HTTP Methods: GET, POST, PUT, PATCH, DELETE',
      'Building complete REST APIs',
      'API validation',
      'API permissions',
      'API documentation',
      'Working with JSON',
      'Testing APIs with Postman',
      'Swagger / OpenAPI documentation',
    ],
  },

  {
    id: 'django',
    title: 'Python, Django & Django REST Framework',
    icon: 'code',
    note: {
      en: 'My main stack for backend development.',
      ar: 'الأدوات الأساسية التي أعمل بها في تطوير الـ Backend.',
    },
    items: [
      'APIView',
      'Serializers',
      'Permissions',
      'Authentication',
      'ORM',
      'QuerySets',
      'Validation',
      'Business Logic',
      'Database integration',
      'REST API development',
    ],
  },

  {
    id: 'orm',
    title: 'Django ORM & Database Queries',
    icon: 'database',
    note: {
      en: 'Writing queries with the Django ORM and reducing unnecessary database hits.',
      ar: 'كتابة الاستعلامات باستخدام Django ORM وتقليل الاستعلامات غير الضرورية.',
    },
    items: [
      'select_related',
      'prefetch_related',
      'annotate',
      'aggregate',
      'Case / When',
      'OuterRef',
      'Subquery',
      'Filtering',
      // 'QuerySet optimization',
      // 'Database relationships',
    ],
  },

  {
    id: 'integrations',
    title: 'External Services & Integrations',
    icon: 'external',
    note: {
      en: 'Connecting backend systems to third-party APIs and services.',
      ar: 'ربط أنظمة الـ Backend بواجهات وخدمات خارجية.',
    },
    items: [
      'Google Authentication',
      'External APIs',
      'Exercise APIs',
      'Nutrition APIs',
      'Stripe Payments',
      'Webhooks',
      'Access Tokens',
      'OAuth-related integrations',
    ],
  },

  {
    id: 'payments',
    title: 'Payments & Webhooks',
    icon: 'exchange',
    note: {
      en: 'Handling the payment flow end to end, from checkout to subscription activation.',
      ar: 'التعامل مع مسار الدفع كاملًا من الـ Checkout حتى نجاح عملية الدفع.',
    },
    items: [
      'Stripe Checkout',
      'Payment workflow',
      'Webhooks',
      'Payment status handling',
      'Subscription activation',
      'Transaction-related logic',
    ],
  },

  {
    id: 'databases',
    title: 'Databases',
    icon: 'erd',
    note: {
      en: 'Designing sound databases and relationships based on the requirements of the system.',
      ar: 'تصميم قواعد بيانات سليمة وعلاقات مترابطة وفقًا لمتطلبات النظام.',
    },
    items: [
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'SQL Server',
      'One-to-One',
      'One-to-Many',
      'Many-to-Many',
      'Foreign Keys',
      // 'Database normalization concepts',
      'Data integrity',
      // 'ORM relationships',
    ],
  },

  {
    id: 'architecture',
    title: 'Backend Architecture',
    icon: 'works',
    note: {
      en: 'Working with these principles and currently developing my knowledge in them further.',
      ar: 'أعمل وفق هذه المبادئ وأطوّر معرفتي بها باستمرار.',
    },
    items: [
      'Clean Code',
      'Separation of Concerns',
      'Business Logic organization',
      // 'SOLID principles',
      // 'DRY',
      // 'KISS',
      // 'YAGNI',
      // 'Service Layer concepts',
      // 'Repository Pattern concepts',
      'Clean Architecture',
    ],
  },

  {
    id: 'infrastructure',
    title: 'Performance & Infrastructure',
    icon: 'server',
    note: {
      en: 'Currently expanding my backend skills in containerization, automated testing, asynchronous/background processing, caching, and deployment.',
      ar: 'أعمل حاليًا على توسيع مهاراتي في Containerization والـ Testing والمهام الخلفية والـ Caching والـ Deployment.',
    },
    items: [
      'Redis',
      'Celery',
      'Caching',
      'Background Tasks',
      'Docker',
      'Testing',
      'Deployment',
    ],
  },
];
