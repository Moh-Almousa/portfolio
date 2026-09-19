/* ==========================================================================
   typing.js
   أنيميشن الكتابة في الـ Hero:  كتابة → توقف → حذف → الكلمة التالية.

   النصوص تُقرأ من translations.js  (hero.typed) — لإضافة أو تعديل عبارة
   افتح js/translations.js وعدّل المصفوفة typed في en و ar.

   إذا كان المستخدم مفعّلاً "تقليل الحركة" يُعرض النص الأول ثابتًا بدون حركة.
   ========================================================================== */

const Typing = (() => {
  /* --- سرعات الأنيميشن (بالميلي ثانية) — عدّلها كما تريد --- */
  const TYPE_SPEED   = 80;    // سرعة كتابة الحرف
  const DELETE_SPEED = 38;    // سرعة حذف الحرف
  const HOLD_FULL    = 1700;  // مدة التوقف بعد اكتمال الكلمة
  const HOLD_EMPTY   = 380;   // مدة التوقف قبل كتابة الكلمة التالية

  let el = null;
  let timer = null;
  let words = [];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function reduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
  }

  function tick() {
    const word = words[wordIndex] || '';

    if (!isDeleting) {
      charIndex += 1;
      el.textContent = word.slice(0, charIndex);

      if (charIndex >= word.length) {
        isDeleting = true;
        timer = setTimeout(tick, HOLD_FULL);
        return;
      }
      timer = setTimeout(tick, TYPE_SPEED);
      return;
    }

    charIndex -= 1;
    el.textContent = word.slice(0, charIndex);

    if (charIndex <= 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      timer = setTimeout(tick, HOLD_EMPTY);
      return;
    }
    timer = setTimeout(tick, DELETE_SPEED);
  }

  /* يبدأ (أو يعيد البدء بعد تغيير اللغة) */
  function start() {
    if (!el) return;
    stop();

    const list = I18N.t('hero.typed');
    words = Array.isArray(list) && list.length ? list : [''];
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;

    if (reduceMotion()) {
      el.textContent = words[0];
      return;
    }

    el.textContent = '';
    timer = setTimeout(tick, 500);
  }

  function init() {
    el = document.getElementById('typedText');
    if (!el) return;

    start();
    window.addEventListener('languagechanged', start);

    /* إيقاف الأنيميشن عندما تكون الصفحة غير مرئية (توفير للأداء) */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (!timer && !reduceMotion()) start();
    });
  }

  return { init };
})();
