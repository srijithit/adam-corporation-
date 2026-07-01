/* ============================================================
   ADAM CORPORATION — Main App Router & Core Logic
   ============================================================ */

window.AK = window.AK || {};

/* ─── State ──────────────────────────────────────────────── */
AK.currentPage   = 'home';
AK.selectedPanel = null;

/* ─── Router ─────────────────────────────────────────────── */
AK.navigate = function(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (!target) return;
  target.classList.add('active', 'page-enter');
  setTimeout(() => target.classList.remove('page-enter'), 400);

  AK.currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL hash without causing infinite loop
  const targetHash = (page === 'manage') ? 'admin' : page;
  if (window.location.hash.slice(1) !== targetHash) {
    window.location.hash = targetHash;
  }

  // Page-specific init
  if (page === 'mobile')  AK.initPanel('mobile');
  if (page === 'pc')      AK.initPanel('pc');
  if (page === 'guild')   { AK.initGuild(); AK.renderGuildRules(); }
  if (page === 'free')    AK.initFreePanel();
  if (page === 'support') AK.initSupport();
  if (page === 'settings') AK.renderSettings();
  if (page === 'manage')   AK.initCRUD();
  if (page === 'home')    AK.initParticles();

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
};

/* ─── Panel Page Init ────────────────────────────────────── */
AK.initPanel = function(type) {
  AK.loadPanels();
  const data = AK.panels[type];
  if (!data) return;

  // Set banner
  const banner = document.getElementById(`${type}PanelBanner`);
  if (banner) banner.src = data.banner;

  // Set title
  const title = document.getElementById(`${type}PanelTitle`);
  if (title) title.textContent = data.title[AK.currentLang] || data.title['en'];

  const desc = document.getElementById(`${type}PanelDesc`);
  if (desc) desc.textContent = data.description[AK.currentLang] || data.description['en'];

  // Render option cards
  const grid = document.getElementById(`${type}OptionsGrid`);
  if (!grid) return;

  grid.innerHTML = data.options.map((opt, i) => {
    const optTitle = opt.title[AK.currentLang] || opt.title['en'] || 'Unnamed';
    const optDesc = opt.description[AK.currentLang] || opt.description['en'] || '';
    return `
      <div class="panel-option-card hover-float" onclick="AK.selectPanel('${type}', ${i})" id="${type}OptionCard${i}">
        ${opt.popular ? '<div class="popular-ribbon">⭐ POPULAR</div>' : ''}
        <img class="panel-option-img" src="${opt.image}" alt="${optTitle}" onerror="this.style.background='var(--gradient-card)';this.style.height='160px'">
        <div class="panel-option-body">
          <div class="panel-option-title">${optTitle}</div>
          <div class="panel-option-desc">${optDesc}</div>
          <div style="margin-top:1rem;display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:Orbitron,monospace;font-size:1.2rem;font-weight:800;color:var(--primary)">${opt.price}</span>
            <span style="font-size:0.72rem;color:var(--text-muted);font-family:Rajdhani,sans-serif;text-transform:uppercase;letter-spacing:0.08em">${opt.priceNote}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Hide detail drawer
  const detail = document.getElementById(`${type}PanelDetail`);
  if (detail) detail.classList.remove('visible');
};

/* ─── Select Panel Option ────────────────────────────────── */
AK.selectPanel = function(type, index) {
  const data = AK.panels[type];
  if (!data) return;

  const opt = data.options[index];

  // Mark selected visual card
  document.querySelectorAll(`#${type}OptionsGrid .panel-option-card`).forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });

  // Show detail drawer
  const detail = document.getElementById(`${type}PanelDetail`);
  if (!detail) return;

  const strings = AK.lang[AK.currentLang];
  const optTitle = opt.title[AK.currentLang] || opt.title['en'] || 'Unnamed';
  const optDesc = opt.description[AK.currentLang] || opt.description['en'] || '';
  
  // Localized features list
  const featuresList = opt.features[AK.currentLang] || opt.features['en'] || [];

  const whatsappMsg = encodeURIComponent(
    `Hello ADAM CORPORATION! I want to buy:\n\n*${optTitle}*\nPrice: ${opt.price}/${opt.priceNote}\n\nPanel Type: ${data.title[AK.currentLang] || data.title['en']}\nSent from ADAM CORPORATION Website`
  );
  const telegramMsg = encodeURIComponent(`Hello ADAM CORPORATION! I want to buy ${optTitle} (${opt.price}/${opt.priceNote})`);

  detail.innerHTML = `
    <div class="panel-detail-header">
      <img src="${opt.image}" alt="${optTitle}" onerror="this.style.display='none'">
      <div class="panel-detail-info">
        <h2>${optTitle}</h2>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">${optDesc}</p>
      </div>
    </div>
    <div class="panel-detail-features">
      ${featuresList.map(f => `<span class="feature-tag">✦ ${f}</span>`).join('')}
    </div>
    <div class="panel-price-box">
      <div>
        <div style="font-size:0.72rem;font-family:Rajdhani,sans-serif;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px">${strings.price}</div>
        <div class="panel-price">${opt.price} <span>/ ${opt.priceNote}</span></div>
      </div>
      <button class="btn btn-primary btn-lg" onclick="window.open('https://wa.me/${AK.config.whatsappOwner}?text=${whatsappMsg}','_blank')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${strings.buyNow}
      </button>
    </div>
    <div class="panel-action-btns">
      <a class="btn btn-whatsapp" href="https://wa.me/${AK.config.whatsappOwner}?text=${whatsappMsg}" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        ${strings.whatsapp}
      </a>
      <a class="btn btn-telegram" href="https://t.me/${AK.config.telegram}?text=${telegramMsg}" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        ${strings.telegram}
      </a>
    </div>
  `;

  detail.classList.add('visible');
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

/* ─── Settings Page Render ───────────────────────────────── */
AK.renderSettings = function() {
  // Theme options
  const themeGrid = document.getElementById('themeGrid');
  if (themeGrid) {
    const themes = [
      { id: 'gold-black',   name: 'Gold + Black',   colors: ['#d4af37','#050507'] },
      { id: 'red-black',   name: 'Red + Black',   colors: ['#e8003d','#050508'] },
      { id: 'black-blue',  name: 'Black + Blue',  colors: ['#0066ff','#050a12'] },
      { id: 'green-white', name: 'Green + White', colors: ['#00c853','#ffffff'] },
      { id: 'yellow-black',name: 'Yellow + Black',colors: ['#ffd700','#0a0a00'] },
      { id: 'dark',        name: 'Dark Mode',     colors: ['#9c6fff','#0c0c10'] },
      { id: 'light',       name: 'Light Mode',    colors: ['#d4af37','#fcfbf8'] },
    ];
    themeGrid.innerHTML = themes.map(t => `
      <div class="theme-option ${AK.currentTheme === t.id ? 'active' : ''}" data-theme="${t.id}" onclick="AK.applyTheme('${t.id}')">
        <div class="theme-swatch" style="background:linear-gradient(135deg,${t.colors[0]},${t.colors[1]})"></div>
        <div class="theme-name">${t.name}</div>
      </div>
    `).join('');
  }

  // Language options
  const langGrid = document.getElementById('langGrid');
  if (langGrid) {
    const langs = [
      { id: 'en', name: 'English', flag: '🇬🇧' },
      { id: 'ta', name: 'Tamil',   flag: '🇮🇳' },
      { id: 'hi', name: 'Hindi',   flag: '🇮🇳' },
    ];
    langGrid.innerHTML = langs.map(l => `
      <div class="lang-option ${AK.currentLang === l.id ? 'active' : ''}" data-lang="${l.id}" onclick="AK.applyLang('${l.id}')">
        <div class="lang-flag">${l.flag}</div>
        <div class="lang-name">${l.name}</div>
      </div>
    `).join('');
  }
};

/* ─── Support Chat ───────────────────────────────────────── */
AK.initSupport = function() {
  const msgs = document.getElementById('supportMessages');
  if (!msgs || msgs.children.length > 0) return;

  // Welcome message
  setTimeout(() => {
    AK.supportBotMsg('Hello! 👋 Welcome to ADAM CORPORATION Support.\n\nPlease type your message/question and we will redirect you to WhatsApp shortly!');
  }, 400);
};

AK.supportBotMsg = function(text) {
  const msgs = document.getElementById('supportMessages');
  if (!msgs) return;

  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `<div class="chat-msg-avatar">AI</div><div class="chat-msg-bubble" style="white-space:pre-line">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
};

AK.supportSend = function() {
  const input = document.getElementById('supportInput');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  input.value = '';

  const msgs = document.getElementById('supportMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="chat-msg-bubble">${val}</div><div class="chat-msg-avatar">YOU</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;

  // Bot redirection note
  setTimeout(() => {
    AK.supportBotMsg('✅ Your message has been compiled. Opening Discord Support...');
    setTimeout(() => {
      window.open(AK.config.discord, '_blank');
    }, 1200);
  }, 800);
};

/* ─── Free Panel ─────────────────────────────────────────── */
AK.freeVerified = { instagram: false, youtube: false, discord: false };

AK.initFreePanel = function() {
  AK.freeVerified = { instagram: false, youtube: false, discord: false };
  document.querySelectorAll('.verification-step').forEach(el => el.classList.remove('done'));
  
  const fl = document.getElementById('freePanelLogin');
  if (fl) fl.style.display = 'none';

  const fv = document.getElementById('freeVerifyBox');
  if (fv) fv.style.display = 'block';
};

AK.verifyStep = function(platform) {
  AK.freeVerified[platform] = true;
  const step = document.getElementById(`step-${platform}`);
  if (step) step.classList.add('done');

  // Verify all steps done
  if (AK.freeVerified.instagram && AK.freeVerified.youtube && AK.freeVerified.discord) {
    setTimeout(() => {
      document.getElementById('freeVerifyBox').style.display = 'none';
      document.getElementById('freePanelLogin').style.display = 'block';
      document.getElementById('freePanelLogin').style.animation = 'slideUp 0.4s ease';
      AK.showToast('🎉 Verification complete! Login to access the Free Panel.');
    }, 600);
  }
};

AK.freeLogin = function() {
  const u = document.getElementById('freeUsername').value.trim();
  const p = document.getElementById('freePassword').value.trim();

  if (!u || !p) { AK.showToast('⚠️ Please enter username and password.'); return; }

  if (u === 'adam' && p === 'corp') {
    AK.showToast('🎮 Welcome to ADAM CORP Free Panel!');
    document.getElementById('freePanelLogin').innerHTML = `
      <div style="text-align:center;padding:3rem 2rem;">
        <div style="font-size:4rem;margin-bottom:1rem">🎉</div>
        <div class="login-title">Free Panel Unlocked!</div>
        <p style="color:var(--text-muted);margin-bottom:2rem">Welcome, <strong style="color:var(--primary)">${u}</strong>! You now have full access.</p>
        <div style="display:flex;flex-direction:column;gap:12px;max-width:300px;margin:0 auto">
          <button class="btn btn-primary btn-lg" onclick="AK.showToast('🔧 Free panel dashboard coming soon!')">Open Dashboard</button>
          <a class="btn btn-whatsapp" href="https://wa.me/${AK.config.whatsapp}" target="_blank">WhatsApp Group Link</a>
        </div>
      </div>
    `;
  } else {
    AK.showToast('❌ Invalid credentials. Try: adam / corp');
  }
};

/* ─── Guild Rules Rendering ──────────────────────────────── */
AK.renderGuildRules = function() {
  const rulesEl = document.getElementById('guildRulesList');
  if (!rulesEl) return;
  rulesEl.innerHTML = AK.guildRules.map((rule, i) => `
    <div class="guild-rule">
      <div class="guild-rule-num">${i+1}</div>
      <div>${rule}</div>
    </div>
  `).join('');
};

/* ─── Particles Canvas ───────────────────────────────────── */
AK.initParticles = function() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  const count = 60;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      o: Math.random() * 0.5 + 0.1,
    });
  }

  function getThemeColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#d4af37';
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getThemeColor();

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = p.o;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    ctx.globalAlpha = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.globalAlpha = (1 - dist/100) * 0.15;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  draw();

  window.removeEventListener('resize', AK.resizeCanvas);
  AK.resizeCanvas = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', AK.resizeCanvas);
};

/* ─── Hamburger Menu Toggle ──────────────────────────────── */
AK.toggleMenu = function() {
  const center = document.querySelector('.nav-center');
  if (center) center.classList.toggle('open');
};

/* ─── Card 3D Tilt Effect ────────────────────────────────── */
AK.init3DTilt = function() {
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

/* ─── Toast System ───────────────────────────────────────── */
AK.showToast = function(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <span>${msg}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.4s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 2600);
};

/* ─── Document Ready & Hash Listener ──────────────────────── */
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (hash === 'admin') {
    if (AK.currentPage !== 'manage') AK.navigate('manage');
  } else if (hash && hash !== 'manage') {
    if (AK.currentPage !== hash) AK.navigate(hash);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Load data first
  AK.loadPanels();

  // Check initial hash
  const initialHash = window.location.hash.slice(1);
  if (initialHash === 'admin') {
    AK.navigate('manage');
  } else if (initialHash && ['home', 'mobile', 'pc', 'guild', 'free', 'support', 'settings'].includes(initialHash)) {
    AK.navigate(initialHash);
  } else {
    AK.navigate('home');
  }

  // Activate 3D Tilt
  setTimeout(AK.init3DTilt, 300);

  // Setup Enter key listeners
  const si = document.getElementById('supportInput');
  if (si) si.addEventListener('keydown', e => { if (e.key === 'Enter') AK.supportSend(); });

  // Scrolling effects on navigation header
  window.addEventListener('scroll', () => {
    const nb = document.getElementById('navbar');
    if (!nb) return;
    if (window.scrollY > 50) {
      nb.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      nb.style.boxShadow = 'none';
    }
  });
});
