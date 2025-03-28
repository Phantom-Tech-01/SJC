// Three.js scenes for different sections

// Global variables
let heroScene, heroCamera, heroRenderer;
let projectsScene, projectsCamera, projectsRenderer;

// Colors
const accentColor = 0x00f7ff;
const accentColorAlt = 0xff00e5;

// Initialize Three.js scenes
document.addEventListener('DOMContentLoaded', () => {
    initHeroScene();
    initProjectsScene();
});

// Window resize handler
window.addEventListener('resize', () => {
    if (heroCamera) {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    if (projectsCamera) {
        const projectsContainer = document.querySelector('.projects-container');
        if (projectsContainer) {
            const width = projectsContainer.clientWidth;
            const height = projectsContainer.clientHeight;
            projectsCamera.aspect = width / height;
            projectsCamera.updateProjectionMatrix();
            projectsRenderer.setSize(width, height);
        }
    }
});

// Initialize Hero Scene
function initHeroScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Scene setup
    heroScene = new THREE.Scene();
    heroScene.fog = new THREE.FogExp2(0x0a0a0a, 0.001);
    
    // Camera setup
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroCamera.position.z = 30;
    
    // Renderer setup
    heroRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    heroScene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(accentColor, 1);
    pointLight.position.set(10, 10, 10);
    heroScene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(accentColorAlt, 1);
    pointLight2.position.set(-10, -10, 10);
    heroScene.add(pointLight2);
    
    // Create particles
    createParticles(heroScene, 2000);
    
    // Create 3D logo
    createLogo(heroScene);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate particles
        heroScene.children.forEach(child => {
            if (child.isPoints) {
                child.rotation.y += 0.0005;
            }
            
            if (child.isGroup) {
                child.rotation.y += 0.005;
            }
        });
        
        heroRenderer.render(heroScene, heroCamera);
    }
    
    animate();
    
    // Mouse move effect
    document.addEventListener('mousemove', onMouseMove);
}

// Mouse move parallax effect
function onMouseMove(event) {
    if (!heroScene) return;
    
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    heroScene.children.forEach(child => {
        if (child.isPoints) {
            child.rotation.x = mouseY * 0.1;
            child.rotation.y = mouseX * 0.1;
        }
        
        if (child.isGroup) {
            child.rotation.x = mouseY * 0.05;
            child.rotation.z = mouseX * 0.05;
        }
    });
}

// Create particles
function createParticles(scene, count) {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        map: createCircleTexture('#ffffff', 256),
        blending: THREE.AdditiveBlending
    });
    
    const particlesPositions = new Float32Array(count * 3);
    const particlesSizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        particlesPositions[i3] = (Math.random() - 0.5) * 50;
        particlesPositions[i3 + 1] = (Math.random() - 0.5) * 50;
        particlesPositions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        particlesSizes[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particlesSizes, 1));
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

// Create circle texture for particles
function createCircleTexture(color, size) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// Create 3D logo
function createLogo(scene) {
    // Create a simple placeholder for the logo
    // In a real implementation, you would use FontLoader to create 3D text
    // or load a 3D model using GLTFLoader
    
    const group = new THREE.Group();
    
    // Create "SJC" letters with simple geometries
    const letterS = createLetter('S', -6, 0, 0);
    const letterJ = createLetter('J', 0, 0, 0);
    const letterC = createLetter('C', 6, 0, 0);
    
    group.add(letterS);
    group.add(letterJ);
    group.add(letterC);
    
    scene.add(group);
    
    // Animate the logo
    gsap.to(group.position, {
        z: -5,
        duration: 2,
        ease: 'power3.out'
    });
    
    // Rotate the logo
    gsap.to(group.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });
}

// Create a letter for the logo
function createLetter(letter, x, y, z) {
    let geometry;
    
    // Create different geometries based on the letter
    switch(letter) {
        case 'S':
            geometry = new THREE.TorusGeometry(2, 0.5, 16, 32, Math.PI * 1.5);
            break;
        case 'J':
            geometry = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
            break;
        case 'C':
            geometry = new THREE.TorusGeometry(2, 0.5, 16, 32, Math.PI * 1.5);
            break;
        default:
            geometry = new THREE.BoxGeometry(2, 4, 0.5);
    }
    
    const material = new THREE.MeshStandardMaterial({
        color: accentColor,
        metalness: 0.8,
        roughness: 0.2,
        emissive: accentColor,
        emissiveIntensity: 0.5
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    
    // Add glow effect
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.3
    });
    
    const glowMesh = new THREE.Mesh(geometry.clone(), glowMaterial);
    glowMesh.scale.multiplyScalar(1.1);
    
    const letterGroup = new THREE.Group();
    letterGroup.add(mesh);
    letterGroup.add(glowMesh);
    
    return letterGroup;
}

// Initialize Projects Scene
function initProjectsScene() {
    const canvas = document.getElementById('projects-canvas');
    if (!canvas) return;
    
    const projectsContainer = document.querySelector('.projects-container');
    if (!projectsContainer) return;
    
    const width = projectsContainer.clientWidth;
    const height = projectsContainer.clientHeight;
    
    // Scene setup
    projectsScene = new THREE.Scene();
    
    // Camera setup
    projectsCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    projectsCamera.position.z = 10;
    
    // Renderer setup
    projectsRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    projectsRenderer.setSize(width, height);
    projectsRenderer.setClearColor(0x000000, 0);
    
    // Create floating objects
    createFloatingObjects(projectsScene, 50);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate floating objects
        projectsScene.children.forEach(child => {
            if (child.isMesh) {
                const time = Date.now() * 0.001;
                child.position.y = Math.sin(time + child.position.x) * 0.5;
                child.rotation.x += 0.005;
                child.rotation.y += 0.01;
            }
        });
        
        projectsRenderer.render(projectsScene, projectsCamera);
    }
    
    animate();
}

// Create floating objects for projects background
function createFloatingObjects(scene, count) {
    const geometries = [
        new THREE.TetrahedronGeometry(0.5),
        new THREE.OctahedronGeometry(0.5),
        new THREE.IcosahedronGeometry(0.5)
    ];
    
    for (let i = 0; i < count; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshStandardMaterial({
            color: Math.random() > 0.5 ? accentColor : accentColorAlt,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.5,
            wireframe: Math.random() > 0.5
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 30;
        mesh.position.y = (Math.random() - 0.5) * 15;
        mesh.position.z = (Math.random() - 0.5) * 10 - 5;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.scale.multiplyScalar(Math.random() * 0.5 + 0.5);
        
        scene.add(mesh);
    }
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(accentColor, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(accentColorAlt, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
} 