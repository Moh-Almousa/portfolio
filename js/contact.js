/* ==========================================================================
   contact.js
   قسم التواصل: بناء معلومات الاتصال + التحقق من النموذج + إرساله.

   لا تعدّل هذا الملف لتغيير بريدك أو روابطك — عدّل js/data/contact.js
   ========================================================================== */

const Contact = (() => {
  let form = null;
  let statusEl = null;
  let infoEl = null;

  function isMissing(url) {
    return !url || /^YOUR_/i.test(String(url).trim());
  }

  function serviceReady() {
    if (CONTACT_FORM.service === 'web3forms') return !isMissing(CONTACT_FORM.accessKey);
    if (CONTACT_FORM.service === 'formspree') return !isMissing(CONTACT_FORM.endpoint);
    return false;
  }

  /* ---------- معلومات الاتصال ---------- */
  function renderInfo() {
    if (!infoEl) return;

    const rows = [
      `<li class="contact-row">
         <span class="contact-row__icon" data-icon="mail"></span>
         <span class="contact-row__body">
           <small>${I18N.t('contact.emailLabel')}</small>
           <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
         </span>
       </li>`,
      `<li class="contact-row">
         <span class="contact-row__icon" data-icon="whatsapp"></span>
         <span class="contact-row__body">
           <small>${I18N.t('contact.whatsappLabel')}</small>
           <a href="https://wa.me/${CONTACT.whatsapp.number}" target="_blank" rel="noopener noreferrer">
             ${CONTACT.whatsapp.display}
           </a>
         </span>
       </li>`,
    ].join('');

    const social = CONTACT.social
      .map((item) => {
        if (isMissing(item.url)) {
          return `<li>
            <span class="social-btn is-missing" aria-disabled="true"
                  title="${I18N.t('contact.linkMissing')}">
              <span data-icon="${item.icon}"></span>
              <span class="sr-only">${item.label} — ${I18N.t('contact.linkMissing')}</span>
            </span>
          </li>`;
        }
        return `<li>
          <a class="social-btn" href="${item.url}" target="_blank" rel="noopener noreferrer"
             aria-label="${item.label}">
            <span data-icon="${item.icon}"></span>
          </a>
        </li>`;
      })
      .join('');

    infoEl.innerHTML = `
      <ul class="contact-rows">${rows}</ul>
      <p class="contact-info__socialLabel">${I18N.t('contact.socialLabel')}</p>
      <ul class="contact-social">${social}</ul>`;

    Icons.render(infoEl);
  }

  /* ---------- التحقق من المدخلات ---------- */
  function setError(field, messageKey) {
    const wrap = field.closest('.field');
    const error = wrap.querySelector('.field__error');
    if (messageKey) {
      field.setAttribute('aria-invalid', 'true');
      error.textContent = I18N.t(messageKey);
      wrap.classList.add('has-error');
    } else {
      field.removeAttribute('aria-invalid');
      error.textContent = '';
      wrap.classList.remove('has-error');
    }
  }

  function validate() {
    let valid = true;
    const fields = form.querySelectorAll('input, textarea');

    fields.forEach((field) => {
      const value = field.value.trim();

      if (!value) {
        setError(field, 'contact.errorRequired');
        valid = false;
        return;
      }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        setError(field, 'contact.errorEmail');
        valid = false;
        return;
      }
      setError(field, null);
    });

    return valid;
  }

  /* ---------- الرسائل ---------- */
  function setStatus(messageKey, type) {
    statusEl.textContent = messageKey ? I18N.t(messageKey) : '';
    statusEl.className = `form__status ${type ? `form__status--${type}` : ''}`;
  }

  /* ---------- الحل البديل: فتح برنامج البريد ---------- */
  function openMailClient(data) {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `${data.name} <${data.email}>\n\n${data.message}`
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }

  /* ---------- الإرسال ---------- */
  async function send(data) {
    if (CONTACT_FORM.service === 'formspree') {
      return fetch(CONTACT_FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
    }

    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: CONTACT_FORM.accessKey,
        subject: data.subject,
        name: data.name,
        email: data.email,
        message: data.message,
        /* اسم المُرسِل في صندوق بريدك بدل "Notifications" الافتراضي */
        from_name: 'Portfolio — Contact Form',
        /* الرد يذهب إلى بريد الزائر */
        replyto: data.email,
      }),
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      setStatus('contact.errorCheck', 'error');
      return;
    }

    /* ملاحظة: form.name تُرجع اسم الفورم نفسه وليس الحقل،
       لذلك نقرأ الحقول من form.elements */
    const value = (fieldName) => form.elements[fieldName].value.trim();

    const data = {
      name: value('name'),
      email: value('email'),
      subject: value('subject'),
      message: value('message'),
    };

    // الخدمة غير مفعّلة بعد → لا ندّعي أن الرسالة أُرسلت
    if (!serviceReady()) {
      setStatus('contact.notConfigured', 'warn');
      openMailClient(data);
      return;
    }

    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    setStatus('contact.sending', null);

    try {
      const response = await send(data);

      /* الخدمة قد تُرجع 200 مع success:false، لذلك نقرأ الجسم ولا نكتفي بالحالة */
      const result = await response.json().catch(() => null);
      if (!response.ok || (result && result.success === false)) {
        throw new Error((result && result.message) || `HTTP ${response.status}`);
      }

      form.reset();
      setStatus('contact.success', 'ok');
    } catch (error) {
      console.error('[contact] send failed:', error.message);
      setStatus('contact.errorSend', 'error');
    } finally {
      button.disabled = false;
    }
  }

  function init() {
    form = document.getElementById('contactForm');
    infoEl = document.getElementById('contactInfo');
    if (!form || !infoEl) return;

    statusEl = document.getElementById('contactStatus');

    renderInfo();
    form.addEventListener('submit', onSubmit);

    // مسح رسالة الخطأ أثناء الكتابة
    form.addEventListener('input', (event) => {
      if (event.target.matches('input, textarea')) setError(event.target, null);
    });

    window.addEventListener('languagechanged', () => {
      renderInfo();
      setStatus(null, null);
      form.querySelectorAll('input, textarea').forEach((field) => setError(field, null));
    });
  }

  return { init };
})();
