/* ==========================================================================
   markdown.js
   محوّل Markdown → HTML صغير ومكتوب يدويًا (بدون أي مكتبة خارجية).

   يدعم:
     # العناوين (h1 … h6)
     الفقرات
     **عريض**  *مائل*  ~~مشطوب~~  `كود مضمّن`
     - القوائم النقطية   و   1. القوائم المرقمة  (مع تداخل بمسافتين)
     ```code blocks```  مع اسم اللغة
     > الاقتباسات
     ---  الفواصل
     [روابط](url)  و  ![صور](url)
     الجداول  | a | b |

   الاستخدام:  Markdown.toHTML(markdownText)
   ملاحظة أمان: يتم تهريب أي HTML داخل الملف قبل التحويل.
   ========================================================================== */

const Markdown = (() => {
  const PLACEHOLDER = '\u0000';

  /* نُهرّب < و & و " فقط. علامة > تُترك كما هي لأنها آمنة كنص،
     ولأن تهريبها يمنع التعرّف على أسطر الاقتباس (> quote). */
  function escapeHTML(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/"/g, '&quot;');
  }

  /* ---------- التنسيقات داخل السطر ---------- */
  function inline(text) {
    const codes = [];

    // الكود المضمّن أولاً حتى لا تتأثر رموزه ببقية القواعد
    text = text.replace(/`([^`]+)`/g, (match, code) => {
      codes.push(code);
      return `${PLACEHOLDER}${codes.length - 1}${PLACEHOLDER}`;
    });

    text = text
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,
        '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/~~([^~]+)~~/g, '<del>$1</del>');

    return text.replace(
      new RegExp(`${PLACEHOLDER}(\\d+)${PLACEHOLDER}`, 'g'),
      (match, index) => `<code>${codes[index]}</code>`
    );
  }

  /* ---------- الجداول ---------- */
  function isTableSeparator(line) {
    return /^\s*\|?[\s:-]*-{2,}[\s:|-]*\|?\s*$/.test(line) && line.includes('-');
  }

  function splitRow(line) {
    return line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  }

  function buildTable(lines, start) {
    const header = splitRow(lines[start]);
    const rows = [];
    let index = start + 2;

    while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
      rows.push(splitRow(lines[index]));
      index += 1;
    }

    const head = header.map((cell) => `<th>${inline(cell)}</th>`).join('');
    const body = rows
      .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`)
      .join('');

    return {
      html: `<div class="md-table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`,
      next: index,
    };
  }

  /* ---------- التحويل الكامل ---------- */
  function toHTML(markdown) {
    if (!markdown) return '';

    const lines = escapeHTML(markdown.replace(/\r\n/g, '\n')).split('\n');
    const out = [];
    const listStack = [];   // لتتبع القوائم المتداخلة
    let paragraph = [];
    let index = 0;

    function closeParagraph() {
      if (!paragraph.length) return;
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }

    function closeLists(toDepth = 0) {
      while (listStack.length > toDepth) {
        out.push(`</${listStack.pop().tag}>`);
      }
    }

    while (index < lines.length) {
      const line = lines[index];
      const trimmed = line.trim();

      /* كتلة كود */
      if (/^\s*```/.test(line)) {
        closeParagraph();
        closeLists();
        const language = trimmed.replace(/`/g, '').trim();
        const code = [];
        index += 1;
        while (index < lines.length && !/^\s*```/.test(lines[index])) {
          code.push(lines[index]);
          index += 1;
        }
        index += 1;
        out.push(
          `<pre class="md-code"${language ? ` data-lang="${language}"` : ''}><code>${code.join('\n')}</code></pre>`
        );
        continue;
      }

      /* سطر فارغ */
      if (trimmed === '') {
        closeParagraph();
        closeLists();
        index += 1;
        continue;
      }

      /* جدول */
      if (trimmed.includes('|') && index + 1 < lines.length && isTableSeparator(lines[index + 1])) {
        closeParagraph();
        closeLists();
        const table = buildTable(lines, index);
        out.push(table.html);
        index = table.next;
        continue;
      }

      /* فاصل */
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
        closeParagraph();
        closeLists();
        out.push('<hr>');
        index += 1;
        continue;
      }

      /* عنوان */
      const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        closeParagraph();
        closeLists();
        const level = heading[1].length;
        out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        index += 1;
        continue;
      }

      /* اقتباس */
      if (/^\s*>\s?/.test(line)) {
        closeParagraph();
        closeLists();
        const quote = [];
        while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
          quote.push(lines[index].replace(/^\s*>\s?/, ''));
          index += 1;
        }
        out.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`);
        continue;
      }

      /* عناصر القوائم */
      const bullet = line.match(/^(\s*)[-*+]\s+(.*)$/);
      const numbered = line.match(/^(\s*)\d+[.)]\s+(.*)$/);
      const item = bullet || numbered;

      if (item) {
        closeParagraph();
        const depth = Math.floor(item[1].length / 2) + 1;
        const tag = bullet ? 'ul' : 'ol';

        closeLists(depth);
        if (listStack.length < depth) {
          listStack.push({ tag });
          out.push(`<${tag}>`);
        }

        out.push(`<li>${inline(item[2])}</li>`);
        index += 1;
        continue;
      }

      /* فقرة عادية */
      closeLists();
      paragraph.push(trimmed);
      index += 1;
    }

    closeParagraph();
    closeLists();
    return out.join('\n');
  }

  return { toHTML };
})();
