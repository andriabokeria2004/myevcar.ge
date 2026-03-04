/**
 * --- DATA & TRANSLATIONS ---
 */const flagMap = {
    en: { code: "EN", flag: "https://flagcdn.com/w20/us.png" },
    ka: { code: "KA", flag: "https://flagcdn.com/w20/ge.png" }
};

const translations = {
    en: {
        pageTitle: "AC & DC Chargers",
        home: "Home",
        chargers: "Chargers",
        about: "About Us",
        contact: "Contact Us",
        gallery: "Gallery",
        acChargers: "AC Chargers",
        dcChargers: "DC Chargers",
        acDesc: "AC: portable, wall-mounted",
        dcDesc: "Direct Current Fast Charging",
        allProducts: "All Products",
        heroTitle: "Premium EV Chargers",
        heroSubtitle: "Solutions for home, office, and commercial use.",
        exploreProducts: "Explore Products",
        badge_ac: "AC Solution",
        badge_dc: "DC Fast Charge",
        label_color: "Color",
        label_edition: "Edition",
        btn_order: "Order Now",
        btn_quote: "Get Quote",
        color_matte_black: "Matte Black",
        color_charcoal: "Charcoal Grey",
        color_lime_green: "Lime Green",
        color_forest_green: "Forest Green",
        color_electric_blue: "Electric Blue",
        color_sky_blue: "Sky Blue",
        color_solar_yellow: "Solar Yellow",
        color_lava_orange: "Lava Orange",
        color_crimson_red: "Crimson Red",
        color_pearl_white: "Pearl White",
        color_silver_metallic: "Silver Metallic",
        p1_title: "CDZ-J",
        p1_desc: `Appearance model: CDZ - J...`, // შემოკლებული საჩვენებლად
        // ... დაამატე დანარჩენი p2-p8
    },
    ka: {
        pageTitle: "AC & DC დამტენები",
        home: "მთავარი",
        chargers: "დამტენები",
        about: "ჩვენ შესახებ",
        contact: "კონტაქტი",
        gallery: "გალერეა",
        acChargers: "AC დამტენები",
        dcChargers: "DC დამტენები",
        acDesc: "AC: პორტატული, კედლის",
        dcDesc: "DC სწრაფი დამუხტვა",
        allProducts: "ყველა პროდუქტი",
        heroTitle: "პრემიუმ დამტენები",
        heroSubtitle: "გადაწყვეტილებები სახლისა და ბიზნესისთვის.",
        exploreProducts: "პროდუქტები",
        badge_ac: "AC სისტემა",
        badge_dc: "DC სწრაფი",
        label_finish: "ფერი",
        label_edition: "ვერსია",
        btn_order: "შეუკვეთე",
        btn_quote: "ფასის გაგება",
        color_matte_black: "მატოვი შავი",
        color_charcoal: "ნაცრისფერი",
        color_lime_green: "ლაიმის მწვანე",
        color_forest_green: "მუქი მწვანე",
        color_electric_blue: "ელექტრო ლურჯი",
        color_sky_blue: "ცისფერი",
        color_solar_yellow: "მზისფერი ყვითელი",
        color_lava_orange: "ნარინჯისფერი",
        color_crimson_red: "ალისფერი",
        color_pearl_white: "მარგალიტისფერი თეთრი",
        color_silver_metallic: "ვერცხლისფერი მეტალიკი",
        p1_title: "CDZ-J",
        p1_desc: "მოდელი: CDZ-J, სიმძლავრე: 20/30/40კვტ..."
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // --- Elements ---
    const mobileMenuBtn = document.getElementById('mobileMenuToggle');
    const navbar = document.getElementById('mobileNavMenu');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
    const langToggle = document.getElementById('langToggle');
    const langSwitcherDesktop = document.getElementById('languageSwitcherDesktop');
    const allLangOptions = document.querySelectorAll('.lang-option');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const productRows = document.querySelectorAll('.product-row');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const headerElement = document.querySelector('.header');

    // 1. Language Logic
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

    // 2. Navigation & Language Events
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

    // 3. Mobile Menu Logic
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerElement) headerElement.classList.remove('header-hidden');
            const isActive = navbar.classList.toggle('active');
            if (menuIcon) menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    // 4. Dropdown Toggles (Click 1: Open, Click 2: Close, Click 3: Navigate)
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
                } else if (clicks === 1) {
                    e.preventDefault(); e.stopPropagation();
                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('data-click-count', '2');
                } else {
                    this.setAttribute('data-click-count', '0');
                    // მესამე კლიკზე ბრაუზერი გადავა href-ზე
                }
            }
        });
    });

    // 5. Header Hide on Scroll
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (navbar.classList.contains('active')) return;
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            headerElement.classList.add('header-hidden');
        } else {
            headerElement.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });

    // 6. Product Logic (kW, Price, Swatches)
    productRows.forEach(row => {
        const swatches = row.querySelectorAll('.swatch');
        const mainImg = row.querySelector('.main-product-img');
        const kwButtons = row.querySelectorAll('.kw-btn');
        const priceDisplay = row.querySelector('.price');

        // kW & Price
        kwButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                kwButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (priceDisplay && btn.getAttribute('data-price')) {
                    const symbol = priceDisplay.textContent.includes('$') ? '$' : '₾';
                    priceDisplay.textContent = `${symbol}${Number(btn.getAttribute('data-price')).toLocaleString()}`;
                }
            });
        });

        // Color Swatches
        swatches.forEach(swatch => {
            swatch.addEventListener('click', function () {
                const newImg = this.getAttribute('data-img');
                if (newImg && mainImg) {
                    mainImg.style.opacity = '0.3';
                    const img = new Image();
                    img.src = newImg;
                    img.onload = () => {
                        mainImg.src = newImg;
                        mainImg.style.opacity = '1';
                    };
                }
                row.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });

    // 7. Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.textContent.trim().toLowerCase();
            productRows.forEach(row => {
                const category = row.getAttribute('data-category').toLowerCase();
                const isAll = filterValue === 'all' || filterValue === 'ყველა';
                row.style.display = (isAll || filterValue === category) ? 'flex' : 'none';
            });
        });
    });

    // Close on Outside Click
    function closeMobileMenu() {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
            dropdownToggles.forEach(t => {
                t.setAttribute('data-click-count', '0');
                const arrow = t.querySelector('.dropdown-icon');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    }

    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) closeMobileMenu();
        if (langSwitcherDesktop && !langSwitcherDesktop.contains(e.target) && !langToggle?.contains(e.target)) {
            langSwitcherDesktop.classList.remove('active');
        }
    });

    // Initial Load
    const savedLang = localStorage.getItem('currentLang') || 'ka';
    updatePageLanguage(savedLang);
});