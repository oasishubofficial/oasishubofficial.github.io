// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Sticky Header on Scroll
// ===========================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// ===========================
// Image Carousel
// ===========================
class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');
        this.currentSlide = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;

        if (this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // Button event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Indicator event listeners
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        const carouselWrapper = document.querySelector('.carousel-wrapper');

        if (carouselWrapper) {
            carouselWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            carouselWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });
        }

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.nextSlide();
            if (touchEndX > touchStartX + 50) this.prevSlide();
        };
        this.handleSwipe = handleSwipe;

        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }

        // Start autoplay
        this.startAutoPlay();
    }

    showSlide(index) {
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');

        this.currentSlide = index;
    }

    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) {
            next = 0;
        }
        this.showSlide(next);
    }

    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slides.length - 1;
        }
        this.showSlide(prev);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.stopAutoPlay();
        // Restart autoplay after manual navigation
        setTimeout(() => this.startAutoPlay(), 5000);
    }

    startAutoPlay() {
        if (this.isAutoPlaying && !this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 4000); // Change slide every 4 seconds
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});

// ===========================
// Form Validation & Submission
// ===========================
// Modal Functions
// ===========================
const modal = document.getElementById('successModal');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.querySelector('.modal-close');

function showModal(title, message) {
    const modalTitle = modal.querySelector('h2');
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ===========================
// Scroll Animations
// ===========================
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .service-card, .program-card, .gallery-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================
// Phone Number Formatting
// ===========================
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        e.target.value = value;
    });
});

// ===========================
// Form Field Enhancements
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// ===========================
// Enrollment Tracking
// ===========================
function getEnrollmentStatus(enrollmentId) {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    return enrollments.find(e => e.id === enrollmentId);
}

function getAllEnrollments() {
    return JSON.parse(localStorage.getItem('enrollments') || '[]');
}

// Make functions available globally for potential use
window.getEnrollmentStatus = getEnrollmentStatus;
window.getAllEnrollments = getAllEnrollments;
window.closeModal = closeModal;

// ===========================
// Page Load Optimization
// ===========================
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});

// ===========================
// Analytics Helper (Optional)
// ===========================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // In production, integrate with Google Analytics, Mixpanel, etc.
    console.log('Event:', { category, action, label });

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track important user interactions
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});

// ===========================
// Print Enrollment Receipt
// ===========================
function printEnrollmentReceipt(enrollmentId) {
    const enrollment = getEnrollmentStatus(enrollmentId);
    if (!enrollment) {
        alert('Enrollment not found');
        return;
    }

    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Enrollment Receipt - ${enrollmentId}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                h1 { color: #2E7D32; }
                .info { margin: 20px 0; }
                .info strong { display: inline-block; width: 150px; }
            </style>
        </head>
        <body>
            <h1>Oasis Learning Hub</h1>
            <h2>Enrollment Receipt</h2>
            <div class="info">
                <p><strong>Enrollment ID:</strong> ${enrollment.id}</p>
                <p><strong>Student Name:</strong> ${enrollment.studentName}</p>
                <p><strong>Age:</strong> ${enrollment.age}</p>
                <p><strong>Grade:</strong> ${enrollment.grade}</p>
                <p><strong>Parent/Guardian:</strong> ${enrollment.parentName}</p>
                <p><strong>Email:</strong> ${enrollment.email}</p>
                <p><strong>Phone:</strong> ${enrollment.phone}</p>
                <p><strong>Program:</strong> ${enrollment.program}</p>
                <p><strong>Submitted:</strong> ${new Date(enrollment.submittedAt).toLocaleString()}</p>
                <p><strong>Status:</strong> ${enrollment.status}</p>
            </div>
            <p>Thank you for choosing Oasis Learning Hub!</p>
        </body>
        </html>
    `);
    receiptWindow.document.close();
    receiptWindow.print();
}

// ===========================
// Rate Limiting Configuration
// ===========================
class RateLimiter {
    constructor(maxRequests = 10, timeWindow = 60000) { // 10 requests per minute default
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }

    canMakeRequest() {
        const now = Date.now();
        // Remove old requests outside the time window
        this.requests = this.requests.filter(time => now - time < this.timeWindow);

        if (this.requests.length >= this.maxRequests) {
            return false;
        }

        this.requests.push(now);
        return true;
    }

    getRemainingRequests() {
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);
        return Math.max(0, this.maxRequests - this.requests.length);
    }

    getResetTime() {
        if (this.requests.length === 0) return 0;
        return this.requests[0] + this.timeWindow;
    }
}

// Global rate limiter instances
const globalRateLimiter = new RateLimiter(50, 60000); // 50 requests per minute
const formRateLimiter = new RateLimiter(5, 300000); // 5 form interactions per 5 minutes
const clickRateLimiter = new RateLimiter(20, 10000); // 20 clicks per 10 seconds

// ===========================
// Rate Limited Event Handler
// ===========================
function addRateLimitedEventListener(element, event, handler, rateLimiter = globalRateLimiter) {
    element.addEventListener(event, function(e) {
        if (!rateLimiter.canMakeRequest()) {
            e.preventDefault();
            const resetTime = Math.ceil((rateLimiter.getResetTime() - Date.now()) / 1000);
            showRateLimitMessage(`Too many requests. Please wait ${resetTime} seconds.`, 'warning');
            return false;
        }
        return handler.apply(this, arguments);
    });
}

// ===========================
// Rate Limit Message Display
// ===========================
function showRateLimitMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.rate-limit-message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `rate-limit-message ${type}`;
    messageDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'warning' ? '#f39c12' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        ">
            <strong>⚠️ Rate Limit</strong><br>
            ${message}
        </div>
    `;

    document.body.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// ===========================
// Apply Rate Limiting to Interactive Elements
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Rate limit all button clicks
    const buttons = document.querySelectorAll('button, .btn, .whatsapp-btn');
    buttons.forEach(button => {
        addRateLimitedEventListener(button, 'click', function(e) {
            // Original click behavior is preserved
        }, clickRateLimiter);
    });

    // Rate limit form interactions
    const forms = document.querySelectorAll('form, iframe[src*="forms"]');
    forms.forEach(form => {
        addRateLimitedEventListener(form, 'submit', function(e) {
            if (!formRateLimiter.canMakeRequest()) {
                e.preventDefault();
                return false;
            }
        }, formRateLimiter);
    });

    // Rate limit link clicks (external links)
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        addRateLimitedEventListener(link, 'click', function(e) {
            // Allow the link to work normally
        }, globalRateLimiter);
    });
});

// ===========================
// Add CSS for rate limit animations
// ===========================
const rateLimitStyles = `
<style>
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.rate-limit-message {
    pointer-events: none;
}

.rate-limit-message > div {
    pointer-events: auto;
}
</style>
`;

// Inject styles
document.addEventListener('DOMContentLoaded', function() {
    document.head.insertAdjacentHTML('beforeend', rateLimitStyles);
});

window.printEnrollmentReceipt = printEnrollmentReceipt;

// ===========================
// Console Welcome Message
// ===========================
console.log('%c Welcome to Oasis Learning Hub! ', 'background: #2E7D32; color: white; font-size: 16px; padding: 10px;');
console.log('%c Where Learning Meets Excellence ', 'background: #FF6F00; color: white; font-size: 12px; padding: 5px;');
console.log('For technical support, contact: oasislearninghub.xyz@gmail.com');
