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

    
    function showContactSection() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.classList.remove('hidden-section');
            contactSection.classList.add('show-section');
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100); 
        }
    }

    
    if (window.location.hash === '#contact') {
        showContactSection();
    }

    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');

            
            if (href === '#contact' || href.includes('#contact')) {
                
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    e.preventDefault();
                    showContactSection();
                }
            }
            
            else if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.hero-text-box, .leader-card, .admissions-section'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in-section'); 
        observer.observe(el);
    });
});
