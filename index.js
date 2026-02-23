/**
 * --- GLOBAL SLIDESHOW LOGIC ---
 * Must stay outside the block for HTML 'onclick' to work.
 */
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
document.addEventListener('DOMContentLoaded', function () {

    let translations = {}; // Start with an empty object

    async function loadTranslations() {
        try {
            // We fetch the file that Decap CMS edits
            const response = await fetch('./translation.json');
            translations = await response.json();

            // After loading the data, set the initial language
            const savedLang = localStorage.getItem('currentLang') || 'ka';
            updatePageLanguage(savedLang);
        } catch (error) {
            console.error("Could not load translation file:", error);
        }
    }
    // Selects both desktop and the mobile-specific buttons used on the About page
    const allLangOptions = document.querySelectorAll('.lang-option, .lang-option-btn');
    const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');

    function updatePageLanguage(lang) {
        localStorage.setItem('currentLang', lang);
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
            // Add this inside updatePageLanguage to allow your uncle to change images too
            document.querySelectorAll('[data-i18n-img]').forEach(img => {
                const key = img.getAttribute('data-i18n-img');
                if (translations[lang] && translations[lang][key]) {
                    img.src = translations[lang][key];
                }
            });
        });

        allLangOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
        updateLanguageButton(lang);
    }
    // 1. Initialize Slideshow
    showSlides(slideIndex);
    autoSlides();

    // 2. Selectors
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('mobileNavMenu');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
    const langToggle = document.getElementById('langToggle');
    const langSwitcherDesktop = document.getElementById('languageSwitcherDesktop');


    const flagMap = {
        en: { code: "EN", flag: "https://flagcdn.com/w20/us.png" },
        ka: { code: "KA", flag: "https://flagcdn.com/w20/ge.png" }
    };


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

    // 5. Navigation & Language Event Listeners (Match About Us Page)
    allLangOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            updatePageLanguage(option.dataset.lang);

            // On desktop, close the flag dropdown
            if (langSwitcherDesktop) langSwitcherDesktop.classList.remove('active');

            // IMPORTANT: Removed closeMobileMenu() from here 
            // This ensures the menu stays open on mobile when changing language
        });
    });
    // 1. Language Toggle
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (langSwitcherDesktop) langSwitcherDesktop.classList.toggle('active');
        });
    }

    // 2. Mobile Menu Button
    if (mobileMenuBtn) {
        const headerElement = document.querySelector('.header');

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerElement) headerElement.classList.remove('header-hidden');

            const isActive = navbar.classList.toggle('active');

            if (menuIcon) menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';

            if (isActive) {
                // LOCK SCROLL
                document.body.style.overflow = 'hidden';
                document.body.style.height = '100vh'; // Force body to viewport height
                document.documentElement.style.overflow = 'hidden'; // For some browsers
            } else {
                // UNLOCK SCROLL
                document.body.style.overflow = '';
                document.body.style.height = '';
                document.documentElement.style.overflow = '';
            }
        });
    }
    // 3. Dropdown Toggles (Click 1: Open, Click 2: Go to Page)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                const dropdownMenu = this.nextElementSibling;
                const arrow = this.querySelector('.dropdown-icon');

                // ვიღებთ დაჭერების რაოდენობას (საწყისი არის 0)
                let clicks = parseInt(this.getAttribute('data-click-count')) || 0;

                if (clicks === 0) {
                    // --- პირველი დაჭერა: გახსნა ---
                    e.preventDefault();
                    e.stopPropagation();

                    dropdownMenu.style.display = 'block';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';

                    this.setAttribute('data-click-count', '1');
                }
                else if (clicks === 1) {
                    // --- მეორე დაჭერა: დახურვა ---
                    e.preventDefault();
                    e.stopPropagation();

                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';

                    this.setAttribute('data-click-count', '2');
                }
                else if (clicks === 2) {
                    // --- მესამე დაჭერა: გადასვლა ---
                    // აქ e.preventDefault() აღარ გვინდა!
                    // ბრაუზერი ავტომატურად გადავა href-ზე (aboutus.html)

                    // სურვილისამებრ, გადასვლის წინ დავარესეტოთ:
                    this.setAttribute('data-click-count', '0');
                }
            }
        });
    });

    // 4. Close on click outside
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            closeMobileMenu();
        }
        if (langSwitcherDesktop && !langSwitcherDesktop.contains(e.target) && !langToggle?.contains(e.target)) {
            langSwitcherDesktop.classList.remove('active');
        }
    });

    // 5. Close Mobile Menu Function
    function closeMobileMenu() {
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';

            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });

            document.querySelectorAll('.dropdown-icon').forEach(icon => {
                icon.style.transform = 'rotate(0deg)';
            });

            // --- დაამატე ეს ხაზი მთვლელის გასასუფთავებლად ---
            dropdownToggles.forEach(t => t.setAttribute('data-click-count', '0'));
        }
    }
    let lastScrollY = window.scrollY;
    const scrollTolerance = 5; // Pixels to scroll before hiding/showing

    window.addEventListener('scroll', () => {
        const mainHeader = document.querySelector('.header');
        const navMenu = document.getElementById('mobileNavMenu');

        if (!mainHeader) return;

        // 1. If mobile menu is open, DO NOT hide the header (essential for UX)
        if (navMenu && navMenu.classList.contains('active')) return;

        const currentScrollY = window.scrollY;

        // 2. Ignore small scrolls (jitter prevention)
        if (Math.abs(currentScrollY - lastScrollY) <= scrollTolerance) return;

        // 3. Hide/Show logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down & past 100px
            mainHeader.classList.add('header-hidden');
        } else {
            // Scrolling Up
            mainHeader.classList.remove('header-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
    // 6. Initial Load
    loadTranslations();

}); // <--- This closes the DOMContentLoaded / Main Initialization block
const footer = document.querySelector('.minimal-footer');
window.addEventListener('scroll', function () {
    if (footer) {
        footer.style.opacity = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50 ? "1" : "0.8";
    }
});

