// AFTERSHOW — Page: CONCERT DETAIL

(function() {
  function render(_, params) {
    scrollTop();
    const { concertId } = params;
    const concert = Concerts.getById(concertId);
    if (!concert) { Router.render404(); return; }

    const record = Records.getByConcertId(concertId);
    const primaryDate = Concerts.getPrimaryDate(concert);

    document.getElementById('app-content').innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="페이지 위치">
          <a href="#/" data-route>HOME</a>
          <span class="breadcrumb-sep">—</span>
          <a href="#/venues" data-route>VENUES</a>
          <span class="breadcrumb-sep">—</span>
          <a href="#/venues/${concert.venueId}" data-route>${escHtml(concert.venueName)}</a>
          <span class="breadcrumb-sep">—</span>
          <span class="breadcrumb-current">CONCERT DETAIL</span>
        </nav>

        <section class="page-section">
          <div class="concert-detail-grid">
            <!-- Poster -->
            <div class="concert-detail-poster">
              ${renderPoster(concert)}
              ${concert.sourceUrls && concert.sourceUrls.length > 0 ? `
                <div style="margin-top:12px">
                  ${concert.sourceUrls.map(url => `
                    <a href="${url}" target="_blank" rel="noopener noreferrer"
                       style="display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10.5px;color:var(--color-text-muted);padding:4px 0;transition:color var(--transition-fast)"
                       onmouseover="this.style.color='var(--color-accent-primary)'"
                       onmouseout="this.style.color='var(--color-text-muted)'">
                      ${Icons.link(12)} 출처 링크
                    </a>`).join('')}
                </div>` : ''}
            </div>

            <!-- Info -->
            <div class="concert-detail-info">
              <div class="concert-detail__artist">${escHtml(concert.artist)}</div>
              <h1 class="concert-detail__title">${escHtml(concert.title)}</h1>

              <div class="concert-meta-list">
                ${concert.tourName ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">투어</span>
                  <span class="concert-meta-value">${escHtml(concert.tourName)}</span></div>` : ''}
                <div class="concert-meta-item">
                  <span class="concert-meta-label">공연장</span>
                  <span class="concert-meta-value">${escHtml(concert.venueName)}</span>
                </div>
                ${concert.venueAddress ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">주소</span>
                  <span class="concert-meta-value">${escHtml(concert.venueAddress)}</span></div>` : ''}
                ${concert.eventType ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">유형</span>
                  <span class="concert-meta-value">${escHtml(concert.eventType)}</span></div>` : ''}
                ${concert.ageRating ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">관람 등급</span>
                  <span class="concert-meta-value">${escHtml(concert.ageRating)}</span></div>` : ''}
                ${concert.organizer ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">주최</span>
                  <span class="concert-meta-value">${escHtml(concert.organizer)}</span></div>` : ''}
                ${concert.ticketPrice ? `<div class="concert-meta-item">
                  <span class="concert-meta-label">티켓</span>
                  <span class="concert-meta-value">${Object.entries(concert.ticketPrice).map(([k,v]) => `${k.toUpperCase()}: ${v}`).join(' / ')}</span></div>` : ''}
              </div>

              <!-- Dates -->
              <div style="margin-bottom:24px">
                <div style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:10px">공연 일정</div>
                <div style="display:flex;flex-direction:column;gap:6px">
                  ${concert.dates.map(d => `
                    <div style="display:flex;align-items:center;gap:12px;font-size:13.5px">
                      <span style="font-family:var(--font-mono);font-size:10px;color:var(--color-accent-secondary);min-width:60px">${escHtml(d.day||'')}</span>
                      <span>${escHtml(Concerts.formatDate(d.date))}</span>
                      ${d.startTime ? `<span style="font-family:var(--font-mono);font-size:12px;color:var(--color-text-muted)">${escHtml(d.startTime)}</span>` : ''}
                    </div>`).join('')}
                </div>
              </div>

              <!-- Record Status -->
              <div id="record-status-area">
                ${renderRecordStatus(record, concertId)}
              </div>

              <!-- Actions -->
              <div class="concert-actions" style="margin-top:24px">
                <button class="btn btn-secondary" onclick="scrollToSetlist()">
                  ${Icons.music(14)} VIEW SETLIST
                </button>
                <button class="btn btn-secondary" onclick="Router.navigate('/concerts/${concertId}/stage')">
                  ${Icons.stage(14)} RECONSTRUCT STAGE
                </button>
              </div>

              ${concert.notes ? `<div style="margin-top:20px;padding:12px 16px;background:var(--color-bg-secondary);border-left:2px solid var(--color-border);border-radius:0 var(--radius-sm) var(--radius-sm) 0">
                <div style="font-family:var(--font-mono);font-size:9.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:6px">비고</div>
                <div style="font-size:12.5px;color:var(--color-text-muted);white-space:pre-line">${escHtml(concert.notes)}</div>
              </div>` : ''}
            </div>
          </div>
        </section>

        <hr class="divider">

        <!-- SETLIST -->
        <section class="page-section" id="setlist-section">
          <div class="section-header">
            <span class="section-title">SETLIST</span>
            <span class="section-count">${concert.setlist.filter(s => s.itemType === 'SONG' || s.itemType === 'MEDLEY').length}곡</span>
          </div>
          ${renderSetlist(concert)}
        </section>
      </div>`;

    window.scrollToSetlist = function() {
      document.getElementById('setlist-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  function renderRecordStatus(record, concertId) {
    if (!record) {
      return `
        <div style="padding:16px;background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-md)">
          <div style="font-size:13.5px;color:var(--color-text-muted);margin-bottom:12px">아직 이 공연의 기록이 없습니다.</div>
          <button class="btn btn-primary btn-sm" onclick="openRecordModal('${escHtml(concertId)}')">
            ${Icons.edit(13)} WRITE MY RECORD
          </button>
        </div>`;
    }
    const updatedStr = new Date(record.updatedAt).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
    return `
      <div style="padding:16px;background:var(--color-accent-dim);border:1px solid rgba(143,185,255,0.2);border-radius:var(--radius-md)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-primary)">RECORDED</span>
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-muted)">${escHtml(updatedStr)}</span>
        </div>
        ${record.memo ? `<div style="font-size:13.5px;color:var(--color-text-secondary);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${escHtml(record.memo)}</div>` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openRecordModal('${escHtml(concertId)}')">
            ${Icons.edit(13)} EDIT RECORD
          </button>
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/archive')">
            ${Icons.archive(13)} VIEW IN ARCHIVE
          </button>
        </div>
      </div>`;
  }

  function renderSetlist(concert) {
    if (!concert.setlist || concert.setlist.length === 0) {
      return `<div class="empty-state"><div class="empty-state__title">등록된 세트리스트가 없습니다.</div></div>`;
    }

    // Group by section
    const sections = [];
    const sectionMap = {};
    concert.setlist.forEach(item => {
      const sec = item.section || '메인 무대';
      if (!sectionMap[sec]) {
        sectionMap[sec] = [];
        sections.push(sec);
      }
      sectionMap[sec].push(item);
    });

    // Count songs only for display order
    let songNum = 0;
    return `<div class="setlist-container">
      ${sections.map(sec => `
        <div class="setlist-section-header">${escHtml(sec)}</div>
        ${sectionMap[sec].map(item => {
          const isCountable = (item.itemType === 'SONG' || item.itemType === 'MEDLEY');
          if (isCountable && item.order > 0) songNum = item.order;
          const orderDisplay = item.order > 0 ? String(item.order).padStart(2, '0') : '—';
          return `
            <div class="setlist-item" id="setlist-item-${item.order}">
              <span class="setlist-item__order">${orderDisplay}</span>
              <div class="setlist-item__content">
                <div class="setlist-item__title">${escHtml(item.title)}</div>
                <div class="setlist-item__meta">
                  ${item.artistOrPerformer ? `<span>${escHtml(item.artistOrPerformer)}</span>` : ''}
                  ${item.version ? `<span>${escHtml(item.version)}</span>` : ''}
                  ${item.notes ? `<span style="color:var(--color-text-muted)">${escHtml(item.notes)}</span>` : ''}
                  ${item.medleyTracks ? `<span style="display:block;margin-top:4px;color:var(--color-text-muted)">${item.medleyTracks.map(t => escHtml(t)).join(' · ')}</span>` : ''}
                </div>
              </div>
              <span class="setlist-item__type-badge type-${escHtml(item.itemType)}">${escHtml(item.itemType)}</span>
            </div>`;
        }).join('')}
      `).join('')}
    </div>`;
  }

  // ── Record Modal ─────────────────────────────────────────────
  window.openRecordModal = function(concertId) {
    const concert = Concerts.getById(concertId);
    if (!concert) return;
    const existing = Records.getByConcertId(concertId);

    const modal = document.getElementById('modal-overlay');
    modal.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <span class="modal-title" id="modal-title">${existing ? 'EDIT RECORD' : 'WRITE MY RECORD'}</span>
          <button class="modal-close" onclick="closeModal()" aria-label="닫기">${Icons.close(18)}</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom:20px;padding:14px;background:var(--color-bg-secondary);border-radius:var(--radius-sm);display:flex;gap:14px;align-items:center">
            <div style="width:48px;flex-shrink:0">
              ${renderPoster(concert)}
            </div>
            <div>
              <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-primary)">${escHtml(concert.artist)}</div>
              <div style="font-size:13.5px;font-weight:600;line-height:1.4">${escHtml(concert.title)}</div>
              <div style="font-family:var(--font-mono);font-size:11px;color:var(--color-text-muted)">${escHtml(Concerts.formatDate(Concerts.getPrimaryDate(concert)))}</div>
            </div>
          </div>

          <form id="record-form" style="display:flex;flex-direction:column;gap:18px" onsubmit="submitRecord(event,'${escHtml(concertId)}')">
            <div class="form-group">
              <label class="form-label" for="rec-title">나만의 공연 제목 <span style="color:var(--color-text-muted)">(선택)</span></label>
              <input type="text" id="rec-title" class="form-input" placeholder="이 공연을 기억하는 나만의 이름"
                     maxlength="100" value="${escHtml(existing?.customTitle || '')}">
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-memo">공연 감상 / 메모 <span style="color:var(--color-accent-primary)">*</span></label>
              <textarea id="rec-memo" class="form-textarea" placeholder="그날의 기억을 자유롭게 기록해 보세요."
                        rows="5" maxlength="2000" required>${escHtml(existing?.memo || '')}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-fav-song">가장 기억에 남는 곡 <span style="color:var(--color-text-muted)">(선택)</span></label>
              <input type="text" id="rec-fav-song" class="form-input" placeholder="세트리스트에서 가장 좋았던 곡"
                     maxlength="100" value="${escHtml(existing?.favSong || '')}">
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-fav-moment">가장 기억에 남는 순간 <span style="color:var(--color-text-muted)">(선택)</span></label>
              <input type="text" id="rec-fav-moment" class="form-input" placeholder="공연에서 가장 인상 깊었던 순간"
                     maxlength="200" value="${escHtml(existing?.favMoment || '')}">
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-companions">동행인 <span style="color:var(--color-text-muted)">(선택)</span></label>
              <input type="text" id="rec-companions" class="form-input" placeholder="함께한 사람"
                     maxlength="100" value="${escHtml(existing?.companions || '')}">
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-extra">기타 메모 <span style="color:var(--color-text-muted)">(선택)</span></label>
              <textarea id="rec-extra" class="form-textarea" placeholder="좌석, 날씨, 의상, 특별한 기억 등 자유롭게"
                        rows="3" maxlength="1000">${escHtml(existing?.extra || '')}</textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          ${existing ? `<button class="btn btn-danger btn-sm" onclick="deleteRecord('${escHtml(existing.id)}','${escHtml(concertId)}')">삭제</button>` : ''}
          <button class="btn btn-secondary btn-sm" onclick="closeModal()">취소</button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('record-form').requestSubmit()">
            ${Icons.check(13)} 저장
          </button>
        </div>
      </div>`;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('rec-memo')?.focus();
  };

  window.closeModal = function() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.add('hidden');
    modal.innerHTML = '';
    document.body.style.overflow = '';
  };

  window.submitRecord = function(e, concertId) {
    e.preventDefault();
    const memo = document.getElementById('rec-memo').value.trim();
    if (!memo) { Toast.show('공연 감상을 입력해 주세요.', 'error'); return; }

    const existing = Records.getByConcertId(concertId);
    const record = {
      id:          existing?.id || null,
      concertId,
      customTitle: document.getElementById('rec-title').value.trim(),
      memo,
      favSong:     document.getElementById('rec-fav-song').value.trim(),
      favMoment:   document.getElementById('rec-fav-moment').value.trim(),
      companions:  document.getElementById('rec-companions').value.trim(),
      extra:       document.getElementById('rec-extra').value.trim(),
    };

    try {
      Records.save(record);
      closeModal();
      Toast.show(existing ? '기록이 수정되었습니다.' : '기록이 저장되었습니다.', 'success');
      // Refresh record status area
      const newRecord = Records.getByConcertId(concertId);
      const statusArea = document.getElementById('record-status-area');
      if (statusArea) statusArea.innerHTML = renderRecordStatus(newRecord, concertId);
    } catch(err) {
      Toast.show('저장에 실패했습니다. 다시 시도해 주세요.', 'error');
    }
  };

  window.deleteRecord = function(recordId, concertId) {
    if (!confirm('이 기록을 삭제하시겠습니까?\n삭제된 기록은 복구할 수 없습니다.\n공연 데이터는 삭제되지 않습니다.')) return;
    try {
      Records.delete(recordId);
      closeModal();
      Toast.show('기록이 삭제되었습니다.', 'success');
      const statusArea = document.getElementById('record-status-area');
      if (statusArea) statusArea.innerHTML = renderRecordStatus(null, concertId);
    } catch(err) {
      Toast.show('삭제에 실패했습니다.', 'error');
    }
  };

  // Close modal on overlay click
  document.addEventListener('click', e => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay && e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  function renderRecordStatus(record, concertId) {
    if (!record) {
      return `
        <div style="padding:16px;background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-md)">
          <div style="font-size:13.5px;color:var(--color-text-muted);margin-bottom:12px">아직 이 공연의 기록이 없습니다.</div>
          <button class="btn btn-primary btn-sm" onclick="openRecordModal('${escHtml(concertId)}')">
            ${Icons.edit(13)} WRITE MY RECORD
          </button>
        </div>`;
    }
    const updatedStr = new Date(record.updatedAt).toLocaleDateString('ko-KR', { year:'numeric', month:'long', day:'numeric' });
    return `
      <div style="padding:16px;background:var(--color-accent-dim);border:1px solid rgba(143,185,255,0.2);border-radius:var(--radius-md)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-primary)">RECORDED</span>
          <span style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-muted)">${escHtml(updatedStr)}</span>
        </div>
        ${record.memo ? `<div style="font-size:13.5px;color:var(--color-text-secondary);margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">${escHtml(record.memo)}</div>` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" onclick="openRecordModal('${escHtml(concertId)}')">
            ${Icons.edit(13)} EDIT RECORD
          </button>
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/archive')">
            ${Icons.archive(13)} VIEW IN ARCHIVE
          </button>
        </div>
      </div>`;
  }

  window.PageConcert = { render };
})();
