/* ==========================================================================
   data/projects.js
   ملف بيانات المشاريع — هذا هو الملف الوحيد الذي تعدّله لإضافة مشروع جديد.

   لإضافة مشروع: انسخ كائن CoachLink بالكامل، ضعه داخل المصفوفة، وعدّل قيمه.

   شرح الحقول:
     id            : اسم مختصر بالإنجليزية بدون مسافات (يُستخدم للمجلدات).
     name          : اسم المشروع (يبقى كما هو في اللغتين عادةً).
     description   : وصف قصير يظهر في الكارت — { en, ar }.
     icon          : صورة صغيرة للمشروع. اتركها '' ليظهر أول حرف من الاسم.
     page          : مسار صفحة تفاصيل المشروع.
     repositoryStatus : 'private' أو 'public'.
     links         : روابط المشروع. أي رابط تتركه فارغًا ('') أو يبدأ بـ YOUR_
                     يظهر في الكارت كرابط غير مفعّل بدل اختراع رابط وهمي.
     images        : صور المعرض (تُستخدم في صفحة التفاصيل — المرحلة القادمة).
                     اتركها مصفوفة فارغة [] ولن يظهر المعرض إطلاقًا.
     readme        : مسار ملف README.md الخاص بالمشروع.
   ========================================================================== */

const PROJECTS = [
  {
    id: 'coachlink',
    name: 'CoachLink',
    description: {
      en: 'A backend system for managing sports coaching services: authentication and roles, training programs, subscriptions, Stripe payments, notifications and realtime chat.',
      ar: 'نظام Backend لإدارة خدمات التدريب الرياضي: Authentication والصلاحيات، البرامج التدريبية، الاشتراكات، مدفوعات Stripe، الإشعارات والمحادثات الفورية.',
    },
    icon: 'assets/images/projects/coachlink/icon.jpg',
    page: 'projects/coachlink.html',
    repositoryStatus: 'private',
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL'],
    links: {
      github: 'https://github.com/Moh-Almousa/CoachLink-BackEnd',
      demo: '',
      swagger: '',
      documentation: 'https://drive.google.com/drive/folders/13aQg1NTrKHS0BvFsdXvyivD57Z9dKhCb',
    },
    images: [
      // صور تجريبية للاختبار — استبدلها بصور مشروعك أو احذف الأسطر.
      // إذا تركت المصفوفة فارغة [] فلن يظهر المعرض إطلاقًا في صفحة المشروع.
      'assets/images/projects/coachlink/1.png',
      'assets/images/projects/coachlink/2.png',
      'assets/images/projects/coachlink/3.png',
      'assets/images/projects/coachlink/4.png',
      'assets/images/projects/coachlink/5.png',
      'assets/images/projects/coachlink/6.png',
      'assets/images/projects/coachlink/7.png',
      'assets/images/projects/coachlink/8.png',
      'assets/images/projects/coachlink/9.png',
      'assets/images/projects/coachlink/10.png',
      'assets/images/projects/coachlink/11.png',
      'assets/images/projects/coachlink/12.png',
      'assets/images/projects/coachlink/13.png',
      'assets/images/projects/coachlink/14.png',
      'assets/images/projects/coachlink/15.png',
      'assets/images/projects/coachlink/16.png',
      'assets/images/projects/coachlink/17.png',
      'assets/images/projects/coachlink/18.png',
      'assets/images/projects/coachlink/19.png',
      'assets/images/projects/coachlink/20.png',
      'assets/images/projects/coachlink/21.png',
      'assets/images/projects/coachlink/22.png',
      'assets/images/projects/coachlink/23.png',
      'assets/images/projects/coachlink/24.png',
      'assets/images/projects/coachlink/25.png',
      'assets/images/projects/coachlink/26.png',
    ],
    readme: 'projects/coachlink/README.md',
  },

  /* ---------------------------------------------------------------
     نموذج جاهز لمشروع جديد — احذف علامات التعليق وعدّل القيم:

  {
    id: 'PROJECT_ID',
    name: 'PROJECT_NAME',
    description: { en: '...', ar: '...' },
    icon: '',
    page: 'projects/PROJECT_ID.html',
    repositoryStatus: 'public',
    stack: ['Python', 'Django'],
    links: {
      github: 'YOUR_GITHUB_URL',
      demo: '',
      swagger: '',
      documentation: '',
    },
    images: [],
    readme: 'projects/PROJECT_ID/README.md',
  },
  --------------------------------------------------------------- */
];
