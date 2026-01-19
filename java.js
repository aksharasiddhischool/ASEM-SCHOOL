document.addEventListener('DOMContentLoaded', () => {
    
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Close mobile menu
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');

            // Only smooth scroll if the link is an anchor on the current page
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.hero-text-box, .leader-card, .vision-card, .feature-card, .facility-item, .admissions-section');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-section'); 
        el.classList.add('animate-start');
        observer.observe(el);
    });
});

// Gallery Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});
