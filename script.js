document.addEventListener('DOMContentLoaded', () => {
    // Load shared components
    loadComponent('/components/header.html', 'header-placeholder', initNavigation);
    loadComponent('/components/footer.html', 'footer-placeholder');

    // Intersection Observer for Reveal Animations
    setupRevealAnimations();
});

// Component Loader
async function loadComponent(url, placeholderId, callback) {
    const el = document.getElementById(placeholderId);
    if (!el) return;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        el.innerHTML = await res.text();
        if (callback) callback();
    } catch (err) {
        console.warn('Component load error:', err);
    }
}

// Navigation logic (called after header injection)
function initNavigation() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const navbar = document.getElementById('navbar');

    // Mobile toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar scroll state
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // Dropdown click for touch devices
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) return; // handled differently on mobile
            const parent = dropdownTrigger.closest('.nav-dropdown');
            parent.classList.toggle('open');
            e.preventDefault();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
            }
        });
    }

    // Re-initialize reveal on dynamically loaded content
    setupRevealAnimations();
}

// Reveal on scroll
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observer.observe(el));
}
