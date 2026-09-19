/* ==========================================================================
   i18n.js
   محرك اللغة: يقرأ النصوص من translations.js ويطبّقها على الصفحة،
   يضبط الاتجاه (RTL / LTR)، ويحفظ اختيار اللغة في localStorage.

   لا تحتاج لتعديل هذا الملف عادةً — النصوص تُعدّل من translations.js.

   الدوال المتاحة للملفات الأخرى:
     I18N.get()            -> 'en' أو 'ar'
     I18N.dir()            -> 'ltr' أو 'rtl'
     I18N.t('nav.home')    -> النص المترجم
     I18N.set('ar')        -> تغيير اللغة
     I18N.toggle()         -> التبديل بين اللغتين
     I18N.apply(root)      -> إعادة ترجمة جزء من الصفحة (بعد بناء HTML ديناميكي)

   عند تغيير اللغة يُطلق حدث 'languagechanged' على window
   حتى تعيد بقية الأقسام بناء نفسها.
   ========================================================================== */

const I18N = (() => {
  const STORAGE_KEY = 'portfolio:lang';
  const DEFAULT_LANG = 'en';
  const LANGS = { en: 'ltr', ar: 'rtl' };

  let current = DEFAULT_LANG;

  /* --- قراءة / حفظ اللغة (محمي في حال كان localStorage معطلاً) --- */
  function readSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* تجاهل */ }
  }

  /* --- الحصول على نص من ملف الترجمة عبر مفتاح مثل 'hero.greeting' --- */
  function t(key, lang) {
    const dict = TRANSLATIONS[lang || current] || {};
    const value = key.split('.').reduce(
      (obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined),
      dict
    );
    return value === undefined ? key : value;
  }

  /* --- تطبيق النصوص على العناصر داخل نطاق معين --- */
  function apply(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key);
      if (typeof value !== 'string') return;

      const attrs = el.getAttribute('data-i18n-attr');
      if (attrs) {
        // مثال: data-i18n-attr="placeholder,aria-label"
        attrs.split(',').forEach((attr) => el.setAttribute(attr.trim(), value));
      } else {
        el.textContent = value;
      }
    });
  }

  /* --- ضبط اللغة والاتجاه على كامل المستند --- */
  function set(lang, { silent = false } = {}) {
    if (!LANGS[lang]) lang = DEFAULT_LANG;
    current = lang;

    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', LANGS[lang]);

    apply(document);
    saveLang(lang);

    if (!silent) {
      window.dispatchEvent(new CustomEvent('languagechanged', {
        detail: { lang, dir: LANGS[lang] },
      }));
    }
  }

  function toggle() {
    set(current === 'ar' ? 'en' : 'ar');
  }

  /* --- التشغيل الأول: اللغة المحفوظة، وإلا لغة المتصفح، وإلا الافتراضية --- */
  function init() {
    const saved = readSaved();
    const browser = (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : null;
    set(saved || browser || DEFAULT_LANG, { silent: true });
  }

  return {
    init,
    set,
    toggle,
    apply,
    t,
    get: () => current,
    dir: () => LANGS[current],
  };
})();
