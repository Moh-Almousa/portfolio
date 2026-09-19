/* ==========================================================================
   icons.js
   مكتبة أيقونات صغيرة جدًا مدمجة داخل الموقع (بدون أي مكتبة خارجية).
   الاستخدام في HTML :  <span data-icon="github"></span>
   الاستخدام في JS   :  Icons.svg('github')
   لإضافة أيقونة جديدة: أضف اسمها ومسارها (path) داخل ICON_PATHS.
   جميع الأيقونات مرسومة على مقاس 24×24.
   ========================================================================== */

const ICON_PATHS = {
  /* التنقل */
  home:    '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  works:   '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
  skills:  '<path d="m7 8-4 4 4 4"/><path d="m17 8 4 4-4 4"/><path d="m14 4-4 16"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  globe:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 3.8 5.8 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z"/>',

  /* روابط ومشاريع */
  github:  '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 19.9 5a4.9 4.9 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.9 1.1 5.8 1.4 5.8 1.4A4.9 4.9 0 0 0 5.7 5a5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>',
  external:'<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
  swagger: '<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M8 9h3"/><path d="M8 13h8"/><path d="M8 16h5"/>',
  docs:    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  lock:    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  publicRepo: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.7 3.8 5.8 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.8-3.8-9S9.5 5.7 12 3Z"/>',

  /* معرض الصور */
  arrowLeft:  '<path d="m14 6-6 6 6 6"/>',
  arrowRight: '<path d="m10 6 6 6-6 6"/>',
  play:  '<path d="M7 4.5v15l13-7.5Z"/>',
  pause: '<rect x="7" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  expand:'<path d="M9 4H4v5"/><path d="M4 4l6 6"/><path d="M15 20h5v-5"/><path d="M20 20l-6-6"/>',
  close: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',

  /* What You'll Receive (Deliverables) */
  exchange: '<path d="M4 8h13"/><path d="m14 5 3 3-3 3"/><path d="M20 16H7"/><path d="m10 13-3 3 3 3"/>',
  erd:      '<rect x="3" y="3" width="7" height="6" rx="1.5"/><rect x="14" y="15" width="7" height="6" rx="1.5"/><path d="M6.5 9v5a2 2 0 0 0 2 2H14"/><path d="M17.5 15V9"/>',
  code:     '<path d="M8.5 8 4 12l4.5 4"/><path d="M15.5 8 20 12l-4.5 4"/><path d="m13.5 5-3 14"/>',
  server:   '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5v.1"/><path d="M7 16.5v.1"/>',
  filePdf:  '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M8.5 17v-3.4h1.2a1.2 1.2 0 0 1 0 2.4H8.5"/><path d="M13 17v-3.4h1a1.7 1.7 0 0 1 0 3.4Z"/>',

  /* التواصل */
  mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  whatsapp: '<path d="M3.5 20.5 5 16.3A8.3 8.3 0 1 1 8.2 19.4Z"/><path d="M9 9.5c.3 2 2.4 4.1 4.4 4.4l1-1.3 1.8.8-.3 1.5c-2.9.6-6.7-3.2-6.1-6.1l1.5-.3.8 1.8Z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17"/><path d="M8 7.2v.1"/><path d="M12 17v-3.7a2.3 2.3 0 0 1 4.5 0V17"/><path d="M12 10.5V17"/>',
  facebook: '<path d="M14.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5h1.3V5a19 19 0 0 0-2.1-.1c-2.3 0-3.9 1.4-3.9 4V11H9v3h2.4v7Z"/>',
  send:     '<path d="M21 3 3 10.5l7 3 3 7Z"/><path d="m10 13.5 4.5-4.5"/>',
  copy:     '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
  check:    '<path d="m5 13 4 4L19 7"/>',
  back:     '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
  database: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
};

const Icons = {
  /**
   * يُرجع كود SVG لأيقونة معينة.
   * @param {string} name اسم الأيقونة من ICON_PATHS
   */
  svg(name) {
    const path = ICON_PATHS[name];
    if (!path) return '';
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">${path}</svg>`;
  },

  /**
   * يبحث عن كل العناصر التي تحمل data-icon ويضع الأيقونة بداخلها.
   * يُستدعى بعد تحميل الصفحة وبعد أي محتوى يُبنى ديناميكيًا.
   * @param {ParentNode} root نطاق البحث (افتراضيًا كامل الصفحة)
   */
  render(root = document) {
    root.querySelectorAll('[data-icon]').forEach((el) => {
      const name = el.getAttribute('data-icon');
      if (name && !el.firstElementChild) el.innerHTML = Icons.svg(name);
    });
  },
};
