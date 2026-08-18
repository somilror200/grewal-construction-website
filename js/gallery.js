// js/gallery.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });
    }

    // Lightbox Logic with prev/next + keyboard support
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const lightbox = document.getElementById('lightbox');
    const lbContent = document.getElementById('lb-content');
    const lbCaption = document.getElementById('lb-caption');
    const closeBtn = document.getElementById('close-lb');
    const prevBtn = document.getElementById('lb-prev');
    const nextBtn = document.getElementById('lb-next');

    let currentIndex = 0;

    function showImage(index) {
        if (!galleryItems.length) return;
        currentIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const imgSrc = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption') || '';
        lbContent.innerHTML = `<img src="${imgSrc}" alt="${caption}" onerror="this.onerror=null; this.parentNode.innerHTML='Add real image to src/images directory to view'">`;
        lbCaption.textContent = caption;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lbContent.innerHTML = '';
        document.body.style.overflow = '';
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });
});
