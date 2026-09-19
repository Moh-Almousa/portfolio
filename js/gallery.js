/* ==========================================================================
   gallery.js
   معرض صور المشروع: صورة رئيسية + thumbnails + عرض تلقائي + Lightbox.

   القاعدة المهمة: إذا كانت مصفوفة الصور فارغة، لا يظهر المعرض إطلاقًا.

   لإضافة صورة: ضع الملف داخل assets/images/projects/<اسم المشروع>/
   ثم أضف مساره إلى images داخل js/data/projects.js — لا تعدّل هذا الملف.
   ========================================================================== */

const Gallery = (() => {
  /* --- إعدادات قابلة للتعديل --- */
  const SLIDESHOW_DELAY = 4000;  // مدة عرض كل صورة بالميلي ثانية
  const VISIBLE_THUMBS = 5;      // عدد الصور المصغّرة الظاهرة قبل زر "+N"

  let root = null;
  let images = [];
  let current = 0;
  let timer = null;
  let playing = false;
  let expanded = false;

  const el = {};   // مراجع العناصر

  /* ---------- بناء الـ HTML ---------- */
  function template() {
    return `
      <div class="gallery__stage">
        <button class="gallery__main" type="button" id="galleryMain"
                aria-label="${I18N.t('gallery.openLightbox')}">
          <img id="galleryMainImg" src="" alt="">
        </button>

        <button class="gallery__nav gallery__nav--prev" type="button" id="galleryPrev"
                aria-label="${I18N.t('gallery.prev')}"><span data-icon="arrowLeft"></span></button>
        <button class="gallery__nav gallery__nav--next" type="button" id="galleryNext"
                aria-label="${I18N.t('gallery.next')}"><span data-icon="arrowRight"></span></button>
      </div>

      <div class="gallery__bar">
        <span class="gallery__counter" id="galleryCounter" aria-live="polite"></span>
        <div class="gallery__tools">
          <button class="gallery__tool" type="button" id="galleryPlay"
                  aria-label="${I18N.t('gallery.play')}"><span data-icon="play"></span></button>
          <a class="gallery__tool" id="galleryOpen" href="#" target="_blank" rel="noopener noreferrer"
             aria-label="${I18N.t('gallery.openNewTab')}"><span data-icon="external"></span></a>
        </div>
      </div>

      <ul class="gallery__thumbs" id="galleryThumbs"></ul>
    `;
  }

  function lightboxTemplate() {
    return `
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" hidden>
        <button class="lightbox__close" type="button" id="lightboxClose"
                aria-label="${I18N.t('gallery.close')}"><span data-icon="close"></span></button>
        <button class="lightbox__nav lightbox__nav--prev" type="button" id="lightboxPrev"
                aria-label="${I18N.t('gallery.prev')}"><span data-icon="arrowLeft"></span></button>
        <img class="lightbox__img" id="lightboxImg" src="" alt="">
        <button class="lightbox__nav lightbox__nav--next" type="button" id="lightboxNext"
                aria-label="${I18N.t('gallery.next')}"><span data-icon="arrowRight"></span></button>
      </div>`;
  }

  /* ---------- الصور المصغّرة ---------- */
  function renderThumbs() {
    const hiddenCount = images.length - VISIBLE_THUMBS;
    const showAll = expanded || hiddenCount <= 0;
    const list = showAll ? images : images.slice(0, VISIBLE_THUMBS);

    el.thumbs.innerHTML = list
      .map((src, index) => `
        <li>
          <button class="gallery__thumb ${index === current ? 'is-active' : ''}"
                  type="button" data-index="${index}"
                  aria-label="${I18N.t('gallery.image')} ${index + 1}">
            <img src="${src}" alt="" loading="lazy">
          </button>
        </li>`)
      .join('');

    if (!showAll) {
      el.thumbs.insertAdjacentHTML('beforeend', `
        <li>
          <button class="gallery__thumb gallery__thumb--more" type="button" id="galleryMore">
            <img src="${images[VISIBLE_THUMBS]}" alt="" loading="lazy">
            <span>+${hiddenCount}</span>
          </button>
        </li>`);

      el.thumbs.querySelector('#galleryMore').addEventListener('click', () => {
        expanded = true;
        renderThumbs();
      });
    }

    el.thumbs.querySelectorAll('.gallery__thumb[data-index]').forEach((button) => {
      button.addEventListener('click', () => show(Number(button.dataset.index)));
    });
  }

  /* ---------- عرض صورة ---------- */
  function show(index) {
    if (!images.length) return;
    current = (index + images.length) % images.length;

    el.mainImg.src = images[current];
    el.mainImg.alt = `${I18N.t('gallery.image')} ${current + 1}`;
    el.open.href = images[current];
    el.counter.textContent = `${current + 1} / ${images.length}`;

    if (el.lightbox && !el.lightbox.hidden) {
      el.lightboxImg.src = images[current];
    }

    el.thumbs.querySelectorAll('.gallery__thumb[data-index]').forEach((button) => {
      button.classList.toggle('is-active', Number(button.dataset.index) === current);
    });
  }

  /* ---------- العرض التلقائي ---------- */
  function setPlaying(value) {
    playing = value;
    clearInterval(timer);
    timer = null;

    if (playing) timer = setInterval(() => show(current + 1), SLIDESHOW_DELAY);

    el.play.innerHTML = Icons.svg(playing ? 'pause' : 'play');
    el.play.setAttribute('aria-label', I18N.t(playing ? 'gallery.pause' : 'gallery.play'));
    el.play.classList.toggle('is-active', playing);
  }

  /* ---------- Lightbox ---------- */
  function openLightbox() {
    el.lightboxImg.src = images[current];
    el.lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    el.lightboxClose.focus();
  }

  function closeLightbox() {
    el.lightbox.hidden = true;
    document.body.style.overflow = '';
    el.main.focus();
  }

  /* ---------- التشغيل ---------- */
  function init(container, list) {
    root = container;
    images = Array.isArray(list) ? list.filter(Boolean) : [];

    // لا صور → لا معرض إطلاقًا
    if (!root || !images.length) {
      if (root) root.remove();
      return;
    }

    root.hidden = false;
    const host = root.querySelector('.container') || root;
    host.innerHTML = template();
    document.body.insertAdjacentHTML('beforeend', lightboxTemplate());

    el.main = document.getElementById('galleryMain');
    el.mainImg = document.getElementById('galleryMainImg');
    el.prev = document.getElementById('galleryPrev');
    el.next = document.getElementById('galleryNext');
    el.counter = document.getElementById('galleryCounter');
    el.play = document.getElementById('galleryPlay');
    el.open = document.getElementById('galleryOpen');
    el.thumbs = document.getElementById('galleryThumbs');
    el.lightbox = document.getElementById('lightbox');
    el.lightboxImg = document.getElementById('lightboxImg');
    el.lightboxClose = document.getElementById('lightboxClose');

    Icons.render(root);
    Icons.render(el.lightbox);
    renderThumbs();
    show(0);
    setPlaying(false);

    /* صورة واحدة فقط: لا حاجة لأزرار التنقل والعرض التلقائي */
    if (images.length === 1) {
      el.prev.hidden = true;
      el.next.hidden = true;
      el.play.hidden = true;
      el.thumbs.hidden = true;
    }

    el.prev.addEventListener('click', () => { setPlaying(false); show(current - 1); });
    el.next.addEventListener('click', () => { setPlaying(false); show(current + 1); });
    el.play.addEventListener('click', () => setPlaying(!playing));
    el.main.addEventListener('click', openLightbox);

    el.lightboxClose.addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', () => show(current - 1));
    document.getElementById('lightboxNext').addEventListener('click', () => show(current + 1));
    el.lightbox.addEventListener('click', (event) => {
      if (event.target === el.lightbox) closeLightbox();
    });

    /* لوحة المفاتيح: الأسهم للتنقل، Esc لإغلاق الـ Lightbox */
    document.addEventListener('keydown', (event) => {
      const insideGallery = root.contains(document.activeElement);
      const lightboxOpen = !el.lightbox.hidden;
      if (!insideGallery && !lightboxOpen) return;

      if (event.key === 'Escape' && lightboxOpen) closeLightbox();
      if (event.key === 'ArrowRight') { setPlaying(false); show(current + 1); }
      if (event.key === 'ArrowLeft') { setPlaying(false); show(current - 1); }
    });
  }

  return { init };
})();
