// AFTERSHOW — Page: HOME

(function() {
  function render() {
    scrollTop();
    const concerts = Concerts.getAll();
    const records  = Records.getAll();
    const venues   = Concerts.getVenues();

    const recordCount = records.length;
    const visitedVenues = [...new Set(records.map(r => {
      const c = Concerts.getById(r.concertId);
      return c ? c.venueId : null;
    }).filter(Boolean))].length;

    const recentRecords = [...records].sort((a,b) => b.updatedAt > a.updatedAt ? 1 : -1).slice(0, 4);

    document.getElementById('app-content').innerHTML = `
      <!-- HERO -->
      <section class="hero">
        <div class="container">
          <div class="hero__wordmark">AFTERSHOW</div>
          <div class="hero__slogan">The show ends. The memory stays.</div>
          <div class="hero__desc">공연이 끝난 뒤에도 그날의 무대와 기억을 기록하고 다시 꺼내 볼 수 있는 개인 콘서트 아카이브.</div>
        </div>
      </section>

      <!-- PERSONAL ARCHIVE SUMMARY -->
      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <span class="section-title">MY ARCHIVE</span>
          </div>

          <!-- Stats Row -->
          <div class="stats-row" style="background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-md);padding:24px 28px;margin-bottom:24px;align-items:center">
            <div class="stat-item">
              <div class="stat-value" style="color:var(--color-text-secondary)">${concerts.length}</div>
              <div class="stat-label">등록된 공연</div>
            </div>
            <div style="width:1px;height:36px;background:var(--color-border)"></div>
            <div class="stat-item">
              <div class="stat-value">${recordCount}</div>
              <div class="stat-label">개인 기록 수</div>
            </div>
            <div style="width:1px;height:36px;background:var(--color-border)"></div>
            <div class="stat-item">
              <div class="stat-value">${visitedVenues}</div>
              <div class="stat-label">방문한 공연장</div>
            </div>
            <div style="margin-left:auto;display:flex;gap:10px">
              <button class="btn btn-primary btn-sm" onclick="openSelectConcertModal()">
                ${Icons.edit(13)} WRITE RECORD
              </button>
              ${recordCount > 0 ? `
                <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/archive')">
                  MY ARCHIVE →
                </button>` : ''}
            </div>
          </div>

          ${recordCount === 0 ? renderEmptyArchive() : renderRecentRecords(recentRecords)}
        </div>
      </section>

      <!-- VENUES -->
      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <span class="section-title">VENUES</span>
            <span class="section-count">${venues.length} 곳</span>
          </div>
          <div class="venue-grid">
            ${venues.map(v => renderVenueCard(v)).join('')}
          </div>
        </div>
      </section>

      <!-- CONCERTS -->
      <section class="page-section">
        <div class="container">
          <div class="section-header">
            <span class="section-title">CONCERTS</span>
            <span class="section-count">${concerts.length}개 공연</span>
          </div>
          <div class="concert-grid">
            ${[...concerts]
              .sort((a,b) => Concerts.getPrimaryDate(b) > Concerts.getPrimaryDate(a) ? 1 : -1)
              .slice(0, 8)
              .map(c => renderConcertCard(c, !!Records.getByConcertId(c.id))).join('')}
          </div>
          ${concerts.length > 8 ? `
            <div style="margin-top:28px;text-align:center">
              <button class="btn btn-secondary" onclick="Router.navigate('/venues')">전체 공연 보기</button>
            </div>` : ''}
        </div>
      </section>`;
  }

  function renderEmptyArchive() {
    return `
      <div class="empty-state" style="padding:48px 24px;align-items:flex-start;text-align:left;background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-md)">
        <div class="empty-state__title">아직 기록된 공연이 없습니다.</div>
        <div class="empty-state__desc" style="margin-bottom:16px">첫 번째 공연의 기억을 기록해 보세요.</div>
        <button class="btn btn-primary" onclick="openSelectConcertModal()">
          ${Icons.edit(14)} ADD FIRST RECORD
        </button>
      </div>`;
  }

  function renderRecentRecords(recentRecords) {
    if (recentRecords.length === 0) return '';
    return `
      <div style="margin-top:20px">
        <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:14px">
          최근 작성한 기록
        </div>
        <div class="archive-list">
          ${recentRecords.map(r => {
            const c = Concerts.getById(r.concertId);
            if (!c) return '';
            return renderRecordCard(r, c);
          }).filter(Boolean).join('')}
        </div>
      </div>`;
  }

  function renderRecordCard(record, concert) {
    const dateStr = Concerts.formatDate(Concerts.getPrimaryDate(concert));
    const updatedStr = record.updatedAt
      ? new Date(record.updatedAt).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' })
      : '';
    const src = Concerts.getPosterSrc(concert);
    const posterHtml = src
      ? `<img class="record-card__poster" src="${encodeURI(src)}" alt="${escHtml(concert.title)} 포스터" loading="lazy" onerror="this.style.display='none'">`
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
            <span>${Icons.calendar(12)} ${escHtml(dateStr)}</span>
            <span>${Icons.location(12)} ${escHtml(concert.venueName)}</span>
          </div>
          ${record.memo ? `<div class="record-card__memo">${escHtml(record.memo)}</div>` : ''}
        </div>
      </div>`;
  }

  function renderVenueCard(venue) {
    const venueConcerts = Concerts.getByVenue(venue.id);
    const previewPosters = venueConcerts.slice(0, 5)
      .map(c => Concerts.getPosterSrc(c))
      .filter(Boolean);
    return `
      <div class="venue-card" tabindex="0" role="button"
           onclick="Router.navigate('/venues/${venue.id}')"
           onkeydown="if(event.key==='Enter')Router.navigate('/venues/${venue.id}')">
        <div>
          <div class="venue-card__name">${escHtml(venue.name)}</div>
          <div class="venue-card__address">${escHtml(venue.address)}</div>
        </div>
        <div class="venue-card__count">
          <strong>${venueConcerts.length}</strong><br>
          등록된 공연
        </div>
        ${previewPosters.length > 0 ? `
          <div class="venue-card__posters">
            ${previewPosters.map(src => `<img class="venue-card__mini-poster" src="${encodeURI(src)}" alt="" loading="lazy" onerror="this.style.display='none'">`).join('')}
          </div>` : ''}
        <div class="venue-card__arrow">EXPLORE ${Icons.arrowR(14)}</div>
      </div>`;
  }

  // Concert selection modal for adding a record from Home
  window.openSelectConcertModal = function() {
    const concerts = Concerts.getAll();
    const modal = document.getElementById('modal-overlay');
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="select-modal-title">
        <div class="modal-header">
          <span class="modal-title" id="select-modal-title">기록할 공연 선택</span>
          <button class="modal-close" onclick="closeModal()" aria-label="닫기">${Icons.close(18)}</button>
        </div>
        <div class="modal-body" style="max-height:60vh;overflow-y:auto">
          <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:14px">
            기억을 남길 공연을 선택하세요:
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${concerts.map(c => {
              const hasRec = !!Records.getByConcertId(c.id);
              return `
                <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-sm);cursor:pointer;transition:background-color var(--transition-fast)"
                     onmouseover="this.style.background='var(--color-bg-elevated)'"
                     onmouseout="this.style.background='var(--color-bg-secondary)'"
                     onclick="closeModal();openRecordModal('${c.id}')">
                  <div style="width:36px;aspect-ratio:3/4;flex-shrink:0;background:#000;border-radius:2px;overflow:hidden">
                    <img src="${encodeURI(Concerts.getPosterSrc(c))}" alt="" style="width:100%;height:100%;object-fit:contain" onerror="this.style.display='none'">
                  </div>
                  <div style="flex:1;min-width:0">
                    <div style="font-family:var(--font-mono);font-size:10px;color:var(--color-accent-primary)">${escHtml(c.artist)}</div>
                    <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(c.title)}</div>
                    <div style="font-family:var(--font-mono);font-size:11px;color:var(--color-text-muted)">${escHtml(Concerts.formatDate(Concerts.getPrimaryDate(c)))} · ${escHtml(c.venueName)}</div>
                  </div>
                  ${hasRec ? `<span class="tag" style="background:var(--color-accent-dim);color:var(--color-accent-primary);font-size:9px">기록있음</span>` : `<span class="tag tag-muted" style="font-size:9px">선택</span>`}
                </div>`;
            }).join('')}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">닫기</button>
        </div>
      </div>`;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.PageHome = { render };
})();
