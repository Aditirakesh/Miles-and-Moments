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

    // 9. Smart Sticky Header (Hide on scroll down, show on scroll up)
    initSmartHeader();

    // 10. User Authentication Header Dropdown & Session Setup
    initUserSessionHeader();
});

/**
 * Initializes and handles the light/dark/system theme selection
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Create a beautiful custom dropdown to replace the old button
    const container = document.createElement('div');
    container.className = 'theme-dropdown';
    container.id = 'theme-select-container';

    container.innerHTML = `
        <button class="theme-dropdown-btn" id="theme-dropdown-btn" aria-label="Toggle theme selection" aria-haspopup="true" aria-expanded="false">
            <span class="theme-btn-icon">☀️</span>
            <span class="theme-btn-text">Light</span>
            <span class="theme-arrow-icon">▼</span>
        </button>
        <div class="theme-dropdown-menu" id="theme-dropdown-menu">
            <button class="theme-menu-item" data-value="light">
                <span class="item-icon">☀️</span> Light
            </button>
            <button class="theme-menu-item" data-value="dark">
                <span class="item-icon">🌙</span> Dark
            </button>
            <button class="theme-menu-item" data-value="system">
                <span class="item-icon">💻</span> System
            </button>
        </div>
    `;

    // Replace the legacy button with the custom dropdown in-place
    themeToggleBtn.parentNode.replaceChild(container, themeToggleBtn);

    const dropdownBtn = container.querySelector('#theme-dropdown-btn');
    const dropdownMenu = container.querySelector('#theme-dropdown-menu');
    const menuItems = container.querySelectorAll('.theme-menu-item');

    // Read stored user preference, fallback to 'system'
    const currentTheme = localStorage.getItem('theme') || 'system';

    // Media query matching system scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    function updateDropdownUI(theme) {
        let icon = '☀️';
        let text = 'Light';
        if (theme === 'dark') {
            icon = '🌙';
            text = 'Dark';
        } else if (theme === 'system') {
            icon = '💻';
            text = 'System';
        }
        if (dropdownBtn.querySelector('.theme-btn-icon')) {
            dropdownBtn.querySelector('.theme-btn-icon').textContent = icon;
        }
        if (dropdownBtn.querySelector('.theme-btn-text')) {
            dropdownBtn.querySelector('.theme-btn-text').textContent = text;
        }

        // Mark active item
        menuItems.forEach(item => {
            if (item.getAttribute('data-value') === theme) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else if (theme === 'light') {
            document.body.classList.remove('dark-theme');
        } else if (theme === 'system') {
            if (mediaQuery.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
        updateDropdownUI(theme);
        // Dispatch theme changed event for other scripts (like admin charts)
        document.dispatchEvent(new Event('themeChanged'));
    }

    // Apply the initial theme state on page load
    applyTheme(currentTheme);

    // Toggle dropdown visibility
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isShown = dropdownMenu.classList.toggle('show');
        dropdownBtn.setAttribute('aria-expanded', isShown ? 'true' : 'false');
    });

    // Close dropdown on click outside
    document.addEventListener('click', () => {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
    });

    // Event listeners for items selection
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const selectedValue = item.getAttribute('data-value');
            localStorage.setItem('theme', selectedValue);
            applyTheme(selectedValue);
            dropdownMenu.classList.remove('show');
            dropdownBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Event listener for OS system preference changes (e.g. night schedule transitions)
    mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });
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
                if (!response.ok) {
                    return response.json().then(data => { 
                        throw new Error(data.message || 'Failed to subscribe. Please try again.');
                    }).catch(err => {
                        throw new Error(err.message || 'Failed to subscribe. Please try again.');
                    });
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

                // Auto-restore newsletter form portal after 3 seconds
                setTimeout(() => {
                    successMsg.style.transition = 'opacity 0.3s ease';
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        if (successMsg.parentNode) {
                            successMsg.parentNode.removeChild(successMsg);
                        }
                        form.reset();
                        if (submitBtn) submitBtn.disabled = false;
                        form.style.display = '';
                        form.style.opacity = '1';
                    }, 300);
                }, 3000);
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

                // Auto-clear error after 4 seconds to allow easy retry
                setTimeout(() => {
                    errorMsg.style.transition = 'opacity 0.3s ease';
                    errorMsg.style.opacity = '0';
                    setTimeout(() => {
                        if (errorMsg.parentNode) errorMsg.remove();
                    }, 300);
                }, 4000);
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

/**
 * Smart Sticky Header: Hides header on scroll down, reveals on scroll up
 */
function initSmartHeader() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Prevent trigger on negative bounce scroll in iOS
        if (currentScrollY < 0) return;

        // If scrolling down and scrolled past header height, hide it
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('header-hidden');
        } else {
            // If scrolling up, show it
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

/**
 * Dynamic Session Header and Footer Subscriber guard
 */
function initUserSessionHeader() {
    const headerContainer = document.querySelector('.header-container');
    const themeToggle = document.getElementById('theme-toggle') || 
                        document.getElementById('theme-select') || 
                        document.getElementById('theme-select-container');
    if (!headerContainer || !themeToggle) return;

    // Group theme toggle and auth actions in a wrapper to prevent wide flexbox spacing
    let headerActions = document.querySelector('.header-actions');
    if (!headerActions) {
        headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        themeToggle.parentNode.insertBefore(headerActions, themeToggle);
        headerActions.appendChild(themeToggle);
    }

    fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
            // Page Guard Logic
            const pathname = window.location.pathname.toLowerCase();
            const isProtected = pathname.endsWith('services.html') || 
                                pathname.endsWith('contact.html') || 
                                pathname.endsWith('quiz.html') ||
                                pathname.endsWith('budget.html') ||
                                pathname.endsWith('destination.html');
            const isAdminPage = pathname.endsWith('admin.html');

            // Create wrapper element for header auth actions
            const authWrapper = document.createElement('div');
            authWrapper.className = 'header-auth-wrapper';

            if (data.success && data.user) {
                // User is logged in! Create profile initials avatar
                const user = data.user;
                
                // Check if user is trying to view admin page but is not an admin
                if (isAdminPage && user.role !== 'admin') {
                    showLockScreen('Access Denied', 'Administrator privileges are required to view the inquiry logs and subscriber lists.', true);
                    return;
                }

                const initials = user.username
                    .trim()
                    .split(' ')
                    .filter(n => n.length > 0)
                    .map(n => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase() || '👤';

                authWrapper.innerHTML = `
                    <div class="user-profile-dropdown">
                        <button class="profile-badge-btn" id="profile-dropdown-btn" title="View account options">
                            <span class="user-initials">${initials}</span>
                        </button>
                        <div class="profile-dropdown-menu" id="profile-dropdown-menu">
                            <div class="menu-user-info">
                                <span class="menu-username">${user.username}</span>
                                <span class="menu-email">${user.email}</span>
                            </div>
                            <div class="menu-divider"></div>
                            ${user.role === 'admin' ? '<a href="admin.html" class="menu-item admin-link">🔧 Admin Panel</a>' : ''}
                            <a href="#" class="menu-item" id="logout-menu-btn">🚪 Sign Out</a>
                        </div>
                    </div>
                `;

                // Append to headerActions
                headerActions.appendChild(authWrapper);

                // Dropdown Toggle Event
                const dropdownBtn = document.getElementById('profile-dropdown-btn');
                const dropdownMenu = document.getElementById('profile-dropdown-menu');
                if (dropdownBtn && dropdownMenu) {
                    dropdownBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        dropdownMenu.classList.toggle('show');
                    });
                    document.addEventListener('click', () => {
                        dropdownMenu.classList.remove('show');
                    });
                }

                // Logout Handler
                const logoutBtn = document.getElementById('logout-menu-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', async (e) => {
                        e.preventDefault();
                        try {
                            const res = await fetch('/api/auth/logout', { method: 'POST' });
                            const logoutResult = await res.json();
                            if (logoutResult.success) {
                                window.location.reload();
                            }
                        } catch (err) {
                            console.error('Logout failed:', err);
                        }
                    });
                }
            } else {
                // User is guest! Check page access restrictions
                if (isProtected || isAdminPage) {
                    showLockScreen('Authentication Required', 'Please Sign In or Register to unlock the full features of this page.', false);
                    return;
                }

                // Show "Sign In" button
                authWrapper.innerHTML = `
                    <a href="login.html" class="nav-signin-btn">
                        <span>👤</span> Sign In
                    </a>
                `;
                // Append to headerActions
                headerActions.appendChild(authWrapper);

                // Disable newsletter forms and display "Please login/signup to continue"
                const newsletterForms = document.querySelectorAll('.newsletter-form');
                newsletterForms.forEach(form => {
                    const input = form.querySelector('input[type="email"]');
                    const btn = form.querySelector('button[type="submit"]');
                    if (input) input.disabled = true;
                    if (btn) btn.disabled = true;

                    // Remove onsubmit inline alert, if present
                    form.removeAttribute('onsubmit');
                    form.onsubmit = null;

                    const prompt = document.createElement('div');
                    prompt.className = 'newsletter-login-prompt';
                    prompt.innerHTML = 'Please <a href="login.html">login/signup</a> to continue';
                    form.appendChild(prompt);
                });
            }
        })
        .catch(err => console.error('Error fetching user auth session:', err));
}

/**
 * Renders a glassmorphic fullscreen page lock overlay
 */
function showLockScreen(title, message, isLoggedIn) {
    // Disable interaction with the body (scroll lock)
    document.body.style.overflow = 'hidden';

    // Add blurred filter to the page content
    const mainEl = document.querySelector('main');
    if (mainEl) {
        mainEl.style.filter = 'blur(8px)';
        mainEl.style.pointerEvents = 'none';
        mainEl.style.userSelect = 'none';
    }

    const overlay = document.createElement('div');
    overlay.className = 'auth-lock-overlay';
    
    const relativeUrl = window.location.pathname.split('/').pop() + window.location.search;
    const loginLink = isLoggedIn ? 'login.html?logout=true' : 'login.html?redirect=' + encodeURIComponent(relativeUrl);
    const buttonText = isLoggedIn ? 'Log In as Admin' : 'Sign In / Register';

    overlay.innerHTML = `
        <div class="auth-lock-card">
            <div class="lock-icon-container">🔒</div>
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="auth-lock-buttons">
                <a href="${loginLink}" class="btn-lock-signin">${buttonText}</a>
                <a href="new1.html" class="btn-lock-home">Go Back Home</a>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}


