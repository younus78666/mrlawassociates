/**
 * MR Law Associates - WhatsApp Sales Widget
 * Context-aware messaging system for maximum conversion
 * Phone: +92 336 3120798
 */

(function() {
    'use strict';

    // WhatsApp Configuration
    const CONFIG = {
        phone: '923363120798', // International format without +
        displayPhone: '0336 3120798',
        name: 'Reema Jawed',
        title: 'Advocate High Court',
        avatar: '/assets/logo-icon.png',
        popupDelay: 3000, // Show popup after 3 seconds
        rotateInterval: 8000, // Rotate message every 8 seconds
        pageContext: detectPageContext()
    };

    // Context-Aware Message Database
    const MESSAGE_DATABASE = {
        // Homepage messages
        home: {
            greetings: [
                { text: "👋 Welcome! Need a lawyer in Karachi? Get FREE case evaluation now!", urgency: "normal" },
                { text: "⚡ Urgent legal help? Advocate High Court Reema Jawed is online now!", urgency: "high" },
                { text: "🎯 98% success rate | 500+ cases won | Message for instant consultation", urgency: "normal" },
                { text: "💬 Hi! Looking for the best lawyer in Karachi? Let's discuss your case!", urgency: "normal" },
                { text: "⏰ Free consultation for next 3 clients today! Don't miss out 👆", urgency: "high" },
                { text: "🏛️ Civil, Family, Criminal, Property disputes? We handle everything!", urgency: "normal" },
                { text: "📍 Near City Court Karachi | Available 24/7 for emergencies", urgency: "normal" }
            ]
        },

        // Service pages
        services: {
            greetings: [
                { text: "⚖️ Need help with this specific legal matter? Get expert advice now!", urgency: "normal" },
                { text: "🎯 Specialist lawyer for this service available. Message for details!", urgency: "high" },
                { text: "💡 Free 30-min consultation for this type of case. Book now!", urgency: "normal" },
                { text: "🚀 Fast-track your case with an experienced Advocate High Court!", urgency: "high" },
                { text: "📋 Want to know the exact process & fees? Let's chat!", urgency: "normal" },
                { text: "✅ 500+ similar cases handled successfully. You can trust us!", urgency: "normal" }
            ]
        },

        // Location pages
        location: {
            greetings: [
                { text: "📍 Looking for a lawyer near you? We serve this area!", urgency: "normal" },
                { text: "🏠 Local legal expert for your area. Free consultation available!", urgency: "high" },
                { text: "⚡ Need urgent legal help in your neighborhood? Message now!", urgency: "high" },
                { text: "🚗 We can come to your location if needed. Let's discuss!", urgency: "normal" },
                { text: "💬 Local clients in your area trust us. Join them today!", urgency: "normal" },
                { text: "📞 Same-day appointments available for {location} residents!", urgency: "high" }
            ]
        },

        // About page
        about: {
            greetings: [
                { text: "👩‍⚖️ Want to know more about our experience? Ask me anything!", urgency: "normal" },
                { text: "🏆 15+ years experience | Sindh High Court | Let's discuss your case", urgency: "normal" },
                { text: "💼 Member of Karachi Bar & SHC Bar Association. Trusted expertise!", urgency: "normal" },
                { text: "📚 Check our credentials? Let's talk about how we can help you!", urgency: "normal" }
            ]
        },

        // Contact page
        contact: {
            greetings: [
                { text: "📞 Rather message on WhatsApp? We're here right now!", urgency: "high" },
                { text: "⚡ Faster response on WhatsApp! Get instant legal advice!", urgency: "high" },
                { text: "💬 Skip the form - message directly for immediate help!", urgency: "normal" },
                { text: "🕐 Available now! Average response time: 2 minutes", urgency: "high" }
            ]
        },

        // Blog pages
        blog: {
            greetings: [
                { text: "📖 Found this article helpful? Get personalized legal advice!", urgency: "normal" },
                { text: "💡 Questions about what you just read? Ask our expert lawyer!", urgency: "normal" },
                { text: "🎯 Want to apply this information to your case? Let's talk!", urgency: "high" },
                { text: "⚖️ Similar legal issue? We can help you navigate it!", urgency: "normal" }
            ]
        },

        // E-E-A-T pages (Privacy, Terms, etc.)
        legal: {
            greetings: [
                { text: "📋 Questions about our services? We're here to help!", urgency: "normal" },
                { text: "💬 Need clarification on anything? Just ask!", urgency: "normal" }
            ]
        },

        // Default fallback
        default: {
            greetings: [
                { text: "👋 Hello! How can we help you today?", urgency: "normal" },
                { text: "💬 Need legal assistance? Message us for a free consultation!", urgency: "normal" },
                { text: "⚡ Quick question? We're here to help!", urgency: "normal" },
                { text: "🎯 Get expert legal advice from Advocate High Court Reema Jawed", urgency: "high" }
            ]
        }
    };

    // Detect page context based on URL and content
    function detectPageContext() {
        const path = window.location.pathname.toLowerCase();
        const url = window.location.href.toLowerCase();
        
        // Check for specific page types
        if (path === '/' || path === '/index.html' || path.endsWith('/index')) {
            return { type: 'home', location: null };
        }
        
        if (path.includes('/services/') || path.includes('service')) {
            // Extract service type from URL if possible
            const serviceMatch = path.match(/\/services\/([^\/]+)/);
            const serviceType = serviceMatch ? serviceMatch[1].replace(/-/g, ' ') : null;
            return { type: 'services', service: serviceType };
        }
        
        if (path.includes('/location/') || path.includes('area') || path.includes('karachi')) {
            // Extract location from URL
            const locationMatch = path.match(/\/location\/([^\/]+)/);
            const location = locationMatch ? locationMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'your area';
            return { type: 'location', location: location };
        }
        
        if (path.includes('/about') || path.includes('team') || path.includes('profile')) {
            return { type: 'about', location: null };
        }
        
        if (path.includes('/contact') || path.includes('reach')) {
            return { type: 'contact', location: null };
        }
        
        if (path.includes('/blog') || path.includes('/article') || path.includes('/news')) {
            return { type: 'blog', location: null };
        }
        
        if (path.includes('/privacy') || path.includes('/terms') || path.includes('/sitemap') || path.includes('/disclaimer')) {
            return { type: 'legal', location: null };
        }
        
        return { type: 'default', location: null };
    }

    // Get appropriate messages based on context
    function getMessages() {
        const context = CONFIG.pageContext;
        let messages = MESSAGE_DATABASE[context.type] || MESSAGE_DATABASE.default;
        
        // Deep copy to avoid mutation
        let greetings = JSON.parse(JSON.stringify(messages.greetings));
        
        // Replace placeholders
        greetings = greetings.map(msg => {
            let text = msg.text;
            if (context.location) {
                text = text.replace(/{location}/g, context.location);
            }
            if (context.service) {
                text = text.replace(/this service/g, context.service);
                text = text.replace(/this specific legal matter/g, context.service);
            }
            return { ...msg, text };
        });
        
        return greetings;
    }

    // Predefined quick reply suggestions
    const QUICK_REPLIES = [
        "📝 I need a consultation",
        "⚡ It's urgent",
        "💰 What are your fees?",
        "📍 Where is your office?",
        "⏰ Available timings?",
        "⚖️ I have a case question"
    ];

    // Create widget HTML
    function createWidget() {
        const messages = getMessages();
        const initialMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const widgetHTML = `
            <div id="whatsapp-widget" class="whatsapp-widget">
                <!-- Popup Message -->
                <div class="whatsapp-popup" id="whatsapp-popup">
                    <div class="whatsapp-popup-header">
                        <div class="whatsapp-popup-avatar">
                            <img src="${CONFIG.avatar}" alt="${CONFIG.name}" onerror="this.src=''">
                            <span class="whatsapp-online-status"></span>
                        </div>
                        <div class="whatsapp-popup-info">
                            <div class="whatsapp-popup-name">${CONFIG.name}</div>
                            <div class="whatsapp-popup-title">${CONFIG.title}</div>
                            <div class="whatsapp-popup-status">● Online now</div>
                        </div>
                        <button class="whatsapp-popup-close" id="whatsapp-close" aria-label="Close">×</button>
                    </div>
                    <div class="whatsapp-popup-body">
                        <div class="whatsapp-message-bubble" id="whatsapp-message">
                            ${initialMessage.text}
                        </div>
                        <div class="whatsapp-typing" id="whatsapp-typing">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <div class="whatsapp-popup-footer">
                        <div class="whatsapp-quick-replies" id="whatsapp-quick-replies">
                            ${QUICK_REPLIES.slice(0, 3).map(reply => 
                                `<button class="whatsapp-quick-reply" data-text="${reply.replace(/^[📝⚡💰📍⏰⚖️]\s*/, '')}">${reply}</button>`
                            ).join('')}
                        </div>
                        <a href="https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Hello, I need legal assistance. Can you help me?')}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="whatsapp-chat-btn"
                           id="whatsapp-chat-btn">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Start Chat on WhatsApp
                        </a>
                    </div>
                </div>
                
                <!-- Floating Button -->
                <button class="whatsapp-float-btn" id="whatsapp-float-btn" aria-label="Chat on WhatsApp">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span class="whatsapp-float-pulse"></span>
                </button>
            </div>
        `;
        
        return widgetHTML;
    }

    // Inject styles
    function injectStyles() {
        const styles = `
            <style id="whatsapp-widget-styles">
                .whatsapp-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                /* Floating Button */
                .whatsapp-float-btn {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0,0,0,0.15);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .whatsapp-float-btn:hover {
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 6px 30px rgba(37, 211, 102, 0.5), 0 4px 12px rgba(0,0,0,0.2);
                }

                .whatsapp-float-btn svg {
                    width: 32px;
                    height: 32px;
                    color: white;
                }

                .whatsapp-float-pulse {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: rgba(37, 211, 102, 0.4);
                    animation: whatsapp-pulse 2s infinite;
                    z-index: -1;
                }

                @keyframes whatsapp-pulse {
                    0% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(1.6); opacity: 0; }
                }

                /* Popup */
                .whatsapp-popup {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 340px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 50px rgba(0,0,0,0.2), 0 2px 10px rgba(0,0,0,0.1);
                    overflow: hidden;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.95);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .whatsapp-popup.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                /* Popup Header */
                .whatsapp-popup-header {
                    background: linear-gradient(135deg, #075E54 0%, #128C7E 100%);
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .whatsapp-popup-avatar {
                    position: relative;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: white;
                    flex-shrink: 0;
                }

                .whatsapp-popup-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .whatsapp-online-status {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 12px;
                    height: 12px;
                    background: #25D366;
                    border: 2px solid #075E54;
                    border-radius: 50%;
                }

                .whatsapp-popup-info {
                    flex: 1;
                    color: white;
                }

                .whatsapp-popup-name {
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 1.3;
                }

                .whatsapp-popup-title {
                    font-size: 12px;
                    opacity: 0.9;
                    line-height: 1.3;
                }

                .whatsapp-popup-status {
                    font-size: 11px;
                    color: #25D366;
                    margin-top: 2px;
                }

                .whatsapp-popup-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.2s;
                }

                .whatsapp-popup-close:hover {
                    background: rgba(255,255,255,0.1);
                }

                /* Popup Body */
                .whatsapp-popup-body {
                    padding: 16px;
                    background: #E5DDD5;
                    min-height: 100px;
                    position: relative;
                }

                .whatsapp-popup-body::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23E5DDD5'/%3E%3Cpath d='M0 0h100v100H0z' fill='none' stroke='%23D1C7BC' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E");
                    opacity: 0.5;
                    pointer-events: none;
                }

                .whatsapp-message-bubble {
                    background: white;
                    padding: 12px 14px;
                    border-radius: 8px 8px 8px 0;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #262626;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
                    position: relative;
                    z-index: 1;
                    animation: message-pop 0.3s ease;
                }

                @keyframes message-pop {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .whatsapp-typing {
                    display: none;
                    align-items: center;
                    gap: 4px;
                    margin-top: 8px;
                    padding: 12px 16px;
                    background: white;
                    border-radius: 16px;
                    width: fit-content;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
                }

                .whatsapp-typing.active {
                    display: flex;
                }

                .whatsapp-typing span {
                    width: 8px;
                    height: 8px;
                    background: #919191;
                    border-radius: 50%;
                    animation: typing 1.4s infinite;
                }

                .whatsapp-typing span:nth-child(2) { animation-delay: 0.2s; }
                .whatsapp-typing span:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                }

                /* Popup Footer */
                .whatsapp-popup-footer {
                    padding: 12px;
                    background: white;
                    border-top: 1px solid #f0f0f0;
                }

                .whatsapp-quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 12px;
                }

                .whatsapp-quick-reply {
                    background: #f0f0f0;
                    border: none;
                    padding: 8px 14px;
                    border-radius: 16px;
                    font-size: 12px;
                    color: #075E54;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .whatsapp-quick-reply:hover {
                    background: #DCF8C6;
                    color: #075E54;
                }

                .whatsapp-chat-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    color: white;
                    text-decoration: none;
                    padding: 14px 20px;
                    border-radius: 24px;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s;
                    box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
                }

                .whatsapp-chat-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
                }

                .whatsapp-chat-btn svg {
                    width: 20px;
                    height: 20px;
                }

                /* Mobile Responsive */
                @media (max-width: 480px) {
                    .whatsapp-widget {
                        bottom: 15px;
                        right: 15px;
                    }

                    .whatsapp-popup {
                        width: calc(100vw - 30px);
                        max-width: 340px;
                        right: -5px;
                    }

                    .whatsapp-float-btn {
                        width: 56px;
                        height: 56px;
                    }

                    .whatsapp-float-btn svg {
                        width: 28px;
                        height: 28px;
                    }
                }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    .whatsapp-float-pulse,
                    .whatsapp-typing span,
                    .whatsapp-message-bubble {
                        animation: none;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Initialize widget
    function init() {
        // Don't show on pages where user might not want it
        if (window.location.pathname.includes('/admin') || 
            window.location.pathname.includes('/wp-')) {
            return;
        }

        injectStyles();
        document.body.insertAdjacentHTML('beforeend', createWidget());

        const popup = document.getElementById('whatsapp-popup');
        const floatBtn = document.getElementById('whatsapp-float-btn');
        const closeBtn = document.getElementById('whatsapp-close');
        const messageEl = document.getElementById('whatsapp-message');
        const typingEl = document.getElementById('whatsapp-typing');
        const chatBtn = document.getElementById('whatsapp-chat-btn');

        let isOpen = false;
        let messageInterval;
        const messages = getMessages();

        // Show popup after delay
        setTimeout(() => {
            popup.classList.add('active');
            isOpen = true;
        }, CONFIG.popupDelay);

        // Rotate messages
        function rotateMessage() {
            if (!isOpen) return;
            
            // Show typing indicator
            messageEl.style.display = 'none';
            typingEl.classList.add('active');

            setTimeout(() => {
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                messageEl.innerHTML = randomMessage.text;
                messageEl.style.display = 'block';
                typingEl.classList.remove('active');
            }, 1500);
        }

        // Start message rotation
        messageInterval = setInterval(rotateMessage, CONFIG.rotateInterval);

        // Toggle popup
        floatBtn.addEventListener('click', () => {
            popup.classList.toggle('active');
            isOpen = popup.classList.contains('active');
        });

        // Close popup
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            isOpen = false;
        });

        // Quick reply buttons
        document.querySelectorAll('.whatsapp-quick-reply').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.text;
                const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(text)}`;
                chatBtn.href = url;
                chatBtn.click();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.whatsapp-widget')) {
                popup.classList.remove('active');
                isOpen = false;
            }
        });

        // Track events (if analytics exists)
        floatBtn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_float_click', {
                    page_context: CONFIG.pageContext.type
                });
            }
        });

        chatBtn.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_chat_start', {
                    page_context: CONFIG.pageContext.type
                });
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
