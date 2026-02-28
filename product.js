/**
 * --- DATA & TRANSLATIONS ---
 */const flagMap = {
    en: { code: "EN", flag: "https://flagcdn.com/w20/us.png" },
    ka: { code: "KA", flag: "https://flagcdn.com/w20/ge.png" }
};
let translations = {};

document.addEventListener('DOMContentLoaded', function () {
    async function initTranslations() {
        try {
            // ვიწერთ ორივე ფაილს
            const [baseRes, productsRes] = await Promise.all([
                fetch('./translation.json'),
                fetch('./product.json')
            ]);

            const baseData = await baseRes.json();
            const productsData = await productsRes.json();

            // ვაერთიანებთ ობიექტებს
            translations = {
                en: { ...baseData.en, ...productsData.en },
                ka: { ...baseData.ka, ...productsData.ka }
            };

            // მხოლოდ ჩატვირთვის შემდეგ ვუშვებთ საწყის ენას
            const savedLang = localStorage.getItem('currentLang') || 'ka';
            updatePageLanguage(savedLang);

        } catch (error) {
            console.error("ვერ მოხერხდა ფაილების ჩატვირთვა:", error);
        }
    }
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
    function updatePageLanguage(lang) {
        if (!translations[lang]) return; // თუ მონაცემები ჯერ არ ჩატვირთულა

        localStorage.setItem('currentLang', lang);
        document.documentElement.setAttribute('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    // ტექსტის ნაცვლად ვიყენებთ innerHTML-ს
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        allLangOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
        updateLanguageButton(lang);
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
    initTranslations();
});