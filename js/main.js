// Initialize smooth scrolling with Lenis
let lenis;

// DOM Elements
const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader-bar');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const sections = document.querySelectorAll('.section');
const glitchText = document.querySelector('.glitch-text');
const exploreBtn = document.querySelector('.cta-button');
const contactForm = document.getElementById('contact-form');
const chatOrb = document.querySelector('.chat-orb');

// Team data
const teamData = [
    { name: 'Aryan Singh', role: 'President', image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/8378f098b0d8eedff1322415cc7e0a8cb13359a9_image.jpg' },
    { name: 'Shashank Pandey', role: 'Vice President', image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/e36f845a244c798946669ba0c3605c5295a2214b_whatsapp_image_2025-03-28_at_12.11_edited.jpg' },
    { name: 'Yash Tiwari', role: 'Technical Lead', image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/7be05fb792590bc1350a531506baf547b4d07aa4_whatsapp_image_2025-03-28_at_12.10_edited.jpg' },
    { name: 'Atharv', role: 'Design Lead', image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0498fd3c6fb88474947b38fc06cd2cdc871e3758_image.png' },
];

// Projects data
const projectsData = [
    {
        title: 'Chess',
        description: 'A classic strategic board game with AI opponent options.',
        image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        link: 'https://aryansjc.github.io/Chess/'
    },
    {
        title: 'Tetris',
        description: 'A classic puzzle Tetris game.',
        image: 'https://images.unsplash.com/photo-1646708198974-4c4893e8a2d7?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: 'https://aryansjc.github.io/Tetris/'
    },
    {
        title: 'Flappy Bird',
        description: 'A simple Flappy Bird game made completely with CSS.',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Flappy_Bird_icon.png/250px-Flappy_Bird_icon.png',
        link: 'https://moccasin-estrella-91.tiiny.site/'
    },
    {
        title: 'Coin Flip',
        description: 'A simple heads-or-tails simulator with statistics tracking.',
        image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        link: 'https://aryansjc.github.io/Coin-Flip/'
    },
    {
        title: 'Rock-Paper-Scissors',
        description: 'The ultimate luck & strategy game with multiple game modes.',
        image: 'https://images.unsplash.com/photo-1614032686163-bdc24c13d0b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        link: 'https://aryansjc.github.io/Rock-Paper-Scissors/'
    },
    {
        title: 'Code Playground',
        description: 'A web-based code editor for experimenting with HTML, CSS, and JavaScript.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        link: 'https://aryansjc.github.io/Code-Playground/'
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Simulate loading
    simulateLoading();
    
    // Initialize glitch text effect
    initGlitchText();
    
    // Initialize team section
    initTeam();
    
    // Initialize projects section
    initProjects();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize active nav link updating
    updateActiveNavOnScroll();
});

// Simulate page loading
function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loader after a short delay
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    
                    // Initialize smooth scrolling after loader is hidden
                    initSmoothScroll();
                }, 500);
            }, 500);
        }
        loaderBar.style.width = `${progress}%`;
    }, 200);
}

// Initialize smooth scrolling with Lenis
function initSmoothScroll() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Add scroll event listener to update navbar on scroll
    lenis.on('scroll', () => {
        const scrollY = lenis.scroll;
        
        // Add scrolled class to navbar when scrolled down
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize scroll animations with GSAP ScrollTrigger
    initScrollAnimations();
}

// Initialize scroll animations with GSAP
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    sections.forEach((section, index) => {
        if (index === 0) return; // Skip the hero section
        
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            opacity: 0,
            y: 100,
            duration: 1
        });
    });
    
    // Update active nav link on scroll
    sections.forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => updateActiveNavLink(section.id),
            onEnterBack: () => updateActiveNavLink(section.id)
        });
    });
    
    // Navbar background change on scroll
    ScrollTrigger.create({
        start: 100,
        onEnter: () => navbar.classList.add('scrolled'),
        onLeaveBack: () => navbar.classList.remove('scrolled')
    });
}

// Update active nav link
function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced glitch text effect
function initGlitchText() {
    if (!glitchText) return;
    
    const originalText = glitchText.textContent;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    
    let interval = null;
    let iteration = 0;
    
    clearInterval(interval);
    
    // Initial scramble effect
    interval = setInterval(() => {
        glitchText.innerText = glitchText.innerText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(interval);
            
            // Add random glitch effects after the initial animation
            setTimeout(() => {
                // Major glitch effect every 3-5 seconds
                setInterval(() => {
                    const duration = 150;
                    
                    // Create a major glitch
                    majorGlitch(duration);
                    
                    // Repeat the glitch 2-4 times in quick succession
                    const repeats = 2 + Math.floor(Math.random() * 3);
                    for (let i = 1; i <= repeats; i++) {
                        setTimeout(() => {
                            majorGlitch(duration);
                        }, duration * i + (Math.random() * 50));
                    }
                }, 3000 + Math.random() * 2000);
                
                // Minor glitch effect every 1-2 seconds
                setInterval(() => {
                    // 30% chance of a minor glitch
                    if (Math.random() < 0.3) {
                        minorGlitch();
                    }
                }, 1000 + Math.random() * 1000);
            }, 1000);
        }
        
        iteration += 1 / 3;
    }, 30);
    
    // Function to create a major glitch effect
    function majorGlitch(duration) {
        // Randomly replace some characters
        const glitchText = document.querySelector('.glitch-text');
        const originalText = glitchText.getAttribute('data-text');
        let newText = '';
        
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.3) {
                newText += letters[Math.floor(Math.random() * letters.length)];
            } else {
                newText += originalText[i];
            }
        }
        
        glitchText.innerText = newText;
        
        // Add visual effects
        glitchText.style.textShadow = `
            ${(Math.random() * 10) - 5}px ${(Math.random() * 10) - 5}px ${Math.random() * 10}px rgba(0, 247, 255, 0.8),
            ${(Math.random() * 10) - 5}px ${(Math.random() * 10) - 5}px ${Math.random() * 10}px rgba(255, 0, 229, 0.8)
        `;
        
        glitchText.style.transform = `
            translate(${(Math.random() * 10) - 5}px, ${(Math.random() * 10) - 5}px) 
            skew(${(Math.random() * 10) - 5}deg)
        `;
        
        // Reset after duration
        setTimeout(() => {
            glitchText.innerText = originalText;
            glitchText.style.transform = '';
            // Keep some subtle text shadow
            glitchText.style.textShadow = '0.05em 0 0 rgba(255, 0, 229, 0.75), -0.025em -0.05em 0 rgba(0, 247, 255, 0.75), 0.025em 0.05em 0 rgba(255, 255, 255, 0.75)';
        }, duration);
    }
    
    // Function to create a minor glitch effect
    function minorGlitch() {
        const duration = 50 + Math.random() * 100;
        
        // Subtle transform and shadow changes
        glitchText.style.transform = `
            translate(${(Math.random() * 4) - 2}px, ${(Math.random() * 4) - 2}px)
        `;
        
        glitchText.style.textShadow = `
            ${(Math.random() * 5) - 2.5}px ${(Math.random() * 5) - 2.5}px ${Math.random() * 5}px rgba(0, 247, 255, 0.8),
            ${(Math.random() * 5) - 2.5}px ${(Math.random() * 5) - 2.5}px ${Math.random() * 5}px rgba(255, 0, 229, 0.8)
        `;
        
        // Reset after duration
        setTimeout(() => {
            glitchText.style.transform = '';
            // Keep some subtle text shadow
            glitchText.style.textShadow = '0.05em 0 0 rgba(255, 0, 229, 0.75), -0.025em -0.05em 0 rgba(0, 247, 255, 0.75), 0.025em 0.05em 0 rgba(255, 255, 255, 0.75)';
        }, duration);
    }
}

// Initialize team section
function initTeam() {
    const teamGrid = document.querySelector('.team-grid');
    
    if (teamGrid) {
        teamData.forEach(member => {
            const memberEl = document.createElement('div');
            memberEl.className = 'team-member';
            
            const img = document.createElement('div');
            img.className = 'team-member-img';
            img.style.backgroundImage = `url(${member.image})`;
            
            const info = document.createElement('div');
            info.className = 'team-member-info';
            
            const name = document.createElement('h4');
            name.className = 'team-member-name';
            name.textContent = member.name;
            
            const role = document.createElement('p');
            role.className = 'team-member-role';
            role.textContent = member.role;
            
            info.appendChild(name);
            info.appendChild(role);
            
            memberEl.appendChild(img);
            memberEl.appendChild(info);
            
            teamGrid.appendChild(memberEl);
        });
    }
}

// Initialize projects section
function initProjects() {
    const projectCards = document.querySelector('.project-cards');
    
    if (projectCards) {
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            const img = document.createElement('div');
            img.className = 'project-card-img';
            img.style.backgroundImage = `url(${project.image})`;
            
            const content = document.createElement('div');
            content.className = 'project-card-content';
            
            const title = document.createElement('h3');
            title.className = 'project-card-title';
            title.textContent = project.title;
            
            const desc = document.createElement('p');
            desc.className = 'project-card-desc';
            desc.textContent = project.description;
            
            const link = document.createElement('a');
            link.className = 'project-card-link';
            link.href = project.link;
            link.textContent = 'View Project';
            
            content.appendChild(title);
            content.appendChild(desc);
            content.appendChild(link);
            
            card.appendChild(img);
            card.appendChild(content);
            
            projectCards.appendChild(card);
        });
    }
}

// Initialize event listeners
function initEventListeners() {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
    
    // Enhanced smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
                
                // Scroll to the target section with offset for the navbar
                lenis.scrollTo(targetSection, {
                    offset: -80, // Adjust based on navbar height
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update CTA buttons to navigate to external links
    const exploreBtns = document.querySelectorAll('.cta-button');
    if (exploreBtns.length) {
        exploreBtns[0].addEventListener('click', () => { // "Explore Our Projects"
            // Open GitHub page in a new tab
            window.open('https://github.com/Aryansjc', '_blank');
        });
        
        if (exploreBtns.length > 1) {
            exploreBtns[1].addEventListener('click', () => { // "Join the Club"
                // Open Slack channel in a new tab
                window.open('https://app.slack.com/client/T0266FRGM/C08KNN16KHT', '_blank');
            }); 
        }
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Chat orb click - redirect to Slack
    if (chatOrb) {
        chatOrb.addEventListener('click', () => {
            // Open Slack channel in a new tab
            window.open('https://app.slack.com/client/T0266FRGM/C08KNN16KHT', '_blank');
        });
    }
}

// Add a new function to update the active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
} 