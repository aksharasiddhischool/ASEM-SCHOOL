document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SMOOTH SCROLLING FOR NAV LINKS
    // This makes the page glide down when you click "About Us" instead of jumping instantly.
    const navLinks = document.querySelectorAll('.header-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. SCROLL FADE-IN ANIMATION
    // This makes the cards "pop up" gently as you scroll down to them.
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll('.hero-text-box, .leader-card');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-section'); // Add initial hidden class
        observer.observe(el);
    });
});