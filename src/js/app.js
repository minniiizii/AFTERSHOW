// AFTERSHOW — App Core
// Router, state management, utilities

'use strict';

// ── Storage Manager ──────────────────────────────────────────
const Storage = {
  KEY_RECORDS: 'aftershow_records_v1',
  KEY_PREFS:   'aftershow_prefs_v1',

  getRecords() {
    try { return JSON.parse(localStorage.getItem(this.KEY_RECORDS) || '[]'); }
    catch { return []; }
  },
  saveRecords(records) {
    try { localStorage.setItem(this.KEY_RECORDS, JSON.stringify(records)); return true; }
    catch { return false; }
  },
  getPrefs() {
    try { return JSON.parse(localStorage.getItem(this.KEY_PREFS) || '{}'); }
    catch { return {}; }
  },
  savePrefs(prefs) {
    try { localStorage.setItem(this.KEY_PREFS, JSON.stringify(prefs)); }
    catch {}
  },
};

// ── Records Manager ──────────────────────────────────────────
const Records = {
  getAll() { return Storage.getRecords(); },

  getById(id) { return this.getAll().find(r => r.id === id) || null; },

  getByConcertId(concertId) { return this.getAll().find(r => r.concertId === concertId) || null; },

  save(record) {
    const records = this.getAll();
    const idx = records.findIndex(r => (record.id && r.id === record.id) || r.concertId === record.concertId);
    const now = new Date().toISOString();
    if (idx >= 0) {
      records[idx] = { ...records[idx], ...record, updatedAt: now };
    } else {
      records.push({ ...record, id: record.id || ('rec_' + Date.now()), createdAt: now, updatedAt: now });
    }
    const ok = Storage.saveRecords(records);
    if (!ok) throw new Error('저장에 실패했습니다.');
    return ok;
  },

  delete(id) {
    const records = this.getAll().filter(r => r.id !== id && r.concertId !== id);
    const ok = Storage.saveRecords(records);
    if (!ok) throw new Error('삭제에 실패했습니다.');
    return ok;
  },
};

// ── Concert Helpers ──────────────────────────────────────────
const Concerts = {
  getAll()       { return window.AFTERSHOW_DATA.CONCERTS; },
  getById(id)    { return this.getAll().find(c => c.id === id) || null; },
  getByVenue(id) { return this.getAll().filter(c => c.venueId === id); },

  getVenues()     { return window.AFTERSHOW_DATA.VENUES; },
  getVenueById(id){ return this.getVenues().find(v => v.id === id) || null; },
  
  formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
      }
    } catch {}
    return dateStr;
  },

  getPrimaryDate(concert) {
    return concert.dates && concert.dates.length > 0 ? concert.dates[0].date : '';
  },

  getPosterSrc(concert) {
    return concert.poster || null;
  },
};

// ── Router (Hash-first for absolute reliability in any host/port/preview) ──
const Router = {
  routes: {},
  currentRoute: null,

  register(path, handler) {
    const norm = path.startsWith('/') ? path : '/' + path;
    this.routes[norm] = handler;
  },

  getPath() {
    let raw = location.hash;
    if (raw && raw.startsWith('#')) {
      raw = raw.slice(1);
    }
    if (!raw || raw === '') {
      raw = location.pathname || '/';
    }
    const qIdx = raw.indexOf('?');
    if (qIdx !== -1) raw = raw.slice(0, qIdx);

    if (!raw.startsWith('/')) raw = '/' + raw;
    if (raw.length > 1 && raw.endsWith('/')) raw = raw.slice(0, -1);
    return raw;
  },

  navigate(path) {
    let norm = path.startsWith('/') ? path : '/' + path;
    if (location.hash !== '#' + norm) {
      location.hash = '#' + norm;
    } else {
      this.dispatch(norm);
    }
  },

  dispatch(path) {
    if (!path) path = this.getPath();

    // Close mobile nav
    document.getElementById('mobile-nav')?.classList.remove('open');
    document.querySelector('.nav-mobile-btn')?.classList.remove('open');

    // Exact match
    if (this.routes[path]) {
      this.currentRoute = path;
      this.updateNav(path);
      this.routes[path](path, {});
      return;
    }

    // Pattern match
    for (const pattern of Object.keys(this.routes)) {
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
      const m = path.match(regex);
      if (m) {
        const keys = [...pattern.matchAll(/:([^/]+)/g)].map(k => k[1]);
        const params = {};
        keys.forEach((k, i) => params[k] = decodeURIComponent(m[i + 1]));
        this.currentRoute = pattern;
        this.updateNav(path);
        this.routes[pattern](path, params);
        return;
      }
    }

    // 404 Fallback
    this.render404();
  },

  updateNav(path) {
    document.querySelectorAll('.main-nav a, .mobile-nav-drawer a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const cleanHref = href.replace(/^#/, '');
      const isActive = (path === '/' && cleanHref === '/') ||
                       (cleanHref !== '/' && path.startsWith(cleanHref));
      a.classList.toggle('active', isActive);
    });
  },

  render404() {
    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <div class="empty-state" style="padding:120px 24px">
          <div class="empty-state__icon">${Icons.concert(48)}</div>
          <div class="empty-state__title">페이지를 찾을 수 없습니다.</div>
          <div class="empty-state__desc">요청하신 페이지가 존재하지 않습니다.</div>
          <button class="btn btn-ghost" onclick="Router.navigate('/')">홈으로 돌아가기</button>
        </div>
      </div>`;
  },

  init() {
    window.addEventListener('hashchange', () => {
      this.dispatch(this.getPath());
    });

    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-route]');
      if (a) {
        e.preventDefault();
        const href = a.getAttribute('href') || '';
        const target = href.replace(/^#/, '') || '/';
        this.navigate(target);
      }
    });

    this.dispatch(this.getPath());
  },
};

// ── SVG Icons ────────────────────────────────────────────────
const Icons = {
  _svg: (d, size = 20) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`,

  concert: (s) => Icons._svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', s),
  archive: (s) => Icons._svg('<polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>', s),
  edit: (s)    => Icons._svg('<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>', s),
  trash: (s)   => Icons._svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>', s),
  search: (s)  => Icons._svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', s),
  arrowL: (s)  => Icons._svg('<polyline points="15 18 9 12 15 6"/>', s),
  arrowR: (s)  => Icons._svg('<polyline points="9 18 15 12 9 6"/>', s),
  grid: (s)    => Icons._svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', s),
  list: (s)    => Icons._svg('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>', s),
  check: (s)   => Icons._svg('<polyline points="20 6 9 17 4 12"/>', s),
  close: (s)   => Icons._svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', s),
  location: (s)=> Icons._svg('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>', s),
  calendar: (s)=> Icons._svg('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', s),
  image: (s)   => Icons._svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>', s),
  play: (s)    => Icons._svg('<polygon points="5 3 19 12 5 21 5 3"/>', s),
  link: (s)    => Icons._svg('<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>', s),
  stage: (s)   => Icons._svg('<rect x="2" y="14" width="20" height="8" rx="1"/><path d="M6 14V8"/><path d="M18 14V8"/><path d="M6 8h12"/><circle cx="12" cy="5" r="3"/>', s),
  music: (s)   => Icons._svg('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', s),
  external: (s)=> Icons._svg('<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>', s),
};

// ── Toast ────────────────────────────────────────────────────
const Toast = {
  show(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? Icons.check(16) : Icons.close(16);
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.25s ease reverse';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  },
};

// ── Poster Error Handler ──────────────────────────────────────
window.handlePosterError = function(img) {
  if (!img.dataset.retried) {
    img.dataset.retried = '1';
    const current = img.getAttribute('src') || '';
    if (current.startsWith('./')) {
      img.src = current.replace(/^\.\//, '/');
    } else if (current.startsWith('/')) {
      img.src = '.' + current;
    } else {
      img.src = './' + current;
    }
    return;
  }
  img.style.display = 'none';
  const parent = img.parentElement;
  if (parent && !parent.querySelector('.poster-placeholder')) {
    const ph = document.createElement('div');
    ph.className = 'poster-placeholder';
    ph.innerHTML = Icons.image(28) + '<span>포스터 준비 중</span>';
    parent.appendChild(ph);
  }
};

// ── Poster Image Rendering with Fallback ─────────────────────
function renderPoster(concert, className = '') {
  const src = Concerts.getPosterSrc(concert);
  if (!src) return `
    <div class="poster-wrapper ${className}">
      <div class="poster-placeholder">
        ${Icons.image(32)}
        <span>포스터 없음</span>
      </div>
    </div>`;
  const encodedSrc = encodeURI(src);
  return `
    <div class="poster-wrapper ${className}">
      <img src="${encodedSrc}" alt="${escHtml(concert.title)} 포스터" loading="lazy" onerror="handlePosterError(this)">
    </div>`;
}

function renderConcertCard(concert, hasRecord) {
  const d = concert.dates && concert.dates[0] ? concert.dates[0] : { date: '' };
  const dateStr = Concerts.formatDate(d.date);
  return `
    <div class="concert-card" tabindex="0" role="button"
         onclick="Router.navigate('/concerts/${concert.id}')"
         onkeydown="if(event.key==='Enter')Router.navigate('/concerts/${concert.id}')">
      <div class="concert-card__poster">
        ${renderPoster(concert)}
        <div class="concert-card__badge ${hasRecord ? 'concert-card__badge--recorded' : 'concert-card__badge--not-recorded'}">
          ${hasRecord ? 'RECORDED' : ''}
        </div>
      </div>
      <div class="concert-card__info">
        <div class="concert-card__artist">${escHtml(concert.artist)}</div>
        <div class="concert-card__title">${escHtml(concert.title)}</div>
        <div class="concert-card__meta">
          <span>${escHtml(dateStr)}</span>
          <span>${escHtml(concert.venueName)}</span>
        </div>
      </div>
    </div>`;
}

function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ── App Header & Nav ─────────────────────────────────────────
function initHeader() {
  const header = document.getElementById('app-header');
  if (header) {
    header.innerHTML = `
      <div class="header-inner">
        <a href="#/" data-route class="wordmark">AFTERSHOW</a>
        <nav class="main-nav" role="navigation" aria-label="주요 메뉴">
          <a href="#/" data-route>HOME</a>
          <a href="#/venues" data-route>VENUES</a>
          <a href="#/archive" data-route>MY ARCHIVE</a>
          <a href="#/search" data-route>SEARCH</a>
        </nav>
        <button class="nav-mobile-btn" aria-label="메뉴 열기/닫기" onclick="toggleMobileNav()">
          <span></span><span></span><span></span>
        </button>
      </div>`;
  }
  
  const drawer = document.getElementById('mobile-nav');
  if (drawer) {
    drawer.innerHTML = `
      <a href="#/" data-route onclick="closeMobileNav()">HOME</a>
      <a href="#/venues" data-route onclick="closeMobileNav()">VENUES</a>
      <a href="#/archive" data-route onclick="closeMobileNav()">MY ARCHIVE</a>
      <a href="#/search" data-route onclick="closeMobileNav()">SEARCH</a>`;
  }
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-mobile-btn');
  const open = drawer.classList.toggle('open');
  btn?.classList.toggle('open', open);
}
function closeMobileNav() {
  document.getElementById('mobile-nav')?.classList.remove('open');
  document.querySelector('.nav-mobile-btn')?.classList.remove('open');
}

// ── Expose globals ───────────────────────────────────────────
window.Router     = Router;
window.Records    = Records;
window.Concerts   = Concerts;
window.Storage    = Storage;
window.Toast      = Toast;
window.Icons      = Icons;
window.renderPoster = renderPoster;
window.renderConcertCard = renderConcertCard;
window.escHtml    = escHtml;
window.scrollTop  = scrollTop;
window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav  = closeMobileNav;
window.initHeader = initHeader;
