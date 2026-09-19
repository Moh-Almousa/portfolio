# Portfolio — دليل الاستخدام والتعديل

موقع Personal Portfolio ثابت (Static) مبني بـ HTML و CSS و Vanilla JavaScript فقط،
بدون أي Framework وبدون أي مكتبة خارجية، ويدعم العربية والإنجليزية مع RTL/LTR.

---

## 1. هيكل الملفات

```
portfolio/
│
├── index.html                  ← الصفحة الرئيسية (كل الأقسام)
├── .nojekyll                   ← مهم لـ GitHub Pages (لا تحذفه)
├── README.md                   ← هذا الملف
│
├── css/
│   ├── base.css                ← الألوان والخطوط والمقاسات (Design Tokens)
│   ├── layout.css              ← شريط التنقل + هيكل الصفحة + الفوتر
│   ├── components.css          ← الهيرو، الكروت، المهارات، التواصل...
│   └── project.css             ← تنسيقات صفحة المشروع والمعرض و README
│
├── js/
│   ├── data/                   ← ★ الملفات التي تعدّلها أنت
│   │   ├── projects.js         ← المشاريع
│   │   ├── skills.js           ← المهارات
│   │   └── contact.js          ← البريد والواتساب والروابط الاجتماعية
│   │
│   ├── translations.js         ← ★ كل نصوص الموقع بالعربية والإنجليزية
│   │
│   ├── i18n.js                 ← محرك اللغة (لا يحتاج تعديلًا)
│   ├── icons.js                ← مكتبة الأيقونات الداخلية
│   ├── nav.js                  ← شريط التنقل
│   ├── typing.js               ← أنيميشن الكتابة
│   ├── reveal.js               ← ظهور العناصر عند التمرير
│   ├── project-links.js        ← روابط المشروع (مشترك)
│   ├── projects.js             ← بناء كروت المشاريع
│   ├── deliverables.js         ← قسم What You'll Receive
│   ├── skills.js               ← بناء قسم المهارات
│   ├── contact.js              ← نموذج التواصل
│   ├── gallery.js              ← معرض صور المشروع
│   ├── markdown.js             ← تحويل README.md إلى HTML
│   ├── project-page.js         ← تشغيل صفحة المشروع
│   └── main.js                 ← نقطة التشغيل
│
├── projects/
│   ├── coachlink.html          ← صفحة تفاصيل المشروع
│   └── coachlink/
│       └── README.md           ← ★ محتوى وصف المشروع
│
└── assets/
    ├── icons/favicon.svg
    └── images/
        ├── profile.jpg         ← ★ صورتك الشخصية
        └── projects/coachlink/ ← ★ صور المشروع وأيقونته
```

القاعدة العامة: **الملفات المعلّمة بـ ★ هي التي تعدّلها.** الباقي منطق لا يحتاج لمسه.

> ⚠️ شغّل الموقع عبر **Live Server** (أو أي سيرفر محلي) وليس بفتح الملف مباشرة،
> لأن قراءة ملف `README.md` تحتاج طلب HTTP.
> في VS Code: تثبيت إضافة Live Server ثم زر **Go Live**.

---

## 2. أين أغيّر كل شيء؟

| ما تريد تغييره | الملف | المكان |
|---|---|---|
| اسمك | `js/translations.js` | `hero.srName` و `hero.typed` و `footer.rights` و `contact.profileAlt` |
| صورتك | `assets/images/profile.jpg` | استبدل الملف بنفس الاسم |
| نبذتك | `js/translations.js` | `about.p1` / `p2` / `p3` |
| اللوحة الجانبية في About | `js/translations.js` | `about.focusValue` … `about.langsValue` |
| نصوص الكتابة المتحركة | `js/translations.js` | `hero.typed` (مصفوفة) |
| المهارات | `js/data/skills.js` | المصفوفة `SKILLS` |
| المشاريع | `js/data/projects.js` | المصفوفة `PROJECTS` |
| روابط GitHub / Demo / Swagger / Documentation | `js/data/projects.js` | `links` داخل المشروع |
| حالة المستودع | `js/data/projects.js` | `repositoryStatus: 'private'` أو `'public'` |
| صور المشروع | `js/data/projects.js` | `images` |
| وصف المشروع الطويل | `projects/<id>/README.md` | محتوى الملف |
| البريد | `js/data/contact.js` | `CONTACT.email` |
| الواتساب | `js/data/contact.js` | `CONTACT.whatsapp` |
| روابط التواصل الاجتماعي | `js/data/contact.js` | `CONTACT.social` |
| قسم What You'll Receive | `js/deliverables.js` + `js/translations.js` | `DELIVERABLES` و `deliverables.items` |
| الألوان والخطوط | `css/base.css` | كتلة `:root` |

---

## 3. كيف أضيف مشروعًا جديدًا؟

مثال: مشروع اسمه `TaskFlow`.

**1) أنشئ مجلد الصور**

```
assets/images/projects/taskflow/
```

وضع بداخله الصور وأيقونة المشروع `icon.png`.

**2) أنشئ مجلد الوصف**

```
projects/taskflow/README.md
```

والصق فيه محتوى README الخاص بالمشروع.

**3) أنشئ صفحة المشروع**

انسخ `projects/coachlink.html` باسم `projects/taskflow.html`، ثم غيّر **سطرًا واحدًا**:

```html
<body data-project="taskflow">
```

(يُستحسن أيضًا تعديل `<title>` و `<meta name="description">` في أعلى الملف لأجل SEO.)

**4) أضف المشروع إلى البيانات**

افتح `js/data/projects.js` وأضف داخل المصفوفة:

```js
{
  id: 'taskflow',
  name: 'TaskFlow',
  description: {
    en: 'Short description in English.',
    ar: 'وصف قصير بالعربية.',
  },
  icon: 'assets/images/projects/taskflow/icon.png',
  page: 'projects/taskflow.html',
  repositoryStatus: 'public',
  stack: ['Python', 'Django', 'PostgreSQL'],
  links: {
    github: 'https://github.com/USERNAME/taskflow',
    demo: '',
    swagger: '',
    documentation: '',
  },
  images: [
    'assets/images/projects/taskflow/1.jpg',
    'assets/images/projects/taskflow/2.jpg',
  ],
  readme: 'projects/taskflow/README.md',
},
```

**5) انتهيت.** الكارت يظهر تلقائيًا في الصفحة الرئيسية، والضغط عليه يفتح صفحته.

> أي رابط تتركه `''` أو `YOUR_...` يظهر **معطّلًا** في الموقع.

---

## 4. كيف أضيف مهارة جديدة؟

افتح `js/data/skills.js`.

**لإضافة مهارة داخل مجموعة موجودة** — أضف سطرًا في `items`:

```js
items: [
  'JWT Authentication',
  'Access & Refresh Tokens',
  'مهارتك الجديدة هنا',
],
```

**لإضافة مجموعة كاملة** — انسخ أي كائن وعدّله:

```js
{
  id: 'testing',
  title: 'Testing',
  icon: 'check',
  note: {
    en: 'Short sentence in English.',
    ar: 'جملة قصيرة بالعربية.',
  },
  items: ['Unit Tests', 'Integration Tests'],
},
```

- `icon`: أي اسم موجود في `js/icons.js`.
- `open: true` لفتح المجموعة تلقائيًا عند تحميل الصفحة.
- عناصر `items` تبقى بالإنجليزية في اللغتين لأنها مصطلحات تقنية.

---

## 5. كيف أضيف صورة جديدة إلى معرض مشروع؟

1. ضع الصورة في `assets/images/projects/<اسم المشروع>/`
2. أضف مسارها في `images` داخل `js/data/projects.js`:

```js
images: [
  'assets/images/projects/coachlink/1.jpg',
  'assets/images/projects/coachlink/2.jpg',
  'assets/images/projects/coachlink/3.jpg',   ← الصورة الجديدة
],
```

لا تلمس أي HTML. المعرض يبني نفسه:

- **لا صور (`images: []`)** → لا يظهر المعرض إطلاقًا.
- **صورة واحدة** → تظهر الصورة فقط بدون أسهم ولا عرض تلقائي.
- **أكثر من 5 صور** → تظهر 5 مصغّرات وزر `+N` للباقي.

لتغيير سرعة العرض التلقائي أو عدد المصغّرات، افتح `js/gallery.js` وعدّل السطرين في أعلى الملف:

```js
const SLIDESHOW_DELAY = 4000;  // بالميلي ثانية
const VISIBLE_THUMBS  = 5;
```

---

## 6. كيف أغيّر النصوص واللغة؟

كل النصوص في `js/translations.js`، وله قسمان: `en` و `ar`.

```js
const TRANSLATIONS = {
  en: { hero: { greeting: 'Welcome, I am' } },
  ar: { hero: { greeting: 'أهلاً وسهلاً بك، أنا' } },
};
```

**قاعدة واحدة مهمة:** أي مفتاح تضيفه في `en` يجب أن تضيفه في `ar` بنفس الاسم.

لاستخدام نص في HTML:

```html
<span data-i18n="hero.greeting"></span>
```

ولترجمة خاصية بدل النص:

```html
<input data-i18n="contact.namePlaceholder" data-i18n-attr="placeholder">
```

اللغة المختارة تُحفظ في `localStorage`، والاتجاه (RTL/LTR) والخط العربي يتبدّلان تلقائيًا.

---

## 7. كيف أغيّر الألوان والخطوط؟

كل شيء في `css/base.css` داخل `:root`:

```css
:root {
  --bg:      #0C1218;   /* خلفية الصفحة */
  --surface: #121C25;   /* خلفية الكروت */
  --text:    #E8F0F7;   /* النص */
  --accent:  #4FD1C5;   /* اللون المميز الأول */
  --accent-2:#F0B67F;   /* اللون المميز الثاني */
}
```

غيّر `--accent` وحده وسيتغيّر مظهر الموقع بالكامل.

**الخطوط:**

```css
--font-en:   'Inter', sans-serif;              /* الإنجليزية */
--font-ar:   'IBM Plex Sans Arabic', sans-serif; /* العربية */
--font-mono: 'JetBrains Mono', monospace;      /* المصطلحات التقنية */
```

إذا غيّرت اسم خط، غيّر أيضًا رابط Google Fonts في `<head>` داخل `index.html`
و `projects/*.html`.

---

## 8. كيف أربط نموذج التواصل ببريدي؟

الموقع Static بلا Backend، لذلك يحتاج خدمة وسيطة. الأسهل **Web3Forms** (مجانية وبلا حساب):

1. افتح <https://web3forms.com>
2. اكتب بريدك `mohammadalmousa690@gmail.com` واضغط **Create Access Key**
3. سيصلك المفتاح على بريدك — انسخه
4. افتح `js/data/contact.js` وضعه مكان `YOUR_WEB3FORMS_ACCESS_KEY`:

```js
const CONTACT_FORM = {
  service: 'web3forms',
  accessKey: 'a1b2c3d4-....',
};
```

5. جرّب إرسال رسالة من الموقع — ستصل إلى Gmail.

**بديل: Formspree**

1. أنشئ نموذجًا على <https://formspree.io> واحصل على الـ endpoint
2. في نفس الملف:

```js
const CONTACT_FORM = {
  service: 'formspree',
  endpoint: 'https://formspree.io/f/xxxxxxx',
};
```


---

## 9. كيف أنشر الموقع على GitHub Pages؟

**الطريقة الأولى: عبر الموقع (بدون أوامر)**

1. أنشئ مستودعًا جديدًا على GitHub باسم `portfolio` واجعله **Public**
2. اضغط **Add file → Upload files** وارفع محتويات المجلد (وليس المجلد نفسه)
3. اذهب إلى **Settings → Pages**
4. في **Source** اختر `Deploy from a branch`، ثم الفرع `main` والمجلد `/ (root)`
5. اضغط **Save** وانتظر دقيقة
6. سيظهر رابط موقعك: `https://USERNAME.github.io/portfolio/`

**الطريقة الثانية: عبر Git**

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio.git
git push -u origin main
```

ثم نفّذ الخطوات 3–6 أعلاه.

**لتحديث الموقع لاحقًا:**

```bash
git add .
git commit -m "Update projects"
git push
```

### نقاط مهمة عند النشر

- **لا تحذف ملف `.nojekyll`** — بدونه يحوّل GitHub ملفات `README.md` تلقائيًا فيتوقف عرض وصف المشاريع.
- **حساسية حالة الأحرف:** `Image1.JPG` ≠ `image1.jpg`. تعمل محليًا على Windows وتفشل على GitHub Pages، فاكتب أسماء الملفات بحروف صغيرة.
- بعد النشر، افتح `index.html` وضع رابط موقعك مكان `YOUR_SITE_URL` في وسمَي `canonical` و `og:url`، واجعل `og:image` رابطًا كاملًا:

```html
<link rel="canonical" href="https://USERNAME.github.io/portfolio/">
<meta property="og:url" content="https://USERNAME.github.io/portfolio/">
<meta property="og:image" content="https://USERNAME.github.io/portfolio/assets/images/profile.jpg">
```

- **نطاق خاص (اختياري):** Settings → Pages → Custom domain.

---


---

## 10. ملاحظات تقنية

- **لا توجد أي مكتبة خارجية** — الأيقونات ومحوّل Markdown مكتوبان داخل المشروع. الاتصال الخارجي الوحيد هو Google Fonts.
- **SEO:** `title` و `meta description` و Open Graph وعناوين `h1/h2/h3` صحيحة و `alt` لكل صورة.
- **الإتاحة:** تنقّل كامل بلوحة المفاتيح، `aria-expanded` في المهارات، `aria-live` لرسائل النموذج، حالات تركيز واضحة، وزر تخطٍّ إلى المحتوى.
- **الحركة:** كل الأنيميشن يحترم `prefers-reduced-motion`.
- **الاتجاه:** RTL يعمل عبر الخصائص المنطقية (`inset-inline-start`, `padding-inline`) لذلك لا يوجد ملف CSS منفصل للعربية.
