// Enhanced 3D Background Animation with better visibility
document.addEventListener('DOMContentLoaded', () => {
    initBackgroundEffect();
});

function initBackgroundEffect() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    
    // Use a wider field of view and position camera further back
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    
    // Set renderer size and pixel ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Position camera further back for better visibility
    camera.position.z = 50;
    
    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() || '#00f7ff';
    const accentColorAlt = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-alt').trim() || '#ff00e5';
    
    // Add stronger point lights
    const pointLight1 = new THREE.PointLight(new THREE.Color(accentColor), 2);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(new THREE.Color(accentColorAlt), 2);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);
    
    // Add a directional light for better definition
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);
    
    // Create tech models
    const models = [];
    // Reduce model count for better performance and visibility
    const modelCount = Math.min(12, Math.floor(window.innerWidth / 120));
    
    // Create different tech-themed geometries with enhanced visibility
    function createTechModel() {
        const type = Math.floor(Math.random() * 5);
        let geometry, material, mesh;
        
        // Increase model size for better visibility
        const sizeMultiplier = 1.5;
        
        switch(type) {
            case 0: // Cube (representing servers or computers)
                geometry = new THREE.BoxGeometry(2 * sizeMultiplier, 2 * sizeMultiplier, 2 * sizeMultiplier);
                material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? accentColor : accentColorAlt,
                    transparent: true,
                    opacity: 0.8, // Increased opacity
                    wireframe: Math.random() > 0.7,
                    shininess: 100 // More reflective
                });
                mesh = new THREE.Mesh(geometry, material);
                break;
                
            case 1: // Sphere (representing data or network nodes)
                geometry = new THREE.SphereGeometry(1.2 * sizeMultiplier, 16, 16);
                material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? accentColor : accentColorAlt,
                    transparent: true,
                    opacity: 0.8,
                    wireframe: Math.random() > 0.7,
                    shininess: 100
                });
                mesh = new THREE.Mesh(geometry, material);
                break;
                
            case 2: // Torus (representing connectivity or cycles)
                geometry = new THREE.TorusGeometry(1 * sizeMultiplier, 0.4 * sizeMultiplier, 16, 32);
                material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? accentColor : accentColorAlt,
                    transparent: true,
                    opacity: 0.8,
                    wireframe: Math.random() > 0.5,
                    shininess: 100
                });
                mesh = new THREE.Mesh(geometry, material);
                break;
                
            case 3: // Octahedron (representing data crystals or AI)
                geometry = new THREE.OctahedronGeometry(1.5 * sizeMultiplier);
                material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? accentColor : accentColorAlt,
                    transparent: true,
                    opacity: 0.8,
                    wireframe: Math.random() > 0.6,
                    shininess: 100
                });
                mesh = new THREE.Mesh(geometry, material);
                break;
                
            case 4: // Tetrahedron (representing building blocks or innovation)
                geometry = new THREE.TetrahedronGeometry(1.5 * sizeMultiplier);
                material = new THREE.MeshPhongMaterial({
                    color: Math.random() > 0.5 ? accentColor : accentColorAlt,
                    transparent: true,
                    opacity: 0.8,
                    wireframe: Math.random() > 0.6,
                    shininess: 100
                });
                mesh = new THREE.Mesh(geometry, material);
                break;
        }
        
        // Position models in a more visible area (avoid center where content is)
        // Use a donut-shaped distribution instead of a sphere
        const minRadius = 15; // Minimum distance from center
        const maxRadius = 40; // Maximum distance from center
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        const theta = Math.random() * Math.PI * 2;
        
        // Distribute more on the sides than top/bottom
        const phi = (Math.random() - 0.5) * Math.PI * 0.8; // Limit vertical spread
        
        mesh.position.x = radius * Math.cos(phi) * Math.cos(theta);
        mesh.position.y = radius * Math.sin(phi);
        mesh.position.z = radius * Math.cos(phi) * Math.sin(theta) - 10; // Bring forward
        
        // Random rotation
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        mesh.rotation.z = Math.random() * Math.PI;
        
        // Random movement properties - slower movement for better visibility
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.008,
                y: (Math.random() - 0.5) * 0.008,
                z: (Math.random() - 0.5) * 0.008
            },
            movementSpeed: {
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.015,
                z: (Math.random() - 0.5) * 0.015
            },
            pulseSpeed: 0.003 + Math.random() * 0.007,
            pulseDirection: 1,
            highlighted: false,
            originalColor: mesh.material.color.clone()
        };
        
        // Add glow effect for better visibility
        if (Math.random() > 0.5) {
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: mesh.material.color,
                transparent: true,
                opacity: 0.2
            });
            const glowMesh = new THREE.Mesh(geometry, glowMaterial);
            glowMesh.scale.multiplyScalar(1.2);
            mesh.add(glowMesh);
        }
        
        return mesh;
    }
    
    // Create models
    for (let i = 0; i < modelCount; i++) {
        const model = createTechModel();
        scene.add(model);
        models.push(model);
    }
    
    // Create connecting lines between nearby models with enhanced visibility
    const connections = [];
    const connectionDistance = 25; // Increased distance for more connections
    
    function createConnections() {
        // Remove old connections
        connections.forEach(connection => scene.remove(connection));
        connections.length = 0;
        
        // Create new connections
        for (let i = 0; i < models.length; i++) {
            for (let j = i + 1; j < models.length; j++) {
                const distance = models[i].position.distanceTo(models[j].position);
                
                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        models[i].position,
                        models[j].position
                    ]);
                    
                    const line = new THREE.Line(
                        lineGeometry, 
                        new THREE.LineBasicMaterial({ 
                            color: 0xffffff, 
                            transparent: true, 
                            opacity: opacity * 0.4 // Increased opacity
                        })
                    );
                    
                    scene.add(line);
                    connections.push(line);
                }
            }
        }
    }
    
    // Initial connection creation
    createConnections();
    
    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    window.addEventListener('mousemove', (event) => {
        // Update mouse position for raycaster
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Move camera slightly based on mouse position (parallax effect)
        gsap.to(camera.position, {
            x: mouse.x * 3,
            y: mouse.y * 3,
            duration: 1
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update models
        models.forEach(model => {
            // Rotate models
            model.rotation.x += model.userData.rotationSpeed.x;
            model.rotation.y += model.userData.rotationSpeed.y;
            model.rotation.z += model.userData.rotationSpeed.z;
            
            // Move models
            model.position.x += model.userData.movementSpeed.x;
            model.position.y += model.userData.movementSpeed.y;
            model.position.z += model.userData.movementSpeed.z;
            
            // Pulse effect (scale up and down)
            const scale = model.scale.x + model.userData.pulseSpeed * model.userData.pulseDirection;
            if (scale > 1.2 || scale < 0.8) {
                model.userData.pulseDirection *= -1;
            }
            model.scale.set(scale, scale, scale);
            
            // Boundary check - if model goes too far, bring it back
            const distance = model.position.length();
            if (distance > 50) {
                model.position.multiplyScalar(40 / distance);
                // Reverse direction
                model.userData.movementSpeed.x *= -1;
                model.userData.movementSpeed.y *= -1;
                model.userData.movementSpeed.z *= -1;
            }
            
            // Reset highlighted state
            model.userData.highlighted = false;
        });
        
        // Update connections every 30 frames to improve performance
        if (Math.random() < 0.03) {
            createConnections();
        }
        
        // Raycaster for mouse interaction
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(models);
        
        // Reset all models to normal state
        models.forEach(model => {
            if (!model.userData.highlighted) {
                gsap.to(model.material, { opacity: 0.8, duration: 0.3 });
                model.material.emissive = new THREE.Color(0x000000);
            }
        });
        
        // Highlight intersected models
        if (intersects.length > 0) {
            const model = intersects[0].object;
            gsap.to(model.material, { opacity: 1, duration: 0.3 });
            model.material.emissive = new THREE.Color(model.material.color).multiplyScalar(0.5);
            model.userData.highlighted = true;
            
            // Create a pulse effect on hover
            gsap.to(model.scale, {
                x: 1.3, y: 1.3, z: 1.3,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
} 