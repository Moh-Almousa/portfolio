/* ==========================================================================
   skills.js
   يبني قسم المهارات من js/data/skills.js على شكل مجموعات قابلة للفتح والإغلاق
   (بأسلوب عرض الـ endpoints في Swagger).

   لا تعدّل هذا الملف لإضافة مهارة — أضِفها في js/data/skills.js فقط.
   ========================================================================== */

const Skills = (() => {
  let root = null;

  function groupHTML(group, position) {
    const lang = I18N.get();
    const note = (group.note && group.note[lang]) || '';
    const isOpen = Boolean(group.open);

    const items = group.items
      .map((item) => `<li class="skill-item">${item}</li>`)
      .join('');

    return `
      <li class="skill-group ${isOpen ? 'is-open' : ''}" data-reveal data-reveal-delay="${position % 3}">
        <h3 class="skill-group__heading">
          <button class="skill-group__toggle" type="button"
                  aria-expanded="${isOpen}" aria-controls="skillPanel-${group.id}">
            <span class="skill-group__icon" data-icon="${group.icon}"></span>
            <span class="skill-group__title">${group.title}</span>
            <span class="skill-group__count">${group.items.length}</span>
            <span class="skill-group__chevron" data-icon="chevronDown"></span>
          </button>
        </h3>

        <div class="skill-group__panel" id="skillPanel-${group.id}" role="region">
          <div class="skill-group__inner">
            ${note ? `<p class="skill-group__note">${note}</p>` : ''}
            <ul class="skill-group__items">${items}</ul>
          </div>
        </div>
      </li>`;
  }

  function render() {
    if (!root) return;

    if (!SKILLS.length) {
      root.innerHTML = `<li class="placeholder-box">${I18N.t('skills.empty')}</li>`;
      return;
    }

    root.innerHTML = SKILLS.map(groupHTML).join('');
    Icons.render(root);
    Reveal.observe(root);
  }

  function toggle(button) {
    const group = button.closest('.skill-group');
    const isOpen = group.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  }

  function init() {
    root = document.getElementById('skillsList');
    if (!root) return;

    render();

    root.addEventListener('click', (event) => {
      const button = event.target.closest('.skill-group__toggle');
      if (button) toggle(button);
    });

    /* عند تغيير اللغة تُعاد الترجمة مع الحفاظ على المجموعات المفتوحة */
    window.addEventListener('languagechanged', () => {
      const openIds = Array.from(root.querySelectorAll('.skill-group.is-open'))
        .map((group) => group.querySelector('.skill-group__panel').id);

      render();

      openIds.forEach((id) => {
        const panel = root.querySelector(`#${CSS.escape(id)}`);
        if (!panel) return;
        panel.closest('.skill-group').classList.add('is-open');
        panel.previousElementSibling
          .querySelector('.skill-group__toggle')
          .setAttribute('aria-expanded', 'true');
      });
    });
  }

  return { init };
})();
