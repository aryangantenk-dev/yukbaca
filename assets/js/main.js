/* Indomaret landing page — interactions
   Vanilla JS, no dependencies. All non-essential motion is skipped
   when the user prefers reduced motion. */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------- Sticky header shadow ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Buka menu navigasi');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute('href');
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    };
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );
    sections.forEach((section) => navObserver.observe(section));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = [
    ...document.querySelectorAll(
      '.section-head, .cat-card, .promo-card, .feature-card, .step-grid li, .quote-card, .faq-item, .stat-strip li, .cta-copy, .app-card'
    ),
  ];

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((el) => el.classList.add('reveal'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const siblings = el.parentElement ? [...el.parentElement.children] : [];
          const index = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(index, 6) * 55}ms`;
          el.classList.add('is-in');
          revealObserver.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Product search (demo) ---------- */
  const searchForm = document.querySelector('.search-bar');
  const searchInput = document.getElementById('searchInput');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      const promo = document.getElementById('promo');
      if (promo) promo.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      if (query) searchInput.blur();
    });
  }

  /* ---------- Store finder (demo) ---------- */
  const storeForm = document.getElementById('storeForm');
  const storeInput = document.getElementById('storeInput');
  const storeError = document.getElementById('storeError');
  const storeList = document.getElementById('storeList');

  if (storeForm && storeInput && storeList) {
    const field = storeInput.closest('.field');

    storeInput.addEventListener('input', () => {
      if (!storeError || !field) return;
      if (storeInput.value.trim()) {
        storeError.hidden = true;
        field.classList.remove('is-invalid');
        storeInput.removeAttribute('aria-invalid');
      }
    });

    storeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = storeInput.value.trim();

      if (!query) {
        if (storeError) storeError.hidden = false;
        if (field) field.classList.add('is-invalid');
        storeInput.setAttribute('aria-invalid', 'true');
        storeInput.focus();
        return;
      }

      if (storeError) storeError.hidden = true;
      if (field) field.classList.remove('is-invalid');
      storeInput.removeAttribute('aria-invalid');

      const place = query.replace(/\b\w/g, (c) => c.toUpperCase());
      const stores = [
        { name: `Indomaret ${place} 1`, meta: `Jl. Utama ${place} No. 12 · 0,3 km · Buka 24 jam` },
        { name: `Indomaret ${place} 2`, meta: `Jl. Melati ${place} No. 8 · 0,8 km · 07.00–23.00` },
        { name: `Indomaret ${place} 3`, meta: `Jl. Raya ${place} No. 45 · 1,4 km · Buka 24 jam` },
      ];

      storeList.innerHTML = stores
        .map(
          (s) => `<li class="store-item">
            <span class="store-dot" aria-hidden="true"></span>
            <span><strong>${s.name}</strong><small>${s.meta}</small></span>
          </li>`
        )
        .join('');
    });
  }
})();
