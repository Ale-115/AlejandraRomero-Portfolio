/* =====================================================================
   UX/UI CASE STUDY TEMPLATE — renderer
   Reads the project's content object (window.CASE_STUDY, defined in the
   project's content.js) and builds the page into <main id="case-study">.
   Sections or blocks without content are simply not rendered, so a
   project only shows what applies to it. See README.md for the schema.
   ===================================================================== */
(function () {
  const data = window.CASE_STUDY;
  const root = document.getElementById('case-study');
  if (!data || !root) return;

  const DRAFT = new URLSearchParams(location.search).has('draft');
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  // Canonical section order and default labels (the 12-part structure).
  const SECTION_ORDER = [
    ['overview', 'Project Overview'],
    ['challenge', 'The Challenge'],
    ['role', 'My Role & Collaboration'],
    ['research', 'Research & Discovery'],
    ['strategy', 'UX Strategy & Design Decisions'],
    ['architecture', 'Information Architecture & User Flows'],
    ['wireframes', 'Wireframes & Prototyping'],
    ['ui', 'UI Design & Design System'],
    ['final', 'Final Experience'],
    ['outcome', 'Outcome & Reflection']
  ];

  const STATUS = {
    implemented: ['Implemented', 'cs-status--implemented'],
    concept: ['Concept · Proposed design', ''],
    academic: ['Academic project · Concept', ''],
    progress: ['Work in progress', 'cs-status--progress'],
    'awaiting-dev': ['Design complete · Awaiting development', 'cs-status--progress']
  };

  // ── helpers ──
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function paras(body) {
    const wrap = el('div', 'cs-body');
    [].concat(body || []).forEach((p) => wrap.appendChild(el('p', null, p)));
    return wrap;
  }
  function list(items) {
    const ul = el('ul', 'cs-list');
    items.forEach((t) => ul.appendChild(el('li', null, t)));
    return ul;
  }
  // `src` is a base path like "assets/journey-map"; the -800/-1600 variants
  // are produced when images are optimized. A full filename also works.
  function picture(src, alt, sizes) {
    const img = el('img');
    img.alt = alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    if (/\.(jpe?g|png|webp|gif|svg)$/i.test(src)) {
      img.src = src;
    } else {
      img.src = src + '-1600.jpg';
      img.srcset = src + '-800.jpg 800w, ' + src + '-1600.jpg 1600w';
      img.sizes = sizes || '(max-width: 900px) 100vw, 1100px';
    }
    return img;
  }
  function figure(item, opts) {
    opts = opts || {};
    const fig = el('figure', 'cs-figure' + (opts.bleed ? ' cs-figure--bleed' : ''));
    const img = picture(item.src, item.alt, opts.sizes);
    if (item.zoom !== false) {
      img.classList.add('cs-zoom');
      img.dataset.full = /\.(jpe?g|png|webp)$/i.test(item.src) ? item.src : item.src + '-1600.jpg';
    }
    fig.appendChild(img);
    if (item.title || item.caption) {
      const cap = el('figcaption');
      if (item.title) cap.appendChild(el('strong', null, item.title));
      if (item.caption) cap.appendChild(document.createTextNode(item.caption));
      fig.appendChild(cap);
    }
    return fig;
  }
  function linkButton(l, i) {
    const a = el('a', 'hero-cta' + (i ? ' hero-cta-pink' : ''), l.label);
    a.href = l.href;
    if (/^https?:/.test(l.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    return a;
  }

  // ── blocks ──
  const BLOCKS = {
    text(b) {
      const n = el('div', 'cs-text' + (b.heading ? '' : ' cs-text--single'));
      if (b.heading) n.appendChild(el('h3', 'cs-h3', b.heading));
      const right = el('div');
      if (b.body) right.appendChild(paras(b.body));
      if (b.list) right.appendChild(list(b.list));
      n.appendChild(right);
      return n;
    },
    split(b) {
      const n = el('div', 'cs-split' + (b.reverse ? ' cs-split--reverse' : ''));
      n.appendChild(figure(b.image, { sizes: '(max-width: 900px) 100vw, 640px' }));
      const t = el('div');
      if (b.heading) t.appendChild(el('h3', 'cs-h3', b.heading));
      if (b.body) t.appendChild(paras(b.body));
      if (b.list) t.appendChild(list(b.list));
      n.appendChild(t);
      return n;
    },
    image(b) { return figure(b, { bleed: b.bleed, sizes: b.bleed ? '100vw' : undefined }); },
    gallery(b) {
      const n = el('div', 'cs-gallery' + (b.columns === 3 ? ' cs-gallery--3' : ''));
      b.items.forEach((it) => n.appendChild(figure(it, { sizes: '(max-width: 600px) 100vw, 540px' })));
      return n;
    },
    // Simple numbered workflow: { type: 'steps', heading?, items: [{ title, text?, tools? }] }
    steps(b) {
      const wrap = el('div');
      if (b.heading) { const h = el('h3', 'cs-h3', b.heading); h.style.marginBottom = '16px'; wrap.appendChild(h); }
      const ol = el('ol', 'cs-steps');
      b.items.forEach((s) => {
        const li = el('li', 'cs-step');
        li.appendChild(el('span', 'cs-step-title', s.title));
        if (s.text) li.appendChild(el('span', 'cs-step-text', s.text));
        if (s.tools) li.appendChild(el('span', 'cs-step-tools', s.tools));
        ol.appendChild(li);
      });
      wrap.appendChild(ol);
      return wrap;
    },
    // List of linked references: { type: 'sources', heading?, items: [{ label, href, note? }] }
    sources(b) {
      const wrap = el('div', 'cs-sources');
      if (b.heading) wrap.appendChild(el('h3', 'cs-h3', b.heading));
      const ol = el('ol', 'cs-sources-list');
      b.items.forEach((it) => {
        const li = el('li');
        const a = el('a', null, it.label);
        a.href = it.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
        li.appendChild(a);
        if (it.note) li.appendChild(el('span', 'cs-sources-note', ' — ' + it.note));
        ol.appendChild(li);
      });
      wrap.appendChild(ol);
      return wrap;
    },
    points(b) {
      const wrap = el('div');
      if (b.heading) { const h = el('h3', 'cs-h3', b.heading); h.style.marginBottom = '16px'; wrap.appendChild(h); }
      const ol = el('ol', 'cs-points');
      b.items.forEach((p) => {
        const li = el('li', 'cs-point');
        li.appendChild(el('span', 'cs-point-title', p.title));
        if (p.text) li.appendChild(el('span', 'cs-point-text', p.text));
        if (p.why) {
          const w = el('span', 'cs-point-why');
          w.appendChild(el('b', null, (p.whyLabel || 'Why') + ' — '));
          w.appendChild(document.createTextNode(p.why));
          li.appendChild(w);
        }
        ol.appendChild(li);
      });
      wrap.appendChild(ol);
      return wrap;
    },
    stats(b) {
      const wrap = el('div');
      const g = el('div', 'cs-stats');
      b.items.forEach((s) => {
        const c = el('div', 'cs-stat');
        c.appendChild(el('span', 'cs-stat-value', s.value));
        c.appendChild(el('span', 'cs-stat-label', s.label));
        g.appendChild(c);
      });
      wrap.appendChild(g);
      if (b.source) wrap.appendChild(el('p', 'cs-stats-source', b.source));
      return wrap;
    },
    callout(b) {
      const n = el('div', 'cs-callout tone-' + (b.tone || 'blue'));
      if (b.label) n.appendChild(el('span', 'cs-callout-label', b.label));
      n.appendChild(el('p', 'cs-callout-text', b.text));
      return n;
    },
    palette(b) {
      const wrap = el('div');
      if (b.heading) { const h = el('h3', 'cs-h3', b.heading); h.style.marginBottom = '16px'; wrap.appendChild(h); }
      const g = el('div', 'cs-palette');
      b.colors.forEach((c) => {
        const s = el('div', 'cs-swatch');
        const chip = el('div', 'cs-swatch-chip'); chip.style.background = c.hex;
        const info = el('div', 'cs-swatch-info');
        info.appendChild(el('span', 'cs-swatch-hex', c.hex));
        if (c.name) info.appendChild(el('span', 'cs-swatch-name', c.name));
        s.appendChild(chip); s.appendChild(info); g.appendChild(s);
      });
      wrap.appendChild(g);
      return wrap;
    },
    team(b) {
      const wrap = el('div');
      if (b.heading) { const h = el('h3', 'cs-h3', b.heading); h.style.marginBottom = '8px'; wrap.appendChild(h); }
      const ul = el('ul', 'cs-team');
      b.members.forEach((m) => {
        const li = el('li');
        const name = el('span', 'cs-team-name', m.name);
        if (m.me) name.appendChild(el('span', 'cs-team-you', 'Me'));
        li.appendChild(name);
        if (m.role) li.appendChild(el('span', 'cs-team-role', m.role));
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
      return wrap;
    },
    compare(b) {
      const n = el('div', 'cs-compare');
      [b.before, b.after].forEach((side, i) => {
        const col = el('div');
        col.appendChild(el('span', 'cs-compare-label', side.label || (i ? 'After' : 'Before')));
        col.appendChild(figure(side, { sizes: '(max-width: 600px) 100vw, 540px' }));
        n.appendChild(col);
      });
      return n;
    },
    // Figma prototype: embedded on larger screens, button on phones.
    prototype(b) {
      const wrap = el('div', 'cs-proto' + (b.bare ? ' cs-proto--bare' : ''));
      const head = el('div', 'cs-proto-head');
      const txt = el('div');
      txt.appendChild(el('h3', 'cs-h3', b.title || 'Interactive prototype'));
      if (b.caption) txt.appendChild(el('p', 'cs-proto-caption', b.caption));
      head.appendChild(txt);
      const btn = el('a', 'hero-cta', b.buttonLabel || 'Open in Figma ↗');
      btn.href = b.url; btn.target = '_blank'; btn.rel = 'noopener noreferrer';
      head.appendChild(btn);
      wrap.appendChild(head);
      const frame = el('div', 'cs-proto-frame');
      if (b.height) frame.style.height = b.height; // optional CSS height, e.g. 'min(70vh, 640px)'
      const iframe = el('iframe');
      const embed = embedUrl(b.url);
      iframe.src = embed;
      iframe.title = b.title || 'Interactive Figma prototype';
      iframe.loading = 'lazy';
      iframe.setAttribute('allowfullscreen', '');
      frame.appendChild(iframe);
      // Optional fit: { width, height } — render the page at its natural size
      // (e.g. a phone mockup) and scale it down to fit the frame.
      if (b.fit) {
        frame.classList.add('cs-proto-frame--fit');
        if (b.fit.background) frame.style.background = b.fit.background;
        fitFrame(frame, iframe, b.fit);
      }
      if (b.poster || /figma\.com\//.test(b.url)) addPoster(frame, iframe, typeof b.poster === 'string' ? { src: b.poster } : (b.poster || {}));
      wrap.appendChild(frame);
      return wrap;
    },
    todo(b) { return DRAFT ? el('div', 'cs-todo', b.note) : null; }
  };

  // Figma links are converted to the embed host; any other URL (e.g. a built
  // app inside the case study folder) is embedded as is.
  function embedUrl(url) {
    if (!/^https:\/\/(www\.)?figma\.com\//.test(url)) return url;
    let e = url.replace(/^https:\/\/(www\.)?figma\.com\//, 'https://embed.figma.com/')
               .replace(/[?&]show-proto-sidebar=1/, '');
    return e + (e.includes('?') ? '&' : '?') + 'embed-host=share&hide-ui=1';
  }
  // Render a fixed-size page (e.g. a phone mockup) and scale it to fit its frame.
  function fitFrame(frame, iframe, fit) {
    iframe.style.width = fit.width + 'px';
    iframe.style.height = fit.height + 'px';
    const scale = () => {
      const s = Math.min(1, frame.clientHeight / fit.height, frame.clientWidth / fit.width);
      iframe.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
    };
    if ('ResizeObserver' in window) new ResizeObserver(scale).observe(frame);
    window.addEventListener('resize', scale);
    requestAnimationFrame(scale);
  }
  // Poster shown over a prototype iframe until it has loaded. Figma fires
  // `load` before the prototype paints, so the poster stays a moment longer
  // and then fades out. A fallback timer removes it if `load` never fires.
  function addPoster(frame, iframe, opts) {
    const isFigma = /figma\.com\//.test(iframe.src);
    const cover = el('div', 'cs-poster' + (opts.src ? '' : ' cs-poster--plain'));
    if (opts.src) {
      const img = el('img');
      img.src = opts.src; img.alt = ''; img.decoding = 'async';
      if (opts.fit) img.style.objectFit = opts.fit;
      if (opts.background) cover.style.background = opts.background;
      cover.appendChild(img);
    }
    cover.appendChild(el('span', 'cs-poster-label', opts.label || 'Loading prototype…'));
    frame.appendChild(cover);
    let done = false;
    const hide = () => { if (done) return; done = true; cover.classList.add('is-hidden'); setTimeout(() => cover.remove(), 700); };
    iframe.addEventListener('load', () => setTimeout(hide, isFigma ? 1800 : 150));
    setTimeout(hide, 15000);
  }
  // Live app in the hero: hero.app = { url, fit: {width, height}, hint?, buttonLabel?, title? }
  function appStage(a) {
    const st = el('div', 'cs-hero-app');
    const frame = el('div', 'cs-hero-app-frame');
    const iframe = el('iframe');
    iframe.src = embedUrl(a.url);
    iframe.title = a.title || 'Interactive prototype';
    iframe.setAttribute('allowfullscreen', '');
    frame.appendChild(iframe);
    // Local pages with a fixed size are scaled with `fit`; Figma prototypes
    // scale themselves, so they simply fill the frame.
    if (a.fit) fitFrame(frame, iframe, a.fit);
    else frame.classList.add('cs-hero-app-frame--fill');
    if (a.poster || /figma\.com\//.test(a.url)) addPoster(frame, iframe, typeof a.poster === 'string' ? { src: a.poster } : (a.poster || {}));
    st.appendChild(frame);
    const bar = el('div', 'cs-hero-app-bar');
    bar.appendChild(el('span', 'cs-hero-app-hint', a.hint || 'Tap to try — it’s interactive'));
    const open = el('a', 'cs-hero-app-open', a.buttonLabel || 'Open full screen ↗');
    open.href = a.url; open.target = '_blank'; open.rel = 'noopener noreferrer';
    bar.appendChild(open);
    st.appendChild(bar);
    return st;
  }

  // ── hero ──
  function renderHero() {
    const h = data.hero || {};
    const sec = el('section', 'cs-hero');
    const wrap = el('div', 'cs-wrap');
    const back = el('a', 'cs-back', '← Back to Digital Experience');
    back.href = '../../index.html#work';
    wrap.appendChild(back);

    const head = el('div', 'cs-hero-head');
    const left = el('div');
    const badges = el('div', 'cs-badges');
    if (data.status && STATUS[data.status]) {
      const [label, cls] = STATUS[data.status];
      badges.appendChild(el('span', 'cs-status ' + cls, data.statusLabel || label));
    }
    // Optional award / recognition badge: hero.award = { label, href }
    if (h.award) {
      const aw = el(h.award.href ? 'a' : 'span', 'cs-award');
      if (h.award.href) aw.href = h.award.href;
      aw.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/><path d="m12 6.2.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 8.3l2-.3z" class="cs-award-star"/></svg>';
      aw.appendChild(document.createTextNode(h.award.label));
      badges.appendChild(aw);
    }
    if (badges.children.length) left.appendChild(badges);
    left.appendChild(el('h1', 'cs-title', data.title));
    if (h.statement) left.appendChild(el('p', 'cs-statement', h.statement));
    if (h.links && h.links.length) {
      const links = el('div', 'cs-links');
      h.links.forEach((l, i) => links.appendChild(linkButton(l, i)));
      left.appendChild(links);
    }
    head.appendChild(left);

    const meta = el('dl', 'cs-meta');
    const addMeta = (label, value, wide) => {
      if (!value || (Array.isArray(value) && !value.length)) return;
      const item = el('div', 'cs-meta-item' + (wide ? ' cs-meta-item--wide' : ''));
      item.appendChild(el('dt', 'cs-meta-label', label));
      const dd = el('dd', 'cs-meta-value');
      if (Array.isArray(value)) {
        const pills = el('div', 'cs-pills');
        value.forEach((v) => pills.appendChild(el('span', 'cs-pill', v)));
        dd.appendChild(pills);
      } else dd.textContent = value;
      item.appendChild(dd);
      meta.appendChild(item);
    };
    addMeta('Project type', h.type);
    addMeta('My role', h.role);
    addMeta('Timeline', h.timeline);
    addMeta('Team', h.team);
    addMeta('Tools', h.tools, true);
    if (h.app) {
      sec.classList.add('cs-hero--app');
      head.classList.add('cs-hero-head--app');
      left.appendChild(meta);
      head.appendChild(appStage(h.app));
    } else head.appendChild(meta);
    wrap.appendChild(head);

    if (h.image && !h.app) {
      const media = el('div', 'cs-hero-media');
      media.appendChild(picture(h.image, h.imageAlt || data.title, '(max-width: 1100px) 100vw, 1100px'));
      media.querySelector('img').loading = 'eager';
      wrap.appendChild(media);
    }
    sec.appendChild(wrap);
    return sec;
  }

  // ── sections ──
  function renderSections() {
    const frag = document.createDocumentFragment();
    const sections = data.sections || {};
    const tocItems = [];
    let n = 0;
    SECTION_ORDER.forEach(([id, defaultTitle]) => {
      const s = sections[id];
      if (!s) return;
      const blocks = (s.blocks || []).map((b) => BLOCKS[b.type] && BLOCKS[b.type](b)).filter(Boolean);
      if (!blocks.length && !s.intro) return; // never show an empty section
      n += 1;
      const sec = el('section', 'cs-section' + (n % 2 === 0 ? ' cs-section--tint' : ''));
      sec.id = id;
      const wrap = el('div', 'cs-wrap');
      const head = el('div', 'cs-section-head');
      const left = el('div');
      const kicker = el('p', 'section-kicker');
      kicker.appendChild(el('span', 'section-num', String(n).padStart(2, '0')));
      kicker.appendChild(document.createTextNode(s.kicker || defaultTitle));
      left.appendChild(kicker);
      left.appendChild(el('h2', 'section-title', s.title || defaultTitle));
      head.appendChild(left);
      if (s.intro) head.appendChild(el('p', 'cs-section-intro', s.intro));
      wrap.appendChild(head);
      if (blocks.length) {
        const list = el('div', 'cs-blocks');
        blocks.forEach((b) => { b.classList.add('cs-reveal'); list.appendChild(b); });
        wrap.appendChild(list);
      }
      sec.appendChild(wrap);
      frag.appendChild(sec);
      tocItems.push({ id, label: s.navLabel || s.kicker || defaultTitle });
    });
    // Optional sticky section index: data.nav = true
    if (data.nav && tocItems.length > 1) {
      const toc = el('nav', 'cs-toc');
      toc.setAttribute('aria-label', 'Case study sections');
      const inner = el('div', 'cs-toc-inner');
      const links = {};
      tocItems.forEach((t, i) => {
        const a = el('a', 'cs-toc-link');
        a.href = '#' + t.id;
        a.appendChild(el('span', 'cs-toc-num', String(i + 1).padStart(2, '0')));
        a.appendChild(document.createTextNode(t.label));
        inner.appendChild(a);
        links[t.id] = a;
      });
      toc.appendChild(inner);
      frag.insertBefore(toc, frag.firstChild);
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            Object.values(links).forEach((l) => l.removeAttribute('aria-current'));
            const a = links[e.target.id];
            if (a) { a.setAttribute('aria-current', 'true'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        requestAnimationFrame(() => tocItems.forEach((t) => { const sec = document.getElementById(t.id); if (sec) io.observe(sec); }));
      }
    }
    return frag;
  }

  // ── next / previous ──
  function renderNext() {
    const all = window.CASE_STUDY_PROJECTS || [];
    const idx = all.findIndex((p) => p.slug === data.slug);
    const live = (p) => p && p.page && p.slug !== data.slug;
    let prev = null, next = null;
    for (let i = 1; i < all.length && !(prev && next); i++) {
      if (!next && live(all[(idx + i) % all.length])) next = all[(idx + i) % all.length];
      if (!prev && live(all[(idx - i + all.length) % all.length])) prev = all[(idx - i + all.length) % all.length];
    }
    const sec = el('section', 'cs-next');
    const wrap = el('div', 'cs-wrap');
    if (prev || next) {
      const grid = el('div', 'cs-next-grid');
      [[prev, 'Previous project', ''], [next, 'Next project', ' cs-next-card--next']].forEach(([p, dir, mod]) => {
        if (!p || (p === prev && p === next && dir === 'Previous project')) { grid.appendChild(el('span')); return; }
        const a = el('a', 'cs-next-card tone-' + (p.tone || 'lilac') + mod);
        a.href = '../' + p.page + '/index.html';
        a.appendChild(el('span', 'cs-next-dir', dir));
        a.appendChild(el('span', 'cs-next-title', p.title));
        grid.appendChild(a);
      });
      wrap.appendChild(grid);
    }
    const back = el('div', 'cs-next-back');
    const a = el('a', 'hero-cta', 'Back to Digital Experience');
    a.href = '../../index.html#work';
    back.appendChild(a);
    wrap.appendChild(back);
    sec.appendChild(wrap);
    return sec;
  }

  // ── lightbox + reveal ──
  function enhance() {
    const box = el('div', 'cs-lightbox');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    const img = el('img');
    const close = el('button', 'cs-lightbox-close', '×');
    close.setAttribute('aria-label', 'Close image');
    box.appendChild(img); box.appendChild(close);
    document.body.appendChild(box);
    const shut = () => { box.classList.remove('is-open'); img.removeAttribute('src'); };
    box.addEventListener('click', shut);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') shut(); });
    root.addEventListener('click', (e) => {
      const t = e.target.closest('.cs-zoom');
      if (!t) return;
      img.src = t.dataset.full || t.currentSrc;
      img.alt = t.alt;
      box.classList.add('is-open');
      close.focus();
    });

    const targets = root.querySelectorAll('.cs-reveal');
    if (!('IntersectionObserver' in window)) { targets.forEach((t) => t.classList.add('is-visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    targets.forEach((t) => io.observe(t));
  }

  root.appendChild(renderHero());
  root.appendChild(renderSections());
  root.appendChild(renderNext());
  enhance();
})();
