/* ==========================================================================
   nav.js
   شريط التنقل:
   - تحديد القسم النشط أثناء التمرير (Scroll Spy)
   - إخفاء الشريط السفلي عند النزول وإظهاره عند الصعود (الموبايل فقط)
   - تمرير ناعم عند الضغط على أي رابط
   ========================================================================== */

const Nav = (() => {
  let rail;
  let links = [];

  /* الأقسام التي ليس لها رابط خاص في القائمة تُنسب إلى رابط آخر */
  const SECTION_ALIASES = { about: 'home' };

  /* --- تحديد الرابط النشط --- */
  function setActive(sectionId) {
    const id = SECTION_ALIASES[sectionId] || sectionId;
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /* --- مراقبة الأقسام لمعرفة القسم الظاهر حاليًا --- */
  function watchSections() {
    const sections = document.querySelectorAll('main section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // نختار القسم الأكثر ظهورًا على الشاشة
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* --- إخفاء/إظهار الشريط السفلي في الموبايل --- */
  function watchScrollDirection() {
    let lastY = window.scrollY;

    window.addEventListener(
      'scroll',
      () => {
        if (window.innerWidth > 900) {
          rail.classList.remove('is-hidden');
          return;
        }
        const y = window.scrollY;
        const goingDown = y > lastY && y > 220;
        rail.classList.toggle('is-hidden', goingDown);
        lastY = y;
      },
      { passive: true }
    );
  }

  /* --- تمرير ناعم مع احترام تفضيل تقليل الحركة --- */
  function smoothScroll() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
      setActive(id);
    });
  }

  function init() {
    rail = document.getElementById('rail');
    if (!rail) return;
    links = Array.from(rail.querySelectorAll('[data-nav-link]'));

    watchSections();
    watchScrollDirection();
    smoothScroll();
  }

  return { init };
})();
