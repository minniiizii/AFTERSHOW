// AFTERSHOW — Stage 2D Blueprint Engine
// Technical CAD Blueprint Viewer (Dynamic SVG Rendering from stageData Model)

'use strict';

class Stage2DBlueprint {
  constructor(container, options = {}) {
    this.container = container;
    this.model = options.model || window.STAGE_DATA.MODELS['wanna-one-therefore-2019'];
    this.currentView = 'plan'; // 'plan' (default for stage layouts) | 'front' | 'side'
    this.selectedElementId = null;
    this.activeLayers = {
      structure: true,
      screen: true,
      truss: true,
      lighting: true,
      sound: true,
      audience: true
    };

    // Pan & Zoom state
    this.scale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    // Callbacks
    this.onSelect = options.onSelect || (() => {});

    this.init();
  }

  setModel(model) {
    this.model = model;
    this.selectedElementId = null;
    this.fitToView();
  }

  setView(viewName) {
    this.currentView = viewName;
    this.fitToView();
  }

  toggleLayer(layerId, visible) {
    if (visible !== undefined) {
      this.activeLayers[layerId] = visible;
    } else {
      this.activeLayers[layerId] = !this.activeLayers[layerId];
    }
    this.render();
  }

  selectElement(elementId) {
    this.selectedElementId = elementId;
    this.render();
    if (elementId) {
      const el = (this.model.elements || []).find(e => e.id === elementId);
      if (el) this.onSelect(el);
    } else {
      this.onSelect(null);
    }
  }

  fitToView() {
    this.scale = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.render();
  }

  zoom(delta) {
    const newScale = Math.max(0.3, Math.min(4.5, this.scale + delta));
    this.scale = newScale;
    this.render();
  }

  init() {
    this.container.innerHTML = `
      <div class="blueprint-canvas-wrap" style="position:relative;width:100%;height:100%;overflow:hidden;background:#090C12;cursor:grab;user-select:none">
        <svg id="blueprint-svg" width="100%" height="100%" style="display:block"></svg>
        
        <!-- Blueprint HUD Overlay -->
        <div class="blueprint-hud-top" style="position:absolute;top:14px;left:18px;pointer-events:none;font-family:var(--font-mono);font-size:11px;color:rgba(143,185,255,0.7);letter-spacing:0.1em;line-height:1.6">
          <div style="font-weight:600;color:#F3F5F8;font-size:12px" id="hud-model-title">STAGE CAD: ${this.model?.name?.toUpperCase() || ''}</div>
          <div>VIEW: <span id="hud-view-name" style="color:var(--color-accent-primary)">PLAN VIEW (평면 배치도)</span> | SCALE: 1:120 (METRIC)</div>
          <div>VENUE: <span id="hud-venue-name" style="color:#FFF">${this.model?.venueName?.toUpperCase() || ''}</span> | DATUM: ±0.00m FINISH FLOOR</div>
        </div>

        <div class="blueprint-compass" style="position:absolute;top:14px;right:18px;pointer-events:none;font-family:var(--font-mono);font-size:10px;color:var(--color-text-muted);display:flex;align-items:center;gap:6px">
          <span style="display:inline-block;width:18px;height:18px;border:1px solid rgba(143,185,255,0.4);border-radius:50%;text-align:center;line-height:16px;color:var(--color-accent-primary);font-size:9px">N</span>
          CAD ORIENTATION: NORTH UP
        </div>
      </div>`;

    this.svg = this.container.querySelector('#blueprint-svg');
    this.wrap = this.container.querySelector('.blueprint-canvas-wrap');

    this.setupEvents();
    this.fitToView();
  }

  setupEvents() {
    // Drag Pan
    this.wrap.addEventListener('mousedown', (e) => {
      if (e.target.closest('.interactive-element')) return;
      this.isDragging = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
      this.wrap.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.renderTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.wrap.style.cursor = 'grab';
      }
    });

    // Wheel Zoom
    this.wrap.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.12 : -0.12;
      this.zoom(zoomFactor);
    }, { passive: false });

    // Touch Support
    let lastTouchDistance = null;
    this.wrap.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        lastTouchDistance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    this.wrap.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isDragging) {
        this.panX = e.touches[0].clientX - this.startX;
        this.panY = e.touches[0].clientY - this.startY;
        this.renderTransform();
      } else if (e.touches.length === 2 && lastTouchDistance) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (dist - lastTouchDistance) * 0.005;
        this.zoom(delta);
        lastTouchDistance = dist;
      }
    });

    this.wrap.addEventListener('touchend', () => {
      this.isDragging = false;
      lastTouchDistance = null;
    });

    window.addEventListener('resize', () => this.render());
  }

  renderTransform() {
    const g = this.svg?.querySelector('#blueprint-content');
    if (g && this.svg) {
      const rect = this.svg.getBoundingClientRect();
      const cx = (rect.width || 800) / 2 + this.panX;
      const cy = (rect.height || 600) / 2 + this.panY;
      g.setAttribute('transform', `translate(${cx}, ${cy}) scale(${this.scale})`);
    }
  }

  render() {
    if (!this.svg) return;

    // Update HUD text
    const hudTitle = this.container.querySelector('#hud-model-title');
    if (hudTitle) hudTitle.textContent = `STAGE CAD: ${(this.model?.name || '').toUpperCase()}`;
    const hudVenue = this.container.querySelector('#hud-venue-name');
    if (hudVenue) hudVenue.textContent = (this.model?.venueName || '').toUpperCase();
    const hudView = this.container.querySelector('#hud-view-name');
    if (hudView) {
      hudView.textContent = this.currentView === 'front' ? 'FRONT ELEVATION (정면 입면도)'
                          : this.currentView === 'plan' ? 'PLAN VIEW (평면 배치도)'
                          : 'SIDE ELEVATION (측면 단면도)';
    }

    const rect = this.svg.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 600;

    let elementsSvg = '';
    if (this.currentView === 'front') {
      elementsSvg = this.renderFrontView();
    } else if (this.currentView === 'plan') {
      elementsSvg = this.renderPlanView();
    } else {
      elementsSvg = this.renderSideView();
    }

    // Grid lines & Axis
    const gridSvg = this.renderGrid(w, h);

    this.svg.innerHTML = `
      <defs>
        <pattern id="grid-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="0.75" fill="rgba(143,185,255,0.16)" />
        </pattern>
        <pattern id="diagonal-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(143,185,255,0.25)" stroke-width="1" />
        </pattern>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#8FB9FF" />
        </marker>
        <filter id="blueprint-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>
      
      <!-- Background Grid -->
      <rect width="100%" height="100%" fill="url(#grid-dots)" />
      
      <g id="blueprint-content" transform="translate(${w/2 + this.panX}, ${h/2 + this.panY}) scale(${this.scale})">
        ${gridSvg}
        ${elementsSvg}
      </g>`;

    // Attach click events on interactive elements
    this.svg.querySelectorAll('.interactive-element').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.getAttribute('data-id');
        this.selectElement(id);
      });
    });

    // Deselect click on canvas background
    this.svg.addEventListener('click', (e) => {
      if (!e.target.closest('.interactive-element')) {
        this.selectElement(null);
      }
    });
  }

  renderGrid(w, h) {
    return `
      <!-- Datum Axes -->
      <line x1="-500" y1="0" x2="500" y2="0" stroke="rgba(143,185,255,0.22)" stroke-width="1" stroke-dasharray="8,4,2,4" />
      <line x1="0" y1="-380" x2="0" y2="380" stroke="rgba(143,185,255,0.22)" stroke-width="1" stroke-dasharray="8,4,2,4" />
      <!-- Center Origin Crosshair -->
      <circle cx="0" cy="0" r="5" fill="none" stroke="var(--color-accent-primary)" stroke-width="1" />
      <text x="8" y="-8" fill="rgba(143,185,255,0.5)" font-family="var(--font-mono)" font-size="9">DATUM 0,0 CL</text>`;
  }

  // ─────────────────────────────────────────────────────────────
  // 1. PLAN VIEW (평면 배치도) — Primary layout CAD
  // Coordinates mapping:
  // 3D pos3D: [X (left/right), Y (height), Z (depth)]
  // 2D Plan:  SVG X = X * scale, SVG Y = Z * scale
  // ─────────────────────────────────────────────────────────────
  renderPlanView() {
    let out = '';
    const S = 8.5; // Scale: 1 meter = 8.5 SVG pixels
    const venueId = this.model?.venueId || 'gocheok';

    // 1-A. Venue Architecture Perimeter
    if (this.activeLayers.audience) {
      if (venueId === 'kspo') {
        // KSPO DOME: 120m circular arena bowl
        const rOuter = 55 * S; // ~467 px
        const rStands = 44 * S;
        const rFloor = 30 * S;
        out += `
          <g opacity="0.45" class="venue-boundary">
            <!-- Outer Arena Shell -->
            <circle cx="0" cy="0" r="${rOuter}" fill="none" stroke="#6F7887" stroke-width="1.5" stroke-dasharray="8,4" />
            <!-- Upper Stands Boundary -->
            <circle cx="0" cy="0" r="${rStands}" fill="none" stroke="#485265" stroke-width="1" />
            <!-- Standing Floor Perimeter -->
            <circle cx="0" cy="0" r="${rFloor}" fill="rgba(19,23,31,0.5)" stroke="#344155" stroke-width="1" />
            <!-- 360 Radial Seating Aisles -->
            ${Array.from({length: 16}).map((_, i) => {
              const rad = (i * 22.5 * Math.PI) / 180;
              const x1 = Math.cos(rad) * rFloor;
              const y1 = Math.sin(rad) * rFloor;
              const x2 = Math.cos(rad) * rOuter;
              const y2 = Math.sin(rad) * rOuter;
              return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#2C3545" stroke-width="0.8" stroke-dasharray="3,3" />`;
            }).join('')}
            <text x="0" y="${-rOuter - 12}" fill="#6F7887" font-family="var(--font-mono)" font-size="10" text-anchor="middle">KSPO DOME 120m CIRCULAR ARENA RIM</text>
            <text x="0" y="${rFloor - 10}" fill="#4A5568" font-family="var(--font-mono)" font-size="9" text-anchor="middle">ARENA FLOOR LEVEL</text>
          </g>`;
      } else {
        // GOCHEOK SKY DOME: Baseball diamond stadium outline
        out += `
          <g opacity="0.45" class="venue-boundary">
            <!-- Diamond & Outfield Curved Perimeter -->
            <path d="M 0,-340 L 320,-40 C 350,140 220,300 0,330 C -220,300 -350,140 -320,-40 Z" fill="none" stroke="#6F7887" stroke-width="1.5" stroke-dasharray="8,4" />
            <!-- Floor Arena Outline -->
            <rect x="-240" y="-120" width="480" height="340" rx="20" fill="rgba(19,23,31,0.5)" stroke="#344155" stroke-width="1" />
            <!-- Infield Diamond Baseline Guide -->
            <polygon points="0,150 120,60 0,-30 -120,60" fill="none" stroke="#2C3545" stroke-width="0.8" stroke-dasharray="4,4" />
            <text x="0" y="-348" fill="#6F7887" font-family="var(--font-mono)" font-size="10" text-anchor="middle">GOCHEOK SKY DOME STADIUM BOWL</text>
            <text x="0" y="210" fill="#4A5568" font-family="var(--font-mono)" font-size="9" text-anchor="middle">OUTFIELD / INFIELD TURF FLOOR</text>
          </g>`;
      }
    }

    // 1-B. Dynamic Elements from this.model.elements
    const elements = this.model?.elements || [];

    // Sort to render structure at bottom, screens/trusses on top
    const order = { structure: 1, sound: 2, lighting: 3, truss: 4, screen: 5, audience: 0 };
    const sorted = [...elements].sort((a, b) => (order[a.category] || 0) - (order[b.category] || 0));

    sorted.forEach(el => {
      if (!this.activeLayers[el.category]) return;
      const isSel = el.id === this.selectedElementId;
      const [x3, y3, z3] = el.pos3D || [0, 0, 0];
      const [sx3, sy3, sz3] = el.size3D || [10, 2, 10];

      // Convert to 2D Plan
      const px = x3 * S;
      const py = z3 * S;
      const pw = sx3 * S;
      const ph = sz3 * S;

      const fillCol = isSel ? 'rgba(143,185,255,0.45)' : (el.category === 'screen' ? 'rgba(95,232,185,0.22)' : el.category === 'truss' ? 'rgba(232,168,56,0.18)' : el.category === 'sound' ? 'rgba(192,132,252,0.3)' : 'rgba(52,65,85,0.75)');
      const strokeCol = isSel ? '#FFFFFF' : (el.wireColor || '#8FB9FF');
      const strokeW = isSel ? 2.2 : 1.2;
      const filterAttr = isSel ? 'filter="url(#blueprint-glow)"' : '';

      out += `<g class="interactive-element" data-id="${el.id}" style="cursor:pointer">`;

      if (el.shape === 'cylinder') {
        const radius = (pw / 2);
        out += `
          <circle cx="${px}" cy="${py}" r="${radius}" fill="${fillCol}" stroke="${strokeCol}" stroke-width="${strokeW}" ${filterAttr} />
          <!-- Inner CAD ring -->
          <circle cx="${px}" cy="${py}" r="${radius * 0.6}" fill="none" stroke="${strokeCol}" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.6" />
          <text x="${px}" y="${py + 3}" fill="${strokeCol}" font-family="var(--font-mono)" font-size="9" font-weight="600" text-anchor="middle">${el.code || ''}</text>
          <text x="${px}" y="${py + radius + 11}" fill="#A3ACBA" font-family="var(--font-mono)" font-size="8" text-anchor="middle">${el.name}</text>`;
      } else {
        const rx = px - pw / 2;
        const ry = py - ph / 2;
        out += `
          <rect x="${rx}" y="${ry}" width="${pw}" height="${ph}" rx="2" fill="${fillCol}" stroke="${strokeCol}" stroke-width="${strokeW}" ${filterAttr} />`;

        // If truss or screen, add technical hatching
        if (el.category === 'truss') {
          out += `<line x1="${rx}" y1="${ry}" x2="${rx + pw}" y2="${ry + ph}" stroke="${strokeCol}" stroke-width="0.6" opacity="0.5" />
                  <line x1="${rx}" y1="${ry + ph}" x2="${rx + pw}" y2="${ry}" stroke="${strokeCol}" stroke-width="0.6" opacity="0.5" />`;
        } else if (el.category === 'screen') {
          out += `<rect x="${rx}" y="${ry}" width="${pw}" height="${ph}" fill="url(#diagonal-hatch)" />`;
        }

        out += `
          <text x="${px}" y="${py + (ph > 20 ? -2 : 3)}" fill="${strokeCol}" font-family="var(--font-mono)" font-size="9" font-weight="600" text-anchor="middle">${el.code || ''}</text>`;
        if (ph >= 18) {
          out += `<text x="${px}" y="${py + 11}" fill="#E2E8F0" font-family="var(--font-mono)" font-size="8" text-anchor="middle">${el.name.length > 20 ? el.name.slice(0, 18) + '…' : el.name}</text>`;
        }
      }

      out += `</g>`;
    });

    // 1-C. Engineering Dimensioning Annotation
    const mainDeck = elements.find(e => e.id.includes('main-stage') || e.id.includes('stage-main') || e.category === 'structure');
    if (mainDeck && mainDeck.size3D) {
      const [mx, my, mz] = mainDeck.pos3D;
      const [msx, msy, msz] = mainDeck.size3D;
      const dX1 = (mx - msx/2) * S;
      const dX2 = (mx + msx/2) * S;
      const dY = (mz - msz/2 - 2) * S;

      out += `
        <g opacity="0.65" class="dimension-lines">
          <line x1="${dX1}" y1="${dY}" x2="${dX2}" y2="${dY}" stroke="#8FB9FF" stroke-width="0.9" marker-start="url(#arrow)" marker-end="url(#arrow)" />
          <line x1="${dX1}" y1="${dY + 5}" x2="${dX1}" y2="${dY - 5}" stroke="#8FB9FF" stroke-width="0.8" />
          <line x1="${dX2}" y1="${dY + 5}" x2="${dX2}" y2="${dY - 5}" stroke="#8FB9FF" stroke-width="0.8" />
          <text x="${(dX1 + dX2)/2}" y="${dY - 4}" fill="#8FB9FF" font-family="var(--font-mono)" font-size="8.5" text-anchor="middle">WIDTH ${msx.toFixed(1)}m</text>
        </g>`;
    }

    return out;
  }

  // ─────────────────────────────────────────────────────────────
  // 2. FRONT ELEVATION (정면 입면도)
  // Coordinates mapping:
  // 3D pos3D: [X, Y, Z]
  // 2D Front: SVG X = X * scale, SVG Y = -Y * scale (Datum line at Y=100)
  // ─────────────────────────────────────────────────────────────
  renderFrontView() {
    let out = '';
    const S = 9.0;
    const datumY = 110;
    const elements = this.model?.elements || [];

    // 2-A. Datum Floor Line & Venue Backdrop
    out += `
      <!-- Datum & Ground -->
      <line x1="-420" y1="${datumY}" x2="420" y2="${datumY}" stroke="#F3F5F8" stroke-width="1.8" />
      <text x="-410" y="${datumY + 16}" fill="#A3ACBA" font-family="var(--font-mono)" font-size="10">±0.00m FINISH FLOOR LEVEL (FFL)</text>
      <text x="240" y="${datumY + 16}" fill="#A3ACBA" font-family="var(--font-mono)" font-size="10">${(this.model?.venueName || 'ARENA').toUpperCase()} DATUM</text>`;

    if (this.activeLayers.audience) {
      if (this.model?.venueId === 'kspo') {
        out += `
          <!-- KSPO DOME Bowl Cross Section Profile -->
          <g opacity="0.35">
            <path d="M -400 ${datumY} L -400 30 L -280 30 L -250 80 L -210 ${datumY}" fill="none" stroke="#6F7887" stroke-width="1" stroke-dasharray="4,4" />
            <path d="M 400 ${datumY} L 400 30 L 280 30 L 250 80 L 210 ${datumY}" fill="none" stroke="#6F7887" stroke-width="1" stroke-dasharray="4,4" />
            <path d="M -400 30 Q 0 -130 400 30" fill="none" stroke="#6F7887" stroke-width="1" stroke-dasharray="6,4" />
            <text x="-390" y="20" fill="#6F7887" font-family="var(--font-mono)" font-size="9">KSPO CABLE-ROOF & 2F STANDS</text>
          </g>`;
      } else {
        out += `
          <!-- Gocheok Stadium Stands Section -->
          <g opacity="0.35">
            <path d="M -420 ${datumY} L -420 -60 L -280 -10 L -240 50 L -200 ${datumY}" fill="none" stroke="#6F7887" stroke-width="1" stroke-dasharray="4,4" />
            <path d="M 420 ${datumY} L 420 -60 L 280 -10 L 240 50 L 200 ${datumY}" fill="none" stroke="#6F7887" stroke-width="1" stroke-dasharray="4,4" />
            <path d="M -420 -60 Q 0 -180 420 -60" fill="none" stroke="#6F7887" stroke-width="1.2" stroke-dasharray="6,4" />
            <text x="-410" y="-70" fill="#6F7887" font-family="var(--font-mono)" font-size="9">GOCHEOK 67.8m STEEL DOME ARCH</text>
          </g>`;
      }
    }

    // 2-B. Render elements from stageData
    const order = { structure: 1, sound: 2, lighting: 3, truss: 4, screen: 5, audience: 0 };
    const sorted = [...elements].sort((a, b) => (order[a.category] || 0) - (order[b.category] || 0));

    sorted.forEach(el => {
      if (!this.activeLayers[el.category]) return;
      const isSel = el.id === this.selectedElementId;
      const [x3, y3, z3] = el.pos3D || [0, 0, 0];
      const [sx3, sy3, sz3] = el.size3D || [10, 2, 10];

      // Convert to 2D Front
      const px = x3 * S;
      const pw = sx3 * S;
      const ph = sy3 * S;
      // In front view, element top is y3 + sy3/2, bottom is y3 - sy3/2
      const py = datumY - (y3 + sy3 / 2) * S;

      const fillCol = isSel ? 'rgba(143,185,255,0.45)' : (el.category === 'screen' ? 'rgba(95,232,185,0.22)' : el.category === 'truss' ? 'rgba(232,168,56,0.18)' : el.category === 'sound' ? 'rgba(192,132,252,0.3)' : 'rgba(52,65,85,0.85)');
      const strokeCol = isSel ? '#FFFFFF' : (el.wireColor || '#8FB9FF');
      const strokeW = isSel ? 2.2 : 1.2;
      const filterAttr = isSel ? 'filter="url(#blueprint-glow)"' : '';

      out += `<g class="interactive-element" data-id="${el.id}" style="cursor:pointer">`;
      const rx = px - pw / 2;

      out += `<rect x="${rx}" y="${py}" width="${pw}" height="${ph}" fill="${fillCol}" stroke="${strokeCol}" stroke-width="${strokeW}" ${filterAttr} />`;

      if (el.category === 'truss') {
        const segCount = Math.max(3, Math.round(pw / 18));
        const segW = pw / segCount;
        for (let i = 0; i < segCount; i++) {
          out += `<line x1="${rx + i*segW}" y1="${py}" x2="${rx + (i+1)*segW}" y2="${py + ph}" stroke="${strokeCol}" stroke-width="0.6" opacity="0.6" />
                  <line x1="${rx + (i+1)*segW}" y1="${py}" x2="${rx + i*segW}" y2="${py + ph}" stroke="${strokeCol}" stroke-width="0.6" opacity="0.6" />`;
        }
      } else if (el.category === 'sound') {
        const boxCount = Math.max(4, Math.min(14, Math.round(ph / 9)));
        const boxH = ph / boxCount;
        for (let i = 0; i < boxCount; i++) {
          out += `<rect x="${rx + 1}" y="${py + i*boxH + 1}" width="${pw - 2}" height="${boxH - 2}" rx="1" fill="rgba(192,132,252,0.4)" stroke="${strokeCol}" stroke-width="0.8" />`;
        }
      }

      out += `<text x="${px}" y="${py - 4}" fill="${strokeCol}" font-family="var(--font-mono)" font-size="8.5" font-weight="600" text-anchor="middle">${el.code || ''}</text>`;
      out += `</g>`;
    });

    return out;
  }

  // ─────────────────────────────────────────────────────────────
  // 3. SIDE ELEVATION (측면 단면도)
  // Coordinates mapping:
  // 3D pos3D: [X, Y, Z]
  // 2D Side:  SVG X = Z * scale, SVG Y = -Y * scale (Datum line at Y=110)
  // ─────────────────────────────────────────────────────────────
  renderSideView() {
    let out = '';
    const S = 9.0;
    const datumY = 110;
    const elements = this.model?.elements || [];

    out += `
      <!-- Datum & Ground Line -->
      <line x1="-360" y1="${datumY}" x2="360" y2="${datumY}" stroke="#F3F5F8" stroke-width="1.8" />
      <text x="-350" y="${datumY + 16}" fill="#A3ACBA" font-family="var(--font-mono)" font-size="10">±0.00m FINISH FLOOR (STAGE BACK ← → AUDIENCE FRONT)</text>`;

    if (this.activeLayers.audience) {
      out += `
        <!-- Tiered Audience Rake Angle -->
        <polygon points="60,${datumY} 320,-20 320,${datumY}" fill="rgba(14,18,26,0.6)" stroke="#6F7887" stroke-width="1" stroke-dasharray="4,2" />
        <text x="180" y="40" fill="#6F7887" font-family="var(--font-mono)" font-size="9">TIERED AUDIENCE RAKE 28°</text>`;
    }

    elements.forEach(el => {
      if (!this.activeLayers[el.category]) return;
      const isSel = el.id === this.selectedElementId;
      const [x3, y3, z3] = el.pos3D || [0, 0, 0];
      const [sx3, sy3, sz3] = el.size3D || [10, 2, 10];

      // Side: X is Depth (z3), Y is Height (y3)
      const pz = z3 * S;
      const pdepth = sz3 * S;
      const ph = sy3 * S;
      const py = datumY - (y3 + sy3 / 2) * S;
      const rx = pz - pdepth / 2;

      const fillCol = isSel ? 'rgba(143,185,255,0.45)' : (el.category === 'screen' ? 'rgba(95,232,185,0.3)' : el.category === 'truss' ? 'rgba(232,168,56,0.18)' : el.category === 'sound' ? 'rgba(192,132,252,0.3)' : 'rgba(52,65,85,0.85)');
      const strokeCol = isSel ? '#FFFFFF' : (el.wireColor || '#8FB9FF');
      const strokeW = isSel ? 2.2 : 1.2;

      out += `
        <g class="interactive-element" data-id="${el.id}" style="cursor:pointer">
          <rect x="${rx}" y="${py}" width="${pdepth}" height="${ph}" fill="${fillCol}" stroke="${strokeCol}" stroke-width="${strokeW}" />
          <text x="${pz}" y="${py - 3}" fill="${strokeCol}" font-family="var(--font-mono)" font-size="8" text-anchor="middle">${el.code || ''}</text>
        </g>`;
    });

    return out;
  }
}

window.Stage2DBlueprint = Stage2DBlueprint;
