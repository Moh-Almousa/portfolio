/* ==========================================================================
   projects.js
   يبني كروت المشاريع من js/data/projects.js داخل Carousel أفقي.

   لا تعدّل هذا الملف لإضافة مشروع — أضِف المشروع في js/data/projects.js فقط.

   طرق التنقل المدعومة: عجلة الماوس، السحب بالماوس، الأسهم، اللمس على الموبايل.
   ========================================================================== */

const Projects = (() => {
  let track = null;
  let prevBtn = null;
  let nextBtn = null;
  let dragged = false;

  function isRTL() {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }

  /* ---------- بناء كارت واحد ---------- */

  function cardHTML(project) {
    const lang = I18N.get();
    const desc = (project.description && project.description[lang]) || '';
    const isPrivate = project.repositoryStatus === 'private';

    const statusBadge = `
      <span class="badge ${isPrivate ? 'badge--lock' : 'badge--open'}">
        <span data-icon="${isPrivate ? 'lock' : 'publicRepo'}"></span>
        ${I18N.t(isPrivate ? 'works.repoPrivate' : 'works.repoPublic')}
      </span>`;

    const icon = project.icon
      ? `<img class="project-card__icon" src="${project.icon}" alt="" loading="lazy" width="52" height="52">`
      : `<span class="project-card__icon project-card__icon--letter" aria-hidden="true">${project.name.charAt(0)}</span>`;

    const stack = (project.stack || [])
      .map((item) => `<li class="project-card__chip">${item}</li>`)
      .join('');

    return `
      <li class="project-card" data-reveal>
        <div class="project-card__head">
          ${icon}
          <div class="project-card__heading">
            <h3 class="project-card__title">
              <a class="project-card__open" href="${project.page}">${project.name}</a>
            </h3>
            ${statusBadge}
          </div>
        </div>

        <p class="project-card__desc">${desc}</p>

        ${stack ? `<ul class="project-card__stack">${stack}</ul>` : ''}

        <ul class="project-card__links">
          ${ProjectLinks.listHTML(project)}
        </ul>

        <span class="project-card__cta">
          ${I18N.t('works.viewProject')}
          <span data-icon="${isRTL() ? 'arrowLeft' : 'arrowRight'}"></span>
        </span>
      </li>`;
  }

  /* ---------- الرسم ---------- */
  function render() {
    if (!track) return;

    if (!PROJECTS.length) {
      track.innerHTML = `<li class="placeholder-box">${I18N.t('works.empty')}</li>`;
      return;
    }

    track.innerHTML = PROJECTS.map(cardHTML).join('');
    Icons.render(track);
    Reveal.observe(track);
    updateArrows();
  }

  /* ---------- الأسهم ---------- */
  function scrollAmount() {
    const card = track.querySelector('.project-card');
    return card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
  }

  function move(direction) {
    // في الوضع RTL يكون scrollLeft بالسالب، لذلك نعكس الاتجاه
    const factor = isRTL() ? -1 : 1;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * scrollAmount() * factor,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }

  function updateArrows() {
    if (!prevBtn || !nextBtn) return;
    const max = track.scrollWidth - track.clientWidth;
    const pos = Math.abs(track.scrollLeft);
    const hasOverflow = max > 4;

    prevBtn.disabled = !hasOverflow || pos <= 2;
    nextBtn.disabled = !hasOverflow || pos >= max - 2;
  }

  /* ---------- عجلة الماوس ---------- */
  function enableWheel() {
    track.addEventListener(
      'wheel',
      (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

        const max = track.scrollWidth - track.clientWidth;
        const pos = Math.abs(track.scrollLeft);
        const atStart = pos <= 2;
        const atEnd = pos >= max - 2;

        // إذا وصل الكاروسيل إلى نهايته نترك الصفحة تتمرر بشكل طبيعي
        if (max <= 4 || (event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;

        event.preventDefault();
        track.scrollLeft += event.deltaY * (isRTL() ? -1 : 1);
      },
      { passive: false }
    );
  }

  /* ---------- السحب بالماوس ---------- */
  function enableDrag() {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || event.button !== 0) return;
      isDown = true;
      dragged = false;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });

    track.addEventListener('pointermove', (event) => {
      if (!isDown) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 4) dragged = true;
      track.scrollLeft = startScroll - distance;
    });

    const stop = () => {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');
    };

    track.addEventListener('pointerup', stop);
    track.addEventListener('pointerleave', stop);
    track.addEventListener('pointercancel', stop);

    // منع فتح صفحة المشروع إذا كانت الحركة سحبًا وليست ضغطة
    track.addEventListener(
      'click',
      (event) => {
        if (!dragged) return;
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      },
      true
    );
  }

  function init() {
    track = document.getElementById('projectsTrack');
    if (!track) return;

    prevBtn = document.getElementById('projectsPrev');
    nextBtn = document.getElementById('projectsNext');

    render();

    if (prevBtn) prevBtn.addEventListener('click', () => move(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => move(1));

    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    window.addEventListener('languagechanged', () => {
      track.scrollLeft = 0;
      render();
    });

    enableWheel();
    enableDrag();
  }

  return { init };
})();
