// ========== Scroll Progress Bar ==========
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ========== Fade In on Scroll ==========
function handleIntersection(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('fade-in-up');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe cards, skills, timeline items
    const animatedElements = document.querySelectorAll('.card, .skill-item, .timeline-item, .metric');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// ========== Animated Counter ==========
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(animation);
}

// Trigger counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            animateCounter(counter, 0, target, 2000);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.metric-value').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ========== Code Rain Effect ==========
function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    if (!codeRain) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'code-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 10 + 10}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        let text = '';
        for (let j = 0; j < 30; j++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        codeRain.appendChild(column);
    }
}

// ========== Floating Particles ==========
function createParticles() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${Math.random() * 5 + 10}s`;
            section.appendChild(particle);
        }
    });
}

// ========== Typing Effect ==========
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '3px solid var(--primary-color)';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }
    type();
}

// ========== Smooth Scroll ==========
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

// ========== Glitch Effect on Hero Title ==========
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('#hero h1');
    if (heroTitle) {
        heroTitle.classList.add('glitch-effect');
    }
});

// ========== Initialize Effects ==========
document.addEventListener('DOMContentLoaded', () => {
    createCodeRain();
    createParticles();
    
    // Add typing effect to subtitle
    const subtitle = document.querySelector('#hero .subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }
});

// ========== Project Card Interactive Details ==========
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========== Command Line Easter Egg ==========
let commandBuffer = '';
let lastKeyTime = Date.now();

document.addEventListener('keypress', (e) => {
    const currentTime = Date.now();
    
    // Reset buffer if more than 2 seconds between keys
    if (currentTime - lastKeyTime > 2000) {
        commandBuffer = '';
    }
    
    commandBuffer += e.key;
    lastKeyTime = currentTime;
    
    // Check for secret commands
    if (commandBuffer.includes('hack')) {
        triggerMatrixEffect();
        commandBuffer = '';
    } else if (commandBuffer.includes('hello')) {
        showSecretMessage('> Hello, fellow developer! 👨‍💻');
        commandBuffer = '';
    }
});

function triggerMatrixEffect() {
    const codeRain = document.querySelector('.code-rain');
    if (codeRain) {
        codeRain.style.opacity = '0.3';
        setTimeout(() => {
            codeRain.style.opacity = '0.05';
        }, 3000);
    }
}

function showSecretMessage(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--bg-dark-opaque);
        border: 2px solid var(--primary-color);
        padding: 20px;
        color: var(--primary-color);
        font-family: 'Courier New', monospace;
        z-index: 1000;
        animation: fadeInUp 0.5s ease-out;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========== Performance Metrics Display ==========
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00ff41; font-size: 14px; font-weight: bold;');
    }
});
