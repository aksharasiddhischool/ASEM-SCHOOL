document.addEventListener('DOMContentLoaded', () => {
    // --- EXISTING NAV AND ANIMATION LOGIC ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header-nav');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hero-text-box, .leader-card, .vision-card, .feature-card, .facility-item').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });

    // --- LIGHTBOX LOGIC ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentIndex = 0;

    if (lightbox) {
        // Open Lightbox
        galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                captionText.innerHTML = img.alt || "Akshara Siddhi Activities";
                currentIndex = index;
            });
        });

        // Close Lightbox
        document.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.style.display = "none";
        });

        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });

        // Navigation Function
        window.changeImage = (n) => {
            currentIndex += n;
            if (currentIndex >= galleryItems.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = galleryItems.length - 1;
            
            lightboxImg.src = galleryItems[currentIndex].src;
            captionText.innerHTML = galleryItems[currentIndex].alt || "Akshara Siddhi Activities";
        };

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === "block") {
                if (e.key === "ArrowLeft") changeImage(-1);
                if (e.key === "ArrowRight") changeImage(1);
                if (e.key === "Escape") lightbox.style.display = "none";
            }
        });
    }
});
