const reviewsSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 33,
  grabCursor: true,
  navigation: {
    prevEl: '#reviewsPrev',
    nextEl: '#reviewsNext',
  },
});

const videoWrap = document.getElementById('videoWrap');
const video = document.getElementById('sectionVideo');
const playBtn = document.getElementById('videoPlayBtn');

videoWrap.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playBtn.classList.add('hidden');
  } else {
    video.pause();
    playBtn.classList.remove('hidden');
  }
});

document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
      document.querySelectorAll('.therapy-tab').forEach((tab, i) => {
        tab.classList.toggle('therapy-tab--active', i === this.activeIndex);
      });
    },
  },
});

document.querySelectorAll('.therapy-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    therapiesSwiper.slideTo(parseInt(tab.dataset.index));
  });
});

// ========================================
// 1. Lenis smooth scroll
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