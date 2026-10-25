// AFTERSHOW — Page: STAGE RECONSTRUCTION (Blueprint & 3D Model)
// Rebuilt according to Master Rebuild Specification with Real Research Citations & Per-Concert Blueprints

(function() {
  let currentConcertId = null;
  let stageModel = null;
  let activeTab = 'blueprint'; // 'blueprint' (2D) | '3d'
  let blueprintInstance = null;
  let stage3dInstance = null;
  let selectedElement = null;
  let selectedSongIndex = 0;

  function render(_, params) {
    scrollTop();
    currentConcertId = params.concertId;
    const concert = Concerts.getById(currentConcertId);
    if (!concert) { Router.render404(); return; }

    stageModel = window.STAGE_DATA.getModelForConcert(concert);
    selectedSongIndex = 0;
    selectedElement = stageModel.elements[0] || null;

    document.getElementById('app-content').innerHTML = `
      <div class="stage-rebuild-container" style="display:flex;flex-direction:column;height:calc(100vh - var(--header-height));overflow:hidden;background:var(--color-bg-main)">
        
        <!-- 1. TOP HEADER & TOOLBAR -->
        <header class="stage-top-bar" style="display:flex;align-items:center;justify-content:space-between;padding:10px 24px;background:var(--color-bg-secondary);border-bottom:1px solid var(--color-border);flex-shrink:0;flex-wrap:wrap;gap:12px">
          <!-- Meta & Breadcrumb -->
          <div style="display:flex;align-items:center;gap:16px">
            <a href="#/concerts/${concert.id}" class="btn btn-secondary btn-sm" style="padding:6px 10px;font-size:11px" title="공연 상세로 돌아가기">
              ${Icons.arrowL(13)} BACK
            </a>
            <div>
              <div style="display:flex;align-items:center;gap:8px">
                <span class="tag tag-info" style="font-size:9.5px">${escHtml(stageModel.venueName)}</span>
                <span style="font-family:var(--font-mono);font-size:10px;color:var(--color-text-muted)">${escHtml(Concerts.formatDate(Concerts.getPrimaryDate(concert)))}</span>
                <span style="font-family:var(--font-mono);font-size:9px;padding:2px 6px;border-radius:2px;background:${stageModel.sourceVerificationStatus === 'VERIFIED' ? 'rgba(76,175,125,0.2)' : 'rgba(232,168,56,0.2)'};color:${stageModel.sourceVerificationStatus === 'VERIFIED' ? '#4CAF7D' : '#E8A838'}">
                  ${stageModel.sourceVerificationStatus}
                </span>
              </div>
              <h1 style="font-size:15px;font-weight:700;color:var(--color-text-primary);margin:2px 0 0;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:380px">
                ${escHtml(concert.title)}
              </h1>
            </div>
          </div>

          <!-- Mode Switcher: 2D Blueprint vs 3D Model -->
          <div style="display:flex;align-items:center;gap:8px">
            <div class="mode-toggle-group" style="display:flex;background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-sm);overflow:hidden">
              <button id="btn-mode-2d" class="btn btn-sm ${activeTab==='blueprint'?'btn-primary':'btn-secondary'}" style="border:none;border-radius:0;font-size:11px;padding:7px 16px" onclick="switchStageMode('blueprint')">
                ${Icons.stage(14)} 2D BLUEPRINT
              </button>
              <button id="btn-mode-3d" class="btn btn-sm ${activeTab==='3d'?'btn-primary':'btn-secondary'}" style="border:none;border-radius:0;font-size:11px;padding:7px 16px" onclick="switchStageMode('3d')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                3D MODEL
              </button>
            </div>
          </div>

          <!-- Quick Actions & View Controls -->
          <div id="blueprint-quick-tools" style="display:flex;align-items:center;gap:6px">
            <div id="blueprint-views-group" style="display:flex;gap:4px">
              <button class="filter-chip active" id="chip-v-plan" onclick="setBlueprintView('plan')">PLAN</button>
              <button class="filter-chip" id="chip-v-front" onclick="setBlueprintView('front')">FRONT</button>
              <button class="filter-chip" id="chip-v-side" onclick="setBlueprintView('side')">SIDE</button>
            </div>
            <div style="width:1px;height:20px;background:var(--color-border);margin:0 4px"></div>
            <button class="btn btn-secondary btn-sm" onclick="zoomBlueprint(0.2)" title="확대">+</button>
            <button class="btn btn-secondary btn-sm" onclick="zoomBlueprint(-0.2)" title="축소">-</button>
            <button class="btn btn-secondary btn-sm" onclick="fitBlueprint()" title="화면 맞춤">FIT</button>
          </div>
        </header>

        <!-- 2. MAIN WORKSPACE (VIEWER 75% + RIGHT PANEL 25%) -->
        <div style="display:flex;flex:1;min-height:0;position:relative">
          
          <!-- Central Stage Viewer (75~80%) -->
          <div id="stage-viewer-container" style="flex:1;min-width:0;height:100%;position:relative;background:#090C12">
            <!-- 2D Canvas Mount -->
            <div id="mount-stage-2d" style="width:100%;height:100%;display:${activeTab==='blueprint'?'block':'none'}"></div>
            <!-- 3D Canvas Mount -->
            <div id="mount-stage-3d" style="width:100%;height:100%;display:${activeTab==='3d'?'block':'none'}"></div>
          </div>

          <!-- Right Details & Specs Panel (25%) -->
          <aside id="stage-side-panel" style="width:360px;flex-shrink:0;background:var(--color-bg-card);border-left:1px solid var(--color-border);display:flex;flex-direction:column;overflow-y:auto;padding:18px;gap:16px">
            ${renderElementInspector(selectedElement, concert, stageModel)}
          </aside>
        </div>

        <!-- 3. BOTTOM SETLIST TIMELINE PANEL -->
        <footer class="stage-timeline-bar" style="background:var(--color-bg-secondary);border-top:1px solid var(--color-border);padding:10px 20px;flex-shrink:0">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted);display:flex;align-items:center;gap:8px">
              ${Icons.music(13)} <span>SETLIST TIMELINE & STAGE DIRECTING</span>
            </div>
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--color-accent-primary)">
              ${selectedSongIndex + 1} / ${concert.setlist.length} TRACKS
            </div>
          </div>

          <!-- Horizontal Scrollable Track Badges -->
          <div class="timeline-tracks-scroll" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;scroll-behavior:smooth">
            ${concert.setlist.map((item, idx) => {
              const isSelected = idx === selectedSongIndex;
              return `
                <div class="timeline-track-card"
                     style="flex-shrink:0;padding:8px 14px;background:${isSelected ? 'var(--color-accent-dim)' : 'var(--color-bg-card)'};border:1px solid ${isSelected ? 'var(--color-accent-primary)' : 'var(--color-border)'};border-radius:var(--radius-sm);cursor:pointer;transition:all var(--transition-fast);display:flex;flex-direction:column;gap:3px;max-width:180px"
                     onclick="selectTimelineTrack(${idx})"
                     title="${escHtml(item.title)}">
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
                    <span style="font-family:var(--font-mono);font-size:9.5px;color:${isSelected ? 'var(--color-accent-primary)' : 'var(--color-text-muted)'}">${item.order > 0 ? String(item.order).padStart(2, '0') : '—'}</span>
                    <span class="setlist-item__type-badge type-${escHtml(item.itemType)}" style="font-size:8px;padding:1px 4px">${escHtml(item.itemType)}</span>
                  </div>
                  <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:${isSelected ? '#FFF' : 'var(--color-text-primary)'}">
                    ${escHtml(item.title)}
                  </div>
                  <div style="font-family:var(--font-mono);font-size:9px;color:var(--color-text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                    ${escHtml(item.section || '')}
                  </div>
                </div>`;
            }).join('')}
          </div>
        </footer>

      </div>`;

    initInstances();
    bindGlobalFunctions(concert);
  }

  function initInstances() {
    const mount2D = document.getElementById('mount-stage-2d');
    const mount3D = document.getElementById('mount-stage-3d');

    // 1. Initialize 2D Blueprint Engine
    blueprintInstance = new Stage2DBlueprint(mount2D, {
      model: stageModel,
      onSelect: (el) => onElementSelected(el)
    });

    // 2. Initialize 3D Reconstruction Engine
    stage3dInstance = new Stage3DReconstruction(mount3D, {
      model: stageModel,
      onSelect: (el) => onElementSelected(el)
    });
  }

  function onElementSelected(el) {
    selectedElement = el;
    if (blueprintInstance && blueprintInstance.selectedElementId !== (el?.id || null)) {
      blueprintInstance.selectElement(el?.id || null);
    }
    if (stage3dInstance && stage3dInstance.selectedElementId !== (el?.id || null)) {
      stage3dInstance.selectElement(el?.id || null);
    }

    const panel = document.getElementById('stage-side-panel');
    if (panel) {
      const concert = Concerts.getById(currentConcertId);
      panel.innerHTML = renderElementInspector(selectedElement, concert, stageModel);
    }
  }

  function renderElementInspector(el, concert, model) {
    const song = concert?.setlist ? concert.setlist[selectedSongIndex] : null;

    let out = '';

    // If an element is selected
    if (el) {
      let statusLabel = 'VERIFIED';
      let statusBg = 'rgba(76,175,125,0.15)';
      let statusColor = '#4CAF7D';
      if (el.status === 'REFERENCE_BASED') {
        statusLabel = 'REFERENCE-BASED';
        statusBg = 'rgba(232,168,56,0.15)';
        statusColor = '#E8A838';
      } else if (el.status === 'CONCEPT_MODEL') {
        statusLabel = 'CONCEPT MODEL';
        statusBg = 'rgba(143,185,255,0.15)';
        statusColor = '#8FB9FF';
      }

      out += `
        <!-- Selected Component CAD Card -->
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
            <span style="font-family:var(--font-mono);font-size:11px;font-weight:600;color:var(--color-accent-primary);letter-spacing:0.1em">${escHtml(el.code)}</span>
            <span style="font-family:var(--font-mono);font-size:9px;font-weight:600;padding:2px 7px;border-radius:2px;background:${statusBg};color:${statusColor}">${statusLabel}</span>
          </div>
          <h2 style="font-size:15px;font-weight:700;color:var(--color-text-primary);line-height:1.3;margin-bottom:8px">
            ${escHtml(el.name)}
          </h2>
          <div style="font-size:12.5px;color:var(--color-text-secondary);line-height:1.55;margin-bottom:12px">
            ${escHtml(el.description)}
          </div>

          <!-- Technical Specification Box -->
          <div style="background:var(--color-bg-secondary);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:12px;font-family:var(--font-mono);font-size:10.5px;line-height:1.7;margin-bottom:12px">
            <div style="color:var(--color-text-muted);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;border-bottom:1px solid var(--color-border);padding-bottom:4px">TECHNICAL SPECIFICATIONS</div>
            <div><span style="color:var(--color-text-muted)">DIMENSIONS:</span> <span style="color:var(--color-text-primary)">${escHtml(el.dimensions)}</span></div>
            <div><span style="color:var(--color-text-muted)">ELEVATION:</span> <span style="color:var(--color-accent-secondary)">${escHtml(el.elevation)}</span></div>
            <div><span style="color:var(--color-text-muted)">HARDWARE:</span> <span style="color:var(--color-text-primary)">${escHtml(el.specs)}</span></div>
          </div>
        </div>`;
    } else {
      out += `
        <div style="text-align:center;padding:20px 10px;color:var(--color-text-muted)">
          <div style="margin-bottom:8px">${Icons.stage(30)}</div>
          <div style="font-size:13px;font-weight:600;color:var(--color-text-secondary);margin-bottom:4px">무대 요소를 선택하세요</div>
          <div style="font-size:11.5px;line-height:1.5">도면이나 3D 모형의 스테이지, 돌출 무대, 트러스, LED 월을 클릭하면 상세 제원을 확인할 수 있습니다.</div>
        </div>`;
    }

    // Current Song Directing Note
    if (song) {
      out += `
        <div style="background:var(--color-bg-secondary);border-left:2px solid var(--color-accent-primary);border-radius:0 var(--radius-sm) var(--radius-sm) 0;padding:10px 12px;margin-bottom:12px">
          <div style="font-family:var(--font-mono);font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent-primary);margin-bottom:3px">
            CURRENT TRACK DIRECTING
          </div>
          <div style="font-size:12.5px;font-weight:600;margin-bottom:3px">
            ${escHtml(song.title)}
          </div>
          <div style="font-size:11.5px;color:var(--color-text-muted);line-height:1.45">
            ${song.notes ? escHtml(song.notes) : '공식 세트리스트 구성에 따른 연출 큐입니다. 무대 특수효과 및 스크린 영상이 곡 테마에 맞춰 연동됩니다.'}
          </div>
        </div>`;
    }

    // Research Sources & Official Floor Plan Citation Box
    if (model) {
      out += `
        <div style="background:rgba(20,25,35,0.7);border:1px solid var(--color-border);border-radius:var(--radius-sm);padding:12px;font-family:var(--font-mono);font-size:10.5px;line-height:1.6;margin-bottom:12px">
          <div style="color:var(--color-accent-primary);font-size:9px;letter-spacing:0.1em;font-weight:600;margin-bottom:4px">OFFICIAL RESEARCH CITATIONS</div>
          <div style="color:var(--color-text-secondary);margin-bottom:6px">${escHtml(model.description)}</div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${model.ticketingUrl ? `<a href="${model.ticketingUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--color-accent-secondary);text-decoration:underline;display:flex;align-items:center;gap:4px">${Icons.external(10)} 공식 티켓팅/공연 안내 링크</a>` : ''}
            ${(model.floorPlanSources || []).map(src => `<div style="color:var(--color-text-muted);font-size:9.5px">• 도면 출처: ${escHtml(src)}</div>`).join('')}
          </div>
        </div>`;
    }

    // Layer Controls
    out += renderLayersControl();

    return out;
  }

  function renderLayersControl() {
    return `
      <div>
        <div style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:8px">
          STAGE LAYERS (도면 레이어)
        </div>
        <div style="display:flex;flex-direction:column;gap:5px">
          ${window.STAGE_DATA.LAYERS.map(layer => {
            const isActive = blueprintInstance ? blueprintInstance.activeLayers[layer.id] : true;
            return `
              <label style="display:flex;align-items:center;justify-content:space-between;padding:5px 9px;background:var(--color-bg-secondary);border-radius:var(--radius-sm);cursor:pointer;font-size:11.5px">
                <span style="display:flex;align-items:center;gap:8px">
                  <span style="width:7px;height:7px;border-radius:50%;background:${layer.color}"></span>
                  <span style="color:var(--color-text-secondary)">${layer.name}</span>
                </span>
                <input type="checkbox" ${isActive?'checked':''} onchange="toggleLayerFilter('${layer.id}', this.checked)" style="cursor:pointer">
              </label>`;
          }).join('')}
        </div>
      </div>`;
  }

  function bindGlobalFunctions(concert) {
    window.switchStageMode = function(mode) {
      activeTab = mode;
      const mount2D = document.getElementById('mount-stage-2d');
      const mount3D = document.getElementById('mount-stage-3d');
      const btn2D = document.getElementById('btn-mode-2d');
      const btn3D = document.getElementById('btn-mode-3d');
      const quickTools = document.getElementById('blueprint-quick-tools');

      if (mode === 'blueprint') {
        mount2D.style.display = 'block';
        mount3D.style.display = 'none';
        btn2D.className = 'btn btn-sm btn-primary';
        btn3D.className = 'btn btn-sm btn-secondary';
        quickTools.style.display = 'flex';
        blueprintInstance?.render();
      } else {
        mount2D.style.display = 'none';
        mount3D.style.display = 'block';
        btn2D.className = 'btn btn-sm btn-secondary';
        btn3D.className = 'btn btn-sm btn-primary';
        quickTools.style.display = 'none';
        stage3dInstance?.updateCamera();
      }
    };

    window.setBlueprintView = function(viewName) {
      document.querySelectorAll('#blueprint-views-group .filter-chip').forEach(c => c.classList.remove('active'));
      document.getElementById(`chip-v-${viewName}`)?.classList.add('active');
      blueprintInstance?.setView(viewName);
    };

    window.zoomBlueprint = function(delta) {
      blueprintInstance?.zoom(delta);
    };

    window.fitBlueprint = function() {
      blueprintInstance?.fitToView();
    };

    window.toggleLayerFilter = function(layerId, checked) {
      blueprintInstance?.toggleLayer(layerId, checked);
      stage3dInstance?.toggleLayer(layerId, checked);
    };

    window.selectTimelineTrack = function(idx) {
      selectedSongIndex = idx;
      document.querySelectorAll('.timeline-track-card').forEach((card, i) => {
        const isSel = i === idx;
        card.style.background = isSel ? 'var(--color-accent-dim)' : 'var(--color-bg-card)';
        card.style.borderColor = isSel ? 'var(--color-accent-primary)' : 'var(--color-border)';
      });

      const panel = document.getElementById('stage-side-panel');
      if (panel) {
        panel.innerHTML = renderElementInspector(selectedElement, concert, stageModel);
      }
    };
  }

  window.PageStage = { render };
})();
