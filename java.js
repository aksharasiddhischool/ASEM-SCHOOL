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
