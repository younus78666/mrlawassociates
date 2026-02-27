// Core Web Vitals: Yield to main thread helper
function yieldToMain(callback, delay = 0) {
    if (typeof requestIdleCallback !== 'undefined' && delay === 0) {
        requestIdleCallback(callback, { timeout: 100 });
    } else {
        setTimeout(callback, delay);
    }
}

// Batch processing helper for large arrays
function processBatch(items, processFn, batchSize = 5, delay = 0) {
    let index = 0;
    function processNextBatch() {
        const end = Math.min(index + batchSize, items.length);
        for (let i = index; i < end; i++) {
            processFn(items[i], i);
        }
        index = end;
        if (index < items.length) {
            yieldToMain(processNextBatch, delay);
        }
    }
    processNextBatch();
}

// ======================================
// Google Ads Conversion Tracking
// ======================================
function initGoogleAdsTracking() {
    // Ensure gtag is available
    if (typeof gtag === 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        gtag('js', new Date());
    }

    // Load Google Ads gtag.js if not already loaded
    if (!document.querySelector('script[src*="AW-16610551759"]')) {
        var gadsScript = document.createElement('script');
        gadsScript.async = true;
        gadsScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16610551759';
        document.head.appendChild(gadsScript);
    }

    // Configure Google Ads tag
    gtag('config', 'AW-16610551759');
}

// Conversion tracking functions
function gtag_report_whatsapp_conversion(url) {
    var callback = function () {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-16610551759/d-BtCJCLwMwZEM_Pw_A9',
        'event_callback': callback
    });
    return false;
}

function gtag_report_phone_conversion(url) {
    var callback = function () {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-16610551759/ppMvCKbdzP8bEM_Pw_A9',
        'value': 1.0,
        'currency': 'PKR',
        'event_callback': callback
    });
    return false;
}

// Attach conversion tracking to all WhatsApp and phone links
function attachConversionTracking() {
    // WhatsApp links
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
        if (link.dataset.conversionAttached) return;
        link.dataset.conversionAttached = 'true';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            gtag_report_whatsapp_conversion(this.href);
        });
    });
    // Phone links (tel:)
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
        if (link.dataset.conversionAttached) return;
        link.dataset.conversionAttached = 'true';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            gtag_report_phone_conversion(this.href);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Google Ads conversion tracking
    initGoogleAdsTracking();

    // Priority 1: Load critical components immediately
    loadComponent('/components/header.html', 'header-placeholder', () => {
        initNavigation();
        attachConversionTracking(); // Track WA links in header
    });
    loadComponent('/components/footer.html', 'footer-placeholder', () => {
        attachConversionTracking(); // Track WA links in footer
    });

    // Track WhatsApp links already in the page
    attachConversionTracking();

    // Priority 2: Setup reveal animations (critical for UX)
    setupRevealAnimations();

    // Priority 3: Initialize footer year (fast operation)
    initFooterYear();

    // Defer non-critical initializations to improve LCP and FID
    yieldToMain(() => {
        // Initialize Testimonials filtering
        initTestimonialsFilter();

        // Initialize FAQ functionality
        initFAQ();

        // Initialize Reviews page functionality
        initReviews();

        // Initialize Random Reviews on any page
        initRandomReviews();
    });

    // Defer WhatsApp widget (lowest priority - not needed for initial paint)
    yieldToMain(() => {
        initWhatsAppWidget();
        attachConversionTracking(); // Track WA link in widget
    }, 2000);
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
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-menu-logo');
    const navbar = document.getElementById('navbar');

    // Function to open mobile menu
    function openMobileMenu() {
        if (menuBtn) menuBtn.classList.add('active');
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (menuBtn) menuBtn.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Mobile toggle button click
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close button click
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', closeMobileMenu);
        }

        // Overlay backdrop click
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }

        // Close when clicking any link in mobile menu
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // Navbar scroll state & Top Bar Hiding - Optimized with throttling
    if (navbar) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Toggle frosted glass navbar style
                    navbar.classList.toggle('scrolled', currentScrollY > 50);

                    // Hide Top Bar strictly when scrolling down past 50px
                    if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                        document.body.classList.add('scrolled-down');
                    } else {
                        document.body.classList.remove('scrolled-down');
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Dropdown click for touch devices - deferred with batch processing
    yieldToMain(() => {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
        // Process in smaller batches to avoid blocking
        processBatch(Array.from(dropdownTriggers), (trigger) => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 968) return;
                const parent = trigger.closest('.nav-dropdown');
                // Close other open dropdowns
                document.querySelectorAll('.nav-dropdown.open').forEach(d => {
                    if (d !== parent) d.classList.remove('open');
                });
                parent.classList.toggle('open');
                e.preventDefault();
            });
        }, 3);
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        }
    });

    // Re-initialize reveal on dynamically loaded content - deferred
    yieldToMain(() => {
        setupRevealAnimations();
    });
}

// Reveal on scroll - Optimized with batching and threshold tuning
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    if (!revealElements.length) return;

    // Use a lower threshold for earlier triggering and reduce layout shifts
    const observer = new IntersectionObserver((entries) => {
        // Batch DOM updates to reduce reflows
        const toActivate = [];
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                toActivate.push(entry.target);
                observer.unobserve(entry.target);
            }
        });
        
        // Apply changes in a single batch
        if (toActivate.length > 0) {
            requestAnimationFrame(() => {
                toActivate.forEach(el => el.classList.add('active'));
            });
        }
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    // Observe elements in batches to avoid long tasks
    processBatch(Array.from(revealElements), (el) => {
        observer.observe(el);
    }, 10);
}

// ======================================
// Testimonials Filtering
// ======================================
function initTestimonialsFilter() {
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (!testimonialsSection) return;

    const filterTabs = testimonialsSection.querySelectorAll('.filter-tab');
    const testimonialItems = testimonialsSection.querySelectorAll('.testimonial-item');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter items
            testimonialItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.classList.add('revealed');
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ======================================
// FAQ Section - No accordion needed (static layout)
// ======================================
function initFAQ() {
    // Static FAQ layout on homepage - no accordion needed

    // ---- FAQ Page: Category pill scroll-spy & smooth scroll ----
    const categoryNav = document.querySelector('.faq-category-nav');
    if (!categoryNav) return; // Not on the FAQ page

    const pills = categoryNav.querySelectorAll('.faq-nav-pill');
    const navContainer = categoryNav.querySelector('.faq-nav-container');
    const sections = [];

    pills.forEach(function(pill) {
        var target = document.querySelector(pill.getAttribute('href'));
        if (target) sections.push({ pill: pill, heading: target });
    });

    // Smooth scroll on pill click
    pills.forEach(function(pill) {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update active pill immediately on click
                pills.forEach(function(p) { p.classList.remove('active'); });
                this.classList.add('active');
                scrollPillIntoView(this);
            }
        });
    });

    // Scroll active pill into horizontal view on mobile
    function scrollPillIntoView(activePill) {
        if (!navContainer) return;
        var pillLeft = activePill.offsetLeft;
        var pillWidth = activePill.offsetWidth;
        var containerWidth = navContainer.offsetWidth;
        var scrollLeft = pillLeft - (containerWidth / 2) + (pillWidth / 2);
        navContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }

    // IntersectionObserver scroll-spy to highlight active category
    var observerOptions = {
        rootMargin: '-140px 0px -60% 0px',
        threshold: 0
    };

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                pills.forEach(function(p) {
                    p.classList.remove('active');
                    if (p.getAttribute('href') === '#' + id) {
                        p.classList.add('active');
                        scrollPillIntoView(p);
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(function(s) {
        observer.observe(s.heading);
    });
}

// ======================================
// Reviews Page — Read More, Filter, Load More
// ======================================
// ========== Random Reviews System ==========
// Centralized reviews pool — renders random reviews on any page
const REVIEWS_POOL = [
    { name: "Sana Khan", initials: "SK", color: "#E8D5C4", category: "family", stars: 5, text: "Reema madam ne mera khula case bohot ache se handle kiya. Pehle mujhe bohot tension thi lekin unhone har cheez samjhai aur mujhe himmat di. Alhamdulillah sirf 4 mahine mein khula hogya." },
    { name: "Ahmed Malik", initials: "AM", color: "#D4E8D4", category: "marriage", stars: 5, text: "Had our court marriage done through MR Law Associates. The entire process was seamless and professionally handled. All documentation was completed on time and we received our Nikah Nama without any delays." },
    { name: "Imran Qureshi", initials: "IQ", color: "#D4D8E8", category: "property", stars: 5, text: "Property ka case kaafi arsay se chal raha tha. Kisi lawyer ne dhang se handle nahi kiya tha. MR Law Associates ne bohot professional tarike se case sambhala aur favorable result aya." },
    { name: "Bilal Ansari", initials: "BA", color: "#E8D4E0", category: "criminal", stars: 5, text: "FIR ke baad bohot pareshan the. Reema madam ne next day bail dilwa di. Bohot professional aur fast kaam karte hain. Best criminal lawyer in Karachi." },
    { name: "Ayesha Sheikh", initials: "AS", color: "#E8E4D4", category: "family", stars: 5, text: "I was going through a very difficult divorce and needed a lawyer who would genuinely understand my situation. Advocate Reema Jawed was not only professionally competent but also empathetic throughout the process." },
    { name: "Farhan Soomro", initials: "FS", color: "#D4E8E4", category: "nadra", stars: 5, text: "NADRA se birth certificate ka masla tha kaafi dino se. Bohot offices ke chakkar lagaye lekin koi hal nahi hua. MR Law Associates ne sirf 2 hafton mein sab theek kar diya." },
    { name: "Hassan Mirza", initials: "HM", color: "#E4D4E8", category: "business", stars: 5, text: "Got my company registered through MR Law Associates. They handled everything from NTN registration to SECP filings. Very efficient and transparent about costs." },
    { name: "Kashif Baloch", initials: "KB", color: "#E8DCD4", category: "overseas", stars: 5, text: "Dubai se hoon, Karachi mein property ka masla tha. Reema madam ne sab kuch remotely handle kiya. WhatsApp pe regular updates milte the. Mujhe aik baar bhi Pakistan nahi aana para." },
    { name: "Rabia Naqvi", initials: "RN", color: "#E8D5C4", category: "family", stars: 5, text: "Mera maintenance ka case tha. Shohar nafqa nahi de raha tha bachon ka. Reema madam ne court mein strong case present kiya aur mashallah acha nafqa mil gaya." },
    { name: "Ali Rajput", initials: "AR", color: "#D4E8D4", category: "marriage", stars: 5, text: "Court marriage ka sara process bohot smooth tha. Sab kuch legal tarike se hua aur documents bhi time pe mil gaye. MR Law Associates ne poori guidance di har step pe." },
    { name: "Nadia Awan", initials: "NA", color: "#D4D8E8", category: "property", stars: 5, text: "MR Law Associates handled my property partition suit with great expertise. The case had been dragging in court for years with my previous lawyer but Advocate Reema took over and within months we had a favorable outcome." },
    { name: "Waqar Ahmed", initials: "WA", color: "#E8D4E0", category: "family", stars: 5, text: "Bachon ki custody ka case tha. Ex-wife ne bachon ko le ke chali gayi thi. Reema madam ne bohot mehnat ki aur Alhamdulillah mujhe bachon ki custody mil gayi." },
    { name: "Asad Chaudhry", initials: "AC", color: "#E8E4D4", category: "criminal", stars: 5, text: "Was falsely accused in a fraud case. MR Law Associates took up my case and proved my innocence in court. Their criminal defense strategy was brilliant." },
    { name: "Naveed Shah", initials: "NS", color: "#E4D4E8", category: "nadra", stars: 5, text: "Had issues with my CNIC and family tree record at NADRA. MR Law Associates resolved everything efficiently. They know exactly how to deal with NADRA bureaucracy." },
    { name: "Farah Gill", initials: "FG", color: "#E8DCD4", category: "overseas", stars: 5, text: "I am based in London and needed legal assistance for a family property matter in Karachi. MR Law Associates handled everything remotely with regular updates via WhatsApp and email." },
    { name: "Kamran Shaikh", initials: "KS", color: "#E8D5C4", category: "family", stars: 5, text: "Meri behen ka divorce case tha. Bohot mushkil waqt tha humari family ke liye. Reema madam ne bohot ache se case handle kiya. Haq mehr bhi recover hogya Alhamdulillah." },
    { name: "Zainab Syed", initials: "ZS", color: "#D4E8D4", category: "marriage", stars: 5, text: "Humne court marriage karwai MR Law Associates se. Bohot professional service thi. Nikah Nama aur sab documents mile time pe. Reema madam ne personally supervise kiya poora process." },
    { name: "Sajid Rana", initials: "SR", color: "#D4D8E8", category: "property", stars: 5, text: "Zameen ka case tha. Qabza group ne humari zameen pe qabza kar liya tha. MR Law Associates ne court se stay order liya aur phir case jeet ke humein zameen wapis dilwai." },
    { name: "Samina Butt", initials: "SB", color: "#D4E8E4", category: "family", stars: 4, text: "Khula ka case MR Law Associates se karwaya. Overall experience acha raha. Thoda time laga lekin result achha aya. Reema madam bohot cooperative hain." }
];

function getRandomReviews(count, category) {
    var pool = category
        ? REVIEWS_POOL.filter(function(r) { return r.category === category; })
        : REVIEWS_POOL.slice();

    // Shuffle using Fisher-Yates
    for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pool[i];
        pool[i] = pool[j];
        pool[j] = temp;
    }
    return pool.slice(0, count);
}

function renderReviewCard(review) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
        stars += i < review.stars ? '\u2605' : '\u2606';
    }
    return '<div class="random-review-card">' +
        '<div class="random-review-header">' +
            '<div class="random-review-avatar" style="background:' + review.color + ';">' + review.initials + '</div>' +
            '<div class="random-review-meta">' +
                '<span class="random-review-name">' + review.name + '</span>' +
                '<span class="random-review-stars">' + stars + '</span>' +
            '</div>' +
            '<svg class="random-review-google" width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>' +
        '</div>' +
        '<p class="random-review-text">' + review.text + '</p>' +
    '</div>';
}

function initRandomReviews() {
    var containers = document.querySelectorAll('[data-random-reviews]');
    containers.forEach(function(container) {
        var count = parseInt(container.dataset.randomReviews) || 3;
        var category = container.dataset.reviewCategory || null;
        var reviews = getRandomReviews(count, category);
        var html = reviews.map(renderReviewCard).join('');
        container.innerHTML = html;
    });
}

// ========== Reviews Page Logic ==========
function initReviews() {
    var reviewsGrid = document.querySelector('.reviews-grid');
    if (!reviewsGrid) return;

    var allCards = Array.from(reviewsGrid.querySelectorAll('.g-review-card'));
    var BATCH = 24;
    var shown = Math.min(BATCH, allCards.length);
    var currentFilter = 'all';

    // --- Initial visibility ---
    allCards.forEach(function(card, i) {
        if (i < BATCH) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    updateCounter();

    // --- Read More toggle ---
    allCards.forEach(function(card) {
        var textEl = card.querySelector('.g-review-text');
        var btn = card.querySelector('.g-review-readmore');
        if (!textEl || !btn) return;

        var hasReply = !!card.querySelector('.g-review-reply');

        // Detect truncation after layout
        function checkTruncation() {
            // Reset to clamped state to measure
            card.classList.remove('expanded');
            btn.style.display = 'none';
            // Show "Read more" if text is clipped OR card has an owner reply
            if (textEl.scrollHeight > textEl.clientHeight + 2 || hasReply) {
                btn.style.display = 'inline-block';
            }
        }

        // Check after fonts load
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(checkTruncation).catch(() => {
                // Fallback if fonts API fails
                setTimeout(checkTruncation, 300);
            });
        } else {
            setTimeout(checkTruncation, 300);
        }

        btn.addEventListener('click', function() {
            var isExpanded = card.classList.toggle('expanded');
            btn.textContent = isExpanded ? 'Show less' : 'Read more';
        });
    });

    // --- Filter pills ---
    var pills = document.querySelectorAll('.reviews-filter-pill');
    pills.forEach(function(pill) {
        pill.addEventListener('click', function() {
            pills.forEach(function(p) { p.classList.remove('active'); });
            pill.classList.add('active');
            currentFilter = pill.dataset.filter;

            // Reset shown count
            shown = 0;
            var visibleCount = 0;

            allCards.forEach(function(card) {
                var matches = currentFilter === 'all' || card.dataset.category === currentFilter;
                if (matches) {
                    visibleCount++;
                    if (visibleCount <= BATCH) {
                        card.classList.remove('hidden');
                        shown++;
                    } else {
                        card.classList.add('hidden');
                    }
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });

            updateCounter();
        });
    });

    // --- Load More ---
    var loadBtn = document.getElementById('loadMoreBtn');
    if (loadBtn) {
        loadBtn.addEventListener('click', function() {
            var count = 0;
            var hiddenCards = allCards.filter(function(card) {
                if (card.style.display === 'none') return false; // filtered out
                return card.classList.contains('hidden');
            });

            hiddenCards.forEach(function(card) {
                if (count < BATCH) {
                    card.classList.remove('hidden');
                    shown++;
                    count++;
                }
            });

            updateCounter();
        });
    }

    // --- Counter ---
    function updateCounter() {
        var shownEl = document.getElementById('reviewsShown');
        var totalEl = document.getElementById('reviewsTotal');
        var loadMoreWrap = document.querySelector('.reviews-load-more');

        // Count visible cards (not display:none and not hidden)
        var visibleNow = allCards.filter(function(c) {
            return c.style.display !== 'none' && !c.classList.contains('hidden');
        }).length;

        var totalFiltered = allCards.filter(function(c) {
            return c.style.display !== 'none';
        }).length;

        if (shownEl) shownEl.textContent = visibleNow;
        if (totalEl) totalEl.textContent = totalFiltered;

        // Hide load more button when all shown
        if (loadMoreWrap) {
            loadMoreWrap.style.display = visibleNow >= totalFiltered ? 'none' : '';
        }
    }
}


// ======================================
// WhatsApp Widget - Simple Redirect
// Direct users to WhatsApp for legal consultation
// ======================================
function initWhatsAppWidget() {
    // Prevent double initialization
    if (document.getElementById('wa-widget')) return;

    // Configuration
    const CONFIG = {
        phone: '923363120798',
        displayPhone: '0336 3120798',
        name: 'Reema Jawed',
        title: 'Advocate High Court',
        popupDelay: 2000
    };

    // Context-aware greeting messages
    const path = window.location.pathname.toLowerCase();
    let greeting = "Need legal assistance? Message me directly on WhatsApp for a free consultation.";
    
    if (path.includes('/services/')) {
        const service = path.match(/\/services\/([^\/]+)/);
        const serviceName = service ? service[1].replace(/-/g, ' ') : 'this service';
        greeting = `Need help with ${serviceName}? Message me on WhatsApp for expert legal advice.`;
    } else if (path.includes('/location/')) {
        const loc = path.match(/\/location\/([^\/]+)/);
        const location = loc ? loc[1].replace(/-/g, ' ') : 'your area';
        greeting = `Looking for a lawyer near ${location}? I'm available to help. Message me on WhatsApp!`;
    } else if (path.includes('/family') || path.includes('/khula') || path.includes('/divorce')) {
        greeting = "Going through a difficult family situation? I'm here to help. Message me confidentially on WhatsApp.";
    } else if (path.includes('/criminal') || path.includes('/bail') || path.includes('/fir')) {
        greeting = "Urgent legal matter? I'm available 24/7 for criminal cases. Message me on WhatsApp now!";
    } else if (path.includes('/property')) {
        greeting = "Property dispute? Get expert legal guidance. Message me on WhatsApp for a consultation.";
    }

    // Create widget HTML
    const widgetHTML = `
        <div id="wa-widget" class="wa-widget">
            <div class="wa-popup" id="wa-popup">
                <div class="wa-header">
                    <div class="wa-avatar">
                        <span>RJ</span>
                        <span class="wa-online"></span>
                    </div>
                    <div class="wa-info">
                        <div class="wa-name">${CONFIG.name}</div>
                        <div class="wa-title">${CONFIG.title}</div>
                        <div class="wa-status">● Online now</div>
                    </div>
                    <button class="wa-close" id="wa-close" aria-label="Close" type="button">×</button>
                </div>
                <div class="wa-body-simple">
                    <div class="wa-greeting">${greeting}</div>
                    <div class="wa-phone">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        ${CONFIG.displayPhone}
                    </div>
                    <div class="wa-hours">⏰ Available: Mon-Sat | 24/7 for Emergencies</div>
                </div>
                <div class="wa-footer-simple">
                    <a href="https://wa.me/${CONFIG.phone}?text=Hello Advocate Reema, I need legal assistance." 
                       target="_blank" rel="noopener noreferrer" class="wa-chat-btn" id="wa-chat-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        💬 Chat on WhatsApp
                    </a>
                </div>
            </div>
            <button class="wa-float-btn" id="wa-float-btn" type="button" aria-label="Chat on WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span class="wa-pulse"></span>
            </button>
        </div>
    `;

    // Insert widget into DOM
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // Get DOM elements
    const popup = document.getElementById('wa-popup');
    const floatBtn = document.getElementById('wa-float-btn');
    const closeBtn = document.getElementById('wa-close');

    // Verify elements exist
    if (!popup || !floatBtn || !closeBtn) {
        console.error('WhatsApp widget: Required elements not found');
        return;
    }

    let isOpen = false;
    const isMobile = window.innerWidth <= 768;

    // On mobile: skip popup, button redirects directly to WhatsApp
    if (isMobile) {
        floatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${CONFIG.phone}?text=Hello Advocate Reema, I need legal assistance.`, '_blank', 'noopener,noreferrer');
        });
    } else {
        // Desktop: Show popup after delay
        setTimeout(() => {
            if (popup && !isOpen) {
                popup.classList.add('active');
                isOpen = true;
            }
        }, CONFIG.popupDelay);

        // Toggle popup on float button click
        floatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.classList.toggle('active');
            isOpen = popup.classList.contains('active');
        });
    }

    // Close popup on close button click
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.classList.remove('active');
        isOpen = false;
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (isOpen && !e.target.closest('.wa-widget')) {
            popup.classList.remove('active');
            isOpen = false;
        }
    });
}


// ======================================
// Dynamic Footer Year
// ======================================
function initFooterYear() {
    const yearElements = document.querySelectorAll('.footer-year, #footer-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}
