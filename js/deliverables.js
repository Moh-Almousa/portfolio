/* ==========================================================================
   deliverables.js
   قسم What You'll Receive — يبني الكروت تلقائيًا.

   لإضافة / حذف / ترتيب عنصر:
     1) عدّل المصفوفة DELIVERABLES بالأسفل (الترتيب هنا هو ترتيب العرض).
     2) ضع النصوص في js/translations.js تحت  deliverables.items.<id>
        بالمفتاحين: title و text  (في en و ar معًا).

     icon   : اسم أيقونة من js/icons.js
     scoped : true  تعني أن هذا التسليم مرتبط بنطاق المشروع
              (تظهر معه شارة صغيرة "حسب نطاق المشروع").
   ========================================================================== */

const DELIVERABLES = [
  { id: 'apiDocs',    icon: 'swagger'  },
  { id: 'examples',   icon: 'exchange' },
  { id: 'erd',        icon: 'erd'      },
  { id: 'sourceCode', icon: 'code',    scoped: true },
  { id: 'deployment', icon: 'server',  scoped: true },
  { id: 'pdf',        icon: 'filePdf', scoped: true },
];

const Deliverables = (() => {
  let grid = null;

  function cardHTML(item, index) {
    const title = I18N.t(`deliverables.items.${item.id}.title`);
    const text = I18N.t(`deliverables.items.${item.id}.text`);
    const scopeBadge = item.scoped
      ? `<span class="badge deliverable-card__scope">${I18N.t('deliverables.scopeNote')}</span>`
      : '';

    return `
      <li class="deliverable-card" data-reveal data-reveal-delay="${index % 3}">
        <span class="deliverable-card__icon" data-icon="${item.icon}"></span>
        <h3 class="deliverable-card__title">${title}</h3>
        <p class="deliverable-card__text">${text}</p>
        ${scopeBadge}
      </li>`;
  }

  function render() {
    if (!grid) return;
    grid.innerHTML = DELIVERABLES.map(cardHTML).join('');
    Icons.render(grid);
    Reveal.observe(grid);
  }

  function init() {
    grid = document.getElementById('deliverablesGrid');
    if (!grid) return;

    render();
    window.addEventListener('languagechanged', render);
  }

  return { init };
})();
