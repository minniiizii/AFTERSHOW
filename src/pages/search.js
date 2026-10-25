// AFTERSHOW — Page: SEARCH

(function() {
  let query = '';

  function render() {
    scrollTop();
    query = '';
    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="페이지 위치">
          <a href="#/" data-route>HOME</a>
          <span class="breadcrumb-sep">—</span>
          <span class="breadcrumb-current">SEARCH</span>
        </nav>

        <section class="page-section">
          <div style="margin-bottom:32px">
            <h1 style="font-family:var(--font-mono);font-size:clamp(20px,3vw,28px);font-weight:700;letter-spacing:0.04em;margin-bottom:8px">SEARCH</h1>
            <p style="font-size:13.5px;color:var(--color-text-muted)">공연명, 아티스트, 투어명, 공연장, 곡 제목으로 검색하세요.</p>
          </div>

          <div class="search-bar" style="max-width:640px;margin-bottom:36px">
            ${Icons.search(18)}
            <input type="search" class="search-input" id="search-input"
                   placeholder="Search concerts, artists, songs..."
                   value="${escHtml(query)}"
                   oninput="debounceSearch(this.value)"
                   onkeydown="if(event.key==='Enter')doSearch(this.value)"
                   autocomplete="off"
                   aria-label="검색어 입력">
          </div>

          <div id="search-results">
            ${renderInitial()}
          </div>
        </section>
      </div>`;

    // Focus search input
    setTimeout(() => document.getElementById('search-input')?.focus(), 100);

    let debounceTimer;
    window.debounceSearch = function(val) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => doSearch(val), 300);
    };
    window.doSearch = function(val) {
      query = val.trim();
      document.getElementById('search-results').innerHTML = performSearch(query);
    };
  }

  function renderInitial() {
    const concerts = Concerts.getAll();
    // Show all concerts as initial state sorted by newest
    const sorted = [...concerts].sort((a,b) => Concerts.getPrimaryDate(b) > Concerts.getPrimaryDate(a) ? 1 : -1);
    return `
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:16px">
        전체 공연 — ${concerts.length}개
      </div>
      <div class="concert-grid">
        ${sorted.map(c => renderConcertCard(c, !!Records.getByConcertId(c.id))).join('')}
      </div>`;
  }

  function performSearch(q) {
    if (!q) return renderInitial();

    const concerts = Concerts.getAll();
    const lower = q.toLowerCase();

    const results = concerts.filter(c => {
      // Search: title, artist, tourName, venueName, setlist titles
      if (c.title.toLowerCase().includes(lower)) return true;
      if (c.artist.toLowerCase().includes(lower)) return true;
      if (c.tourName && c.tourName.toLowerCase().includes(lower)) return true;
      if (c.venueName.toLowerCase().includes(lower)) return true;
      if (c.venueNameEn && c.venueNameEn.toLowerCase().includes(lower)) return true;
      // Search setlist
      if (c.setlist && c.setlist.some(s =>
        s.title.toLowerCase().includes(lower) ||
        (s.artistOrPerformer && s.artistOrPerformer.toLowerCase().includes(lower))
      )) return true;
      return false;
    });

    if (results.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state__icon">${Icons.search(40)}</div>
          <div class="empty-state__title">검색 결과가 없습니다.</div>
          <div class="empty-state__desc">"${escHtml(q)}"에 대한 결과를 찾을 수 없습니다.</div>
        </div>`;
    }

    const sorted = [...results].sort((a,b) => Concerts.getPrimaryDate(b) > Concerts.getPrimaryDate(a) ? 1 : -1);
    return `
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:16px">
        "${escHtml(q)}" — ${results.length}개 결과
      </div>
      <div class="concert-grid">
        ${sorted.map(c => renderSearchResult(c, q)).join('')}
      </div>`;
  }

  function renderSearchResult(concert, q) {
    const hasRecord = !!Records.getByConcertId(concert.id);
    const lower = q.toLowerCase();

    // Check if result is from setlist
    const matchedSongs = concert.setlist
      ? concert.setlist.filter(s => s.title.toLowerCase().includes(lower))
      : [];

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
            <span>${escHtml(Concerts.formatDate(Concerts.getPrimaryDate(concert)))}</span>
            <span>${escHtml(concert.venueName)}</span>
          </div>
          ${matchedSongs.length > 0 ? `
            <div style="margin-top:6px;font-family:var(--font-mono);font-size:10px;color:var(--color-accent-secondary)">
              ♪ ${matchedSongs.slice(0,2).map(s => escHtml(s.title)).join(', ')}${matchedSongs.length > 2 ? ` +${matchedSongs.length - 2}` : ''}
            </div>` : ''}
        </div>
      </div>`;
  }

  window.PageSearch = { render };
})();
