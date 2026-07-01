/* ============================================================
   ADAM CORPORATION — Product CRUD Controller
   ============================================================ */

window.AK = window.AK || {};

AK.crudState = {
  activeTab: 'list', // 'list' | 'form'
  activeFormLang: 'en', // 'en' | 'ta' | 'hi'
  editingIndex: null, // null if adding, integer if editing
  editingCategory: null, // 'mobile' | 'pc'
};

AK.isAdminAuthenticated = sessionStorage.getItem('adam_admin_auth') === 'true';

/* ─── Init CRUD Page ─────────────────────────────────────── */
AK.initCRUD = function() {
  AK.loadPanels();
  const loginBox = document.getElementById('adminLoginBox');
  const dashContent = document.getElementById('adminDashboardContent');
  const logoutBtn = document.getElementById('adminLogoutBtn');
  
  if (AK.isAdminAuthenticated) {
    if (loginBox) loginBox.style.display = 'none';
    if (dashContent) dashContent.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
    AK.switchAdminTab('list');
    AK.switchCRUDFormLang('en');
    AK.resetCRUDForm();
    AK.renderManageProducts();
  } else {
    if (loginBox) loginBox.style.display = 'block';
    if (dashContent) dashContent.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
};

/* ─── Admin Authentication Actions ───────────────────────── */
AK.adminLogin = function() {
  const email = document.getElementById('adminEmail').value.trim();
  const password = document.getElementById('adminPassword').value.trim();
  
  if (email === 'admin@adamcorp' && password === 'accorp') {
    AK.isAdminAuthenticated = true;
    sessionStorage.setItem('adam_admin_auth', 'true');
    AK.showToast('🔓 Admin login successful!');
    
    // Clear inputs
    document.getElementById('adminEmail').value = '';
    document.getElementById('adminPassword').value = '';
    
    // Re-initialize view
    AK.initCRUD();
  } else {
    AK.showToast('❌ Invalid admin credentials.');
  }
};

AK.adminLogout = function() {
  AK.isAdminAuthenticated = false;
  sessionStorage.removeItem('adam_admin_auth');
  AK.showToast('🔒 Logged out of admin panel.');
  AK.initCRUD();
};

/* ─── Switch Tabs ────────────────────────────────────────── */
AK.switchAdminTab = function(tab) {
  AK.crudState.activeTab = tab;
  
  // Update nav highlight
  document.querySelectorAll('.admin-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });
  
  // Show / Hide sections
  document.querySelectorAll('.admin-section').forEach(el => {
    el.classList.toggle('active', el.dataset.section === tab);
  });

  // If switching to list, refresh it
  if (tab === 'list') {
    AK.renderManageProducts();
  }
};

/* ─── Switch Form Language Tabs ──────────────────────────── */
AK.switchCRUDFormLang = function(lang) {
  AK.crudState.activeFormLang = lang;
  
  document.querySelectorAll('.lang-tab').forEach(el => {
    el.classList.toggle('active', el.dataset.formlang === lang);
  });
  
  document.querySelectorAll('.lang-input-group').forEach(el => {
    el.classList.toggle('active', el.dataset.inputlang === lang);
  });
};

/* ─── Render Product Manager Table ───────────────────────── */
AK.renderManageProducts = function() {
  const strings = AK.lang[AK.currentLang];
  const listBody = document.getElementById('crudTableBody');
  if (!listBody) return;

  let html = '';
  
  ['mobile', 'pc'].forEach(cat => {
    const catTitle = AK.panels[cat].title[AK.currentLang] || cat;
    const options = AK.panels[cat].options;
    
    if (options.length === 0) return;
    
    options.forEach((opt, idx) => {
      // Localized name
      const name = opt.title[AK.currentLang] || opt.title['en'] || 'Unnamed';
      const desc = opt.description[AK.currentLang] || opt.description['en'] || '';
      
      html += `
        <tr>
          <td><strong>${catTitle}</strong></td>
          <td>${name}</td>
          <td>${opt.price}</td>
          <td>${opt.priceNote}</td>
          <td>${opt.popular ? '<span class="feature-tag" style="background:#25D366;color:#fff;border:none">★ YES</span>' : 'NO'}</td>
          <td>
            <div class="action-btn-group">
              <button class="btn-edit" onclick="AK.editProduct('${cat}', ${idx})">${strings.edit}</button>
              <button class="btn-delete" onclick="AK.deleteProduct('${cat}', ${idx})">${strings.delete}</button>
            </div>
          </td>
        </tr>
      `;
    });
  });

  if (html === '') {
    html = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No products found. Add one above!</td></tr>`;
  }
  
  listBody.innerHTML = html;
};

/* ─── Edit Product Setup ─────────────────────────────────── */
AK.editProduct = function(category, index) {
  const opt = AK.panels[category].options[index];
  if (!opt) return;

  AK.crudState.editingIndex = index;
  AK.crudState.editingCategory = category;

  // Set category selector (disable category change for simplicity)
  document.getElementById('prodCategory').value = category;
  document.getElementById('prodPrice').value = opt.price;
  document.getElementById('prodPriceNote').value = opt.priceNote;
  document.getElementById('prodPopular').checked = opt.popular;

  // Set English inputs
  document.getElementById('prodName_en').value = opt.title.en || '';
  document.getElementById('prodDesc_en').value = opt.description.en || '';
  document.getElementById('prodFeatures_en').value = opt.features.en ? opt.features.en.join(', ') : '';

  // Set Tamil inputs
  document.getElementById('prodName_ta').value = opt.title.ta || '';
  document.getElementById('prodDesc_ta').value = opt.description.ta || '';
  document.getElementById('prodFeatures_ta').value = opt.features.ta ? opt.features.ta.join(', ') : '';

  // Set Hindi inputs
  document.getElementById('prodName_hi').value = opt.title.hi || '';
  document.getElementById('prodDesc_hi').value = opt.description.hi || '';
  document.getElementById('prodFeatures_hi').value = opt.features.hi ? opt.features.hi.join(', ') : '';

  // Update header text in CRUD form
  const strings = AK.lang[AK.currentLang];
  document.getElementById('crudFormTitle').textContent = strings.editProduct;

  AK.switchAdminTab('form');
  AK.switchCRUDFormLang('en');
};

/* ─── Save / Submit Product Form ─────────────────────────── */
AK.submitProductForm = function() {
  const strings = AK.lang[AK.currentLang];

  const cat = document.getElementById('prodCategory').value;
  const price = document.getElementById('prodPrice').value.trim();
  const priceNote = document.getElementById('prodPriceNote').value.trim();
  const popular = document.getElementById('prodPopular').checked;

  // Localized English (Required)
  const nameEn = document.getElementById('prodName_en').value.trim();
  const descEn = document.getElementById('prodDesc_en').value.trim();
  const featEnRaw = document.getElementById('prodFeatures_en').value.trim();

  // Localized Tamil (Optional - fallback to En)
  const nameTa = document.getElementById('prodName_ta').value.trim() || nameEn;
  const descTa = document.getElementById('prodDesc_ta').value.trim() || descEn;
  const featTaRaw = document.getElementById('prodFeatures_ta').value.trim() || featEnRaw;

  // Localized Hindi (Optional - fallback to En)
  const nameHi = document.getElementById('prodName_hi').value.trim() || nameEn;
  const descHi = document.getElementById('prodDesc_hi').value.trim() || descEn;
  const featHiRaw = document.getElementById('prodFeatures_hi').value.trim() || featEnRaw;

  if (!price || !nameEn || !descEn) {
    AK.showToast('⚠️ Please enter name, description, and price (at least English).');
    return;
  }

  // Parse features
  const parseFeats = (raw) => raw ? raw.split(',').map(s => s.trim()).filter(s => s !== '') : [];

  const optionData = {
    id: AK.crudState.editingIndex !== null 
      ? AK.panels[AK.crudState.editingCategory].options[AK.crudState.editingIndex].id
      : 'prod-' + Date.now(),
    title: { en: nameEn, ta: nameTa, hi: nameHi },
    image: cat === 'mobile' ? 'assets/images/mobile-banner.png' : 'assets/images/pc-banner.png',
    description: { en: descEn, ta: descTa, hi: descHi },
    price: price,
    priceNote: priceNote || 'per month',
    features: {
      en: parseFeats(featEnRaw),
      ta: parseFeats(featTaRaw),
      hi: parseFeats(featHiRaw)
    },
    popular: popular
  };

  if (AK.crudState.editingIndex !== null) {
    // Edit existing
    const oldCat = AK.crudState.editingCategory;
    
    if (oldCat === cat) {
      AK.panels[cat].options[AK.crudState.editingIndex] = optionData;
    } else {
      // Category changed: delete old, push new
      AK.panels[oldCat].options.splice(AK.crudState.editingIndex, 1);
      AK.panels[cat].options.push(optionData);
    }
    AK.showToast('✅ ' + strings.saveSuccess);
  } else {
    // Add new
    AK.panels[cat].options.push(optionData);
    AK.showToast('✅ ' + strings.saveSuccess);
  }

  // Save to localStorage
  AK.savePanels();

  // Reset form, state and switch back
  AK.resetCRUDForm();
  AK.switchAdminTab('list');
};

/* ─── Delete Product ─────────────────────────────────────── */
AK.deleteProduct = function(category, index) {
  const strings = AK.lang[AK.currentLang];
  if (!confirm(strings.confirmDelete)) return;

  AK.panels[category].options.splice(index, 1);
  AK.savePanels();
  AK.showToast('🗑️ ' + strings.deleteSuccess);
  AK.renderManageProducts();
};

/* ─── Reset Form Fields ──────────────────────────────────── */
AK.resetCRUDForm = function() {
  AK.crudState.editingIndex = null;
  AK.crudState.editingCategory = null;

  document.getElementById('prodCategory').value = 'mobile';
  document.getElementById('prodPrice').value = '';
  document.getElementById('prodPriceNote').value = 'per month';
  document.getElementById('prodPopular').checked = false;

  // Clear inputs
  document.querySelectorAll('.crud-form input[type="text"], .crud-form textarea').forEach(el => el.value = '');

  // Reset title
  const strings = AK.lang[AK.currentLang];
  document.getElementById('crudFormTitle').textContent = strings.addNewProduct;
};

/* ─── Helper: Sync localStorage Panels ───────────────────── */
AK.savePanels = function() {
  localStorage.setItem('adam_admin_panels', JSON.stringify(AK.panels));
};

AK.loadPanels = function() {
  const saved = localStorage.getItem('adam_admin_panels');
  if (saved) {
    try {
      AK.panels = JSON.parse(saved);
    } catch(e) {
      console.error('Failed to parse admin panels', e);
    }
  }
};
