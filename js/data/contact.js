/* ==========================================================================
   data/contact.js
   بيانات التواصل وإعداد نموذج الإرسال — عدّل هذا الملف فقط.

   ملاحظة: أي رابط تتركه كما هو (YOUR_..._URL) يظهر في الموقع كعنصر
   غير مفعّل، ولا يتم اختراع رابط وهمي مكانه.
   ========================================================================== */

const CONTACT = {
  email: 'mohammadalmousa690@gmail.com',

  /* رقم الواتساب: النص المعروض + الرقم بصيغة الرابط (بدون + ولا مسافات) */
  whatsapp: {
    display: '+963 993 485 382',
    number: '963993485382',
  },

  /* ضع روابطك هنا عندما تجهز */
  social: [
    { id: 'github',   icon: 'github',   label: 'GitHub',   url: 'https://github.com/Moh-Almousa' },
    { id: 'linkedin', icon: 'linkedin', label: 'LinkedIn', url: 'www.linkedin.com/in/mohammad-almousa-1b245828a' },
    { id: 'facebook', icon: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/mohammed.almosaa.14' },
  ],
};

/* ==========================================================================
   إعداد إرسال النموذج

   الموقع Static ولا يوجد له Backend، لذلك يحتاج النموذج إلى خدمة وسيطة
   ترسل الرسالة إلى بريدك. الخدمة الموصى بها: Web3Forms (مجانية وبدون حساب).

   خطوات التفعيل (3 دقائق):
     1) افتح https://web3forms.com
     2) اكتب بريدك mohammadalmousa690@gmail.com واضغط Create Access Key
     3) سيصلك Access Key على بريدك — انسخه
     4) ضعه بدل YOUR_WEB3FORMS_ACCESS_KEY بالأسفل واحفظ الملف

   إلى أن تفعّلها: النموذج لا يدّعي أن الرسالة أُرسلت، بل يفتح لك
   برنامج البريد بالرسالة جاهزة كحل بديل واضح.

   لاستخدام Formspree بدل Web3Forms:
     service: 'formspree'
     endpoint: 'https://formspree.io/f/XXXXXXXX'   (من لوحة تحكم Formspree)
   ========================================================================== */

const CONTACT_FORM = {
  service: 'web3forms',                        // 'web3forms' أو 'formspree'
  accessKey: 'd1b97f87-8874-48ab-8295-450b6cac50c5',      // خاص بـ Web3Forms فقط
  // endpoint: 'YOUR_FORMSPREE_ENDPOINT',         // خاص بـ Formspree فقط
};
