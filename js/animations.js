// Additional animations for the website

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initParallaxEffects();
    initHoverEffects();
    initScrollAnimations();
});

// Initialize parallax effects
function initParallaxEffects() {
    // Parallax effect for hero section
    document.addEventListener('mousemove', (e) => {
        const heroSection = document.querySelector('#home');
        if (!heroSection) return;
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px)`;
        }
    });
}

// Initialize hover effects
function initHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Team members hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            gsap.to(member, {
                y: -10,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.4)',
                duration: 0.3
            });
        });
        
        member.addEventListener('mouseleave', () => {
            gsap.to(member, {
                y: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                duration: 0.3
            });
        });
    });
    
    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                boxShadow: '0 0 15px rgba(0, 247, 255, 0.3)',
                duration: 0.3
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                boxShadow: 'none',
                duration: 0.3
            });
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    // Animate section titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });
    });
    
    // Animate team members on scroll
    gsap.utils.toArray('.team-member').forEach((member, index) => {
        gsap.from(member, {
            scrollTrigger: {
                trigger: '.team-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: index * 0.1
        });
    });
    
    // Animate project cards on scroll
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: '.project-cards',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: index * 0.2
        });
    });
}

// Add neon glow effect to elements with .neon-glow class
function addNeonGlowEffect() {
    const neonElements = document.querySelectorAll('.neon-glow');
    
    neonElements.forEach(element => {
        gsap.to(element, {
            boxShadow: '0 0 10px var(--accent-color), 0 0 20px var(--accent-color), 0 0 30px var(--accent-color)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
}

// Add this to the DOM content loaded event
document.addEventListener('DOMContentLoaded', () => {
    addNeonGlowEffect();
}); 