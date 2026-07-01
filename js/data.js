/* ============================================================
   ADAM CORPORATION — Data & Panel Definitions
   ============================================================ */

window.AK = window.AK || {};

/* ─── Helper: read admin localStorage overrides ──────────── */
AK._adminGet = function(key, fallback) {
  try {
    const v = localStorage.getItem('adam_admin_' + key);
    return v ? JSON.parse(v) : fallback;
  } catch(e) { return fallback; }
};

/* ─── Config (loads from localStorage if updated) ────────── */
const _defaultConfig = {
  whatsapp: '919751264249',
  whatsappOwner: '919751264249',
  whatsappm: '919751264249',
  telegram: 'adam_corp_admin',
  instagram: 'https://www.instagram.com/adam_corporation',
  youtube: 'https://youtube.com',
  discord: 'https://discord.gg/dquqGtPtFm',
};
AK.config = AK._adminGet('config', _defaultConfig);

/* ─── Default Product Panels catalog ─────────────────────── */
const _defaultPanels = {
  mobile: {
    title: {
      en: 'Mobile Panels',
      ta: 'மொபைல் பேனல்கள்',
      hi: 'मोबाइल पैनल'
    },
    banner: 'assets/images/mobile-banner.png',
    description: {
      en: 'Premium mobile gaming control panels with advanced features',
      ta: 'மேம்பட்ட அம்சங்களுடன் கூடிய பிரீமியம் மொபைல் கேமிங் கட்டுப்பாட்டு பேனல்கள்',
      hi: 'उन्नत सुविधाओं के साथ प्रीमियम मोबाइल गेमिंग नियंत्रण पैनल'
    },
    options: [
      {
        id: 'mob-main-id',
        title: {
          en: 'Main ID Panel',
          ta: 'முதன்மை ஐடி பேனல்',
          hi: 'मुख्य आईडी पैनल'
        },
        image: 'assets/images/mobile-banner.png',
        description: {
          en: 'Primary account panel with full access to all premium features and top-tier configuration options.',
          ta: 'அனைத்து பிரீமியம் அம்சங்களுக்கும் முழு அணுகலுடன் கூடிய முதன்மை கணக்கு பேனல்.',
          hi: 'सभी प्रीमियम सुविधाओं तक पूर्ण पहुंच के साथ प्राथमिक खाता पैनल।'
        },
        price: '₹1499',
        priceNote: 'per month',
        features: {
          en: ['99.5% safe', 'Priority Support', 'Anti-Ban Protection', 'Custom Settings'],
          ta: ['99.5% பாதுகாப்பானது', 'முன்னுரிமை ஆதரவு', 'ஆன்டி-பேன் பாதுகாப்பு', 'தனிப்பயன் அமைப்புகள்'],
          hi: ['99.5% सुरक्षित', 'प्राथमिकता सहायता', 'एंटी-बैन सुरक्षा', 'कस्टम सेटिंग्स']
        },
        popular: true
      },
      {
        id: 'mob-second-id',
        title: {
          en: 'Second ID Panel',
          ta: 'இரண்டாம் நிலை ஐடி பேனல்',
          hi: 'द्वितीयक आईडी पैनल'
        },
        image: 'assets/images/mobile-banner.png',
        description: {
          en: 'Secondary account panel for an alternate profile with essential features at a great value.',
          ta: 'சிறந்த மதிப்பில் அத்தியாவசிய அம்சங்களுடன் மாற்று சுயவிவரங்களுக்கான இரண்டாம் நிலை கணக்கு பேனல்.',
          hi: 'एक बेहतरीन मूल्य पर आवश्यक सुविधाओं के साथ वैकल्पिक प्रोफाइल के लिए द्वितीयक खाता पैनल।'
        },
        price: '₹799',
        priceNote: 'per month',
        features: {
          en: ['Secondary Access', 'Standard Support', 'Stable Performance', 'Quick Setup'],
          ta: ['இரண்டாம் நிலை அணுகல்', 'நிலையான ஆதரவு', 'நிலையான செயல்திறன்', 'விரைவான அமைப்பு'],
          hi: ['द्वितीयक पहुंच', 'मानक सहायता', 'स्थिर प्रदर्शन', 'त्वरित सेटअप']
        },
        popular: false
      }
    ]
  },
  pc: {
    title: {
      en: 'PC Panels',
      ta: 'PC பேனல்கள்',
      hi: 'पीसी पैनल'
    },
    banner: 'assets/images/pc-banner.png',
    description: {
      en: 'High-performance PC gaming panels optimized for desktop environments',
      ta: 'டெஸ்க்டாப் சூழல்களுக்கு உகந்த உயர் செயல்திறன் கொண்ட PC கேமிங் பேனல்கள்',
      hi: 'डेस्कटॉप वातावरण के लिए अनुकूलित उच्च प्रदर्शन पीसी गेमिंग पैनल'
    },
    options: [
      {
        id: 'pc-aim-pro',
        title: {
          en: 'Elite PC Panel',
          ta: 'எலைட் PC பேனல்',
          hi: 'एलीट पीसी पैनल'
        },
        image: 'assets/images/pc-banner.png',
        description: {
          en: 'Our flagship PC panel with ultra-low latency, advanced macros, and full customization.',
          ta: 'எங்கள் முதன்மை PC பேனல், மிகக் குறைந்த தாமதம், மேம்பட்ட மேக்ரோக்கள் மற்றும் முழு தனிப்பயனாக்கலுடன்.',
          hi: 'अति-कम विलंबता, उन्नत मैक्रोज़ और पूर्ण अनुकूलन के साथ हमारा प्रमुख पीसी पैनल।'
        },
        price: '₹2499',
        priceNote: 'per month',
        features: {
          en: ['Ultra Low Latency', 'Full Customization', 'VIP Support', 'Multi-monitor'],
          ta: ['மிகக் குறைந்த தாமதம்', 'முழு தனிப்பயனாக்கம்', 'விஐபி ஆதரவு', 'மல்டி-மானிட்டர்'],
          hi: ['अति कम विलंबता', 'पूर्ण अनुकूलन', 'वीआईपी सहायता', 'मल्टी-मॉनिटर']
        },
        popular: true
      }
    ]
  }
};

/* Dynamically load panels from localStorage or fallback */
AK.panels = AK._adminGet('panels', _defaultPanels);

/* ─── Guild Questions ────────────────────────────────────── */
AK.guildQuestions = [
  { key: 'nccard', q: '🎮 Do You Have Name Change Card (Yes / No)?' },
  { key: 'level',  q: '⭐ What is your current Level?' },
  { key: 'rank',   q: '🏆 What is your current Rank? (e.g., Diamond, Heroic, Master)' },
  { key: 'hours',  q: '⏰ How many Active Hours do you play daily?' },
  { key: 'role',   q: '🛡️ What role do you usually play in a team?' },
  { key: 'join',   q: '💬 Do you want to join ADAM CORPORATION Guild (Yes / No)?' },
];

AK.guildRules = [
  'Maintain a respectful and sportsmanlike attitude towards all members at all times.',
  'Minimum 4 hours of active gameplay per day during guild events and wars.',
  'Participate in at least 3 guild activities per week to maintain membership.',
  'No sharing of guild strategies or internal information with outsiders.',
  'Use the designated communication channels for guild coordination.',
  'Report any bugs, cheats, or violations immediately to guild leadership.',
  'Zero tolerance for toxic behavior, harassment, or unsportsmanlike conduct.',
  'Follow all game terms of service — no cheating, hacking, or exploitation.',
];

/* ─── Language Translation Strings ────────────────────────── */
AK.lang = {
  en: {
    home: 'Home',
    settings: 'Settings',
    support: 'Support',
    mobilePanel: 'Mobile Panel',
    pcPanel: 'PC Panel',
    guildSelection: 'Guild Selection',
    freePanel: 'Free Panel',
    enterPanel: 'Enter Panel',
    buyNow: 'Buy Now',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    back: 'Back',
    heroTagline: 'Premium Gaming Panels & Guild Services',
    selectPanel: 'Select a Panel Option',
    guildJoin: 'Apply to Join Guild',
    freePanelTitle: 'Free Panel Access',
    freePanelSub: 'Complete all steps below to unlock free panel access',
    language: 'Language',
    theme: 'Theme',
    supportTitle: 'Customer Support',
    supportSub: 'Chat with us — your message will be forwarded to our team',
    joinGuild: 'Submit Application',
    typeMessage: 'Type your message...',
    send: 'Send',
    verifyAndAccess: 'Verify & Access Free Panel',
    loginTitle: 'Free Panel Login',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    guildRules: 'Guild Rules',
    popular: 'Popular',
    price: 'Price',
    features: 'Features',
    
    // CRUD Translations
    manageProducts: 'Manage Products',
    addNewProduct: 'Add New Product',
    productList: 'Product List',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    productName: 'Product Name',
    productDesc: 'Product Description',
    category: 'Category',
    priceNote: 'Price Period',
    popularBadge: 'Popular',
    saveProduct: 'Save Product',
    actions: 'Actions',
    confirmDelete: 'Are you sure you want to delete this product?',
    deleteSuccess: 'Product deleted successfully!',
    saveSuccess: 'Product saved successfully!',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    adminPanel: 'Admin Dashboard',
    welcomeAdmin: 'Welcome to Adam Corp Admin Dashboard. Manage gaming panels dynamically below.',
  },
  ta: {
    home: 'முகப்பு',
    settings: 'அமைப்புகள்',
    support: 'ஆதரவு',
    mobilePanel: 'மொபைல் பேனல்',
    pcPanel: 'PC பேனல்',
    guildSelection: 'கில்ட் தேர்வு',
    freePanel: 'இலவச பேனல்',
    enterPanel: 'பேனல் உள்ளிடு',
    buyNow: 'இப்போது வாங்கு',
    whatsapp: 'வாட்ஸ்அப்',
    telegram: 'டெலிகிராம்',
    back: 'பின்',
    heroTagline: 'பிரீமியம் கேமிங் பேனல்கள் & கில்ட் சேவைகள்',
    selectPanel: 'ஒரு பேனல் விருப்பத்தைத் தேர்ந்தெடுக்கவும்',
    guildJoin: 'கில்டில் சேர விண்ணப்பிக்கவும்',
    freePanelTitle: 'இலவச பேனல் அணுகல்',
    freePanelSub: 'இலவச பேனல் அணுகலை திறக்க கீழே உள்ள அனைத்து படிகளையும் நிறைவு செய்யவும்',
    language: 'மொழி',
    theme: 'தீம்',
    supportTitle: 'வாடிக்கையாளர் ஆதரவு',
    supportSub: 'எங்களுடன் அரட்டையடிக்கவும் — உங்கள் செய்தி எங்கள் குழுவிற்கு அனுப்பப்படும்',
    joinGuild: 'விண்ணப்பம் சமர்ப்பிக்கவும்',
    typeMessage: 'உங்கள் செய்தியை தட்டச்சு செய்யவும்...',
    send: 'அனுப்பு',
    verifyAndAccess: 'சரிபார்க்கவும் & இலவச பேனலை அணுகவும்',
    loginTitle: 'இலவச பேனல் உள்நுழைவு',
    username: 'பயனர்பெயர்',
    password: 'கடவுச்சொல்',
    login: 'உள்நுழைவு',
    guildRules: 'கில்ட் விதிகள்',
    popular: 'பிரபலம்',
    price: 'விலை',
    features: 'அம்சங்கள்',
    
    // CRUD Translations
    manageProducts: 'தயாரிப்புகளை நிர்வகி',
    addNewProduct: 'புதிய தயாரிப்பு சேர்',
    productList: 'தயாரிப்பு பட்டியல்',
    addProduct: 'தயாரிப்பு சேர்',
    editProduct: 'தயாரிப்பை திருத்து',
    productName: 'தயாரிப்பு பெயர்',
    productDesc: 'தயாரிப்பு விளக்கம்',
    category: 'வகை',
    priceNote: 'விலை குறிப்பு (எ.கா: per month)',
    popularBadge: 'பிரபலம்',
    saveProduct: 'தயாரிப்பை சேமி',
    actions: 'செயல்கள்',
    confirmDelete: 'இந்த தயாரிப்பை நீக்க விரும்புகிறீர்களா?',
    deleteSuccess: 'தயாரிப்பு வெற்றிகரமாக நீக்கப்பட்டது!',
    saveSuccess: 'தயாரிப்பு வெற்றிகரமாக சேமிக்கப்பட்டது!',
    cancel: 'ரத்துசெய்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    adminPanel: 'நிர்வாக டாஷ்போர்டு',
    welcomeAdmin: 'ஆடம் கார்ப்பரேஷன் நிர்வாக டாஷ்போர்டுக்கு உங்களை வரவேற்கிறோம். கேமிங் பேனல்களை நிர்வகிக்கவும்.',
  },
  hi: {
    home: 'होम',
    settings: 'सेटिंग्स',
    support: 'सपोर्ट',
    mobilePanel: 'मोबाइल पैनल',
    pcPanel: 'PC पैनल',
    guildSelection: 'गिल्ड चयन',
    freePanel: 'फ्री पैनल',
    enterPanel: 'पैनल दर्ज करें',
    buyNow: 'अभी खरीदें',
    whatsapp: 'व्हाट्सऐप',
    telegram: 'टेलीग्राम',
    back: 'वापस',
    heroTagline: 'प्रीमियम गेमिंग पैनल और गिल्ड सेवाएँ',
    selectPanel: 'एक पैनल विकल्प चुनें',
    guildJoin: 'गिल्ड के लिए आवेदन करें',
    freePanelTitle: 'फ्री पैनल एक्सेस',
    freePanelSub: 'फ्री पैनल एक्सेस अनलॉक करने के लिए नीचे सभी चरण पूरे करें',
    language: 'भाषा',
    theme: 'थीम',
    supportTitle: 'कस्टमर सपोर्ट',
    supportSub: 'हमसे चैट करें — आपका संदेश हमारी टीम को भेजा जाएगा',
    joinGuild: 'आवेदन सबमिट करें',
    typeMessage: 'अपना संदेश टाइप करें...',
    send: 'भेजें',
    verifyAndAccess: 'सत्यापित करें और फ्री पैनल एक्सेस करें',
    loginTitle: 'फ्री पैनल लॉगिन',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    login: 'लॉगिन',
    guildRules: 'गिल्ड नियम',
    popular: 'लोकप्रिय',
    price: 'मूल्य',
    features: 'विशेषताएँ',
    
    // CRUD Translations
    manageProducts: 'उत्पाद प्रबंधित करें',
    addNewProduct: 'नया उत्पाद जोड़ें',
    productList: 'उत्पाद सूची',
    addProduct: 'उत्पाद जोड़ें',
    editProduct: 'उत्पाद संपादित करें',
    productName: 'उत्पाद का नाम',
    productDesc: 'उत्पाद का विवरण',
    category: 'श्रेणी',
    priceNote: 'मूल्य अवधि (उदा: per month)',
    popularBadge: 'लोकप्रिय',
    saveProduct: 'उत्पाद सहेजें',
    actions: 'कार्रवाई',
    confirmDelete: 'क्या आप वाकई इस उत्पाद को हटाना चाहते हैं?',
    deleteSuccess: 'उत्पाद सफलतापूर्वक हटा दिया गया!',
    saveSuccess: 'उत्पाद सफलतापूर्वक सहेजा गया!',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    adminPanel: 'एडमिन डैशबोर्ड',
    welcomeAdmin: 'एडम कॉर्पोरेशन एडमिन डैशबोर्ड में आपका स्वागत है। नीचे गेमिंग पैनल प्रबंधित करें।',
  },
};
