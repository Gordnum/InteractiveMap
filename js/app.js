(function () {
  "use strict";

  // ---------------------------------------------------------------
  // Data & pengaturan
  // ---------------------------------------------------------------
  const PATHS = window.MAP_PATHS;
  const PROVS = window.PROVINCES;
  const FULL_VIEW = [0, 0, 940, 360];
  const SVGNS = "http://www.w3.org/2000/svg";
  const SCHOOL = { x: 240.4, y: 254, prov: "Banten" }; // Pagedangan, Tangerang
  const TINY = ["DKI Jakarta", "Daerah Istimewa Yogyakarta"]; // diberi titik agar mudah diklik

  const REGIONS = [
    { id: "Sumatera", color: "#FB923C" },
    { id: "Jawa", color: "#F472B6" },
    { id: "Bali & Nusa Tenggara", color: "#FACC15" },
    { id: "Kalimantan", color: "#4ADE80" },
    { id: "Sulawesi", color: "#A78BFA" },
    { id: "Maluku", color: "#2DD4BF" },
    { id: "Papua", color: "#F87171" }
  ];
  const regionColor = Object.fromEntries(REGIONS.map(r => [r.id, r.color]));

  // Setiap provinsi diberi warna wilayahnya, dengan sedikit variasi terang-gelap
  // supaya provinsi yang bersebelahan tetap bisa dibedakan.
  const shade = (hex, amt) => {
    const n = parseInt(hex.slice(1), 16);
    const f = c => Math.max(0, Math.min(255, Math.round(c + (amt > 0 ? (255 - c) * amt : c * amt))));
    return "#" + [n >> 16, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, "0")).join("");
  };
  const SHADES = [0, -0.14, 0.22, -0.26, 0.1, 0.32];
  const regionIndex = {};
  PROVS.forEach(p => {
    const i = (regionIndex[p.wilayah] = (regionIndex[p.wilayah] ?? -1) + 1);
    p.color = shade(regionColor[p.wilayah], SHADES[i % SHADES.length]);
    p.geo = PATHS[p.nama];
    if (!p.geo) console.warn("Tidak ada bentuk peta untuk", p.nama);
  });
  const byName = Object.fromEntries(PROVS.map(p => [p.nama, p]));
  const IMAGES = window.PROVINCE_IMAGES || {};
  PROVS.forEach(p => { p.photos = IMAGES[p.nama] || []; });

  // ---------------------------------------------------------------
  // Helper
  // ---------------------------------------------------------------
  const $ = sel => document.querySelector(sel);
  const el = (tag, attrs = {}, html) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (html != null) e.innerHTML = html;
    return e;
  };
  const svgEl = (tag, attrs = {}) => {
    const e = document.createElementNS(SVGNS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const list = v => (v == null ? [] : Array.isArray(v) ? v : [v]);

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } }
  };

  // ---------------------------------------------------------------
  // Status aplikasi
  // ---------------------------------------------------------------
  const state = {
    mode: "jelajah",
    selected: null,
    region: null,
    visited: new Set(store.get("pn_visited", [])),
    view: FULL_VIEW.slice()
  };

  // ---------------------------------------------------------------
  // Menggambar peta
  // ---------------------------------------------------------------
  const svg = $("#map");
  const gProv = $("#provinces");
  const gMarkers = $("#markers");
  const gLabels = $("#labels");
  const tooltip = $("#tooltip");
  const mapCard = $("#mapCard");

  PROVS.forEach(p => {
    if (!p.geo) return;
    const path = svgEl("path", {
      d: p.geo.d, class: "prov", fill: p.color, tabindex: "0", role: "button",
      "aria-label": p.nama, "data-name": p.nama
    });
    gProv.appendChild(path);
    p.path = path;

    if (TINY.includes(p.nama)) {
      const [cx, cy] = p.geo.c;
      const dot = svgEl("circle", { cx, cy, r: 4.5, class: "marker", fill: p.color, "data-name": p.nama });
      const hit = svgEl("circle", { cx, cy, r: 9, class: "marker-hit", "data-name": p.nama });
      gMarkers.append(dot, hit);
      p.dot = dot;
    }
  });

  // Klik, hover, dan keyboard pada peta
  const provFromEvent = e => {
    const n = e.target.closest("[data-name]");
    return n ? byName[n.dataset.name] : null;
  };
  svg.addEventListener("click", e => {
    const p = provFromEvent(e);
    if (!p) return;
    if (state.mode === "tebak") tebakAnswer(p);
    else selectProvince(p);
  });
  svg.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const p = provFromEvent(e);
    if (!p) return;
    e.preventDefault();
    if (state.mode === "tebak") tebakAnswer(p); else selectProvince(p);
  });
  svg.addEventListener("mousemove", e => {
    const p = provFromEvent(e);
    if (!p || state.mode === "tebak") { tooltip.hidden = true; return; }
    const r = mapCard.getBoundingClientRect();
    tooltip.textContent = p.nama;
    tooltip.style.left = (e.clientX - r.left) + "px";
    tooltip.style.top = (e.clientY - r.top) + "px";
    tooltip.hidden = false;
  });
  svg.addEventListener("mouseleave", () => { tooltip.hidden = true; });

  // ---------------------------------------------------------------
  // Zoom halus (animasi viewBox)
  // ---------------------------------------------------------------
  let zoomAnim = null;
  // Perbandingan lebar:tinggi kotak peta di layar (di HP kotaknya lebih tinggi)
  function boxAR() {
    const r = svg.getBoundingClientRect();
    return r.width > 0 && r.height > 0 ? r.width / r.height : FULL_VIEW[2] / FULL_VIEW[3];
  }
  // Tampilan awal: di kotak yang tinggi (HP), sedikit diperbesar supaya peta memenuhi kotak
  function homeView() {
    const ar = boxAR(), full = FULL_VIEW[2] / FULL_VIEW[3];
    if (ar >= full) return fitBox([0, 0, 940, 360], 0, 0);
    const h = 360 / 0.8, w = h * ar; // pulau-pulau mengisi ±80% tinggi kotak
    return [470 - w / 2, 180 - h / 2, w, h];
  }
  function fitBox(b, padRatio = 0.25, minW = 110) {
    let [x1, y1, x2, y2] = b;
    let w = x2 - x1, h = y2 - y1;
    const cx = x1 + w / 2, cy = y1 + h / 2;
    w = Math.max(w * (1 + padRatio * 2), minW);
    const ar = boxAR();
    h = Math.max(h * (1 + padRatio * 2), minW / ar);
    // Sesuaikan dengan perbandingan ukuran kotak peta
    if (w / h > ar) h = w / ar; else w = h * ar;
    return [cx - w / 2, cy - h / 2, w, h];
  }
  function zoomTo(target, ms = 650) {
    cancelAnimationFrame(zoomAnim);
    const from = state.view.slice();
    const t0 = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = now => {
      const t = reduce ? 1 : Math.max(0, Math.min(1, (now - t0) / ms));
      const k = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      state.view = from.map((v, i) => v + (target[i] - v) * k);
      svg.setAttribute("viewBox", state.view.join(" "));
      updateLabelSize();
      if (t < 1) zoomAnim = requestAnimationFrame(step);
    };
    zoomAnim = requestAnimationFrame(step);
  }
  const zoomFull = () => zoomTo(homeView());

  // ---------------------------------------------------------------
  // Zoom bebas: roda mouse, tombol + / −, geser (drag), dan cubit (pinch)
  // ---------------------------------------------------------------
  const MIN_W = 45;   // paling dekat (lebar tampilan dalam satuan peta)
  const MAX_W = 940;  // paling jauh = seluruh Indonesia
  function clampView([x, y, w]) {
    w = Math.min(MAX_W, Math.max(MIN_W, w));
    const h = w / boxAR();
    // Titik tengah tampilan tidak boleh keluar dari peta
    const cx = Math.min(940, Math.max(0, x + w / 2));
    const cy = Math.min(360, Math.max(0, y + h / 2));
    if (w >= MAX_W) return [0, 180 - h / 2, MAX_W, h];
    return [cx - w / 2, cy - h / 2, w, h];
  }
  function setView(v) {
    cancelAnimationFrame(zoomAnim);
    state.view = clampView(v);
    svg.setAttribute("viewBox", state.view.join(" "));
    updateLabelSize();
  }
  // Ubah posisi layar (px) menjadi koordinat peta
  function toMap(clientX, clientY) {
    const r = svg.getBoundingClientRect();
    const [x, y, w, h] = state.view;
    return [x + (clientX - r.left) / r.width * w, y + (clientY - r.top) / r.height * h];
  }
  // Perbesar/perkecil dengan titik (px, py) tetap di tempatnya
  function zoomAround(factor, px, py, animate) {
    const [x, y, w, h] = state.view;
    const nw = Math.min(MAX_W, Math.max(MIN_W, w / factor));
    const k = nw / w;
    const target = clampView([px - (px - x) * k, py - (py - y) * k, nw]);
    if (animate) zoomTo(target, 300); else setView(target);
  }
  function zoomButton(factor) {
    const [x, y, w, h] = state.view;
    zoomAround(factor, x + w / 2, y + h / 2, true);
  }

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const [px, py] = toMap(e.clientX, e.clientY);
    const delta = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY; // baris → piksel
    // Satu putaran roda = paling banyak ±25%, supaya tidak terlalu cepat
    zoomAround(Math.min(1.25, Math.max(0.8, Math.exp(-delta * 0.0015))), px, py, false);
  }, { passive: false });

  const pointers = new Map();
  let drag = null;          // { startX, startY, view, moved }
  let pinch = null;         // { dist, view, mid }
  let suppressClick = false;

  svg.addEventListener("pointerdown", e => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      drag = { startX: e.clientX, startY: e.clientY, view: state.view.slice(), moved: false, id: e.pointerId };
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), view: state.view.slice(), mid: toMap((a.x + b.x) / 2, (a.y + b.y) / 2) };
      drag = null;
      suppressClick = true;
    }
  });
  svg.addEventListener("pointermove", e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size >= 2) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const [x, y, w] = pinch.view;
      const nw = Math.min(MAX_W, Math.max(MIN_W, w * pinch.dist / dist));
      // Titik tengah kedua jari tetap di bawah jari
      const r = svg.getBoundingClientRect();
      const fx = ((a.x + b.x) / 2 - r.left) / r.width, fy = ((a.y + b.y) / 2 - r.top) / r.height;
      setView([pinch.mid[0] - fx * nw, pinch.mid[1] - fy * nw / boxAR(), nw]);
      return;
    }
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return; // masih dianggap klik
    if (!drag.moved) {
      drag.moved = true;
      svg.setPointerCapture(e.pointerId);
      svg.classList.add("dragging");
      tooltip.hidden = true;
    }
    const r = svg.getBoundingClientRect();
    const [x, y, w, h] = drag.view;
    setView([x - dx / r.width * w, y - dy / r.height * h, w]);
  });
  const endPointer = e => {
    pointers.delete(e.pointerId);
    if (drag && drag.id === e.pointerId && drag.moved) suppressClick = true;
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) {
      drag = null;
      svg.classList.remove("dragging");
      // Klik yang datang setelah menggeser/mencubit diabaikan
      setTimeout(() => { suppressClick = false; }, 0);
    }
  };
  svg.addEventListener("pointerup", endPointer);
  svg.addEventListener("pointercancel", endPointer);
  svg.addEventListener("click", e => {
    if (suppressClick) { e.stopImmediatePropagation(); suppressClick = false; }
  }, true);

  $("#zoomIn").onclick = () => zoomButton(1.6);
  $("#zoomOut").onclick = () => zoomButton(1 / 1.6);
  const unionBox = ps => ps.reduce((b, p) => [Math.min(b[0], p.geo.b[0]), Math.min(b[1], p.geo.b[1]), Math.max(b[2], p.geo.b[2]), Math.max(b[3], p.geo.b[3])], [1e9, 1e9, -1e9, -1e9]);

  function updateLabelSize() {
    const scale = state.view[2] / 940; // 1 = tampilan penuh
    gLabels.querySelectorAll(".map-label").forEach(t => {
      t.setAttribute("font-size", (15 * scale).toFixed(2));
      t.setAttribute("stroke-width", (4 * scale).toFixed(2));
    });
    PROVS.forEach(p => {
      if (!p.dot) return;
      p.dot.setAttribute("r", (4.5 * scale).toFixed(2));
      p.dot.nextSibling.setAttribute("r", (9 * scale).toFixed(2));
    });
    gLabels.querySelectorAll(".school-pin").forEach(g => {
      g.setAttribute("transform", `translate(${SCHOOL.x} ${SCHOOL.y}) scale(${scale.toFixed(3)})`);
    });
  }

  // ---------------------------------------------------------------
  // Mode Jelajah: memilih provinsi
  // ---------------------------------------------------------------
  const panel = $("#panel");

  function selectProvince(p, { zoom = true } = {}) {
    state.selected = p;
    PROVS.forEach(q => {
      q.path.classList.toggle("selected", q === p);
      q.path.classList.toggle("dim", !!state.region && q.wilayah !== state.region && q !== p);
    });
    // Pindahkan ke paling atas agar garis tepinya terlihat
    gProv.appendChild(p.path);

    gLabels.innerHTML = "";
    const [cx, cy] = p.geo.c;
    const label = svgEl("text", { x: cx, y: cy, class: "map-label", dy: "0.35em" });
    label.textContent = p.nama;
    gLabels.appendChild(label);
    if (p.nama === SCHOOL.prov) {
      const pin = svgEl("g", { class: "school-pin" });
      pin.innerHTML = `<path d="M0 0 C-6 -9 -9 -12 -9 -16 a9 9 0 0 1 18 0 c0 4 -3 7 -9 16z" fill="#e53935" stroke="#fff" stroke-width="2"/><circle cx="0" cy="-16" r="3.5" fill="#fff"/><text x="12" y="-12" font-size="14" stroke-width="4">Sekolah kita</text>`;
      gLabels.appendChild(pin);
    }
    updateLabelSize();

    if (zoom) zoomTo(fitBox(p.geo.b, 0.35, 200));
    renderPanel(p);
    markVisited(p);
    $("#mapHint").hidden = true;
  }

  function featureCard(emoji, label, value, wide) {
    const v = list(value);
    if (!v.length) return "";
    return `<div class="feature${wide ? " wide" : ""}"><div class="f-label"><span class="e" aria-hidden="true">${emoji}</span>${label}</div><div class="f-value">${v.map(esc).join(", ")}</div></div>`;
  }

  function renderPanel(p) {
    const idx = PROVS.indexOf(p);
    const prev = PROVS[(idx - 1 + PROVS.length) % PROVS.length];
    const next = PROVS[(idx + 1) % PROVS.length];
    const bg = `linear-gradient(135deg, ${shade(regionColor[p.wilayah], 0.45)}, ${shade(regionColor[p.wilayah], 0.15)})`;

    panel.innerHTML = `
      <div class="panel-head" style="background:${bg}">
        <div class="panel-top">
          <div>
            <h2>${esc(p.nama)}</h2>
          </div>
          <div class="head-actions">
            <button class="icon-btn" id="speakBtn" title="Bacakan" aria-label="Bacakan info provinsi">🔊</button>
            <button class="icon-btn" id="closeBtn" title="Tutup" aria-label="Tutup">✕</button>
          </div>
        </div>
        <p class="capital">🏛️ Ibu kota: ${esc(p.ibukota)}</p>
        <div class="badges">
          <span class="badge">🏝️ ${esc(p.wilayah)}</span>
          ${p.julukan ? `<span class="badge">✨ ${esc(p.julukan)}</span>` : ""}
          ${p.nama === SCHOOL.prov ? `<span class="badge home">📍 Provinsi kita!</span>` : ""}
        </div>
      </div>
      ${galleryHTML(p)}
      <div class="panel-body">
        <p class="desc">${esc(p.deskripsi)}</p>

        <h3 class="section-title">🎨 Ciri Khas</h3>
        <div class="feature-grid">
          ${featureCard("🏠", "Rumah Adat", p.rumah, true)}
          ${featureCard("👘", "Pakaian Adat", p.pakaian, true)}
          ${featureCard("💃", "Tarian", p.tarian)}
          ${featureCard("🥁", "Alat Musik", p.musik)}
          ${featureCard("🎵", "Lagu Daerah", p.lagu)}
          ${featureCard("🍲", "Makanan Khas", p.makanan)}
          ${featureCard("🗡️", "Senjata Tradisional", p.senjata)}
          ${featureCard("📸", "Tempat Terkenal", p.tempat)}
          ${featureCard("🐾", "Alam & Hewan", p.hewan, true)}
        </div>

        ${p.tradisi && p.tradisi.length ? `
        <h3 class="section-title">🎉 Tradisi</h3>
        <ul class="tradisi">
          ${p.tradisi.map(([n, k]) => `<li><b>${esc(n)}</b>${esc(k)}</li>`).join("")}
        </ul>` : ""}

        ${p.fakta ? `<div class="fact"><b>💡 Tahukah kamu?</b><br>${esc(p.fakta)}</div>` : ""}

        <div class="panel-nav">
          <button class="btn light" id="prevBtn">◀ ${esc(prev.nama)}</button>
          <button class="btn light" id="nextBtn">${esc(next.nama)} ▶</button>
        </div>
      </div>`;
    panel.hidden = false;
    panel.scrollTop = 0;

    $("#closeBtn").onclick = closePanel;
    $("#prevBtn").onclick = () => selectProvince(prev);
    $("#nextBtn").onclick = () => selectProvince(next);
    $("#speakBtn").onclick = () => speak(p);
    setupGallery(p);

    if (window.matchMedia("(max-width: 1000px)").matches) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // ---------------------------------------------------------------
  // Galeri foto di kartu provinsi
  // ---------------------------------------------------------------
  const creditHTML = ph => `Foto: ${esc(ph.author)} · ${esc(ph.license)}${ph.source ? ` · <a href="${esc(ph.source)}" target="_blank" rel="noopener">sumber</a>` : ""}`;

  function galleryHTML(p) {
    if (!p.photos.length) return "";
    const multi = p.photos.length > 1;
    return `
      <div class="gallery" id="gallery">
        <div class="g-frame">
          ${p.photos.map((ph, i) => `<img src="${esc(ph.src)}" alt="${esc(ph.caption)}" class="g-img${i === 0 ? " show" : ""}" data-i="${i}">`).join("")}
          <div class="g-caption"><span id="gCaption">📸 ${esc(p.photos[0].caption)}</span></div>
          ${multi ? `<button class="g-arrow left" id="gPrev" aria-label="Foto sebelumnya">‹</button>
          <button class="g-arrow right" id="gNext" aria-label="Foto berikutnya">›</button>` : ""}
          <button class="g-zoom" id="gZoom" aria-label="Perbesar foto" title="Perbesar">⛶</button>
        </div>
        ${multi ? `<div class="g-dots">${p.photos.map((_, i) => `<button class="g-dot${i === 0 ? " on" : ""}" data-i="${i}" aria-label="Foto ${i + 1}"></button>`).join("")}</div>` : ""}
        <div class="g-credit" id="gCredit">${creditHTML(p.photos[0])}</div>
      </div>`;
  }

  function setupGallery(p) {
    const g = $("#gallery");
    if (!g) return;
    let cur = 0;
    const show = i => {
      cur = (i + p.photos.length) % p.photos.length;
      g.querySelectorAll(".g-img").forEach(im => im.classList.toggle("show", +im.dataset.i === cur));
      g.querySelectorAll(".g-dot").forEach(d => d.classList.toggle("on", +d.dataset.i === cur));
      $("#gCaption").textContent = "📸 " + p.photos[cur].caption;
      $("#gCredit").innerHTML = creditHTML(p.photos[cur]);
    };
    const prevB = $("#gPrev"), nextB = $("#gNext");
    if (prevB) prevB.onclick = () => show(cur - 1);
    if (nextB) nextB.onclick = () => show(cur + 1);
    g.querySelectorAll(".g-dot").forEach(d => { d.onclick = () => show(+d.dataset.i); });
    const open = () => openLightbox(p, cur);
    $("#gZoom").onclick = open;
    g.querySelectorAll(".g-img").forEach(im => { im.onclick = open; });
    // Geser (swipe) di layar sentuh
    let x0 = null;
    g.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    g.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // Tampilan foto besar (cocok untuk proyektor di kelas)
  const lightbox = $("#lightbox");
  let lb = null;
  function openLightbox(p, i) {
    lb = { p, i };
    renderLightbox();
    lightbox.hidden = false;
    $("#lbClose").focus();
  }
  function renderLightbox() {
    const ph = lb.p.photos[lb.i];
    const multi = lb.p.photos.length > 1;
    lightbox.innerHTML = `
      <div class="lb-inner" role="dialog" aria-modal="true" aria-label="${esc(ph.caption)}">
        <img src="${esc(ph.src)}" alt="${esc(ph.caption)}">
        <div class="lb-caption"><b>${esc(ph.caption)}</b> — ${esc(lb.p.nama)}<div class="g-credit light">${creditHTML(ph)}</div></div>
        ${multi ? `<button class="g-arrow left" id="lbPrev" aria-label="Foto sebelumnya">‹</button><button class="g-arrow right" id="lbNext" aria-label="Foto berikutnya">›</button>` : ""}
        <button class="lb-close" id="lbClose" aria-label="Tutup">✕</button>
      </div>`;
    $("#lbClose").onclick = closeLightbox;
    if (multi) {
      $("#lbPrev").onclick = () => { lb.i = (lb.i - 1 + lb.p.photos.length) % lb.p.photos.length; renderLightbox(); };
      $("#lbNext").onclick = () => { lb.i = (lb.i + 1) % lb.p.photos.length; renderLightbox(); };
    }
  }
  function closeLightbox() { lightbox.hidden = true; lightbox.innerHTML = ""; lb = null; }
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (lb) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && $("#lbNext")) $("#lbNext").click();
      if (e.key === "ArrowLeft" && $("#lbPrev")) $("#lbPrev").click();
    } else if (e.key === "Escape" && !$("#creditsDialog").hidden) {
      $("#creditsDialog").hidden = true;
    }
  });

  // Daftar sumber semua foto
  $("#creditsBtn").onclick = () => {
    const rows = PROVS.filter(p => p.photos.length).map(p => `
      <h4>${esc(p.nama)}</h4>
      <ul>${p.photos.map(ph => `<li><b>${esc(ph.caption)}</b> — ${creditHTML(ph)}</li>`).join("")}</ul>`).join("");
    $("#creditsBody").innerHTML = rows || "<p>Belum ada foto.</p>";
    $("#creditsDialog").hidden = false;
  };
  $("#creditsClose").onclick = () => { $("#creditsDialog").hidden = true; };
  $("#creditsDialog").addEventListener("click", e => { if (e.target.id === "creditsDialog") e.target.hidden = true; });

  function closePanel() {
    stopSpeaking();
    state.selected = null;
    panel.hidden = true;
    gLabels.innerHTML = "";
    PROVS.forEach(q => {
      q.path.classList.remove("selected");
      q.path.classList.toggle("dim", !!state.region && q.wilayah !== state.region);
    });
    if (state.region) zoomTo(fitBox(unionBox(PROVS.filter(q => q.wilayah === state.region)), 0.08));
    else zoomFull();
  }

  // ---------------------------------------------------------------
  // Membacakan teks (Text-to-Speech)
  // ---------------------------------------------------------------
  function speak(p) {
    if (!("speechSynthesis" in window)) { alert("Maaf, browser ini belum bisa membacakan teks."); return; }
    if (speechSynthesis.speaking) { stopSpeaking(); return; }
    const parts = [
      `Provinsi ${p.nama}. Ibu kotanya ${p.ibukota}.`,
      p.deskripsi,
      p.rumah && `Rumah adatnya ${p.rumah}.`,
      p.tarian && `Tariannya antara lain ${list(p.tarian).join(", ")}.`,
      p.makanan && `Makanan khasnya ${list(p.makanan).join(", ")}.`,
      p.fakta && `Tahukah kamu? ${p.fakta}`
    ].filter(Boolean);
    const u = new SpeechSynthesisUtterance(parts.join(" ").replace(/\(|\)/g, ", "));
    u.lang = "id-ID";
    u.rate = 0.92;
    const voice = speechSynthesis.getVoices().find(v => v.lang && v.lang.toLowerCase().startsWith("id"));
    if (voice) u.voice = voice;
    const btn = $("#speakBtn");
    if (btn) btn.textContent = "⏹️";
    u.onend = u.onerror = () => { const b = $("#speakBtn"); if (b) b.textContent = "🔊"; };
    speechSynthesis.speak(u);
  }
  function stopSpeaking() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }

  // ---------------------------------------------------------------
  // Stempel provinsi yang sudah dijelajahi
  // ---------------------------------------------------------------
  function markVisited(p) {
    const before = state.visited.size;
    state.visited.add(p.nama);
    store.set("pn_visited", [...state.visited]);
    $("#visitedCount").textContent = state.visited.size;
    if (state.visited.size === PROVS.length && before < PROVS.length) {
      confetti(120);
      setTimeout(() => alert("🎉 Hebat! Kamu sudah menjelajahi seluruh 38 provinsi Indonesia!"), 400);
    }
  }
  $("#visitedCount").textContent = state.visited.size;

  // ---------------------------------------------------------------
  // Pilihan pulau (chip) dan pencarian
  // ---------------------------------------------------------------
  const chips = $("#regionChips");
  chips.appendChild(Object.assign(el("button", { class: "chip active", "data-region": "" }, "🌏 Semua")));
  REGIONS.forEach(r => chips.appendChild(el("button", { class: "chip", "data-region": r.id }, `<span class="dot" style="background:${r.color}"></span>${esc(r.id)}`)));
  chips.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    setRegion(b.dataset.region || null);
  });
  function setRegion(region) {
    state.region = region;
    chips.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", (c.dataset.region || null) === region));
    PROVS.forEach(q => q.path.classList.toggle("dim", !!region && q.wilayah !== region && q !== state.selected));
    if (state.mode === "tebak") return;
    if (region) zoomTo(fitBox(unionBox(PROVS.filter(q => q.wilayah === region)), 0.08));
    else zoomFull();
  }

  const searchInput = $("#searchInput");
  const searchList = $("#searchList");
  let hlIndex = -1;
  function renderSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { searchList.hidden = true; return; }
    const hits = PROVS.filter(p =>
      p.nama.toLowerCase().includes(q) || p.ibukota.toLowerCase().includes(q)
    ).slice(0, 10);
    hlIndex = hits.length ? 0 : -1;
    searchList.innerHTML = hits.length
      ? hits.map((p, i) => `<li role="option" data-name="${esc(p.nama)}" class="${i === 0 ? "hl" : ""}"><span class="dot" style="display:inline-block;width:11px;height:11px;border-radius:50%;background:${p.color}"></span>${esc(p.nama)}<small>${esc(p.ibukota)}</small></li>`).join("")
      : `<li style="cursor:default">Tidak ditemukan 😕</li>`;
    searchList.hidden = false;
  }
  function chooseSearch(name) {
    const p = byName[name];
    if (!p) return;
    searchInput.value = "";
    searchList.hidden = true;
    if (state.mode !== "jelajah") setMode("jelajah");
    selectProvince(p);
  }
  searchInput.addEventListener("input", renderSearch);
  searchInput.addEventListener("keydown", e => {
    const items = [...searchList.querySelectorAll("li[data-name]")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!items.length) return;
      hlIndex = (hlIndex + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items.forEach((li, i) => li.classList.toggle("hl", i === hlIndex));
    } else if (e.key === "Enter" && items[hlIndex]) {
      chooseSearch(items[hlIndex].dataset.name);
    } else if (e.key === "Escape") {
      searchList.hidden = true;
    }
  });
  searchList.addEventListener("click", e => {
    const li = e.target.closest("li[data-name]");
    if (li) chooseSearch(li.dataset.name);
  });
  document.addEventListener("click", e => { if (!e.target.closest(".search")) searchList.hidden = true; });

  $("#resetZoom").onclick = () => { if (state.mode === "jelajah" && state.selected) closePanel(); else { setRegion(null); zoomFull(); } };
  $("#randomBtn").onclick = () => {
    if (state.mode !== "jelajah") return;
    const unvisited = PROVS.filter(p => !state.visited.has(p.nama) && p !== state.selected);
    selectProvince(pick(unvisited.length ? unvisited : PROVS.filter(p => p !== state.selected)));
  };

  // ---------------------------------------------------------------
  // Pindah mode (Jelajah / Kuis / Tebak Lokasi)
  // ---------------------------------------------------------------
  document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => setMode(t.dataset.mode)));

  function setMode(mode) {
    state.mode = mode;
    stopSpeaking();
    document.querySelectorAll(".tab").forEach(t => {
      const on = t.dataset.mode === mode;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on);
    });
    $("#mapView").hidden = mode === "kuis";
    $("#quizView").hidden = mode !== "kuis";
    $("#tebakPanel").hidden = mode !== "tebak";
    $("#randomBtn").hidden = mode !== "jelajah";
    $("#mapHint").hidden = mode !== "jelajah" || !!state.selected;

    if (mode === "jelajah") {
      clearTebakMarks();
      if (state.selected) selectProvince(state.selected, { zoom: false });
      else { panel.hidden = true; }
    } else {
      panel.hidden = true;
      gLabels.innerHTML = "";
      PROVS.forEach(q => q.path.classList.remove("selected"));
    }
    if (mode === "kuis") startQuiz();
    if (mode === "tebak") { setRegion(null); zoomFull(); startTebak(); }
  }

  // ---------------------------------------------------------------
  // Mode Kuis (pilihan ganda)
  // ---------------------------------------------------------------
  const quizCard = $("#quizCard");
  const QUIZ_LEN = 10;
  let quiz = null;

  // Item yang muncul di lebih dari satu provinsi (mis. "Keris") tidak dipakai sebagai soal
  // "berasal dari mana", dan provinsi lain yang punya item sama tidak dijadikan pilihan salah.
  // Dicek secara "mengandung", jadi "Rumah Joglo" juga cocok dengan "Bangsal Kencono dan Rumah Joglo".
  const norm = s => s.toLowerCase();
  const hasItem = (p, field, item) => list(p[field]).some(v => norm(v).includes(norm(item)) || norm(item).includes(norm(v)));
  const owners = (field, item) => PROVS.filter(p => hasItem(p, field, item));

  const PHOTO_POOL = PROVS.flatMap(p => p.photos.map(ph => [p, ph]));

  const QUESTION_TYPES = [
    ...(PHOTO_POOL.length ? [{ cat: "📸 Tebak Foto", weight: 3, make() {
        const [p, ph] = pick(PHOTO_POOL);
        const q = provinceQuestion(p, "Foto ini ada di provinsi mana?", () => true, `Ini adalah ${ph.caption}, di ${p.nama}.`);
        q.photo = ph;
        q.key = ph.src;
        return q;
    } }] : []),
    { cat: "🏛️ Ibu Kota", make() {
        const p = pick(PROVS);
        const wrong = shuffle(PROVS.filter(q => q !== p)).slice(0, 3).map(q => q.ibukota);
        return { q: `Apa ibu kota provinsi ${p.nama}?`, answer: p.ibukota, options: [p.ibukota, ...wrong], prov: p,
          explain: `Ibu kota provinsi ${p.nama} adalah ${p.ibukota}.` };
    } },
    { cat: "🏛️ Ibu Kota", make() {
        const p = pick(PROVS);
        return provinceQuestion(p, `Kota ${p.ibukota} adalah ibu kota provinsi…`, () => true,
          `${p.ibukota} adalah ibu kota provinsi ${p.nama}.`);
    } },
    ...[
      ["rumah", "🏠 Rumah Adat", v => `Rumah adat "${v}" berasal dari provinsi…`, (v, p) => `${v} adalah rumah adat dari ${p.nama}.`],
      ["tarian", "💃 Tarian", v => `${v} adalah tarian dari provinsi…`, (v, p) => `${v} berasal dari ${p.nama}.`],
      ["makanan", "🍲 Makanan Khas", v => `${v} adalah makanan khas dari provinsi…`, (v, p) => `${v} adalah makanan khas ${p.nama}.`],
      ["musik", "🥁 Alat Musik", v => `Alat musik ${v} berasal dari provinsi…`, (v, p) => `${v} adalah alat musik dari ${p.nama}.`],
      ["lagu", "🎵 Lagu Daerah", v => `Lagu daerah "${v}" berasal dari provinsi…`, (v, p) => `Lagu "${v}" berasal dari ${p.nama}.`],
      ["tempat", "📸 Tempat Terkenal", v => `${v} berada di provinsi…`, (v, p) => `${v} ada di ${p.nama}.`],
      ["senjata", "🗡️ Senjata Tradisional", v => `Senjata tradisional ${v} berasal dari provinsi…`, (v, p) => `${v} adalah senjata tradisional ${p.nama}.`]
    ].map(([field, cat, ask, explain]) => ({
      cat, make() {
        const candidates = [];
        PROVS.forEach(p => list(p[field]).forEach(v => { if (owners(field, v).length === 1) candidates.push([p, v]); }));
        if (!candidates.length) return null;
        const [p, v] = pick(candidates);
        return provinceQuestion(p, ask(v), q => !hasItem(q, field, v), explain(v, p));
      }
    }))
  ];

  function provinceQuestion(p, text, allowed, explain) {
    // Pilihan salah diutamakan dari pulau yang sama agar soal lebih menantang
    const same = shuffle(PROVS.filter(q => q !== p && q.wilayah === p.wilayah && allowed(q)));
    const others = shuffle(PROVS.filter(q => q !== p && q.wilayah !== p.wilayah && allowed(q)));
    const wrong = [...same.slice(0, 1), ...others].slice(0, 3).map(q => q.nama);
    return { q: text, answer: p.nama, options: [p.nama, ...wrong], prov: p, explain };
  }

  const WEIGHTED_TYPES = QUESTION_TYPES.flatMap(t => Array(t.weight || 1).fill(t));

  function startQuiz() {
    const qs = [];
    const seen = new Set();
    let guard = 0;
    while (qs.length < QUIZ_LEN && guard++ < 500) {
      const type = pick(WEIGHTED_TYPES);
      const item = type.make();
      if (!item || seen.has(item.key || item.q)) continue;
      seen.add(item.key || item.q);
      item.cat = type.cat;
      item.options = shuffle(item.options);
      qs.push(item);
    }
    quiz = { qs, i: 0, score: 0 };
    renderQuestion();
  }

  function renderQuestion() {
    const { qs, i, score } = quiz;
    const item = qs[i];
    quizCard.innerHTML = `
      <div class="quiz-meta"><span>Soal ${i + 1} dari ${qs.length}</span><span>⭐ Skor: ${score}</span></div>
      <div class="bar"><div style="width:${(i / qs.length) * 100}%"></div></div>
      <span class="q-cat">${item.cat}</span>
      <h2 class="q-text">${esc(item.q)}</h2>
      ${item.photo ? `<figure class="q-photo"><img src="${esc(item.photo.src)}" alt="Foto tebakan"><figcaption class="g-credit">${creditHTML(item.photo)}</figcaption></figure>` : ""}
      <div class="options">
        ${item.options.map((o, k) => `<button class="opt" data-v="${esc(o)}"><span class="key">${"ABCD"[k]}</span>${esc(o)}</button>`).join("")}
      </div>
      <div id="qFeedback"></div>`;
    quizCard.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => answerQuestion(b)));
  }

  function answerQuestion(btn) {
    const item = quiz.qs[quiz.i];
    const ok = btn.dataset.v === item.answer;
    quizCard.querySelectorAll(".opt").forEach(b => {
      b.disabled = true;
      if (b.dataset.v === item.answer) b.classList.add("correct");
    });
    if (!ok) btn.classList.add("wrong");
    if (ok) { quiz.score++; confetti(25); }
    const last = quiz.i === quiz.qs.length - 1;
    $("#qFeedback").innerHTML = `
      <div class="q-feedback ${ok ? "good" : "bad"}">${ok ? "✅ Benar! Hebat!" : "❌ Belum tepat."} ${esc(item.explain)}</div>
      <div class="q-actions">
        <button class="btn light" id="qLearn">🗺️ Pelajari ${esc(item.prov.nama)}</button>
        <button class="btn orange" id="qNext">${last ? "Lihat Hasil 🏆" : "Soal Berikutnya ▶"}</button>
      </div>`;
    quizCard.querySelector(".quiz-meta span:last-child").textContent = `⭐ Skor: ${quiz.score}`;
    $("#qNext").onclick = () => { if (last) renderResult(); else { quiz.i++; renderQuestion(); } };
    $("#qLearn").onclick = () => { setMode("jelajah"); selectProvince(item.prov); };
    $("#qNext").focus();
  }

  function renderResult() {
    const { score, qs } = quiz;
    const ratio = score / qs.length;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio > 0 ? 1 : 0;
    const msg = ratio >= 0.9 ? "Luar biasa! Kamu ahli Nusantara! 🎉" : ratio >= 0.6 ? "Bagus sekali! Terus belajar ya! 👍" : "Ayo jelajahi peta lagi, lalu coba kuisnya sekali lagi! 💪";
    const best = Math.max(score, store.get("pn_best_quiz", 0));
    store.set("pn_best_quiz", best);
    quizCard.innerHTML = `
      <div class="center">
        <h2>Kuis Selesai!</h2>
        <div class="stars" aria-label="${stars} bintang">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="result-score">${score} / ${qs.length}</div>
        <p style="font-weight:800;font-size:1.15rem">${msg}</p>
        <p style="color:var(--ink-soft);font-weight:700">Skor terbaikmu: ${best} / ${qs.length}</p>
        <div class="q-actions" style="justify-content:center">
          <button class="btn light" id="toMap">🗺️ Kembali ke Peta</button>
          <button class="btn orange" id="again">🔄 Main Lagi</button>
        </div>
      </div>`;
    if (stars >= 2) confetti(100);
    $("#again").onclick = startQuiz;
    $("#toMap").onclick = () => setMode("jelajah");
  }

  // ---------------------------------------------------------------
  // Mode Tebak Lokasi (klik provinsi yang benar di peta)
  // ---------------------------------------------------------------
  const tebakPanel = $("#tebakPanel");
  const TEBAK_LEN = 10;
  let tebak = null;

  function startTebak() {
    tebak = { order: shuffle(PROVS).slice(0, TEBAK_LEN), i: 0, score: 0, locked: false };
    renderTebak();
  }
  function clearTebakMarks() {
    PROVS.forEach(q => {
      q.path.classList.remove("correct", "wrong");
      if (q.dot) q.dot.classList.remove("correct", "wrong");
    });
  }
  function renderTebak(feedback = "", cls = "") {
    const target = tebak.order[tebak.i];
    tebakPanel.innerHTML = `
      <div class="big" aria-hidden="true">📍</div>
      <div style="font-weight:800;color:var(--ink-soft)">Ronde ${tebak.i + 1} dari ${tebak.order.length}</div>
      <div>Di mana letak provinsi…</div>
      <div class="tebak-target">${esc(target.nama)}</div>
      <div style="font-weight:700;color:var(--ink-soft)">Petunjuk: ada di wilayah <b>${esc(target.wilayah)}</b></div>
      <div class="feedback ${cls}" id="tebakFb">${feedback}</div>
      <div class="tebak-score"><span>✅ ${tebak.score}</span><span>🎯 ${tebak.i}/${tebak.order.length}</span></div>
      <button class="btn light" id="tebakRestart">🔄 Mulai Ulang</button>`;
    $("#tebakRestart").onclick = () => { clearTebakMarks(); startTebak(); };
  }
  function tebakAnswer(p) {
    if (!tebak || tebak.locked) return;
    const target = tebak.order[tebak.i];
    tebak.locked = true;
    clearTebakMarks();
    const fb = $("#tebakFb");
    const mark = (q, c) => { q.path.classList.add(c); gProv.appendChild(q.path); if (q.dot) q.dot.classList.add(c); };
    if (p === target) {
      tebak.score++;
      mark(p, "correct");
      fb.className = "feedback good";
      fb.textContent = `✅ Benar! Itu ${target.nama}.`;
      confetti(20);
    } else {
      mark(p, "wrong");
      mark(target, "correct");
      fb.className = "feedback bad";
      fb.textContent = `❌ Itu ${p.nama}. ${target.nama} yang berkedip hijau.`;
    }
    setTimeout(() => {
      clearTebakMarks();
      tebak.i++;
      tebak.locked = false;
      if (tebak.i < tebak.order.length) renderTebak();
      else tebakResult();
    }, p === target ? 1300 : 2300);
  }
  function tebakResult() {
    const { score, order } = tebak;
    const stars = score >= 9 ? 3 : score >= 6 ? 2 : score > 0 ? 1 : 0;
    tebakPanel.innerHTML = `
      <div class="big" aria-hidden="true">🏆</div>
      <h2>Permainan Selesai!</h2>
      <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
      <div class="result-score">${score} / ${order.length}</div>
      <p style="font-weight:800">${score >= 9 ? "Kamu penjelajah hebat! 🧭" : score >= 6 ? "Bagus! Sedikit lagi jadi ahli peta! 👍" : "Ayo latihan lagi di mode Jelajah! 💪"}</p>
      <button class="btn orange" id="tebakAgain">🔄 Main Lagi</button>`;
    if (stars >= 2) confetti(100);
    $("#tebakAgain").onclick = startTebak;
  }

  // ---------------------------------------------------------------
  // Konfeti
  // ---------------------------------------------------------------
  function confetti(n) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = $("#confetti");
    const colors = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#1e88e5", "#8e24aa", "#ffffff"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("i");
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = pick(colors);
      c.style.animationDuration = 1.6 + Math.random() * 1.8 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      box.appendChild(c);
      setTimeout(() => c.remove(), 4000);
    }
  }

  // ---------------------------------------------------------------
  // Mulai
  // ---------------------------------------------------------------
  zoomTo(homeView(), 1);
  // Atur ulang tampilan setiap kali ukuran kotak peta berubah
  const refit = () => {
    if (!svg.getBoundingClientRect().width) return;
    if (state.mode === "tebak" || !state.selected) {
      if (state.region && state.mode !== "tebak") zoomTo(fitBox(unionBox(PROVS.filter(q => q.wilayah === state.region)), 0.08), 1);
      else zoomTo(homeView(), 1);
    } else zoomTo(fitBox(state.selected.geo.b, 0.35, 200), 1);
  };
  if ("ResizeObserver" in window) new ResizeObserver(refit).observe(svg);
  else window.addEventListener("resize", refit);
  if ("speechSynthesis" in window) speechSynthesis.getVoices(); // memuat daftar suara lebih awal
})();
