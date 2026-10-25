// AFTERSHOW — Page: MY ARCHIVE

(function() {
  let viewMode = 'list'; // 'list' | 'grid'

  function render() {
    scrollTop();
    const prefs = Storage.getPrefs();
    viewMode = prefs.archiveViewMode || 'list';

    renderPage();
  }

  function renderPage() {
    const records = Records.getAll();
    const concertMap = {};
    Concerts.getAll().forEach(c => { concertMap[c.id] = c; });

    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="페이지 위치">
          <a href="#/" data-route>HOME</a>
          <span class="breadcrumb-sep">—</span>
          <span class="breadcrumb-current">MY ARCHIVE</span>
        </nav>

        <section class="page-section">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
            <div>
              <h1 style="font-family:var(--font-mono);font-size:clamp(20px,3vw,28px);font-weight:700;letter-spacing:0.04em;margin-bottom:4px">MY ARCHIVE</h1>
              <p style="font-size:13.5px;color:var(--color-text-muted)">나의 공연 기록을 한곳에서 확인합니다.</p>
            </div>
            ${records.length > 0 ? `
              <div class="view-toggle" role="group" aria-label="보기 방식">
                <button class="view-toggle-btn ${viewMode==='list'?'active':''}" onclick="setViewMode('list')" title="리스트 보기" aria-pressed="${viewMode==='list'}">${Icons.list(16)}</button>
                <button class="view-toggle-btn ${viewMode==='grid'?'active':''}" onclick="setViewMode('grid')" title="그리드 보기" aria-pressed="${viewMode==='grid'}">${Icons.grid(16)}</button>
              </div>` : ''}
          </div>

          ${records.length === 0 ? renderEmpty() : renderRecords(records, concertMap)}
        </section>
      </div>`;

    window.setViewMode = function(mode) {
      viewMode = mode;
      const prefs = Storage.getPrefs();
      Storage.savePrefs({ ...prefs, archiveViewMode: mode });
      document.querySelectorAll('.view-toggle-btn').forEach(b => {
        const m = b.getAttribute('title').includes('리스트') ? 'list' : 'grid';
        b.classList.toggle('active', m === mode);
        b.setAttribute('aria-pressed', String(m === mode));
      });
      const container = document.getElementById('archive-records');
      if (!container) return;
      if (mode === 'grid') {
        container.className = 'archive-grid';
        container.innerHTML = Records.getAll().map(r => {
          const c = Concerts.getById(r.concertId);
          return c ? renderGridCard(r, c) : '';
        }).filter(Boolean).join('');
      } else {
        container.className = 'archive-list';
        container.innerHTML = Records.getAll().map(r => {
          const c = Concerts.getById(r.concertId);
          return c ? renderListCard(r, c) : '';
        }).filter(Boolean).join('');
      }
    };
  }

  function renderEmpty() {
    return `
      <div class="empty-state">
        <div class="empty-state__icon">${Icons.archive(48)}</div>
        <div class="empty-state__title">아직 저장된 공연 기록이 없습니다.</div>
        <div class="empty-state__desc">기억하고 싶은 첫 번째 공연을 기록해 보세요.</div>
        <button class="btn btn-primary" onclick="Router.navigate('/venues')">CREATE MY FIRST RECORD</button>
      </div>`;
  }

  function renderRecords(records, concertMap) {
    const sorted = [...records].sort((a,b) => b.updatedAt > a.updatedAt ? 1 : -1);

    if (viewMode === 'grid') {
      return `
        <div class="archive-grid" id="archive-records">
          ${sorted.map(r => {
            const c = concertMap[r.concertId];
            return c ? renderGridCard(r, c) : '';
          }).filter(Boolean).join('')}
        </div>`;
    }
    return `
      <div class="archive-list" id="archive-records">
        ${sorted.map(r => {
          const c = concertMap[r.concertId];
          return c ? renderListCard(r, c) : '';
        }).filter(Boolean).join('')}
      </div>`;
  }

  function renderListCard(record, concert) {
    const dateStr = Concerts.formatDate(Concerts.getPrimaryDate(concert));
    const updatedStr = new Date(record.updatedAt).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
    const src = Concerts.getPosterSrc(concert);
    const posterHtml = src
      ? `<img class="record-card__poster" src="${src}" alt="${escHtml(concert.title)} 포스터" loading="lazy" onerror="this.style.display='none'">`
      : `<div class="record-card__poster" style="display:flex;align-items:center;justify-content:center;background:var(--color-bg-secondary);color:var(--color-text-muted)">${Icons.image(24)}</div>`;
    return `
      <div class="record-card" tabindex="0" role="button"
           onclick="Router.navigate('/concerts/${concert.id}')"
           onkeydown="if(event.key==='Enter')Router.navigate('/concerts/${concert.id}')">
        ${posterHtml}
        <div class="record-card__body">
          <div class="record-card__artist">${escHtml(concert.artist)}</div>
          <div class="record-card__title">${record.customTitle ? escHtml(record.customTitle) : escHtml(concert.title)}</div>
          <div class="record-card__meta">
            <span>${Icons.calendar(11)} ${escHtml(dateStr)}</span>
            <span>${Icons.location(11)} ${escHtml(concert.venueName)}</span>
            <span style="color:var(--color-text-muted)">기록: ${escHtml(updatedStr)}</span>
          </div>
          ${record.memo ? `<div class="record-card__memo">${escHtml(record.memo)}</div>` : ''}
          ${record.favSong ? `<div style="margin-top:8px;font-family:var(--font-mono);font-size:10.5px;color:var(--color-accent-primary)">★ ${escHtml(record.favSong)}</div>` : ''}
        </div>
        <div style="padding:12px;display:flex;flex-direction:column;gap:6px;align-items:flex-end;justify-content:flex-start;flex-shrink:0">
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();openRecordModal('${escHtml(concert.id)}')" aria-label="기록 수정">
            ${Icons.edit(13)}
          </button>
        </div>
      </div>`;
  }

  function renderGridCard(record, concert) {
    const dateStr = Concerts.formatDate(Concerts.getPrimaryDate(concert));
    return `
      <div class="concert-card" tabindex="0" role="button"
           onclick="Router.navigate('/concerts/${concert.id}')"
           onkeydown="if(event.key==='Enter')Router.navigate('/concerts/${concert.id}')">
        <div class="concert-card__poster">
          ${renderPoster(concert)}
          <div class="concert-card__badge concert-card__badge--recorded">RECORDED</div>
        </div>
        <div class="concert-card__info">
          <div class="concert-card__artist">${escHtml(concert.artist)}</div>
          <div class="concert-card__title">${record.customTitle ? escHtml(record.customTitle) : escHtml(concert.title)}</div>
          <div class="concert-card__meta">
            <span>${escHtml(dateStr)}</span>
            <span>${escHtml(concert.venueName)}</span>
          </div>
        </div>
      </div>`;
  }

  window.PageArchive = { render };
})();
