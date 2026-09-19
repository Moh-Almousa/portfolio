/* ==========================================================================
   main.js
   نقطة التشغيل: يشغّل اللغة، الأيقونات، والتنقل بالترتيب الصحيح.
   هذا آخر ملف يُحمَّل في index.html.
   ========================================================================== */

/* تشغيل آمن: خطأ في قسم واحد لا يمنع بقية الأقسام من العمل */
function run(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[portfolio] تعذّر تشغيل ${name}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* 1) اللغة والاتجاه (قبل أي شيء آخر) */
  I18N.init();

  /* 2) الأيقونات داخل الـ HTML الثابت */
  Icons.render();

  /* 3) شريط التنقل */
  run('Nav', Nav.init);

  /* 4) أنيميشن الكتابة في الهيرو */
  run('Typing', Typing.init);

  /* 5) ظهور العناصر عند التمرير */
  run('Reveal', Reveal.init);

  /* 6) قسم المشاريع */
  run('Projects', Projects.init);

  /* 7) قسم What You'll Receive */
  run('Deliverables', Deliverables.init);

  /* 8) قسم المهارات */
  run('Skills', Skills.init);

  /* 9) قسم التواصل */
  run('Contact', Contact.init);

  /* 10) زر تبديل اللغة */
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.addEventListener('click', () => I18N.toggle());

  /* 11) سنة الحقوق في الفوتر */
  const year = document.getElementById('footerYear');
  if (year) year.textContent = new Date().getFullYear();

  /* عند تغيير اللغة تُعاد الأيقونات (للمحتوى الذي يُبنى ديناميكيًا لاحقًا) */
  window.addEventListener('languagechanged', () => {
    Icons.render();
  });
});
