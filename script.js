// Mobile Navigation Toggle
// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const modalCertImage = document.getElementById('modalCertImage');
const closeButton = document.querySelector('.close-button');

function openCertModal(imageSrc, altText) {
    modalCertImage.src = imageSrc;
    modalCertImage.alt = altText;
    certificateModal.style.display = 'block';
}

// Close the modal when the close button is clicked
if (closeButton) {
    closeButton.addEventListener('click', () => {
        certificateModal.style.display = 'none';
    });
}

// Close the modal when clicking outside the modal content
if (certificateModal) {
    window.addEventListener('click', (event) => {
        if (event.target == certificateModal) {
            certificateModal.style.display = 'none';
        }
    });
}

// Attach event listeners to certificate items
document.addEventListener('DOMContentLoaded', () => {
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            const imageSrc = img.src;
            const altText = img.alt;
            item.addEventListener('click', () => {
                openCertModal(imageSrc, altText);
            });
        }
    });
});

// Project Image Modal Functionality
const projectModal = document.getElementById('projectModal');
const projectModalImage = document.getElementById('projectModalImage');
let currentProjectImages = [];
let currentProjectImageIndex = 0;

function openProjectModal(...imageSrcs) {
    currentProjectImages = imageSrcs;
    currentProjectImageIndex = 0;
    projectModalImage.src = currentProjectImages[currentProjectImageIndex];
    projectModal.style.display = 'block';
}

function closeProjectModal() {
    projectModal.style.display = 'none';
}

function nextProjectImage() {
    currentProjectImageIndex = (currentProjectImageIndex + 1) % currentProjectImages.length;
    projectModalImage.src = currentProjectImages[currentProjectImageIndex];
}

function prevProjectImage() {
    currentProjectImageIndex = (currentProjectImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    projectModalImage.src = currentProjectImages[currentProjectImageIndex];
}

document.querySelector('#projectModal .close-button').addEventListener('click', closeProjectModal);

window.addEventListener('click', (event) => {
    if (event.target == projectModal) {
        closeProjectModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// "See More" functionality for project descriptions
document.querySelectorAll('.see-more-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const descriptionContainer = this.closest('.project-description');
        if (descriptionContainer) {
            descriptionContainer.classList.toggle('expanded');
            if (descriptionContainer.classList.contains('expanded')) {
                this.textContent = 'See Less';
            } else {
                this.textContent = 'See More';
            }
        }
    });
});

const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('nav ul');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.querySelector('i').classList.toggle('fa-bars');
    mobileToggle.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.add('fa-bars');
        mobileToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        header.style.padding = '20px 0';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Allow the mailto link to work
    });
};

// Invert section animation
const invertSection = document.querySelector('.invert-section');

const handleScroll = () => {
    const sectionPosition = invertSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        invertSection.classList.add('inverted');
    }
};

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-text, .about-image, .contact-info, .contact-form, .experience-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Handle invert section
    handleScroll();
};

// Set initial state for animated elements
document.querySelectorAll('.skill-card, .project-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Trigger animations on scroll
window.addEventListener('scroll', animateOnScroll);
// Initial check in case elements are already in view
window.addEventListener('load', animateOnScroll);

// Intersection Observer for scroll animations
const animatedElements = document.querySelectorAll('.fade-in-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    observer.observe(element);
});

// WebGL Particles Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create particles container
    const particlesContainer = document.getElementById('particlesContainer');
    
    // Initialize WebGL particles
    initWebGLParticles(particlesContainer);
});

function initWebGLParticles(container) {
    // Check if WebGL is supported
    if (!window.WebGLRenderingContext) {
        console.warn('WebGL not supported, using fallback animation');
        createFallbackAnimation(container);
        return;
    }
    
    // Create canvas for WebGL
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    // Get WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        console.warn('WebGL context not available, using fallback animation');
        createFallbackAnimation(container);
        return;
    }
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Vertex shader source
    const vertexShaderSource = `
        attribute vec3 aPosition;
        attribute vec3 aColor;
        attribute float aSize;
        
        uniform mat4 uProjectionMatrix;
        uniform mat4 uModelViewMatrix;
        uniform float uTime;
        
        varying vec3 vColor;
        
        void main() {
            vec3 pos = aPosition;
            
            // Add movement based on time
            pos.x += sin(uTime * 0.5 + pos.y * 2.0) * 0.2;
            pos.y += cos(uTime * 0.3 + pos.x * 1.5) * 0.15;
            pos.z += sin(uTime * 0.4 + pos.x * pos.y) * 0.1;
            
            gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = aSize * (sin(uTime * 0.2 + pos.x) * 0.2 + 1.0);
            vColor = aColor;
        }
    `;
    
    // Fragment shader source
    const fragmentShaderSource = `
        precision mediump float;
        
        varying vec3 vColor;
        
        void main() {
            // Create a circular particle
            vec2 coord = gl_PointCoord - vec2(0.5);
            if (length(coord) > 0.5) {
                discard;
            }
            
            // Add a subtle glow effect
            float alpha = 1.0 - length(coord) * 2.0;
            gl_FragColor = vec4(vColor, alpha * 0.8);
        }
    `;
    
    // Compile shader
    function compileShader(source, type) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    // Create shader program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    const program = gl.createProgram();

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const modalCertImage = document.getElementById('modalCertImage');
const closeButton = document.querySelector('.close-button');

function openCertModal(imageSrc, altText) {
    modalCertImage.src = imageSrc;
    modalCertImage.alt = altText;
    certificateModal.style.display = 'block';
}

// Close the modal when the close button is clicked
if (closeButton) {
    closeButton.addEventListener('click', () => {
        certificateModal.style.display = 'none';
    });
}

// Close the modal when clicking outside the modal content
if (certificateModal) {
    window.addEventListener('click', (event) => {
        if (event.target == certificateModal) {
            certificateModal.style.display = 'none';
        }
    });
}

// Attach event listeners to certificate items
document.addEventListener('DOMContentLoaded', () => {
    const certificateItems = document.querySelectorAll('.certificate-item');
    certificateItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            const imageSrc = img.src;
            const altText = img.alt;
            item.addEventListener('click', () => {
                openCertModal(imageSrc, altText);
            });
        }
    });
});
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return;
    }
    
    gl.useProgram(program);
    
    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
    const colorAttributeLocation = gl.getAttribLocation(program, 'aColor');
    const sizeAttributeLocation = gl.getAttribLocation(program, 'aSize');
    const projectionMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
    const modelViewMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    const timeUniformLocation = gl.getUniformLocation(program, 'uTime');
    
    // Create particles
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Initialize particles with random positions
    for (let i = 0; i < particleCount; i++) {
        // Position (x, y, z)
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        
        // Color (r, g, b) - white particles with slight variation
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
        
        // Size
        sizes[i] = Math.random() * 3 + 1;
    }
    
    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
    
    const sizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    
    // Set up matrices
    const projectionMatrix = new Float32Array(16);
    const modelViewMatrix = new Float32Array(16);
    
    function createPerspectiveMatrix(fov, aspect, near, far) {
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
        const rangeInv = 1.0 / (near - far);
        
        projectionMatrix[0] = f / aspect;
        projectionMatrix[1] = 0;
        projectionMatrix[2] = 0;
        projectionMatrix[3] = 0;
        
        projectionMatrix[4] = 0;
        projectionMatrix[5] = f;
        projectionMatrix[6] = 0;
        projectionMatrix[7] = 0;
        
        projectionMatrix[8] = 0;
        projectionMatrix[9] = 0;
        projectionMatrix[10] = (near + far) * rangeInv;
        projectionMatrix[11] = -1;
        
        projectionMatrix[12] = 0;
        projectionMatrix[13] = 0;
        projectionMatrix[14] = near * far * rangeInv * 2;
        projectionMatrix[15] = 0;
    }
    
    function createIdentityMatrix() {
        modelViewMatrix[0] = 1;
        modelViewMatrix[1] = 0;
        modelViewMatrix[2] = 0;
        modelViewMatrix[3] = 0;
        
        modelViewMatrix[4] = 0;
        modelViewMatrix[5] = 1;
        modelViewMatrix[6] = 0;
        modelViewMatrix[7] = 0;
        
        modelViewMatrix[8] = 0;
        modelViewMatrix[9] = 0;
        modelViewMatrix[10] = 1;
        modelViewMatrix[11] = 0;
        
        modelViewMatrix[12] = 0;
        modelViewMatrix[13] = 0;
        modelViewMatrix[14] = -5;
        modelViewMatrix[15] = 1;
    }
    
    createPerspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
    createIdentityMatrix();
    
    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    // Enable point sprites
    gl.enable(gl.POINT_SPRITE);
    gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
    
    // Animation variables
    let startTime = Date.now();
    let time = 0;
    
    // Render function
    function render() {
        time = (Date.now() - startTime) * 0.001;
        
        // Clear the canvas
        gl.clearColor(1.0, 1.0, 1.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // Update matrices
        createPerspectiveMatrix(Math.PI / 4, canvas.width / canvas.height, 0.1, 100);
        createIdentityMatrix();
        
        // Set uniforms
        gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
        gl.uniform1f(timeUniformLocation, time);
        
        // Bind and enable position attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        
        // Bind and enable color attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        
        // Bind and enable size attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
        gl.enableVertexAttribArray(sizeAttributeLocation);
        gl.vertexAttribPointer(sizeAttributeLocation, 1, gl.FLOAT, false, 0, 0);
        
        // Draw particles
        gl.drawArrays(gl.POINTS, 0, particleCount);
        
        // Request next frame
        requestAnimationFrame(render);
    }
    
    // Start rendering
    render();
}

// Fallback animation for browsers without WebGL
function createFallbackAnimation(container) {
    // Create canvas for 2D animation
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}