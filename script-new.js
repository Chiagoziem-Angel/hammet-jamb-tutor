// WhatsApp Popup functionality
function showPopup() {
    const popup = document.getElementById('whatsapp-popup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
}

function closePopup() {
    const popup = document.getElementById('whatsapp-popup');
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Show popup after 10 seconds on page load
setTimeout(() => {
    showPopup();
}, 10000);

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('whatsapp-popup');
    
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Smooth scroll for all internal links
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and features
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .info-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add floating CTA button after scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Show/hide floating button based on scroll
        if (scrolled > 800) {
            if (!document.querySelector('.floating-cta')) {
                addFloatingCTA();
            }
        } else {
            const floatingCTA = document.querySelector('.floating-cta');
            if (floatingCTA) {
                floatingCTA.remove();
            }
        }
    });
});

// Add floating WhatsApp button
function addFloatingCTA() {
    const floatingButton = document.createElement('a');
    floatingButton.href = 'https://wa.me/2348XXXXXXXXX?text=Hi,%20I%20want%20to%20start%20learning';
    floatingButton.target = '_blank';
    floatingButton.className = 'floating-cta';
    floatingButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    floatingButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #00C853 0%, #00A844 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        box-shadow: 0 5px 25px rgba(0, 200, 83, 0.5);
        z-index: 9998;
        transition: all 0.3s ease;
        animation: pulse-float 2s infinite;
    `;
    
    floatingButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 8px 35px rgba(0, 200, 83, 0.6)';
    });
    
    floatingButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 25px rgba(0, 200, 83, 0.5)';
    });
    
    document.body.appendChild(floatingButton);
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#pulse-float-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-float-animation';
        style.textContent = `
            @keyframes pulse-float {
                0%, 100% {
                    transform: translateY(0) scale(1);
                }
                50% {
                    transform: translateY(-10px) scale(1.05);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Countdown timer functionality (optional - for exact countdown)
function startCountdown() {
    const examDate = new Date('2026-05-15'); // Approximate JAMB date
    
    function updateCountdown() {
        const now = new Date();
        const diff = examDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update countdown elements if they exist
            const daysEl = document.querySelector('.countdown-item:nth-child(2) .countdown-number');
            if (daysEl) {
                daysEl.textContent = days;
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Initialize countdown on page load
window.addEventListener('load', () => {
    startCountdown();
});

// Track CTA button clicks (optional - for analytics)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button') || e.target.closest('.cta-button')) {
        console.log('CTA clicked:', e.target.textContent || e.target.closest('.cta-button').textContent);
        // Add your analytics tracking here
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'WhatsApp' });
    }
});

// Show popup again if user tries to leave (exit intent)
document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0) {
        // Mouse left from top (trying to close tab/window)
        const popup = document.getElementById('whatsapp-popup');
        if (!popup.classList.contains('active')) {
            setTimeout(() => {
                showPopup();
            }, 500);
        }
    }
});

// Prevent popup from showing multiple times in same session
const popupShown = sessionStorage.getItem('popupShown');
if (popupShown) {
    // Don't auto-show popup if already shown in this session
    clearTimeout(setTimeout(() => {
        showPopup();
    }, 10000));
}

// Mark popup as shown when it's displayed
window.addEventListener('load', () => {
    setTimeout(() => {
        sessionStorage.setItem('popupShown', 'true');
    }, 10000);
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Add smooth reveal animation to sections
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Mobile menu toggle (if needed for future navigation)
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Performance optimization - lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
