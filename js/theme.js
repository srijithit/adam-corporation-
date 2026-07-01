/* ============================================================
   ADAM CORPORATION — Theme & Language Management
   ============================================================ */

window.AK = window.AK || {};

AK.currentTheme = localStorage.getItem('adam-theme') || 'gold-black';
AK.currentLang  = localStorage.getItem('adam-lang')  || 'en';

/* ─── Apply Theme ────────────────────────────────────────── */
AK.applyTheme = function(theme) {
  AK.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('adam-theme', theme);

  // Update active state in settings grid
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });
};

/* ─── Apply Language ─────────────────────────────────────── */
AK.applyLang = function(lang) {
  AK.currentLang = lang;
  localStorage.setItem('adam-lang', lang);
  
  // Translate elements with static keys
  AK.translatePage();
  
  // Update active state in settings grid
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  // Update active state in homepage language buttons
  document.querySelectorAll('.home-lang-btn').forEach(el => {
    if (el.dataset.homelang === lang) {
      el.classList.remove('btn-ghost');
      el.classList.add('btn-primary');
    } else {
      el.classList.remove('btn-primary');
      el.classList.add('btn-ghost');
    }
  });
  
  // Re-render components that are dynamically loaded
  if (AK.currentPage === 'mobile' || AK.currentPage === 'pc') {
    AK.initPanel(AK.currentPage);
  }
  if (AK.currentPage === 'settings') {
    AK.renderSettings();
  }
  if (AK.currentPage === 'manage') {
    if (typeof AK.renderManageProducts === 'function') {
      AK.renderManageProducts();
    }
  }
  if (AK.currentPage === 'guild') {
    if (typeof AK.renderGuildRules === 'function') {
      AK.renderGuildRules();
    }
  }
};

/* ─── Translate Static Page Elements ─────────────────────── */
AK.translatePage = function() {
  const strings = AK.lang[AK.currentLang];
  if (!strings) return;

  // Translate labels
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[key]) {
      el.textContent = strings[key];
    }
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (strings[key]) {
      el.placeholder = strings[key];
    }
  });
};

/* ─── Run Theme / Language Initialization ───────────────── */
document.addEventListener('DOMContentLoaded', function() {
  AK.applyTheme(AK.currentTheme);
  AK.applyLang(AK.currentLang);
});
