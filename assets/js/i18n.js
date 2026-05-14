(function () {
  const STORAGE_KEY = 'rr_lang';
  const LANGS = ['EN', 'IT', 'UR'];

  const translations = {
    EN: {
      nav: {
        home: 'Home', projects: 'Projects', blog: 'Blog',
        products: 'Products', about: 'About', contact: 'Contact', manga: 'Manga'
      },
      hero: {
        title: 'Syed Riaz Raza',
        subtitle: 'ML Engineer | Jr Research Engineer',
        cta_work: 'View My Work',
        cta_contact: 'Get in Touch'
      },
      sections: {
        products: 'Products', skills: 'Skills & Tech Stack',
        projects: 'Projects', achievements: 'Achievements & Accomplishments',
        education: 'Education', more_products: 'Explore more Products',
        more_projects: 'Explore more Projects'
      },
      about: {
        title: 'About Me',
        bio: 'I\'m a Machine Learning Engineer and researcher based in Italy and Spain, passionate about Computer Vision, AI research, and building real-world products.',
        story_title: 'My Story',
        story: 'Originally from Pakistan, I moved to Italy to pursue my MSc in Computer Science at the University of Padova, specialising in Artificial Intelligence. My thesis on 3D Human Pose Estimation took me to IRI-UPC in Barcelona, where I collaborated with leading researchers on egocentric vision. I\'m fascinated by the intersection of deep learning, perception, and user-facing products—whether that\'s building SaaS tools, writing about AI, or experimenting with new architectures.'
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'I\'m open to research collaborations, freelance projects, and new opportunities.',
        name: 'Name', email: 'Email', message: 'Message',
        send: 'Send Message', success: 'Message sent! I\'ll reply soon.'
      }
    },
    IT: {
      nav: {
        home: 'Home', projects: 'Progetti', blog: 'Blog',
        products: 'Prodotti', about: 'Chi Sono', contact: 'Contatti', manga: 'Manga'
      },
      hero: {
        title: 'Syed Riaz Raza',
        subtitle: 'Ingegnere ML | Jr. Ricercatore',
        cta_work: 'Vedi i Miei Lavori',
        cta_contact: 'Contattami'
      },
      sections: {
        products: 'Prodotti', skills: 'Competenze & Tecnologie',
        projects: 'Progetti', achievements: 'Traguardi & Risultati',
        education: 'Formazione', more_products: 'Esplora altri Prodotti',
        more_projects: 'Esplora altri Progetti'
      },
      about: {
        title: 'Chi Sono',
        bio: 'Sono un Ingegnere di Machine Learning e ricercatore con base in Italia e Spagna, appassionato di Computer Vision, ricerca in AI e sviluppo di prodotti reali.',
        story_title: 'La Mia Storia',
        story: 'Originario del Pakistan, mi sono trasferito in Italia per conseguire il MSc in Informatica presso l\'Università degli Studi di Padova, con specializzazione in Intelligenza Artificiale. La mia tesi sulla stima della posa umana 3D mi ha portato all\'IRI-UPC di Barcellona. Sono affascinato dall\'intersezione tra deep learning, percezione e prodotti rivolti agli utenti.'
      },
      contact: {
        title: 'Contattami',
        subtitle: 'Sono disponibile per collaborazioni di ricerca, progetti freelance e nuove opportunità.',
        name: 'Nome', email: 'Email', message: 'Messaggio',
        send: 'Invia Messaggio', success: 'Messaggio inviato! Ti risponderò presto.'
      }
    },
    UR: {
      nav: {
        home: 'ہوم', projects: 'پروجیکٹس', blog: 'بلاگ',
        products: 'مصنوعات', about: 'میرے بارے میں', contact: 'رابطہ', manga: 'مانگا'
      },
      hero: {
        title: 'سید ریاض رضا',
        subtitle: 'ML انجینئر | جونیئر ریسرچ انجینئر',
        cta_work: 'میرا کام دیکھیں',
        cta_contact: 'رابطہ کریں'
      },
      sections: {
        products: 'مصنوعات', skills: 'مہارتیں اور ٹیکنالوجی',
        projects: 'پروجیکٹس', achievements: 'کامیابیاں',
        education: 'تعلیم', more_products: 'مزید مصنوعات',
        more_projects: 'مزید پروجیکٹس'
      },
      about: {
        title: 'میرے بارے میں',
        bio: 'میں اٹلی اور اسپین میں مقیم ایک مشین لرننگ انجینئر اور محقق ہوں، کمپیوٹر ویژن اور AI ریسرچ کا شوقین۔',
        story_title: 'میری کہانی',
        story: 'پاکستان سے تعلق رکھنے والا، میں اطالوی یونیورسٹی آف پادووا میں MSc کرنے آیا اور بارسلونا میں IRI-UPC میں تحقیق کی۔'
      },
      contact: {
        title: 'رابطہ کریں',
        subtitle: 'میں ریسرچ، فری لانس، اور نئے مواقع کے لیے دستیاب ہوں۔',
        name: 'نام', email: 'ای میل', message: 'پیغام',
        send: 'پیغام بھیجیں', success: 'پیغام مل گیا! جلد جواب دوں گا۔'
      }
    }
  };

  function getLang() {
    const url = new URL(window.location);
    const urlLang = url.searchParams.get('lang');
    if (urlLang && LANGS.includes(urlLang.toUpperCase())) return urlLang.toUpperCase();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && LANGS.includes(stored)) return stored;
    return 'EN';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    const url = new URL(window.location);
    if (lang === 'EN') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang.toLowerCase());
    }
    history.replaceState(null, '', url);
    applyLang(lang);
  }

  function getNestedKey(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  }

  function applyLang(lang) {
    const t = translations[lang] || translations.EN;
    // RTL for Urdu
    document.documentElement.setAttribute('dir', lang === 'UR' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang === 'UR' ? 'ur' : lang === 'IT' ? 'it' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedKey(t, key);
      if (val) el.textContent = val;
    });

    // Update lang label in button
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang;
  }

  function updateDropdownActive(lang) {
    document.querySelectorAll('.lang-option').forEach(li => {
      li.classList.toggle('active', li.dataset.lang === lang);
    });
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang;
  }

  function closeDropdown() {
    const wrap = document.getElementById('lang-toggle-btn')?.closest('.lang-dropdown-wrap');
    if (wrap) wrap.classList.remove('open');
    const btn = document.getElementById('lang-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  // Init
  const currentLang = getLang();
  document.addEventListener('DOMContentLoaded', () => {
    applyLang(currentLang);
    updateDropdownActive(currentLang);

    const btn = document.getElementById('lang-toggle-btn');
    const wrap = btn?.closest('.lang-dropdown-wrap');

    if (btn && wrap) {
      // Toggle dropdown open/close
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Handle option selection
    document.querySelectorAll('.lang-option').forEach(li => {
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = li.dataset.lang;
        if (lang) {
          setLang(lang);
          updateDropdownActive(lang);
          closeDropdown();
        }
      });
    });

    // Close on outside click or Escape
    document.addEventListener('click', closeDropdown);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  });
})();
