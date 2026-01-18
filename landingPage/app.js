/* ================================
   EmailJS Initialization
================================ */
(function () {
    emailjs.init("XDDW3HI71uZ3ASmFK"); // PUBLIC KEY
})();

/* ================================
   Smooth scrolling for navigation
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

/* ================================
   Mobile menu toggle
================================ */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/* ================================
   Navbar scroll effect
================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* ================================
   Intersection Observer animations
================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.solution-card, .feature-item, .business-card, .team-card'
).forEach(el => observer.observe(el));

/* ================================
   Contact Form - EmailJS
================================ */
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        showFormMessage('Sending your message...', 'info');

        emailjs.sendForm(
            'service_keraai_gmail',
            'template_keraai_contact',
            contactForm
        ).then(
            () => {
                showFormMessage(
                    'Thank you! Your message has been sent successfully. We will get back to you soon.',
                    'success'
                );
                contactForm.reset();
            },
            (error) => {
                console.error('EmailJS Error:', error);
                showFormMessage(
                    'Failed to send message. Please try again later.',
                    'error'
                );
            }
        ).finally(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

/* ================================
   Hero parallax effects
================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingShapes = document.querySelectorAll('.floating-shape');

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - scrolled / window.innerHeight;
    }

    floatingShapes.forEach((shape, index) => {
        shape.style.transform = `translateY(${scrolled * (index + 1) * 0.25}px)`;
    });
});

/* ================================
   Button ripple effect
================================ */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ================================
   Ripple styles injection
================================ */
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
.btn {
    position: relative;
    overflow: hidden;
}
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.6);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
}
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyles);

/* ================================
   Section reveal on scroll
================================ */
function revealSections() {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
