/**
 * --- CONTACT & GALLERY PAGE INITIALIZATION ---
 * Features: Multi-language Support, Mobile Nav, Gallery Filtering
 */
document.addEventListener('DOMContentLoaded', function () {

    // 1. SELECTORS
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('mobileNavMenu');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
    const langToggle = document.getElementById('langToggle');
    const langSwitcherDesktop = document.getElementById('languageSwitcherDesktop');
    const allLangOptions = document.querySelectorAll('.lang-option, .lang-option-btn');
    const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');
    const headerElement = document.querySelector('.header');

    const flagMap = {
        en: { code: "EN", flag: "https://flagcdn.com/w20/us.png" },
        ka: { code: "KA", flag: "https://flagcdn.com/w20/ge.png" }
    };

    // 2. TRANSLATION DATA (Updated for Contact/Gallery)
    const translations = {
        en: {
            pageTitle: "Contact & Gallery | Mymobile & BlueSky Energy",
            home: "Home", chargers: "Chargers", about: "About Us", contact: "Contact Us",
            gallery: "Gallery", acChargers: "AC Chargers", dcChargers: "DC Chargers",
            acDesc: "AC: portable, wall-mounted", dcDesc: "Direct Current Fast Charging",
            allProducts: "All Charging Products", whoWeAre: "Who We Are", certification: "Certification"
        },
        ka: {
            pageTitle: "კონტაქტი და გალერეა | Mymobile & BlueSky Energy",
            home: "მთავარი", chargers: "დამტენები", about: "ჩვენ შესახებ", contact: "კონტაქტი",
            gallery: "გალერეა", acChargers: "AC დამტენები", dcChargers: "DC დამტენები",
            acDesc: "AC: პორტატული, კედელზე დასამონტაჟებელი", dcDesc: "პირდაპირი დენის სწრაფი დატენვა",
            allProducts: "ყველა პროდუქტი", whoWeAre: "ვინ ვართ ჩვენ", certification: "სერტიფიცირება"
        }
    };

    // 3. LANGUAGE LOGIC
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

    // Initialize Language
    const savedLang = localStorage.getItem('currentLang') || 'en';
    updatePageLanguage(savedLang);

    // 4. GALLERY FILTERING LOGIC
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. NAVIGATION & HEADER LOGIC
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            headerElement.classList.remove('header-hidden');
            const isActive = navbar.classList.toggle('active');
            if (menuIcon) menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    // Toggle Mobile Dropdowns
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                const dropdownMenu = this.nextElementSibling;
                const arrow = this.querySelector('.dropdown-icon');

                // Get current click count or default to 0
                let clicks = parseInt(this.getAttribute('data-click-count')) || 0;

                if (clicks === 0) {
                    // FIRST CLICK: Open the menu
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other open dropdowns first
                    document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
                    document.querySelectorAll('.dropdown-icon').forEach(a => a.style.transform = 'rotate(0deg)');
                    document.querySelectorAll('.dropdown > .nav-link').forEach(t => {
                        if (t !== this) t.setAttribute('data-click-count', '0');
                    });

                    dropdownMenu.style.display = 'block';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                    this.setAttribute('data-click-count', '1');

                } else if (clicks === 1) {
                    // SECOND CLICK: Close the menu
                    e.preventDefault();
                    e.stopPropagation();
                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('data-click-count', '2');

                } else {
                    // THIRD CLICK: Let the browser follow the href (e.g., product.html)
                    this.setAttribute('data-click-count', '0');
                    // No preventDefault here, so it navigates
                }
            }
        });
    });

    // Language Toggle Click
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            langSwitcherDesktop.classList.toggle('active');
        });
    }

    // Language Option Click
    allLangOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedLang = option.dataset.lang;
            updatePageLanguage(selectedLang);
            langSwitcherDesktop.classList.remove('active');
        });
    });

    // Scroll Header Behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (navbar.classList.contains('active')) return;

        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            headerElement.classList.add('header-hidden');
        } else {
            headerElement.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    // Close menus on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
        if (!langSwitcherDesktop.contains(e.target)) {
            langSwitcherDesktop.classList.remove('active');
        }
    });


    const mapWrapper = document.getElementById('map-wrapper');

    mapWrapper.addEventListener('click', function () {
        this.classList.add('active');
    });

    mapWrapper.addEventListener('mouseleave', function () {
        this.classList.remove('active');
    });
});