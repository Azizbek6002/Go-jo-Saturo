// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') ||
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate ability bars on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const abilityBars = entry.target.querySelectorAll('.ability-progress');
            abilityBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';

                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, observerOptions);

// Observe abilities section
const abilitiesSection = document.querySelector('.abilities-section');
if (abilitiesSection) {
    observer.observe(abilitiesSection);
}

// Add floating particles effect to hero section
function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position and size
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

        // Random color
        const colors = ['#4a6fa5', '#6d98ba', '#ff6b6b', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Animation
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite linear`;

        heroSection.appendChild(particle);
    }
}

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
    }

    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
        }
        25% {
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.1;
        }
        75% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(0) rotate(360deg);
            opacity: 0.1;
        }
    }
`;

document.head.appendChild(style);

// Initialize particles when page loads
window.addEventListener('load', createParticles);