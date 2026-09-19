/* ==========================================================================
   reveal.js
   ظهور ناعم للعناصر عند الوصول إليها بالتمرير.

   الاستخدام: أضف data-reveal إلى أي عنصر في HTML.
   لتأخير بسيط بين العناصر المتجاورة: data-reveal-delay="1" أو "2" أو "3".

   للمحتوى الذي يُبنى بـ JavaScript (التسليمات، المشاريع، المهارات):
       Reveal.observe(container)   بعد إدراج الـ HTML مباشرة.

   ملاحظة: إذا كان JavaScript معطلاً يبقى المحتوى ظاهرًا بشكل طبيعي،
   لأن الإخفاء يُفعّل من CSS فقط بعد أن يضيف هذا الملف السمة data-reveal-ready.
   ========================================================================== */

const Reveal = (() => {
  let observer = null;

  function reduceMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function showAll(root) {
    root.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  function init() {
    if (reduceMotion() || !('IntersectionObserver' in window)) {
      showAll(document);
      return;
    }

    document.documentElement.setAttribute('data-reveal-ready', 'true');

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // مرة واحدة فقط
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    observe(document);
  }

  /* يراقب العناصر الجديدة داخل نطاق معين (يُستدعى بعد أي بناء ديناميكي) */
  function observe(root) {
    if (!observer) {
      showAll(root);
      return;
    }
    root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer.observe(el));
  }

  return { init, observe };
})();
