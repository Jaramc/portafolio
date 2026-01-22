class SimpleParticles {
    constructor(options = {}) {
        this.canvas = document.getElementById('particlesCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.colors = options.colors || ['#6366f1'];
        this.particleCount = options.particleCount || 100;
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const numParticles = Math.min(this.particleCount, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.vx += dx * 0.00002;
                particle.vy += dy * 0.00002;
            }
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.connectParticles();
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.save();
                    this.ctx.globalAlpha = 0.1 * (1 - distance / 120);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = '#8b5cf6';
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

function initScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initAnimations() {
    const pageType = document.body.dataset.page;
    
    // Animaciones del header (para todas las páginas)
    gsap.timeline()
        .from('.logo', { 
            duration: 1, 
            y: -50, 
            opacity: 0, 
            ease: 'back.out(1.7)',
            clearProps: 'all'
        })
        .from('.nav-links a', { 
            duration: 0.8, 
            y: -30, 
            opacity: 0, 
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all'
        }, '-=0.5');
    
    // Animaciones específicas por página
    if (pageType === 'python') {
        gsap.from('.page-title h1', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'all'
        });
        
        gsap.from('.page-title p', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.4,
            clearProps: 'all'
        });
        
        gsap.from('.stats-section', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.6,
            clearProps: 'all'
        });
        
        gsap.from('.project-card', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            stagger: 0.1,
            delay: 0.8,
            clearProps: 'all'
        });
    } else if (pageType === 'web') {
        gsap.from('.page-title h1', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'all'
        });
        
        gsap.from('.page-title p', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.4,
            clearProps: 'all'
        });
        
        gsap.from('.skills-section', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.6,
            clearProps: 'all'
        });
        
        gsap.from('.project-card', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            stagger: 0.15,
            delay: 0.8,
            clearProps: 'all'
        });
    } else if (pageType === 'contacto') {
        gsap.from('.page-title h1', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'all'
        });
        
        gsap.from('.page-title p', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.4,
            clearProps: 'all'
        });
        
        gsap.from('.contact-card, .contact-form', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            stagger: 0.2,
            delay: 0.7,
            clearProps: 'all'
        });
    } else if (pageType === 'proyectos') {
        // Animaciones para la página de proyectos
        gsap.from('.page-title h1', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'all'
        });
        
        gsap.from('.page-title p', { 
            duration: 1, 
            y: 30, 
            opacity: 0, 
            ease: 'power2.out', 
            delay: 0.4,
            clearProps: 'all'
        });
        
        gsap.from('.project-card', { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: 'power2.out', 
            stagger: 0.2,
            delay: 0.7,
            clearProps: 'all'
        });
    } else {
        // Animaciones para la página principal (index.html)
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .buttons, .about');
        
        if (heroElements.length > 0) {
            gsap.from('.hero h1', { 
                duration: 1, 
                y: 50, 
                opacity: 0, 
                ease: 'power2.out',
                delay: 0.3,
                clearProps: 'all'
            });
            
            gsap.from('.hero p', { 
                duration: 1, 
                y: 30, 
                opacity: 0, 
                ease: 'power2.out', 
                delay: 0.5,
                clearProps: 'all'
            });
            
            gsap.from('.buttons', { 
                duration: 1, 
                y: 30, 
                opacity: 0, 
                ease: 'power2.out', 
                delay: 0.7,
                clearProps: 'all'
            });
            
            gsap.from('.about', { 
                duration: 1, 
                y: 50, 
                opacity: 0, 
                ease: 'power2.out', 
                delay: 0.9,
                clearProps: 'all'
            });
        }
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const pageType = document.body.dataset.page || 'default';
    
    // Asegurar que GSAP esté cargado
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no está cargado, mostrando contenido sin animaciones');
        document.body.style.opacity = '1';
        return;
    }
    
    const particleOptions = {
        'python': { colors: ['#3776ab', '#ffd43b'], particleCount: 70 },
        'web': { colors: ['#e44d26', '#1572b6', '#f7df1e', '#ff6b35', '#61dafb'], particleCount: 80 },
        'proyectos': { colors: ['#6366f1', '#8b5cf6'], particleCount: 60 },
        'contacto': { colors: ['#6366f1'], particleCount: 80 },
        'default': { colors: ['#6366f1'], particleCount: 100 }
    };
    
    try {
        new SimpleParticles(particleOptions[pageType] || particleOptions.default);
    } catch (error) {
        console.warn('Error al inicializar partículas:', error);
    }
    
    initScrollEffects();
    initAnimations();
    initSmoothScroll();
    
    if (pageType === 'contacto') {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = document.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
                    submitBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        form.reset();
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    console.log('✨ Portfolio cargado con efectos de freefrontend.com!');
    console.log('🎨 Partículas activas, animaciones GSAP funcionando');
    console.log('📱 Responsive design habilitado');
});

const PortfolioUtils = {
    toggleTheme() {
        console.log('🌙 Toggle theme - Función para implementar');
    },
    
    trackInteraction(action) {
        console.log(`📊 Interacción: ${action}`);
    },
    
    showNotification(message, type = 'info') {
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
    }
};

window.PortfolioUtils = PortfolioUtils;