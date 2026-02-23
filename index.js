/**
 * --- GLOBAL VARIABLES & SLIDESHOW LOGIC ---
 * Outside the block so HTML 'onclick' can find them.
 */
let slideIndex = 1;
let slideTimer;
let translations = {}; 

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}
window.plusSlides = plusSlides;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (!slides || slides.length === 0) return;
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove('active');
    }
    const currentSlide = slides[slideIndex - 1];
    if (currentSlide) {
        currentSlide.style.display = "block";
        setTimeout(() => { currentSlide.classList.add('active'); }, 50);
    }
}
window.showSlides = showSlides;

function autoSlides() {
    const slides = document.getElementsByClassName("mySlides");
    if (!slides || slides.length === 0) return;
    clearInterval(slideTimer);
    slideTimer = setInterval(() => { plusSlides(1); }, 10000);
}

function resetTimer() {
    clearInterval(slideTimer);
    autoSlides();
}

/**
 * --- MAIN INITIALIZATION ---
 */
document.addEventListener('DOMContentLoaded', async function () {
    // 1. Fetch Translations (Crucial for language switching)
    try {
        const response = await fetch('./translations.json');
        translations = await response.json();
        const savedLang = localStorage.getItem('currentLang') || 'ka';
        updatePageLanguage(savedLang);
    } catch (e) { console.error("Translation file error:", e); }

    // 2. Initialize UI
    showSlides(slideIndex);
    autoSlides();

    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('mobileNavMenu');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
    const langToggle = document.getElementById('langToggle');
    const langSwitcherDesktop = document.getElementById('languageSwitcherDesktop');
    const allLangOptions = document.querySelectorAll('.lang-option, .lang-option-btn');
    const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');

    const flagMap = {
        en: { code: "EN", flag: "https://flagcdn.com/w20/us.png" },
        ka: { code: "KA", flag: "https://flagcdn.com/w20/ge.png" }
    };

    // 3. Language Functions
    function updatePageLanguage(lang) {
        localStorage.setItem('currentLang', lang);
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        updateLanguageButton(lang);
    }

    function updateLanguageButton(lang) {
        if (!langToggle) return;
        const curFlag = langToggle.querySelector('.current-flag');
        const secFlag = langToggle.querySelector('.secondary-flag');
        const codeEl = langToggle.querySelector('.lang-code');
        const secKey = lang === 'en' ? 'ka' : 'en';

        if (curFlag) curFlag.src = flagMap[lang].flag;
        if (secFlag) secFlag.src = flagMap[secKey].flag;
        if (codeEl) codeEl.textContent = flagMap[lang].code;
    }

    // 4. Interaction Listeners
    allLangOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            updatePageLanguage(opt.dataset.lang);
            if (langSwitcherDesktop) langSwitcherDesktop.classList.remove('active');
        });
    });

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langSwitcherDesktop) langSwitcherDesktop.classList.toggle('active');
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const active = navbar.classList.toggle('active');
            if (menuIcon) menuIcon.className = active ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = active ? 'hidden' : '';
        });
    }

    // Restored 3-Click Logic as requested
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                const dropdownMenu = this.nextElementSibling;
                const arrow = this.querySelector('.dropdown-icon');
                let clicks = parseInt(this.getAttribute('data-click-count')) || 0;

                if (clicks === 0) {
                    e.preventDefault(); e.stopPropagation();
                    dropdownMenu.style.display = 'block';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                    this.setAttribute('data-click-count', '1');
                } 
                else if (clicks === 1) {
                    e.preventDefault(); e.stopPropagation();
                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('data-click-count', '2');
                } 
                else if (clicks === 2) {
                    // Click 3: Allow navigation (don't prevent default)
                    this.setAttribute('data-click-count', '0');
                }
            }
        });
    });

    // Close logic
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
            document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
            dropdownToggles.forEach(t => t.setAttribute('data-click-count', '0'));
        }
    }

    // Scroll Header Logic
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (!header || (navbar && navbar.classList.contains('active'))) return;
        if (window.scrollY > lastY && window.scrollY > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastY = window.scrollY;
    }, { passive: true });
});