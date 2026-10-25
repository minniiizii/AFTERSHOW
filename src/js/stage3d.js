// AFTERSHOW — Stage 3D Reconstruction Engine
// Interactive 3D Concert Stage Visualizer (Three.js WebGL + Canvas Fallback)
// Renderings accurately differentiate fixed venue geometry (Gocheok Sky Dome vs KSPO DOME)
// and dynamically build concert-specific stage elements based on real research data.

'use strict';

class Stage3DReconstruction {
  constructor(container, options = {}) {
    this.container = container;
    this.model = options.model || window.STAGE_DATA.MODELS['wanna-one-therefore-2019'];
    this.selectedElementId = null;
    this.activeLayers = {
      structure: true,
      screen: true,
      truss: true,
      lighting: true,
      sound: true,
      audience: true
    };

    // Camera preset states
    this.cameraView = 'audience'; // 'audience' | 'front' | 'top' | 'side'

    // Orbit & navigation parameters
    this.orbit = {
      radius: 65,
      theta: Math.PI / 2,   // Horizontal angle (azimuth)
      phi: Math.PI * 0.42,  // Vertical angle (elevation)
      target: { x: 0, y: 5, z: 0 },
      minRadius: 15,
      maxRadius: 180
    };

    this.isDragging = false;
    this.isPanning = false;
    this.prevMouse = { x: 0, y: 0 };

    this.onSelect = options.onSelect || (() => {});
    this.animationId = null;
    this.venueGroup = null;

    this.init();
  }

  setModel(model) {
    this.model = model;
    this.selectedElementId = null;
    this.rebuildScene();
  }

  toggleLayer(layerId, visible) {
    if (visible !== undefined) {
      this.activeLayers[layerId] = visible;
    } else {
      this.activeLayers[layerId] = !this.activeLayers[layerId];
    }
    this.updateLayerVisibility();
  }

  selectElement(elementId) {
    this.selectedElementId = elementId;
    this.updateSelectionHighlight();
    if (elementId) {
      const el = (this.model.elements || []).find(e => e.id === elementId);
      if (el) this.onSelect(el);
    } else {
      this.onSelect(null);
    }
  }

  setCameraView(viewName) {
    this.cameraView = viewName;
    if (viewName === 'audience') {
      // Perspective from audience center floor looking up to stage
      this.orbit.theta = Math.PI / 2;
      this.orbit.phi = Math.PI * 0.44;
      this.orbit.radius = 48;
      this.orbit.target = { x: 0, y: 5, z: -2 };
    } else if (viewName === 'front') {
      this.orbit.theta = Math.PI / 2;
      this.orbit.phi = Math.PI * 0.38;
      this.orbit.radius = 70;
      this.orbit.target = { x: 0, y: 6, z: 0 };
    } else if (viewName === 'top') {
      this.orbit.theta = Math.PI / 2;
      this.orbit.phi = 0.05; // Straight down
      this.orbit.radius = 85;
      this.orbit.target = { x: 0, y: 0, z: 2 };
    } else if (viewName === 'side') {
      this.orbit.theta = 0; // Profile from right
      this.orbit.phi = Math.PI * 0.38;
      this.orbit.radius = 75;
      this.orbit.target = { x: 0, y: 6, z: 0 };
    }
    this.updateCamera();
  }

  resetView() {
    this.setCameraView('audience');
  }

  init() {
    this.container.innerHTML = `
      <div class="stage-3d-wrap" style="position:relative;width:100%;height:100%;overflow:hidden;background:#090C12;user-select:none">
        <canvas id="stage-3d-canvas" style="display:block;width:100%;height:100%;cursor:grab"></canvas>
        
        <!-- 3D HUD Overlay -->
        <div class="stage-3d-hud" style="position:absolute;top:14px;left:18px;pointer-events:none;font-family:var(--font-mono);font-size:11px;color:rgba(143,185,255,0.7);letter-spacing:0.1em;line-height:1.6">
          <div style="font-weight:600;color:#F3F5F8;font-size:12px" id="hud-3d-title">3D STAGE: ${(this.model?.name || '').toUpperCase()}</div>
          <div>CAMERA: <span id="hud-cam-name" style="color:var(--color-accent-primary)">AUDIENCE PERSPECTIVE</span> | RENDER: WEBGL</div>
          <div>VENUE: <span id="hud-3d-venue" style="color:#FFF">${(this.model?.venueName || '').toUpperCase()}</span></div>
        </div>

        <div class="stage-3d-cam-controls" style="position:absolute;bottom:18px;left:18px;display:flex;gap:6px;z-index:10">
          <button class="btn btn-secondary btn-sm" onclick="window.current3DStage?.setCameraView('audience')" title="객석 시점">AUDIENCE</button>
          <button class="btn btn-secondary btn-sm" onclick="window.current3DStage?.setCameraView('front')" title="정면 뷰">FRONT</button>
          <button class="btn btn-secondary btn-sm" onclick="window.current3DStage?.setCameraView('top')" title="상단 평면 뷰">TOP</button>
          <button class="btn btn-secondary btn-sm" onclick="window.current3DStage?.setCameraView('side')" title="측면 프로파일">SIDE</button>
          <button class="btn btn-ghost btn-sm" onclick="window.current3DStage?.resetView()" title="시점 리셋">RESET</button>
        </div>
      </div>`;

    this.canvas = this.container.querySelector('#stage-3d-canvas');
    this.wrap = this.container.querySelector('.stage-3d-wrap');

    window.current3DStage = this;

    if (window.THREE) {
      this.initThreeWebGL();
    } else {
      this.initCanvasFallback();
    }

    this.setupEvents();
    this.setCameraView('audience');
  }

  // ── Three.js WebGL Renderer ──────────────────────────────────
  initThreeWebGL() {
    const THREE = window.THREE;
    const rect = this.wrap.getBoundingClientRect();
    const w = rect.width || 800;
    const h = rect.height || 600;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090c12);
    this.scene.fog = new THREE.FogExp2(0x090c12, 0.006);

    this.camera = new THREE.PerspectiveCamera(48, w / h, 0.5, 600);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x2d3a4d, 1.4);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x8fb9ff, 1.3);
    keyLight.position.set(25, 45, 30);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x5fe8b9, 0.7);
    rimLight.position.set(-30, 25, -20);
    this.scene.add(rimLight);

    // Floor Base Grid
    const gridHelper = new THREE.GridHelper(140, 70, 0x2a3b5c, 0x141a26);
    gridHelper.position.y = 0;
    this.scene.add(gridHelper);

    // Build Venue Architecture and Stage Elements
    this.meshMap = new Map();
    this.rebuildScene();

    // Raycaster for picking
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.animate();
  }

  // Build Venue Architecture (KSPO DOME circular arena bowl vs Gocheok Sky Dome baseball stadium bowl)
  buildVenueArchitecture() {
    const THREE = window.THREE;
    if (this.venueGroup) {
      this.scene.remove(this.venueGroup);
    }
    this.venueGroup = new THREE.Group();
    this.venueGroup.name = 'venue-architecture';

    const isKspo = this.model?.venueId === 'kspo';

    if (isKspo) {
      // KSPO DOME: 120m circular arena bowl with tiered perimeter seating
      const standsMat = new THREE.MeshBasicMaterial({ color: 0x171d28, wireframe: true });
      // Tier 1 circular stands
      const t1Geom = new THREE.CylinderGeometry(40, 32, 6, 48, 4, true);
      const t1Mesh = new THREE.Mesh(t1Geom, standsMat);
      t1Mesh.position.y = 3;
      this.venueGroup.add(t1Mesh);

      // Tier 2 upper stands
      const t2Geom = new THREE.CylinderGeometry(56, 42, 10, 48, 6, true);
      const t2Mesh = new THREE.Mesh(t2Geom, standsMat);
      t2Mesh.position.y = 11;
      this.venueGroup.add(t2Mesh);

      // KSPO Cable Roof ring truss
      const ringGeom = new THREE.TorusGeometry(52, 0.6, 12, 48);
      ringGeom.rotateX(Math.PI / 2);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x334460 });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.position.y = 22;
      this.venueGroup.add(ringMesh);

    } else {
      // Gocheok Sky Dome: Diamond + horseshoe arched stadium bowl
      const standsMat = new THREE.MeshBasicMaterial({ color: 0x171d28, wireframe: true });
      // Horseshoe seating bowl
      const archGeom = new THREE.CylinderGeometry(52, 40, 16, 40, 6, true, 0, Math.PI * 1.3);
      archGeom.rotateY(-Math.PI * 0.65);
      const archMesh = new THREE.Mesh(archGeom, standsMat);
      archMesh.position.set(0, 8, 12);
      this.venueGroup.add(archMesh);

      // Gocheok High Arch Steel Trusses
      for (let i = -2; i <= 2; i++) {
        const trussArch = new THREE.TorusGeometry(48, 0.5, 8, 36, Math.PI);
        const archM = new THREE.Mesh(trussArch, new THREE.MeshBasicMaterial({ color: 0x24334a }));
        archM.position.set(0, 0, i * 15);
        this.venueGroup.add(archM);
      }
    }

    this.scene.add(this.venueGroup);
  }

  rebuildScene() {
    if (!this.scene) return;
    const THREE = window.THREE;

    // Update HUD titles
    const hudTitle = this.container.querySelector('#hud-3d-title');
    if (hudTitle) hudTitle.textContent = `3D STAGE: ${(this.model?.name || '').toUpperCase()}`;
    const hudVenue = this.container.querySelector('#hud-3d-venue');
    if (hudVenue) hudVenue.textContent = (this.model?.venueName || '').toUpperCase();

    // Remove old stage element meshes
    this.meshMap.forEach(({ group }) => this.scene.remove(group));
    this.meshMap.clear();

    // Rebuild venue fixed structure
    this.buildVenueArchitecture();

    // Build stage elements
    const elements = this.model?.elements || [];
    elements.forEach(el => {
      const group = new THREE.Group();
      group.name = el.id;
      group.userData = { element: el };

      let geom;
      const colorHex = parseInt((el.color || '#334455').replace('#', '0x'), 16) || 0x334455;
      const wireHex = parseInt((el.wireColor || '#8fb9ff').replace('#', '0x'), 16) || 0x8fb9ff;
      const [sx, sy, sz] = el.size3D || [10, 2, 10];

      if (el.shape === 'cylinder') {
        geom = new THREE.CylinderGeometry(sx / 2, sx / 2, sy, 32);
      } else {
        geom = new THREE.BoxGeometry(sx, sy, sz);
      }

      let mat;
      if (el.category === 'screen') {
        mat = new THREE.MeshBasicMaterial({ color: 0x112822 });
        const screenMesh = new THREE.Mesh(geom, mat);
        group.add(screenMesh);

        const edges = new THREE.EdgesGeometry(geom);
        const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x5fe8b9, linewidth: 2 }));
        group.add(wire);
      } else if (el.category === 'truss') {
        mat = new THREE.MeshBasicMaterial({ color: 0x111622, transparent: true, opacity: 0.35 });
        const boxMesh = new THREE.Mesh(geom, mat);
        group.add(boxMesh);

        const edges = new THREE.EdgesGeometry(geom);
        const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xe8a838, linewidth: 1.5 }));
        group.add(wire);
      } else if (el.category === 'sound') {
        mat = new THREE.MeshLambertMaterial({ color: 0x1a1226 });
        const spkMesh = new THREE.Mesh(geom, mat);
        group.add(spkMesh);

        const edges = new THREE.EdgesGeometry(geom);
        const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xc084fc, linewidth: 1.5 }));
        group.add(wire);
      } else {
        mat = new THREE.MeshLambertMaterial({ color: colorHex });
        const mesh = new THREE.Mesh(geom, mat);
        group.add(mesh);

        const edges = new THREE.EdgesGeometry(geom);
        const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: wireHex, linewidth: 1 }));
        group.add(wire);
      }

      const [px, py, pz] = el.pos3D || [0, 0, 0];
      group.position.set(px, py, pz);
      this.scene.add(group);
      this.meshMap.set(el.id, { group, el, defaultColor: colorHex, wireHex });
    });

    this.updateLayerVisibility();
  }

  updateLayerVisibility() {
    if (this.venueGroup) {
      this.venueGroup.visible = !!this.activeLayers.audience;
    }
    if (!this.meshMap) return;
    this.meshMap.forEach(({ group, el }) => {
      const isVisible = !!this.activeLayers[el.category];
      group.visible = isVisible;
    });
  }

  updateSelectionHighlight() {
    if (!this.meshMap) return;
    const THREE = window.THREE;
    this.meshMap.forEach(({ group, el }) => {
      const isSelected = el.id === this.selectedElementId;
      group.traverse(child => {
        if (child.isMesh && child.material) {
          if (isSelected) {
            child.material.emissive = new THREE.Color(0x8fb9ff);
            child.material.emissiveIntensity = 0.6;
          } else {
            if (child.material.emissive) child.material.emissive.setHex(0x000000);
          }
        }
      });
    });
  }

  updateCamera() {
    if (!this.camera) return;
    const x = this.orbit.target.x + this.orbit.radius * Math.sin(this.orbit.phi) * Math.cos(this.orbit.theta);
    const y = this.orbit.target.y + this.orbit.radius * Math.cos(this.orbit.phi);
    const z = this.orbit.target.z + this.orbit.radius * Math.sin(this.orbit.phi) * Math.sin(this.orbit.theta);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.orbit.target.x, this.orbit.target.y, this.orbit.target.z);

    const hudCam = this.container.querySelector('#hud-cam-name');
    if (hudCam) {
      hudCam.textContent = this.cameraView.toUpperCase();
    }
  }

  setupEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isDragging = true;
      } else if (e.button === 2) {
        this.isPanning = true;
      }
      this.prevMouse = { x: e.clientX, y: e.clientY };
      this.canvas.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.prevMouse.x;
        const dy = e.clientY - this.prevMouse.y;
        this.orbit.theta -= dx * 0.008;
        this.orbit.phi = Math.max(0.05, Math.min(Math.PI * 0.48, this.orbit.phi - dy * 0.008));
        this.prevMouse = { x: e.clientX, y: e.clientY };
        this.updateCamera();
      } else if (this.isPanning) {
        const dx = e.clientX - this.prevMouse.x;
        const dy = e.clientY - this.prevMouse.y;
        this.orbit.target.x -= dx * 0.08;
        this.orbit.target.y += dy * 0.08;
        this.prevMouse = { x: e.clientX, y: e.clientY };
        this.updateCamera();
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.isPanning = false;
      this.canvas.style.cursor = 'grab';
    });

    this.canvas.addEventListener('contextmenu', e => e.preventDefault());

    // Wheel Zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.06;
      this.orbit.radius = Math.max(this.orbit.minRadius, Math.min(this.orbit.maxRadius, this.orbit.radius + zoomDelta));
      this.updateCamera();
    }, { passive: false });

    // Object picking with Raycaster on Click
    this.canvas.addEventListener('click', (e) => {
      if (!this.raycaster || !this.camera) return;
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const objects = [];
      this.meshMap.forEach(({ group }) => {
        if (group.visible) objects.push(group);
      });

      const intersects = this.raycaster.intersectObjects(objects, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && (!obj.userData || !obj.userData.element)) {
          obj = obj.parent;
        }
        if (obj && obj.userData && obj.userData.element) {
          this.selectElement(obj.userData.element.id);
          return;
        }
      }
      this.selectElement(null);
    });

    window.addEventListener('resize', () => {
      if (!this.renderer || !this.camera) return;
      const rect = this.wrap.getBoundingClientRect();
      const w = rect.width || 800;
      const h = rect.height || 600;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.renderer) this.renderer.dispose();
  }

  // ── Smart Canvas 3D Fallback ──
  initCanvasFallback() {
    const ctx = this.canvas.getContext('2d');
    const renderFallback = () => {
      if (!this.canvas) return;
      const rect = this.wrap.getBoundingClientRect();
      const w = this.canvas.width = rect.width || 800;
      const h = this.canvas.height = rect.height || 600;

      ctx.fillStyle = '#090C12';
      ctx.fillRect(0, 0, w, h);

      // Grid Ground
      ctx.strokeStyle = 'rgba(143,185,255,0.12)';
      ctx.lineWidth = 1;
      const fov = 350;
      const camY = 28;
      const camZ = this.orbit.radius;

      const project = (x, y, z) => {
        const rad = this.orbit.theta;
        const rx = x * Math.cos(rad) - z * Math.sin(rad);
        const rz = x * Math.sin(rad) + z * Math.cos(rad) + camZ;
        const ry = y - camY;
        if (rz <= 5) return null;
        const scale = fov / rz;
        return {
          px: w/2 + rx * scale,
          py: h/2 - ry * scale,
          scale
        };
      };

      for (let z = -40; z <= 40; z += 10) {
        const p1 = project(-50, 0, z);
        const p2 = project(50, 0, z);
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }
      }

      const elements = this.model?.elements || [];
      elements.forEach(el => {
        if (!this.activeLayers[el.category]) return;
        const isSelected = el.id === this.selectedElementId;
        const [x, y, z] = el.pos3D || [0, 0, 0];
        const [sx, sy, sz] = el.size3D || [10, 2, 10];

        const corners = [
          [-sx/2, -sy/2, -sz/2], [sx/2, -sy/2, -sz/2], [sx/2, sy/2, -sz/2], [-sx/2, sy/2, -sz/2],
          [-sx/2, -sy/2, sz/2],  [sx/2, -sy/2, sz/2],  [sx/2, sy/2, sz/2],  [-sx/2, sy/2, sz/2]
        ].map(([cx, cy, cz]) => project(x + cx, y + cy, z + cz));

        if (corners.every(Boolean)) {
          ctx.fillStyle = isSelected ? 'rgba(143,185,255,0.45)' : (el.color + 'aa');
          ctx.strokeStyle = isSelected ? '#FFFFFF' : el.wireColor;
          ctx.lineWidth = isSelected ? 2 : 1;

          // Front face
          ctx.beginPath();
          ctx.moveTo(corners[4].px, corners[4].py);
          ctx.lineTo(corners[5].px, corners[5].py);
          ctx.lineTo(corners[6].px, corners[6].py);
          ctx.lineTo(corners[7].px, corners[7].py);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Top face
          ctx.beginPath();
          ctx.moveTo(corners[7].px, corners[7].py);
          ctx.lineTo(corners[6].px, corners[6].py);
          ctx.lineTo(corners[2].px, corners[2].py);
          ctx.lineTo(corners[3].px, corners[3].py);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      });
      this.animationId = requestAnimationFrame(renderFallback);
    };
    renderFallback();
  }
}

window.Stage3DReconstruction = Stage3DReconstruction;
