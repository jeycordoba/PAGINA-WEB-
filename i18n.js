/**
 * I18n Manager for Jeniffer Cordoba Yoga website
 * Handles language detection, persistence, and DOM updates.
 */

class I18nManager {
    constructor() {
        // Force Spanish ('es') as default for now as per user request
        this.currentLang = localStorage.getItem('user-lang') || 'es';
        this.translations = window.translations || {};
        this.init();
    }

    getBrowserLang() {
        const lang = navigator.language || navigator.userLanguage;
        return lang.startsWith('es') ? 'es' : 'en';
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.applyLanguage(this.currentLang);
            this.setupToggles();
        });
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('user-lang', lang);
        document.documentElement.setAttribute('lang', lang);

        if (!window.translations) return;

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[lang] && window.translations[lang][key]) {
                el.innerHTML = window.translations[lang][key];
            }
        });

        // Update all elements with data-i18n-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.translations[lang] && window.translations[lang][key]) {
                el.placeholder = window.translations[lang][key];
            }
        });

        // Update active state on toggles (both desktop and mobile)
        const allToggles = document.querySelectorAll('.lang-btn');
        allToggles.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Dispatch custom event for other scripts to react (like testimonials)
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    setupToggles() {
        // Use event delegation for language switching
        document.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.lang-btn');
            if (toggleBtn) {
                const lang = toggleBtn.getAttribute('data-lang');
                if (lang && lang !== this.currentLang) {
                    this.applyLanguage(lang);
                }
            }
        });
    }

    setLanguage(lang) {
        if (window.translations && window.translations[lang]) {
            this.applyLanguage(lang);
        }
    }
}

/**
 * Global helper function for language switching (used in HTML onclick handlers)
 * @param {string} lang - 'en' or 'es'
 */
window.switchLanguage = function (lang) {
    if (window.i18n) {
        window.i18n.setLanguage(lang);
    }
};

// Initialize global manager
window.i18n = new I18nManager();
