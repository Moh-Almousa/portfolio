/* ==========================================================================
   translations.js
   كل نصوص الموقع في مكان واحد. لتغيير أي نص في الموقع، عدّله من هنا فقط.

   القاعدة: كل مفتاح موجود في en يجب أن يكون موجودًا في ar بنفس الاسم.
   الاستخدام في HTML:  <span data-i18n="nav.home">Home</span>
   لترجمة خاصية (attribute):
       <input data-i18n="contact.namePlaceholder" data-i18n-attr="placeholder">

   ملاحظة مهمة: المصطلحات التقنية (Python, Django, REST API, JWT ...)
   تبقى بالإنجليزية داخل النص العربي كما هي.
   ========================================================================== */

const TRANSLATIONS = {
  /* ======================= English ======================= */
  en: {
    meta: {
      title: 'Mohammad Almousa — Backend Developer',
      description:
        'Backend developer working with Python, Django and Django REST Framework. I build REST APIs, database-driven systems and third-party integrations.',
    },

    nav: {
      home: 'Home',
      works: 'Works',
      deliverables: 'Deliverables',
      skills: 'Skills',
      contact: 'Contact',
      ariaLabel: 'Main navigation',
      switchLang: 'العربية',
      switchLangAria: 'Switch the site language to Arabic',
      skip: 'Skip to content',
    },

    hero: {
      status: 'Open to freelance work',
      greeting: 'Welcome, I am',
      lead:
        'I build backend systems with Python and Django — REST APIs, database design, and integrations with external services.',
      ctaWorks: 'See my work',
      ctaContact: 'Get in touch',
      imageAlt: 'Portrait of Mohammad Almousa',
      tag: 'Django · REST API',
      /* نص ثابت لمحركات البحث وقارئات الشاشة (لا يظهر بصريًا) */
      srName: 'Mohammad Almousa — Backend Developer',
      /* نصوص أنيميشن الكتابة */
      typed: [
        'Mohammad Almousa',
        'Back-End Developer',
        'Django Developer',
        'REST API Developer',
        'PostgreSQL & MySQL',
        'Backend Systems Developer',
      ],
    },

    about: {
      route: '/about',
      title: 'About me',
      p1: 'A backend developer specialized in Python, Django and Django REST Framework. I develop REST APIs, build complete backend systems, and connect them to databases and external services.',
      p2: 'I have hands-on experience building CoachLink, a platform for managing sports coaching services. It covers Authentication, JWT, Roles & Permissions, training program management, subscriptions, payments, notifications and realtime chat.',
      p3: 'I care about writing organized, scalable backend code with a focus on data integrity, API security and well-structured business logic — and I keep working on my skills in Docker, Testing and Deployment.',
      panelTitle: 'At a glance',
      focusLabel: 'Focus',
      focusValue: 'REST API development',
      stackLabel: 'Main stack',
      stackValue: 'Python · Django · DRF',
      dbLabel: 'Databases',
      dbValue: 'PostgreSQL · MySQL · SQL Server',
      learningLabel: 'Currently learning',
      learningValue: 'Docker · Testing · Deployment',
      langsLabel: 'Languages',
      langsValue: 'Arabic · English',
    },

    works: {
      route: '/works',
      title: 'Works',
      subtitle: 'Backend projects I built and the APIs behind them.',
      empty: 'No projects added yet.',
      viewProject: 'View project',
      prev: 'Previous project',
      next: 'Next project',
      repoPrivate: 'Private Repository',
      repoPublic: 'Public Repository',
      linkMissing: 'Link not added yet',
      linkGithub: 'GitHub',
      linkDemo: 'Live Demo',
      linkDemoSub: 'Open Demo',
      linkSwagger: 'Swagger',
      linkSwaggerSub: 'API Documentation',
      linkDocs: 'Documentation',
      linkDocsSub: 'Project Documents',
    },

    deliverables: {
      route: '/deliverables',
      title: "What You'll Receive",
      subtitle: 'What I hand over at the end of a backend project.',
      scopeNote: 'Depends on project scope',
      items: {
        apiDocs: {
          title: 'API Documentation',
          text: 'API documentation using Swagger / OpenAPI or Postman, including Endpoints, HTTP Methods, Request Parameters, Request Bodies, Responses, Authentication requirements, and status codes.',
        },
        examples: {
          title: 'Request & Response Examples',
          text: 'Clear examples of API Requests and Responses, using tools such as Postman, Swagger/OpenAPI, or API documentation tools such as Apidog when appropriate.',
        },
        erd: {
          title: 'ERD & Database Documentation',
          text: 'An ERD diagram showing the database structure and relationships, along with database documentation describing the main tables, fields, and relationships.',
        },
        sourceCode: {
          title: 'Source Code',
          text: 'Complete source code when source-code delivery is included within the project scope.',
        },
        deployment: {
          title: 'Backend Deployment',
          text: 'A deployed Backend with a server URL when deployment and hosting are included within the project scope.',
        },
        pdf: {
          title: 'PDF Documentation',
          text: 'A PDF version of the API documentation when a formal, shareable documentation file is required.',
        },
      },
    },

    skills: {
      route: '/skills',
      title: 'Skills',
      subtitle: 'I build backend systems using:',
      empty: 'Skill groups will appear here.',
    },

    contact: {
      route: '/contact',
      title: 'Contact me',
      subtitle: 'Tell me about your project and I will get back to you.',

      formTitle: 'Send a message',
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'What is this about?',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project, its scope and your timeline.',
      send: 'Send Message',
      sending: 'Sending…',
      success: 'Your message was sent. I will reply to your email soon.',
      errorRequired: 'This field is required.',
      errorEmail: 'Enter a valid email address.',
      errorCheck: 'Please check the fields marked below.',
      errorSend: 'The message could not be sent. Please email me directly instead.',
      notConfigured: 'The form is not connected to an email service yet, so your email app is opening with the message ready to send.',

      infoTitle: 'Contact information',
      emailLabel: 'Email',
      whatsappLabel: 'WhatsApp',
      socialLabel: 'Find me on',
      linkMissing: 'Link not added yet',
      profileAlt: 'Mohammad Almousa',
      availability: 'Usually replies within a day.',
    },

    project: {
      back: 'Back to Portfolio',
      overview: 'Overview',
      readmeTitle: 'Project Description',
      readmeError: 'The README file could not be loaded. Open the site through a local server (Live Server) or from GitHub Pages instead of opening the file directly.',
      notFound: 'Project not found.',
    },

    gallery: {
      title: 'Gallery',
      image: 'Image',
      prev: 'Previous image',
      next: 'Next image',
      play: 'Start slideshow',
      pause: 'Pause slideshow',
      openLightbox: 'Open image in full size',
      openNewTab: 'Open image in a new tab',
      close: 'Close',
    },

    footer: {
      rights: 'Mohammad Almousa. All rights reserved.',
      built: 'Built with HTML, CSS & JavaScript',
    },

    common: {
      comingNext: 'Coming in the next stage',
    },
  },

  /* ======================= العربية ======================= */
  ar: {
    meta: {
      title: 'محمد الموسى — Backend Developer',
      description:
        'مطور Backend يعمل بـ Python وDjango وDjango REST Framework. أبني REST APIs وأنظمة مرتبطة بقواعد البيانات والخدمات الخارجية.',
    },

    nav: {
      home: 'الرئيسية',
      works: 'الأعمال',
      deliverables: 'التسليمات',
      skills: 'المهارات',
      contact: 'تواصل',
      ariaLabel: 'القائمة الرئيسية',
      switchLang: 'English',
      switchLangAria: 'تغيير لغة الموقع إلى الإنجليزية',
      skip: 'انتقل إلى المحتوى',
    },

    hero: {
      status: 'متاح للعمل الحر',
      greeting: 'أهلاً وسهلاً بك، أنا',
      lead:
        'أبني أنظمة Backend باستخدام Python وDjango — تطوير REST APIs وتصميم قواعد البيانات وربط الأنظمة بالخدمات الخارجية.',
      ctaWorks: 'شاهد أعمالي',
      ctaContact: 'تواصل معي',
      imageAlt: 'صورة شخصية لمحمد الموسى',
      tag: 'Django · REST API',
      srName: 'محمد الموسى — Backend Developer',
      typed: [
        'محمد الموسى',
        'Back-End Developer',
        'Django Developer',
        'REST API Developer',
        'PostgreSQL & MySQL',
        'Backend Systems Developer',
      ],
    },

    about: {
      route: '/about',
      title: 'نبذة عني',
      p1: 'مطور Backend متخصص في Python وDjango وDjango REST Framework، أعمل على تطوير REST APIs وبناء أنظمة Backend متكاملة وربطها بقواعد البيانات والخدمات الخارجية.',
      p2: 'لدي خبرة عملية في تطوير مشروع CoachLink، وهو نظام لإدارة خدمات التدريب الرياضي، ويتضمن Authentication وJWT وRoles & Permissions وإدارة البرامج التدريبية والاشتراكات والمدفوعات والإشعارات والمحادثات الفورية.',
      p3: 'أهتم بكتابة Backend منظم وقابل للتوسع مع التركيز على صحة البيانات، أمان الـ APIs، وتنظيم الـ Business Logic، وأسعى باستمرار إلى تطوير مهاراتي في Docker وTesting وDeployment.',
      panelTitle: 'باختصار',
      focusLabel: 'مجال العمل',
      focusValue: 'REST API development',
      stackLabel: 'الأدوات الأساسية',
      stackValue: 'Python · Django · DRF',
      dbLabel: 'قواعد البيانات',
      dbValue: 'PostgreSQL · MySQL · SQL Server',
      learningLabel: 'أطوّر مهاراتي في',
      learningValue: 'Docker · Testing · Deployment',
      langsLabel: 'اللغات',
      langsValue: 'العربية · English',
    },

    works: {
      route: '/works',
      title: 'الأعمال',
      subtitle: 'مشاريع Backend التي عملت عليها وواجهات الـ API الخاصة بها.',
      empty: 'لم تتم إضافة أي مشروع بعد.',
      viewProject: 'عرض المشروع',
      prev: 'المشروع السابق',
      next: 'المشروع التالي',
      repoPrivate: 'Private Repository',
      repoPublic: 'Public Repository',
      linkMissing: 'الرابط غير مضاف بعد',
      linkGithub: 'GitHub',
      linkDemo: 'Live Demo',
      linkDemoSub: 'فتح العرض المباشر',
      linkSwagger: 'Swagger',
      linkSwaggerSub: 'توثيق الـ API',
      linkDocs: 'Documentation',
      linkDocsSub: 'ملفات المشروع',
    },

    deliverables: {
      route: '/deliverables',
      title: 'ما الذي ستحصل عليه؟',
      subtitle: 'ما أسلّمه فعليًا عند انتهاء مشروع Backend.',
      scopeNote: 'حسب نطاق المشروع',
      items: {
        apiDocs: {
          title: 'API Documentation',
          text: 'توثيق الـ API باستخدام Swagger / OpenAPI أو Postman، ويتضمن الـ Endpoints وطرق HTTP والـ Request Parameters والـ Request Bodies والـ Responses ومتطلبات Authentication وStatus Codes.',
        },
        examples: {
          title: 'Request & Response Examples',
          text: 'أمثلة واضحة على الـ API Requests والـ Responses باستخدام أدوات مثل Postman وSwagger/OpenAPI أو أدوات توثيق الـ API مثل Apidog عند الحاجة.',
        },
        erd: {
          title: 'ERD & Database Documentation',
          text: 'مخطط ERD يوضح بنية قاعدة البيانات والعلاقات بين الجداول، بالإضافة إلى ملف لتوثيق الجداول والحقول والعلاقات الأساسية.',
        },
        sourceCode: {
          title: 'Source Code',
          text: 'تسليم الكود المصدري الكامل عند تضمين تسليم الكود ضمن نطاق المشروع.',
        },
        deployment: {
          title: 'Backend Deployment',
          text: 'توفير رابط للـ Backend المستضاف على Server عند تضمين الـ Deployment والاستضافة ضمن نطاق المشروع.',
        },
        pdf: {
          title: 'PDF Documentation',
          text: 'توفير نسخة PDF من توثيق الـ API عند الحاجة إلى ملف توثيق رسمي قابل للمشاركة.',
        },
      },
    },

    skills: {
      route: '/skills',
      title: 'المهارات',
      subtitle: 'أبني أنظمة Backend باستخدام:',
      empty: 'ستظهر مجموعات المهارات هنا.',
    },

    contact: {
      route: '/contact',
      title: 'تواصل معي',
      subtitle: 'أخبرني عن مشروعك وسأعود إليك في أقرب وقت.',

      formTitle: 'أرسل رسالة',
      name: 'الاسم',
      namePlaceholder: 'اسمك الكامل',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'you@example.com',
      subject: 'الموضوع',
      subjectPlaceholder: 'ما موضوع الرسالة؟',
      message: 'الرسالة',
      messagePlaceholder: 'أخبرني عن مشروعك ونطاقه والمدة الزمنية المتوقعة.',
      send: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال…',
      success: 'تم إرسال رسالتك، وسأرد على بريدك قريبًا.',
      errorRequired: 'هذا الحقل مطلوب.',
      errorEmail: 'أدخل بريدًا إلكترونيًا صحيحًا.',
      errorCheck: 'يرجى مراجعة الحقول المحددة بالأسفل.',
      errorSend: 'تعذّر إرسال الرسالة. يمكنك مراسلتي على البريد مباشرة.',
      notConfigured: 'النموذج غير مرتبط بخدمة بريد بعد، لذلك سيُفتح برنامج البريد لديك والرسالة جاهزة للإرسال.',

      infoTitle: 'معلومات التواصل',
      emailLabel: 'البريد الإلكتروني',
      whatsappLabel: 'واتساب',
      socialLabel: 'تجدني على',
      linkMissing: 'الرابط غير مضاف بعد',
      profileAlt: 'محمد الموسى',
      availability: 'أرد عادةً خلال يوم واحد.',
    },

    project: {
      back: 'العودة إلى الأعمال',
      overview: 'نظرة عامة',
      readmeTitle: 'وصف المشروع',
      readmeError: 'تعذّر تحميل ملف README. افتح الموقع عبر خادم محلي (Live Server) أو من GitHub Pages بدل فتح الملف مباشرة.',
      notFound: 'المشروع غير موجود.',
    },

    gallery: {
      title: 'معرض الصور',
      image: 'صورة',
      prev: 'الصورة السابقة',
      next: 'الصورة التالية',
      play: 'تشغيل العرض التلقائي',
      pause: 'إيقاف العرض التلقائي',
      openLightbox: 'عرض الصورة بحجم كامل',
      openNewTab: 'فتح الصورة في تبويب جديد',
      close: 'إغلاق',
    },

    footer: {
      rights: 'محمد الموسى. جميع الحقوق محفوظة.',
      built: 'مبني باستخدام HTML وCSS وJavaScript',
    },

    common: {
      comingNext: 'سيتم تنفيذه في المرحلة القادمة',
    },
  },
};
