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
  const tlTotal = 4;

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
// FAQ Accordion (mobile ≤940px)
// ========================================
if (window.innerWidth <= 940 && document.querySelector('.faq__list')) {
  document.querySelectorAll('.faq__row').forEach(row => {
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
