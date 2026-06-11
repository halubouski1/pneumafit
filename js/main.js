if (document.querySelector('.reviews-swiper')) {
  new Swiper('.reviews-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    grabCursor: true,
    breakpointsBase: 'window',
    navigation: {
      prevEl: '#reviewsPrev',
      nextEl: '#reviewsNext',
    },
    breakpoints: {
      571: {
        spaceBetween: 15,
      },
      1919: {
        spaceBetween: 33,
      },
    },
  });
}

const videoWrap = document.getElementById('videoWrap');
const video = document.getElementById('sectionVideo');
const playBtn = document.getElementById('videoPlayBtn');

if (videoWrap && video && playBtn) {
  videoWrap.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playBtn.classList.add('hidden');
    } else {
      video.pause();
      playBtn.classList.remove('hidden');
    }
  });
}

const videoWrap2 = document.getElementById('videoWrap2');
const video2 = document.getElementById('sectionVideo2');
const playBtn2 = document.getElementById('videoPlayBtn2');

if (videoWrap2 && video2 && playBtn2) {
  videoWrap2.addEventListener('click', () => {
    if (video2.paused) {
      video2.play();
      playBtn2.classList.add('hidden');
    } else {
      video2.pause();
      playBtn2.classList.remove('hidden');
    }
  });
}

const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const burgerBtn = document.querySelector('.header__burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.querySelector('.mobile-menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

function setMobileMenuOpen(isOpen) {
  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  mobileMenu.classList.toggle('is-open', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

burgerBtn?.addEventListener('click', () => {
  setMobileMenuOpen(!mobileMenu.classList.contains('is-open'));
});

mobileMenuClose?.addEventListener('click', () => setMobileMenuOpen(false));

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => setMobileMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMobileMenuOpen(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1100) {
    setMobileMenuOpen(false);
  }
});

if (document.querySelector('.therapies-swiper')) {
  const therapiesSwiper = new Swiper('.therapies-swiper', {
    slidesPerView: 1,
    grabCursor: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    navigation: {
      prevEl: '#therapiesPrev',
      nextEl: '#therapiesNext',
    },
    pagination: {
      el: '.therapies-pagination',
      clickable: true,
    },
    on: {
      slideChange() {
        const idx = this.activeIndex;
        document.querySelectorAll('.therapy-tab').forEach((tab, i) => {
          tab.classList.toggle('therapy-tab--active', i === idx);
        });
        document.querySelectorAll('.therapy-bg').forEach(bg => {
          bg.classList.toggle('therapy-bg--active', parseInt(bg.dataset.idx) === idx);
        });
        document.querySelectorAll('.therapies__card-content').forEach(panel => {
          panel.classList.toggle('therapy-content--active', parseInt(panel.dataset.idx) === idx);
        });
      },
    },
  });

  document.querySelectorAll('.therapy-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      therapiesSwiper.slideTo(parseInt(tab.dataset.index));
    });
  });
}

// ========================================
// Tablet layout (≤1370px) interactivity
// ========================================
const tlPrevBtn = document.getElementById('therapiesTLPrev');
const tlNextBtn = document.getElementById('therapiesTLNext');

if (tlPrevBtn && tlNextBtn) {
  let tlActiveIndex = 0;
  const tlTotal = document.querySelectorAll('.therapy-tl-tab').length;

  function setTLActive(idx) {
    tlActiveIndex = ((idx % tlTotal) + tlTotal) % tlTotal;

    document.querySelectorAll('.therapy-tl-tab').forEach((tab, i) => {
      tab.classList.toggle('therapy-tl-tab--active', i === tlActiveIndex);
    });
    document.querySelectorAll('.therapies__tl-panel').forEach(panel => {
      panel.classList.toggle('therapies__tl-panel--active', parseInt(panel.dataset.idx) === tlActiveIndex);
    });
    document.querySelectorAll('.tl-dot').forEach(dot => {
      dot.classList.toggle('tl-dot--active', parseInt(dot.dataset.idx) === tlActiveIndex);
    });
    document.querySelectorAll('.therapies__tl-img').forEach(img => {
      img.classList.toggle('therapies__tl-img--active', parseInt(img.dataset.idx) === tlActiveIndex);
    });
    document.querySelectorAll('.therapies__tl-chips').forEach(chips => {
      chips.classList.toggle('therapies__tl-chips--active', parseInt(chips.dataset.idx) === tlActiveIndex);
    });
  }

  document.querySelectorAll('.therapy-tl-tab').forEach(tab => {
    tab.addEventListener('click', () => setTLActive(parseInt(tab.dataset.index)));
  });

  tlPrevBtn.addEventListener('click', () => setTLActive(tlActiveIndex - 1));
  tlNextBtn.addEventListener('click', () => setTLActive(tlActiveIndex + 1));

  document.querySelectorAll('.tl-dot').forEach(dot => {
    dot.addEventListener('click', () => setTLActive(parseInt(dot.dataset.idx)));
  });
}

// ========================================
// Lenis smooth scroll
// ========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);

// ========================================
// AOS init
// ========================================
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
});
lenis.on('scroll', AOS.refresh);

// ========================================
// FAQ scroll-fill (mobile ≤940px, non-accordion lists)
// ========================================
if (window.innerWidth <= 940 && document.querySelector('.faq__list:not([data-accordion])')) {
  const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
        faqObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.faq__list:not([data-accordion]) .faq__row').forEach(row => {
    faqObserver.observe(row);
  });
}

// ========================================
// FAQ Accordion (mobile ≤940px)
// ========================================
if (window.innerWidth <= 940 && document.querySelector('.faq__list:not([data-static])')) {
  document.querySelectorAll('.faq__list:not([data-static]) .faq__row').forEach(row => {
    const number = row.querySelector('.faq__number');
    const question = row.querySelector('.faq__question');
    const answer = row.querySelector('.faq__answer');

    // Wrap row in .faq__item
    const item = document.createElement('div');
    item.className = 'faq__item';
    row.parentNode.insertBefore(item, row);
    item.appendChild(row);

    // Build accordion header inside row
    const header = document.createElement('div');
    header.className = 'faq__acc-header';
    const toggle = document.createElement('span');
    toggle.className = 'faq__toggle';
    toggle.textContent = '+';
    const left = document.createElement('div');
    left.className = 'faq__acc-left';
    left.append(number, question);
    row.innerHTML = '';
    header.append(left, toggle);
    row.append(header);

    // Body goes AFTER row, outside the colored area
    const body = document.createElement('div');
    body.className = 'faq__acc-body';
    body.append(answer);
    item.appendChild(body);

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('is-open');
        const t = i.querySelector('.faq__toggle');
        if (t) t.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        toggle.textContent = '−';
      }
    });
  });
}

// ========================================
// Popup
// ========================================
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.id = 'popupOverlay';
  overlay.innerHTML = `
    <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popupTitle">
      <button class="popup__close" type="button" aria-label="Schließen">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1.30213 15.5C0.968571 15.5 0.635009 15.3734 0.381578 15.1181C-0.127193 14.6094 -0.127193 13.7845 0.381578 13.2758L13.2757 0.38157C13.7848 -0.12719 14.6097 -0.12719 15.1184 0.38157C15.6272 0.890329 15.6272 1.71516 15.1184 2.22423L2.22396 15.1181C1.96703 15.3734 1.63379 15.5 1.30213 15.5Z" fill="#7B7B7B"/>
          <path d="M14.1961 15.5C13.8628 15.5 13.5293 15.3734 13.2758 15.1181L0.381812 2.22439C-0.127271 1.71558 -0.127271 0.890664 0.381812 0.381849C0.890577 -0.127283 1.71541 -0.127283 2.22418 0.381849L15.1182 13.2771C15.6273 13.7859 15.6273 14.6108 15.1182 15.1197C14.8632 15.3734 14.5296 15.5 14.1961 15.5Z" fill="#7B7B7B"/>
        </svg>
      </button>

      <div class="popup__content">
        <h2 class="popup__title" id="popupTitle">Lassen Sie eine Konsultationsanfrage ab</h2>
        <form class="popup__form">
          <div class="popup__inputs-row">
            <input type="text" class="popup__input" placeholder="Name">
            <input type="tel" class="popup__input" placeholder="+1 (000)-000-00-00">
          </div>
          <input type="email" class="popup__input" placeholder="example@mail.com">
          <button type="submit" class="popup__btn hero__btn hero__btn--primary">
            Termin vereinbaren
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7.5 4.375L10.625 7.49999L7.5 10.6249" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M0.625 0.625V4.99999C0.625 5.66303 0.888388 6.29891 1.35723 6.76774C1.82607 7.23658 2.46194 7.49997 3.12498 7.49997H10.6249" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      <div class="popup__decor" aria-hidden="true"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  let _scrollY = 0;

  function openPopup() {
    _scrollY = window.scrollY;
    overlay.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, _scrollY);
  }

  overlay.querySelector('.popup__close').addEventListener('click', closePopup);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closePopup();
  });

  document.querySelectorAll('[data-popup]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  window.openPopup = openPopup;
  window.closePopup = closePopup;
})();

// ========================================
// FAQ Accordion (section-faq-accordion)
// ========================================
if (window.innerWidth <= 940 && document.querySelector('.faq__list-accordion')) {
  document.querySelectorAll('.faq__list-accordion .faq__row-accordion').forEach(row => {
    const number   = row.querySelector('.faq__number-accordion');
    const question = row.querySelector('.faq__question-accordion');
    const answer   = row.querySelector('.faq__answer-accordion');

    // Wrap row in .faq__item-accordion
    const item = document.createElement('div');
    item.className = 'faq__item-accordion';
    row.parentNode.insertBefore(item, row);
    item.appendChild(row);

    // Build accordion header inside row
    const header = document.createElement('div');
    header.className = 'faq__acc-header-accordion';
    const toggle = document.createElement('span');
    toggle.className = 'faq__acc-toggle';
    toggle.textContent = '+';
    const left = document.createElement('div');
    left.className = 'faq__acc-left-accordion';
    left.append(number, question);
    row.innerHTML = '';
    header.append(left, toggle);
    row.append(header);

    // Body goes AFTER row, outside the colored area
    const body = document.createElement('div');
    body.className = 'faq__acc-body-accordion';
    body.append(answer);
    item.appendChild(body);

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq__item-accordion').forEach(i => {
        i.classList.remove('is-open');
        const t = i.querySelector('.faq__acc-toggle');
        if (t) t.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        toggle.textContent = '−';
      }
    });
  });
}

// ========================================
// Burger Menu
// ========================================
(function () {
  const overlay = document.createElement('div');
  overlay.className = 'burger-menu-overlay';

  const menu = document.createElement('div');
  menu.className = 'burger-menu';
  menu.id = 'burgerMenu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Navigation');

  const links = [
    { href: 'physiotherapie.html', label: 'Physiotherapie' },
    { href: 'atemtherapie.html',   label: 'Atemtherapie' },
    { href: 'sporttherapie.html',  label: 'Sporttherapie' },
    { href: 'cmd-behandlung.html', label: 'CMD-Behandlung' },
    { href: 't-shape.html',        label: 'T-Shape 2' },
    { href: 'relounge.html',       label: 'ReLounge' },
    { href: 'about-us.html',       label: 'Über uns und das Team' },
    { href: 'jobs.html',           label: 'Karriere' },
  ];

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navHTML = links.map(({ href, label }) => {
    const isActive = href === currentPage;
    const cls = isActive ? ' burger-menu__link--active' : '';
    return `<a href="${href}" class="burger-menu__link${cls}">${label}<span class="burger-menu__dot"></span></a>`;
  }).join('\n');

  menu.innerHTML = `
    <button class="burger-menu__close" type="button" aria-label="Menü schließen">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1.30213 15.5504C0.968571 15.5504 0.635009 15.4234 0.381578 15.1673C-0.127193 14.6569 -0.127193 13.8294 0.381578 13.3189L13.2757 0.382811C13.7848 -0.127604 14.6097 -0.127604 15.1184 0.382811C15.6272 0.893225 15.6272 1.72073 15.1184 2.23147L2.22396 15.1673C1.96703 15.4234 1.63379 15.5504 1.30213 15.5504Z" fill="#7B7B7B"/>
        <path d="M14.1961 15.5504C13.8628 15.5504 13.5293 15.4234 13.2758 15.1672L0.381812 2.23163C-0.127271 1.72116 -0.127271 0.89356 0.381812 0.383091C0.890577 -0.127697 1.71541 -0.127697 2.22418 0.383091L15.1182 13.3203C15.6273 13.8308 15.6273 14.6584 15.1182 15.1688C14.8632 15.4234 14.5296 15.5504 14.1961 15.5504Z" fill="#7B7B7B"/>
      </svg>
    </button>
    <span class="burger-menu__label">Menü</span>
    <div class="burger-menu__divider"></div>
    <nav class="burger-menu__nav">
      ${navHTML}
    </nav>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(menu);

  let _menuScrollY = 0;

  function openMenu() {
    _menuScrollY = window.scrollY;
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, _menuScrollY);
  }

  menu.querySelector('.burger-menu__close').addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });

  document.querySelectorAll('.header__burger').forEach(btn => {
    btn.addEventListener('click', () => {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
  });
})();
