/* ==========================================================================
   project-links.js
   ملف مشترك بين كروت المشاريع (الصفحة الرئيسية) وصفحة تفاصيل المشروع،
   حتى لا يتكرر كود الروابط في مكانين.

   القاعدة: أي رابط فارغ أو ما زال Placeholder (يبدأ بـ YOUR_) يظهر
   كعنصر غير مفعّل بدل اختراع رابط وهمي.
   ========================================================================== */

const ProjectLinks = {
  isMissing(url) {
    return !url || /^YOUR_/i.test(String(url).trim());
  },

  itemHTML(url, icon, labelKey, subKey) {
    const label = I18N.t(labelKey);

    if (this.isMissing(url)) {
      return `
        <li>
          <span class="project-link is-missing" aria-disabled="true">
            <span class="project-link__icon" data-icon="${icon}"></span>
            <span class="project-link__text">
              <b>${label}</b>
              <small>${I18N.t('works.linkMissing')}</small>
            </span>
          </span>
        </li>`;
    }

    return `
      <li>
        <a class="project-link" href="${url}" target="_blank" rel="noopener noreferrer">
          <span class="project-link__icon" data-icon="${icon}"></span>
          <span class="project-link__text">
            <b>${label}</b>
            <small>${I18N.t(subKey)}</small>
          </span>
        </a>
      </li>`;
  },

  /* يُرجع محتوى قائمة الروابط الأربعة لمشروع معيّن */
  listHTML(project) {
    const links = project.links || {};
    const repoSub = project.repositoryStatus === 'private'
      ? 'works.repoPrivate'
      : 'works.repoPublic';

    return [
      this.itemHTML(links.github, 'github', 'works.linkGithub', repoSub),
      this.itemHTML(links.demo, 'external', 'works.linkDemo', 'works.linkDemoSub'),
      this.itemHTML(links.swagger, 'swagger', 'works.linkSwagger', 'works.linkSwaggerSub'),
      this.itemHTML(links.documentation, 'docs', 'works.linkDocs', 'works.linkDocsSub'),
    ].join('');
  },
};
