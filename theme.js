// theme.js - Shared JavaScript for Miles & Moments Frontend Polish

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Light / Dark Mode)
    initTheme();

    // 2. Mobile Menu (Hamburger Drawer)
    initMobileMenu();

    // 3. Scroll Reveal Animations (Intersection Observer)
    initScrollReveal();

    // 4. Newsletter Inline Success Message
    initNewsletter();

    // 5. Scroll Progress Bar
    initScrollProgressBar();

    // 6. Back-to-Top Button
    initBackToTopBtn();

    // 7. Animated Number Counters
    initAnimatedCounters();

    // 8. Hero Typing Animation
    initTypingAnimation();
});

/**
 * Initializes and handles the light/dark theme toggles
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (currentTheme === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        // Default to dark mode if user's system preferences match
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Toggle button handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            
            // Add a temporary animation to the button
            themeToggleBtn.style.transform = 'rotate(360deg) scale(0.9)';
            setTimeout(() => {
                themeToggleBtn.style.transform = '';
            }, 300);
        });
    }
}

/**
 * Mobile Navigation Menu (Hamburger Drawer) Setup
 */
function initMobileMenu() {
    const headerContainer = document.querySelector('.header-container');
    if (!headerContainer) return;

    // Create Hamburger elements if they do not exist
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Navigation Menu');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        // Find navbar nav-links and insert the toggle button before it
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            headerContainer.insertBefore(menuToggle, navLinks);
        }
    }

    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu if user clicks outside of drawer
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu if a link is clicked
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Intersection Observer for scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve since we only want to animate once on scroll down
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px' // adjust bottom margin slightly
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Intercepts newsletter form submission to display a premium inline success state
 */
function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach(form => {
        // Disable any inline onsubmit alerts
        form.removeAttribute('onsubmit');
        form.onsubmit = null;
        form.setAttribute('novalidate', 'true'); // let JS handle custom validation/feedback
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (!input) return;
            
            const email = input.value.trim();
            // Basic email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Clear existing validation messages if any
            const existingError = form.parentNode.querySelector('.newsletter-error');
            if (existingError) existingError.remove();
            
            if (!emailRegex.test(email)) {
                const errorMsg = document.createElement('div');
                errorMsg.className = 'newsletter-error';
                errorMsg.innerHTML = 'Please enter a valid email address.';
                errorMsg.style.color = '#EF4444';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '8px';
                errorMsg.style.animation = 'fadeIn 0.3s ease forwards';
                form.appendChild(errorMsg);
                input.focus();
                return;
            }

            // Disable submit button during call to prevent double clicks
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            // Submit email to the Node.js Express Backend
            fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
            .then(response => {
                if (response.status === 409) {
                    return response.json().then(data => { throw new Error(data.message || 'Already subscribed.') });
                }
                if (!response.ok) {
                    throw new Error('Failed to subscribe. Please try again.');
                }
                return response.json();
            })
            .then(data => {
                // Show dynamic success state
                const successMsg = document.createElement('div');
                successMsg.className = 'newsletter-success';
                successMsg.innerHTML = `<span>🎉</span> ${data.message || 'Subscribed! Welcome onboard, explorer.'}`;
                successMsg.style.color = 'var(--accent-color)';
                successMsg.style.fontSize = '1rem';
                successMsg.style.marginTop = '10px';
                successMsg.style.fontWeight = '600';
                successMsg.style.display = 'flex';
                successMsg.style.alignItems = 'center';
                successMsg.style.gap = '8px';
                successMsg.style.animation = 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';

                form.style.transition = 'opacity 0.3s ease';
                form.style.opacity = '0';
                setTimeout(() => {
                    form.style.display = 'none';
                    form.parentNode.appendChild(successMsg);
                }, 300);
            })
            .catch(error => {
                // Re-enable submit button
                if (submitBtn) submitBtn.disabled = false;

                // Show error message inline
                const errorMsg = document.createElement('div');
                errorMsg.className = 'newsletter-error';
                errorMsg.innerHTML = error.message || 'Server connection failed.';
                errorMsg.style.color = '#EF4444';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '8px';
                errorMsg.style.animation = 'fadeIn 0.3s ease forwards';
                form.appendChild(errorMsg);
            });
        });
    });
}

/**
 * Initializes the scroll progress bar at the top of the page
 */
function initScrollProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    });
}

/**
 * Initializes the floating Back-to-Top button
 */
function initBackToTopBtn() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400 || document.documentElement.scrollTop > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initializes animated number counters when scrolled into view
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (counters.length === 0) return;

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetVal = parseInt(target.getAttribute('data-target'), 10);
                if (isNaN(targetVal)) return;

                let startVal = 0;
                const duration = 1500; // 1.5 seconds animation duration
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentVal = Math.floor(progress * targetVal);
                    
                    const suffix = target.getAttribute('data-suffix') || '';
                    target.textContent = currentVal + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = targetVal + suffix;
                    }
                }

                requestAnimationFrame(updateCount);
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.1
    });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
}

/**
 * Initializes typing animation for tagline
 */
function initTypingAnimation() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const text = el.textContent.trim();
    el.textContent = '';
    
    // Create a blinking cursor inside a span next to the text
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.innerHTML = '│';
    el.parentNode.appendChild(cursor);

    let index = 0;
    const speed = 70; // typing speed in milliseconds

    function type() {
        if (index < text.length) {
            el.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 800); // Start after 0.8s for smooth load transition
}
