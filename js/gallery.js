// js/gallery.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if(menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Lightbox Logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lbContent = document.getElementById('lb-content');
    const closeBtn = document.getElementById('close-lb');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            // Check if the placeholder string is there, or a real image
            lbContent.innerHTML = `<img src="${imgSrc}" alt="Gallery Image" onerror="this.onerror=null; this.parentNode.innerHTML='Add real image to src/images directory to view'">`;
            lightbox.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lbContent.innerHTML = '';
    });

    // Close on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
            lbContent.innerHTML = '';
        }
    });
});