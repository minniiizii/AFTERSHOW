// AFTERSHOW — Page: VENUES & VENUE DETAIL

(function() {
  // ── Venues List ─────────────────────────────────────────────
  function renderVenues() {
    scrollTop();
    const venues = Concerts.getVenues();
    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="페이지 위치">
          <a href="#/" data-route>HOME</a>
          <span class="breadcrumb-sep">—</span>
          <span class="breadcrumb-current">VENUES</span>
        </nav>

        <section class="page-section">
          <div class="section-header">
            <span class="section-title">VENUES</span>
            <span class="section-count">${venues.length} 곳</span>
          </div>
          <div class="venue-grid">
            ${venues.map(v => renderVenueCard(v)).join('')}
          </div>
        </section>
      </div>`;
  }

  function renderVenueCard(venue) {
    const venueConcerts = Concerts.getByVenue(venue.id);
    const previewPosters = venueConcerts.slice(0, 5)
      .map(c => Concerts.getPosterSrc(c)).filter(Boolean);
    return `
      <div class="venue-card" tabindex="0" role="button"
           onclick="Router.navigate('/venues/${venue.id}')"
           onkeydown="if(event.key==='Enter')Router.navigate('/venues/${venue.id}')">
        <div>
          <div class="venue-card__name">${escHtml(venue.name)}</div>
          <div class="venue-card__address">${Icons.location(13)} ${escHtml(venue.address)}</div>
        </div>
        <div class="venue-card__count">
          <strong>${venueConcerts.length}</strong><br>등록된 공연
        </div>
        ${previewPosters.length > 0 ? `
          <div class="venue-card__posters">
            ${previewPosters.map(src =>
              `<img class="venue-card__mini-poster" src="${src}" alt="" loading="lazy" onerror="this.style.display='none'">`
            ).join('')}
          </div>` : ''}
        <div class="venue-card__arrow">EXPLORE ${Icons.arrowR(14)}</div>
      </div>`;
  }

  // ── Venue Detail ─────────────────────────────────────────────
  function renderVenueDetail(venueId) {
    scrollTop();
    const venue = Concerts.getVenueById(venueId);
    if (!venue) { Router.render404(); return; }

    let concerts   = Concerts.getByVenue(venueId);
    const allYears = [...new Set(concerts.map(c => Concerts.getPrimaryDate(c).slice(0, 4)).filter(Boolean))].sort().reverse();

    let filterYear = null;
    let sortOrder  = 'newest';

    function getSorted(cs) {
      const sorted = [...cs];
      if (sortOrder === 'newest') sorted.sort((a,b) => Concerts.getPrimaryDate(b) > Concerts.getPrimaryDate(a) ? 1 : -1);
      else if (sortOrder === 'oldest') sorted.sort((a,b) => Concerts.getPrimaryDate(a) > Concerts.getPrimaryDate(b) ? 1 : -1);
      else sorted.sort((a,b) => a.title.localeCompare(b.title, 'ko'));
      return sorted;
    }

    function renderGrid() {
      let filtered = filterYear ? concerts.filter(c => Concerts.getPrimaryDate(c).startsWith(filterYear)) : concerts;
      filtered = getSorted(filtered);
      const grid = document.getElementById('venue-concert-grid');
      grid.innerHTML = filtered.map(c =>
        renderConcertCard(c, !!Records.getByConcertId(c.id))
      ).join('') || `<div class="empty-state"><div class="empty-state__title">해당 조건의 공연이 없습니다.</div></div>`;
      document.getElementById('venue-count').textContent = `${filtered.length}개 공연`;
    }

    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="페이지 위치">
          <a href="#/" data-route>HOME</a>
          <span class="breadcrumb-sep">—</span>
          <a href="#/venues" data-route>VENUES</a>
          <span class="breadcrumb-sep">—</span>
          <span class="breadcrumb-current">${escHtml(venue.name)}</span>
        </nav>

        <section class="page-section">
          <div style="margin-bottom:32px">
            <h1 style="font-family:var(--font-mono);font-size:clamp(20px,3vw,28px);font-weight:700;letter-spacing:0.04em;margin-bottom:6px">${escHtml(venue.name)}</h1>
            <div style="font-size:13.5px;color:var(--color-text-muted)">${Icons.location(14)} ${escHtml(venue.address)}</div>
          </div>

          <!-- Filter Bar -->
          <div class="filter-bar">
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;color:var(--color-text-muted);margin-right:4px">YEAR</div>
            <button class="filter-chip active" id="year-all" onclick="setYearFilter(null)">ALL</button>
            ${allYears.map(y => `<button class="filter-chip" id="year-${y}" onclick="setYearFilter('${y}')">${y}</button>`).join('')}
            <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
              <label for="sort-select" class="sr-only">정렬</label>
              <select class="sort-select" id="sort-select" onchange="setSort(this.value)">
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="title">공연명순</option>
              </select>
            </div>
          </div>

          <div class="section-header">
            <span class="section-title">${escHtml(venue.name)}</span>
            <span class="section-count" id="venue-count">${concerts.length}개 공연</span>
          </div>
          <div class="concert-grid" id="venue-concert-grid">
            ${getSorted(concerts).map(c => renderConcertCard(c, !!Records.getByConcertId(c.id))).join('')}
          </div>
        </section>
      </div>`;

    window.setYearFilter = function(year) {
      filterYear = year;
      document.querySelectorAll('.filter-chip').forEach(el => el.classList.remove('active'));
      document.getElementById(year ? `year-${year}` : 'year-all')?.classList.add('active');
      renderGrid();
    };
    window.setSort = function(val) { sortOrder = val; renderGrid(); };
  }

  window.PageVenues = { renderVenues, renderVenueDetail };
})();
