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
// --- MOVING LEGO WIDGET ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lego-mini-stage');
    if (!container) return; 

    // 1. Scene Setup
    const scene = new THREE.Scene();
    // No background -> Transparent

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 14);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- CHARACTER BUILDER ---
    function createLiveKid(shirtColor, skinColor, xPos) {
        const character = new THREE.Group();
        const matShirt = new THREE.MeshLambertMaterial({ color: shirtColor });
        const matSkin = new THREE.MeshLambertMaterial({ color: skinColor });
        const matPants = new THREE.MeshLambertMaterial({ color: 0x333333 });

        // Body
        const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1.4, 0.6), matShirt);
        body.position.y = 0.7;
        character.add(body);

        // Head
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), matSkin);
        head.position.y = 1.8;
        character.add(head);

        // Arms
        const armGeo = new THREE.BoxGeometry(0.3, 0.9, 0.3);
        const lArm = new THREE.Mesh(armGeo, matSkin); lArm.position.set(-0.7, 1, 0);
        const rArm = new THREE.Mesh(armGeo, matSkin); rArm.position.set(0.7, 1, 0);
        character.add(lArm); character.add(rArm);

        // Legs
        const legGeo = new THREE.BoxGeometry(0.4, 1, 0.5);
        const lLeg = new THREE.Mesh(legGeo, matPants); lLeg.position.set(-0.25, 0, 0);
        const rLeg = new THREE.Mesh(legGeo, matPants); rLeg.position.set(0.25, 0, 0);
        character.add(lLeg); character.add(rLeg);

        character.position.x = xPos;
        character.position.y = -1.5;
        scene.add(character);
        return { mesh: character, head: head, lArm: lArm, rArm: rArm };
    }

    const kid1 = createLiveKid(0x008080, 0xffccaa, -1.5);
    const kid2 = createLiveKid(0xd4af37, 0xffccaa, 1.5);

    // Ball
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshPhongMaterial({ color: 0xff4500 }));
    scene.add(ball);

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(2, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // --- ANIMATION LOOP (3D) ---
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.05;

        // Ball Physics
        ball.position.x = Math.cos(time) * 1.5; 
        ball.position.y = Math.abs(Math.sin(time)) * 2 - 1.5; 
        ball.rotation.z -= 0.1;

        // Kids React
        if(ball.position.x < 0) {
            kid1.lArm.rotation.x = -2; kid1.rArm.rotation.x = -2;
            kid2.lArm.rotation.x = 0; kid2.rArm.rotation.x = 0;
        } else {
            kid1.lArm.rotation.x = 0; kid1.rArm.rotation.x = 0;
            kid2.lArm.rotation.x = -2; kid2.rArm.rotation.x = -2;
        }
        
        kid1.head.lookAt(ball.position);
        kid2.head.lookAt(ball.position);

        renderer.render(scene, camera);
    }
    animate();

    // --- LOGIC: DELAY & MOVEMENT LOOP ---
    
    // 1. Inject CSS Keyframes for sliding
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slideAcross {
            0% { left: 0; transform: scaleX(1); } /* Start Left */
            45% { left: calc(100vw - 300px); transform: scaleX(1); } /* Move to Right */
            50% { left: calc(100vw - 300px); transform: scaleX(-1); } /* Flip to face Left */
            95% { left: 0; transform: scaleX(-1); } /* Move back to Left */
            100% { left: 0; transform: scaleX(1); } /* Flip to face Right */
        }
    `;
    document.head.appendChild(styleSheet);

    // 2. Wait 5 Seconds, then Appear & Start Moving
    setTimeout(() => {
        // Fade In
        container.style.opacity = "1";
        
        // Start Loop: Slide Left <-> Right (30 seconds per loop, infinite)
        container.style.animation = "slideAcross 30s linear infinite";
        
    }, 5000); // 5000ms = 5 Seconds
});
