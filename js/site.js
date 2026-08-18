(() => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const forceSolidHeader = Boolean(header && header.classList.contains('scrolled'));

  const setHeader = () => {
    if (header) header.classList.toggle('scrolled', forceSolidHeader || window.scrollY > 24);
  };
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    };
    menuToggle.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  const filters = document.querySelectorAll('[data-filter]');
  const galleryCards = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  if (filters.length && galleryCards.length) {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(x => x.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryCards.forEach(card => {
          card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.galleryGroup !== filter);
        });
      });
    });
  }

  const lightbox = document.querySelector('[data-lightbox]');
  if (lightbox && galleryCards.length) {
    const image = lightbox.querySelector('[data-lightbox-image]');
    const caption = lightbox.querySelector('[data-lightbox-caption]');
    const close = lightbox.querySelector('[data-lightbox-close]');
    const prev = lightbox.querySelector('[data-lightbox-prev]');
    const next = lightbox.querySelector('[data-lightbox-next]');
    let current = 0;
    let lastFocus = null;

    const visibleCards = () => galleryCards.filter(card => !card.classList.contains('is-hidden'));
    const show = index => {
      const cards = visibleCards();
      if (!cards.length) return;
      current = (index + cards.length) % cards.length;
      const card = cards[current];
      image.src = card.dataset.lightboxSrc;
      image.alt = card.dataset.lightboxCaption || 'Grewal Construction gallery image';
      caption.textContent = card.dataset.lightboxCaption || '';
    };
    const openBox = card => {
      const cards = visibleCards();
      current = Math.max(0, cards.indexOf(card));
      lastFocus = document.activeElement;
      show(current);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      close.focus();
    };
    const closeBox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
      image.src = '';
      if (lastFocus) lastFocus.focus();
    };

    galleryCards.forEach(card => card.addEventListener('click', () => openBox(card)));
    close.addEventListener('click', closeBox);
    prev.addEventListener('click', () => show(current - 1));
    next.addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeBox(); });
    window.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
