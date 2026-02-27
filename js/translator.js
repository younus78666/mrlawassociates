/**
 * MR Law Associates - Translation System
 * Supports: English, Urdu (Arabic Script), Roman Urdu
 * Uses Google Translate API with custom UI
 * Auto-detects browser language
 */

(function() {
    'use strict';

    // Language configuration
    const LANGUAGES = {
        en: { name: 'English', code: 'en', flag: 'EN', dir: 'ltr' },
        ur: { name: 'اردو', code: 'ur', flag: 'اُ', dir: 'rtl' },
        rom: { name: 'Roman Urdu', code: 'ur', flag: 'ROM', dir: 'ltr', isRoman: true }
    };

    // Roman Urdu mapping for common legal terms
    const ROMAN_URDU_MAP = {
        // Navigation
        'Home': 'Home',
        'Services': 'Khidmat',
        'About': 'Hamare Baare Mein',
        'FAQ': 'Aam Sawalat',
        'Reviews': 'Reviews',
        'Blog': 'Blog',
        'Contact': 'Rabta',
        'Language': 'Zubaan',
        
        // Hero
        'Expert Lawyer in Karachi': 'Karachi Mein Mahir Vakil',
        'Professional Legal Services': 'Professional Qanooni Khidmat',
        'Free Consultation': 'Free Mashwara',
        'Call Now': 'Abhi Call Karen',
        'Schedule Consultation': 'Mashwara Book Karen',
        
        // Common
        'Learn More': 'Mazeed Janiye',
        'Read More': 'Mazeed Parhiye',
        'View All': 'Sab Dekhen',
        'Submit': 'Jama Karein',
        'Send Message': 'Paigham Bhejein',
        
        // Services
        'Legal Services': 'Qanooni Khidmat',
        'Family Law': 'Family Law',
        'Property Law': 'Property Law',
        'Criminal Law': 'Criminal Law',
        'Civil Law': 'Civil Law',
        'Corporate Law': 'Corporate Law',
        
        // Contact
        'Address': 'Pata',
        'Phone': 'Phone',
        'Email': 'Email',
        'Office Hours': 'Daftar Ke Auqaat',
        
        // Form labels
        'Your Name': 'Aapka Naam',
        'Your Email': 'Aapka Email',
        'Your Phone': 'Aapka Phone',
        'Message': 'Paigham',
        'Send': 'Bhejein',
        
        // Footer
        'Legal Disclaimer': 'Qanooni Dastbardari',
        'Privacy Policy': 'Privacy Policy',
        'Terms of Use': 'Istemaal Ki Sharait',
        'All rights reserved': 'Tamam Huqooq Mahfooz Hain'
    };

    let currentLang = localStorage.getItem('mrlaw-language') || 'en';
    let googleTranslateInitialized = false;

    // Detect browser language
    function detectBrowserLanguage() {
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        
        // Check for Urdu/Punjabi/Pakistan
        if (browserLang.startsWith('ur') || 
            browserLang.startsWith('pa') || 
            browserLang.includes('urdu') ||
            browserLang.includes('pk')) {
            return 'ur';
        }
        
        return 'en';
    }

    // Initialize translation
    function init() {
        // Check for saved preference or auto-detect
        const savedLang = localStorage.getItem('mrlaw-language');
        if (!savedLang) {
            currentLang = detectBrowserLanguage();
            localStorage.setItem('mrlaw-language', currentLang);
        }
        
        // Preserve technical content (phone numbers, emails) before any translation
        preserveTechnicalContent();

        // Load Google Translate if needed
        if (currentLang !== 'en') {
            loadGoogleTranslate();
        }

        // Add language switcher
        addLanguageSwitcher();

        // Apply Roman Urdu if selected
        if (currentLang === 'rom') {
            applyRomanUrdu();
        }
    }

    // Load Google Translate API
    function loadGoogleTranslate() {
        if (googleTranslateInitialized) return;

        // Add Google Translate script
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);

        // Create hidden Google Translate element
        const gtDiv = document.createElement('div');
        gtDiv.id = 'google_translate_element';
        gtDiv.style.display = 'none';
        document.body.appendChild(gtDiv);

        googleTranslateInitialized = true;
    }

    // Google Translate callback
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ur',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');

        // Apply translation after a short delay
        setTimeout(() => {
            if (currentLang === 'ur') {
                const select = document.querySelector('.goog-te-combo');
                if (select) {
                    select.value = 'ur';
                    select.dispatchEvent(new Event('change'));
                }
            }
        }, 500);
    };

    // Apply Roman Urdu translation
    function applyRomanUrdu() {
        document.body.classList.add('roman-urdu');
        
        // Walk through all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToTranslate = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent.trim();
            if (text && ROMAN_URDU_MAP[text]) {
                nodesToTranslate.push({ node, text });
            }
        }

        // Apply translations
        nodesToTranslate.forEach(({ node, text }) => {
            node.textContent = ROMAN_URDU_MAP[text];
        });

        // Also translate common elements by selector
        translateElementsBySelector();
    }

    // Translate elements using CSS selectors
    function translateElementsBySelector() {
        const selectors = [
            'nav a', '.nav-links a', '.dropdown-col a',
            '.hero-badge span', '.hero-title', '.hero-description',
            '.btn', '.service-card h3', '.service-card p',
            '.section-header h2', '.section-header p',
            'footer h4', 'footer a', 'footer p',
            '.cta-btn-primary span', '.cta-btn-secondary span'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                const text = el.textContent.trim();
                if (ROMAN_URDU_MAP[text]) {
                    el.textContent = ROMAN_URDU_MAP[text];
                }
            });
        });
    }

    // Wrap phone numbers, emails, and technical content to preserve LTR
    function preserveTechnicalContent() {
        // Phone numbers pattern (Pakistani format)
        const phonePattern = /\b(0\d{3,4}\s?\d{7,8})\b/g;
        
        // Email pattern
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        
        // Time patterns
        const timePattern = /\b(\d{1,2}:\d{2}(?:\s?(?:AM|PM|am|pm))?)\b/g;
        
        // Stat numbers (like 500+, 98%, etc.)
        const statPattern = /\b(\d+(?:\+?\s*%?|\s*\+))\b/g;
        
        // Process all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const nodesToProcess = [];
        let node;
        while (node = walker.nextNode()) {
            const text = node.textContent;
            if (phonePattern.test(text) || emailPattern.test(text) || 
                timePattern.test(text) || statPattern.test(text)) {
                nodesToProcess.push(node);
            }
        }
        
        // Reset regex lastIndex
        phonePattern.lastIndex = 0;
        emailPattern.lastIndex = 0;
        timePattern.lastIndex = 0;
        statPattern.lastIndex = 0;
        
        // Wrap matches with span
        nodesToProcess.forEach(node => {
            const parent = node.parentNode;
            if (parent && !parent.classList.contains('ltr-content') && 
                !parent.classList.contains('phone-number') &&
                !parent.classList.contains('email-address')) {
                
                let html = node.textContent;
                
                // Wrap phone numbers
                html = html.replace(phonePattern, '<span class="phone-number ltr-content" dir="ltr">$1</span>');
                // Wrap emails
                html = html.replace(emailPattern, '<span class="email-address ltr-content" dir="ltr">$1</span>');
                // Wrap times
                html = html.replace(timePattern, '<span class="time ltr-content" dir="ltr">$1</span>');
                // Wrap stats
                html = html.replace(statPattern, '<span class="stat-number ltr-content" dir="ltr">$1</span>');
                
                // Only replace if we made changes
                if (html !== node.textContent) {
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = html;
                    parent.replaceChild(wrapper, node);
                }
            }
        });
        
        // Also handle specific elements by selector
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
            if (!el.classList.contains('ltr-content')) {
                el.classList.add('ltr-content');
                el.setAttribute('dir', 'ltr');
            }
        });
        
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
            if (!el.classList.contains('ltr-content')) {
                el.classList.add('ltr-content');
                el.setAttribute('dir', 'ltr');
            }
        });
    }

    // Set language
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('mrlaw-language', lang);
        
        // Wrap phone numbers and technical content with LTR preservation
        preserveTechnicalContent();

        if (lang === 'en') {
            // Reload page to reset to English
            window.location.reload();
        } else if (lang === 'ur') {
            // Apply Urdu (RTL)
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ur');
            document.body.classList.add('rtl');
            document.body.classList.remove('roman-urdu');
            
            // Trigger Google Translate
            loadGoogleTranslate();
            setTimeout(() => {
                const select = document.querySelector('.goog-te-combo');
                if (select) {
                    select.value = 'ur';
                    select.dispatchEvent(new Event('change'));
                }
                // Re-apply preservation after Google Translate
                setTimeout(preserveTechnicalContent, 500);
            }, 1000);
        } else if (lang === 'rom') {
            // Apply Roman Urdu
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            document.body.classList.remove('rtl');
            applyRomanUrdu();
        }

        updateLanguageSwitcherUI(lang);
    }

    // Add language switcher to page - multiple locations
    function addLanguageSwitcher() {
        // 1. Add to top bar
        addTopBarSwitcher();
        
        // 2. Add sticky floating button (bottom left)
        addStickyFloatingSwitcher();
        
        // 3. Add to nav buttons (existing)
        addNavButtonSwitcher();

        // Apply initial language
        if (currentLang !== 'en') {
            setTimeout(() => setLanguage(currentLang), 100);
        }
    }

    // Add switcher to top bar
    function addTopBarSwitcher() {
        const topBarRight = document.querySelector('.top-bar-right');
        if (!topBarRight) return;

        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher-topbar';
        switcher.innerHTML = `
            <button class="lang-btn-topbar" id="langToggleTopbar" aria-label="Change Language">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span id="currentLangTopbar">${LANGUAGES[currentLang].flag}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                </svg>
            </button>
            <div class="lang-menu-topbar" id="langMenuTopbar">
                <button class="lang-option-topbar ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                    <span class="lang-icon-small">EN</span>
                    <span>English</span>
                </button>
                <button class="lang-option-topbar ${currentLang === 'ur' ? 'active' : ''}" data-lang="ur">
                    <span class="lang-icon-small">اُ</span>
                    <span>اردو</span>
                </button>
                <button class="lang-option-topbar ${currentLang === 'rom' ? 'active' : ''}" data-lang="rom">
                    <span class="lang-icon-small">ROM</span>
                    <span>Roman Urdu</span>
                </button>
            </div>
        `;

        topBarRight.insertBefore(switcher, topBarRight.firstChild);

        // Event listeners
        const toggle = switcher.querySelector('#langToggleTopbar');
        const menu = switcher.querySelector('#langMenuTopbar');
        const options = switcher.querySelectorAll('.lang-option-topbar');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other menus
            document.querySelectorAll('.lang-menu, .lang-menu-sticky').forEach(m => m.classList.remove('show'));
            menu.classList.toggle('show');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                setLanguage(lang);
                menu.classList.remove('show');
            });
        });

        document.addEventListener('click', () => menu.classList.remove('show'));
    }

    // Add sticky floating switcher (bottom left)
    function addStickyFloatingSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher-sticky';
        switcher.innerHTML = `
            <button class="lang-btn-sticky" id="langToggleSticky" aria-label="Change Language">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span class="lang-label" id="currentLangSticky">${LANGUAGES[currentLang].name}</span>
            </button>
            <div class="lang-menu-sticky" id="langMenuSticky">
                <button class="lang-option-sticky ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                    <span class="lang-flag">EN</span>
                    <span>English</span>
                </button>
                <button class="lang-option-sticky ${currentLang === 'ur' ? 'active' : ''}" data-lang="ur">
                    <span class="lang-flag">اُ</span>
                    <span>اردو (Urdu)</span>
                </button>
                <button class="lang-option-sticky ${currentLang === 'rom' ? 'active' : ''}" data-lang="rom">
                    <span class="lang-flag">ROM</span>
                    <span>Roman Urdu</span>
                </button>
            </div>
        `;

        document.body.appendChild(switcher);

        // Event listeners
        const toggle = switcher.querySelector('#langToggleSticky');
        const menu = switcher.querySelector('#langMenuSticky');
        const options = switcher.querySelectorAll('.lang-option-sticky');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other menus
            document.querySelectorAll('.lang-menu, .lang-menu-topbar').forEach(m => m.classList.remove('show'));
            menu.classList.toggle('show');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                setLanguage(lang);
                menu.classList.remove('show');
            });
        });

        document.addEventListener('click', () => menu.classList.remove('show'));
    }

    // Add switcher to nav buttons
    function addNavButtonSwitcher() {
        const navButtons = document.querySelector('.nav-buttons');
        if (!navButtons) return;

        const switcher = document.createElement('div');
        switcher.className = 'language-switcher-wrapper';
        switcher.innerHTML = `
            <div class="language-switcher">
                <button class="lang-toggle" id="langToggle" aria-label="Change Language">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span id="currentLang">${LANGUAGES[currentLang].flag}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"/>
                    </svg>
                </button>
                <div class="lang-menu" id="langMenu">
                    <button class="lang-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
                        <span class="lang-icon">EN</span>
                        <span>English</span>
                    </button>
                    <button class="lang-option ${currentLang === 'ur' ? 'active' : ''}" data-lang="ur">
                        <span class="lang-icon">اُ</span>
                        <span>اردو (Urdu)</span>
                    </button>
                    <button class="lang-option ${currentLang === 'rom' ? 'active' : ''}" data-lang="rom">
                        <span class="lang-icon">ROM</span>
                        <span>Roman Urdu</span>
                    </button>
                </div>
            </div>
        `;

        navButtons.insertBefore(switcher, navButtons.firstChild);

        // Event listeners
        const toggle = switcher.querySelector('#langToggle');
        const menu = switcher.querySelector('#langMenu');
        const options = switcher.querySelectorAll('.lang-option');

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other menus
            document.querySelectorAll('.lang-menu-topbar, .lang-menu-sticky').forEach(m => m.classList.remove('show'));
            menu.classList.toggle('show');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                setLanguage(lang);
                menu.classList.remove('show');
            });
        });

        document.addEventListener('click', () => menu.classList.remove('show'));
    }

    // Update language switcher UI - sync all switchers
    function updateLanguageSwitcherUI(lang) {
        // Update nav buttons switcher
        const currentLangEl = document.getElementById('currentLang');
        if (currentLangEl) {
            currentLangEl.textContent = LANGUAGES[lang].flag;
        }

        // Update top bar switcher
        const currentLangTopbar = document.getElementById('currentLangTopbar');
        if (currentLangTopbar) {
            currentLangTopbar.textContent = LANGUAGES[lang].flag;
        }

        // Update sticky switcher
        const currentLangSticky = document.getElementById('currentLangSticky');
        if (currentLangSticky) {
            currentLangSticky.textContent = LANGUAGES[lang].name;
        }

        // Update all option active states
        document.querySelectorAll('.lang-option, .lang-option-topbar, .lang-option-sticky').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API
    window.MRLawTranslator = {
        setLanguage,
        getCurrentLanguage: () => currentLang,
        detectBrowserLanguage,
        LANGUAGES
    };

})();
