/* ==========================================================================
   project-page.js
   تشغيل صفحة تفاصيل المشروع.

   الصفحة تعرف أي مشروع تعرض من السمة data-project على وسم <body>:
       <body data-project="coachlink">

   كل المحتوى (الاسم، الحالة، الروابط، الصور، README) يأتي من
   js/data/projects.js — لا تكتب محتوى المشروع داخل HTML.
   ========================================================================== */

const ProjectPage = (() => {
  /* صفحة المشروع داخل مجلد projects/ بينما المسارات في ملف البيانات
     مكتوبة بالنسبة لجذر الموقع، لذلك نضيف ../ تلقائيًا. */
  const BASE = '../';

  function resolve(path) {
    if (!path) return '';
    if (/^(https?:)?\/\//.test(path) || path.startsWith(BASE)) return path;
    return BASE + path;
  }

  let project = null;

  /* README يمكن أن يكون نصًا واحدًا أو { en, ar } */
  function readmePath() {
    const value = project.readme;
    if (!value) return '';
    const path = typeof value === 'string' ? value : value[I18N.get()] || value.en || '';
    return resolve(path);
  }

  /* ---------- رأس الصفحة ---------- */
  function renderHead() {
    const lang = I18N.get();
    const isPrivate = project.repositoryStatus === 'private';

    document.title = `${project.name} — Mohammad Almousa`;

    const title = document.getElementById('projectTitle');
    if (title) title.textContent = project.name;

    const desc = document.getElementById('projectDesc');
    if (desc) desc.textContent = (project.description && project.description[lang]) || '';

    const status = document.getElementById('projectStatus');
    if (status) {
      status.className = `badge ${isPrivate ? 'badge--lock' : 'badge--open'}`;
      status.innerHTML =
        `<span data-icon="${isPrivate ? 'lock' : 'publicRepo'}"></span>` +
        I18N.t(isPrivate ? 'works.repoPrivate' : 'works.repoPublic');
    }

    const stack = document.getElementById('projectStack');
    if (stack) {
      stack.innerHTML = (project.stack || [])
        .map((item) => `<li class="project-card__chip">${item}</li>`)
        .join('');
    }

    const links = document.getElementById('projectLinks');
    if (links) {
      const items = [
        { url: project.links.github, icon: 'github', key: 'works.linkGithub' },
        { url: project.links.demo, icon: 'external', key: 'works.linkDemo' },
        { url: project.links.swagger, icon: 'swagger', key: 'works.linkSwagger' },
        { url: project.links.documentation, icon: 'docs', key: 'works.linkDocs' },
      ];

      links.innerHTML = items
        .map(({ url, icon, key }) => {
          const label = I18N.t(key);
          if (ProjectLinks.isMissing(url)) {
            return `<li><span class="btn btn--ghost is-missing" aria-disabled="true">
                      <span data-icon="${icon}"></span>${label}</span></li>`;
          }
          return `<li><a class="btn btn--ghost" href="${url}" target="_blank" rel="noopener noreferrer">
                    <span data-icon="${icon}"></span>${label}</a></li>`;
        })
        .join('');
    }

    Icons.render(document);
  }

  /* ---------- محتوى README ---------- */
  async function loadReadme() {
    const box = document.getElementById('projectReadme');
    if (!box) return;

    const path = readmePath();
    if (!path) {
      box.closest('section').remove();
      return;
    }

    try {
      const response = await fetch(path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(response.status);
      box.innerHTML = Markdown.toHTML(await response.text());
    } catch (error) {
      // يحدث غالبًا عند فتح الملف مباشرة بـ file:// بدل Live Server
      box.innerHTML = `<p class="readme__error">${I18N.t('project.readmeError')}</p>`;
    }
  }

  function init() {
    const id = document.body.dataset.project;
    project = PROJECTS.find((item) => item.id === id);

    if (!project) {
      const main = document.querySelector('main .container');
      if (main) main.innerHTML = `<p class="placeholder-box">${I18N.t('project.notFound')}</p>`;
      return;
    }

    renderHead();
    const images = (project.images || []).map(resolve);
    Gallery.init(document.getElementById('projectGallery'), images);
    loadReadme();

    window.addEventListener('languagechanged', () => {
      renderHead();
      loadReadme();
    });
  }

  return { init };
})();
