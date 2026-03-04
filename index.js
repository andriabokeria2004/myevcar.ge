/* --- 1. GLOBAL SLIDESHOW LOGIC --- */
let slideIndex = 1;
let slideTimer;

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}
window.plusSlides = plusSlides;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (!slides || slides.length === 0) return;
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
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

/* --- 2. MAIN INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', function () {
    let translations = {};

    // მუდმივები
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

    // სლაიდშოუს დაწყება
    showSlides(slideIndex);
    autoSlides();

    // ენების ჩატვირთვა
    async function loadTranslations() {
        try {
            const response = await fetch('./translation.json');
            translations = await response.json();
            const savedLang = localStorage.getItem('currentLang') || 'ka';
            updatePageLanguage(savedLang);
        } catch (error) {
            console.error("Could not load translation file:", error);
        }
    }

    function updatePageLanguage(lang) {
        localStorage.setItem('currentLang', lang);
        document.documentElement.setAttribute('lang', lang);

        // ტექსტების განახლება
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // სურათების განახლება (თუ გაქვს)
        document.querySelectorAll('[data-i18n-img]').forEach(img => {
            const key = img.getAttribute('data-i18n-img');
            if (translations[lang] && translations[lang][key]) {
                img.src = translations[lang][key];
            }
        });

        allLangOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
        updateLanguageButton(lang);
    }

    function updateLanguageButton(lang) {
        if (!langToggle) return;
        const currentFlagEl = langToggle.querySelector('.current-flag');
        const secondaryFlagEl = langToggle.querySelector('.secondary-flag');
        const langCodeEl = langToggle.querySelector('.lang-code');
        const secondaryKey = lang === 'en' ? 'ka' : 'en';

        if (currentFlagEl) currentFlagEl.src = flagMap[lang].flag;
        if (secondaryFlagEl) secondaryFlagEl.src = flagMap[secondaryKey].flag;
        if (langCodeEl) langCodeEl.textContent = flagMap[lang].code;
    }

    // ენის შეცვლის ივენთები
    allLangOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            updatePageLanguage(option.dataset.lang);
            if (langSwitcherDesktop) langSwitcherDesktop.classList.remove('active');
        });
    });

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langSwitcherDesktop) langSwitcherDesktop.classList.toggle('active');
        });
    }

    // მობილური მენიუ
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = navbar.classList.toggle('active');
            if (menuIcon) menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    // Dropdown-ები მობილურზე
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                const dropdownMenu = this.nextElementSibling;
                const arrow = this.querySelector('.dropdown-icon');
                let clicks = parseInt(this.getAttribute('data-click-count')) || 0;

                if (clicks === 0) {
                    e.preventDefault();
                    dropdownMenu.style.display = 'block';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                    this.setAttribute('data-click-count', '1');
                } else if (clicks === 1) {
                    e.preventDefault();
                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('data-click-count', '2');
                } else {
                    this.setAttribute('data-click-count', '0');
                }
            }
        });
    });

    // სქროლზე ჰედერების დამალვა
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const mainHeader = document.querySelector('.header');
        if (!mainHeader || (navbar && navbar.classList.contains('active'))) return;
        
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            mainHeader.classList.add('header-hidden');
        } else {
            mainHeader.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    loadTranslations();
});

// ფუტერის ეფექტი
window.addEventListener('scroll', function () {
    const footer = document.querySelector('.minimal-footer');
    if (footer) {
        footer.style.opacity = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 ? "1" : "0.8";
    }
});