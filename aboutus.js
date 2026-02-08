/**
 * --- MAIN INITIALIZATION ---
 * OPTIMIZED VERSION: Instant Carousel & Fast Scroll Reveal
 */
document.addEventListener('DOMContentLoaded', function () {

    // 1. Selectors
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

    // 2. Translation Data
    const translations = {
        en: {
            pageTitle: "About Us & Official Partnership | Mymobile & Bluesky Energy",
            home: "Home", chargers: "Chargers", about: "About Us", contact: "Contact Us",
            gallery: "Gallery", acChargers: "AC Chargers", dcChargers: "DC Chargers",
            acDesc: "AC: portable, wall-mounted", dcDesc: "Direct Current Fast Charging",
            allProducts: "All Charging Products", whoWeAre: "Who We Are", certification: "Certification",
            partnership_title: "About Mymobile x BlueSky Energy",
            partnership_desc: ` Mymobile+ (MyMobile.ge) has been a leading player in the Georgian technology market since 2009. Over 15 years of operation, our team has successfully implemented hundreds of complex projects, won more than 1,000 state tenders, and earned a reputation as a trusted partner in both the private and public sectors. Today, as the world transitions into the era of electric vehicles, MyMobile offers customers a solution for the future—electric vehicle chargers from the global giant, Bluesky.
                        `,
            quality_title: "Why Mymobile and Bluesky",
            quality_desc: `Our choice is no coincidence. Wenzhou Bluesky Energy Technology has been a global leader in energy infrastructure for over 25 years. 
            Their products are certified by leading international laboratories—including CE, TUV, ISO, and SGS—and are exported to more than 80 countries worldwide.`,
            m1_desc: `In 1997, R&D and manufacturing of electronic control systems for fuel dispensers and gas station management systems In 2008, gas dispensers In 2012, liquefied petroleum gas and natural gas dispensers In 2013, skid mounted refueling equipment In 2014, Adblue dispensers Listed in China in 2015`,
            m2_desc: `Since 2015, Bluesky's development team has started to involve in the research and development of electric vehicle charger products, completed the AC series Charging station and DC fast charging series Charging station products, and delivered them for use.`,
            m3_desc: `MyMobile entered the Georgian market.`,
            m4_desc: `Since 2009, MyMobile+ has been a cornerstone of the Georgian technology market. Our 16-year legacy is built on professional integrity and a proven track record of over 1,080 successful state tenders, demonstrating the consistent reliability and operational strength of our team.
            Our extensive expertise in managing complex IT, laboratory, and security infrastructure projects has paved the way for our next strategic milestone. As of 2025, we are leading the energy transition in Georgia. 
           In partnership with the global giant Bluesky, we are introducing the latest standards in EV charging infrastructure, bringing future-ready solutions to the local market.`,
            m5_desc: `Started strategic partnership with BlueSky Energy.`,
        },
        ka: {
            pageTitle: "ჩვენს შესახებ და ოფიციალური პარტნიორობა | Mymobile & Bluesky Energy",
            home: "მთავარი", chargers: "დამტენები", about: "ჩვენ შესახებ", contact: "კონტაქტი",
            gallery: "გალერეა", acChargers: "AC დამტენები", dcChargers: "DC დამტენები",
            acDesc: "AC: პორტატული, კედელზე დასამონტაჟებელი", dcDesc: "პირდაპირი დენის სწრაფი დატენვა",
            allProducts: "ყველა პროდუქტი", whoWeAre: "ვინ ვართ ჩვენ", certification: "სერტიფიცირება",
            partnership_title: "Mymobile x BlueSky Energy-ის შესახებ",
            partnership_desc: `კომპანია „მაი მობაილ +“ (MyMobile.ge) 2009 წლიდან ქართული ტექნოლოგიური ბაზრის ერთ-ერთი წამყვანი მოთამაშეა. 15-წლიანი მოღვაწეობის მანძილზე ჩვენმა გუნდმა წარმატებით განახორციელა ასეულობით რთული პროექტი, 
            მოიგო 1000-ზე მეტი სახელმწიფო ტენდერი და მოიპოვა სანდო პარტნიორის სახელი როგორც კერძო, ისე სახელმწიფო სექტორში.
            დღეს, როდესაც სამყარო ელექტრომობილების ეპოქაში გადადის, MyMobile მომხმარებელს სთავაზობს მომავლის გადაწყვეტილებას — 
            მსოფლიო გიგანტის, Bluesky-ს ელექტრო დამტენებს.`,
            quality_title: "რატომ Mymobile და Bluesky?",
            quality_desc: `ჩვენი არჩევანი შემთხვევითი არ არის. Wenzhou Bluesky Energy Technology 25 წელზე მეტია ენერგეტიკული ინფრასტრუქტურის გლობალური ლიდერია. მათი პროდუქცია სერტიფიცირებულია წამყვანი საერთაშორისო ლაბორატორიების მიერ (CE, TUV, ISO, SGS) და ექსპორტირებულია მსოფლიოს 80-ზე მეტ ქვეყანაში.`,
            m1_desc: `1997 წელს, საწვავის დისპენსერებისა და ბენზინგასამართი სადგურების მართვის სისტემების ელექტრონული მართვის სისტემების კვლევა, განვითარება და წარმოება. 2008 წელს, ბენზინის დისპენსერები. 2012 წელს, თხევადი ნავთობის გაზისა და ბუნებრივი აირის დისპენსერები. 2013 წელს, საბურავზე დამონტაჟებული საწვავის შევსების მოწყობილობები. 2014 წელს, Adblue-ს დისპენსერები ჩინეთში 2015 წელს გაიყიდა.`,
            m2_desc: `2015 წლიდან Bluesky-ის განვითარების გუნდმა დაიწყო ელექტრომობილების დამტენების კვლევა-განვითარება, დაასრულა AC სერიის დამტენი სადგურის და DC სწრაფი დამტენის სერიის დამტენი სადგურის პროდუქტები და მიაწოდა ისინი გამოსაყენებლად.`,
            m3_desc: `MyMobile-ი საქართველოს ბაზარზე შემოვიდა`,
            m4_desc: `2009 წლიდან „მაი მობაილ +“ ქართული ტექნოლოგიური ბაზრის სანდო დასაყრდენია. ჩვენი 16-წლიანი ისტორია ასეულობით რთულ პროექტსა და 1080-ზე მეტ წარმატებულ სახელმწიფო ტენდერს აერთიანებს, რაც ჩვენი გუნდის პროფესიონალიზმისა და ოპერაციული მდგრადობის საუკეთესო დასტურია.

მრავალწლიანი გამოცდილება კომპიუტერული, ლაბორატორიული და უსაფრთხოების სისტემების მიმართულებით, დღეს გვაძლევს შესაძლებლობას, გადავიდეთ განვითარების ახალ ეტაპზე. 2025 წლისთვის ჩვენი სტრატეგიული პრიორიტეტი ენერგო-ინოვაციებია. მსოფლიო გიგანტ Bluesky-სთან პარტნიორობით, ჩვენ საქართველოში ელექტრომობილების დამტენების უახლეს სტანდარტს ვამკვიდრებთ და მომავლის ინფრასტრუქტურას ვაშენებთ.

MyMobile+ — გამოცდილება, რომელიც ქმნის მომავალს.`,
            m5_desc: `სტრატეგიული პარტნიორობა BlueSky Energy-სთან დაიწყო`,
        }
    }


    // 3. Language Functions
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

    // 4. Navigation & Language Event Listeners
    allLangOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const selectedLang = option.dataset.lang;
            updatePageLanguage(selectedLang);
            if (langSwitcherDesktop) langSwitcherDesktop.classList.remove('active');
        });
    });

    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (langSwitcherDesktop) langSwitcherDesktop.classList.toggle('active');
        });
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (headerElement) headerElement.classList.remove('header-hidden');
            const isActive = navbar.classList.toggle('active');
            if (menuIcon) menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    // Dropdown Toggles Logic
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                const dropdownMenu = this.nextElementSibling;
                const arrow = this.querySelector('.dropdown-icon');
                let clicks = parseInt(this.getAttribute('data-click-count')) || 0;

                if (clicks === 0) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdownMenu.style.display = 'block';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                    this.setAttribute('data-click-count', '1');
                } else if (clicks === 1) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdownMenu.style.display = 'none';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                    this.setAttribute('data-click-count', '2');
                } else {
                    this.setAttribute('data-click-count', '0');
                }
            }
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            closeMobileMenu();
        }
        if (langSwitcherDesktop && !langSwitcherDesktop.contains(e.target) && !langToggle?.contains(e.target)) {
            langSwitcherDesktop.classList.remove('active');
        }
    });

    function closeMobileMenu() {
        if (navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuIcon) menuIcon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.dropdown-menu').forEach(m => m.style.display = 'none');
            dropdownToggles.forEach(t => t.setAttribute('data-click-count', '0'));
        }
    }

    // Scroll Header Logic
    let lastScrollY = window.scrollY;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (navbar.classList.contains('active')) return;

                if (window.scrollY > lastScrollY && window.scrollY > 80) {
                    headerElement.classList.add('header-hidden');
                } else {
                    headerElement.classList.remove('header-hidden');
                }

                lastScrollY = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const observerOptions = {
        threshold: 0.2 // ელემენტის 20% რომ გამოჩნდება, მაშინ დაიწყოს ანიმაცია
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // ერთხელ რომ გამოჩნდება, მეტჯერ აღარ შეამოწმოს (Performance-ისთვის)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // This tells the observer to start watching every timeline item
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}); const slider = document.getElementById("cert-slider");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");
const dots = document.querySelectorAll(".dot");
const lightbox = document.getElementById("cert-lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let isDown = false;
let startX;
let scrollLeftStart;
let startTime;
let dragMoved = false; // Prevents lightbox opening while dragging

// 1. Initial Setup
window.addEventListener('load', () => {
    slider.scrollLeft = slider.offsetWidth;
});

// 2. Infinite Scroll Teleport
function handleInfiniteScroll() {
    const width = slider.offsetWidth;
    const scrollPos = slider.scrollLeft;
    const totalWidth = slider.scrollWidth;

    if (scrollPos >= totalWidth - width - 5) {
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = width;
        slider.style.scrollSnapType = 'x mandatory';
    } else if (scrollPos <= 5) {
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
        slider.scrollLeft = totalWidth - (width * 2);
        slider.style.scrollSnapType = 'x mandatory';
    }
}

// 3. Desktop Drag Logic
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    dragMoved = false;
    startTime = Date.now();
    slider.style.cursor = 'grabbing';
    slider.style.scrollSnapType = 'none';
    slider.style.scrollBehavior = 'auto';
    startX = e.pageX - slider.offsetLeft;
    scrollLeftStart = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) dragMoved = true; // User is dragging, not clicking
    slider.scrollLeft = scrollLeftStart - walk;
});

const finalizeSwipe = (e) => {
    if (!isDown) return;
    isDown = false;
    slider.style.cursor = 'grab';
    slider.style.scrollSnapType = 'x mandatory';
    slider.style.scrollBehavior = 'smooth';

    const endX = e.pageX - slider.offsetLeft;
    const distance = startX - endX;
    const timeTaken = Date.now() - startTime;
    const width = slider.offsetWidth;

    if (Math.abs(distance) > width * 0.2 || (Math.abs(distance) > 50 && timeTaken < 200)) {
        slider.scrollLeft = distance > 0 ? scrollLeftStart + width : scrollLeftStart - width;
    } else {
        slider.scrollLeft = scrollLeftStart;
    }
    setTimeout(handleInfiniteScroll, 500);
};

slider.addEventListener('mouseup', finalizeSwipe);
slider.addEventListener('mouseleave', finalizeSwipe);

// 4. Buttons
nextButton.addEventListener("click", () => {
    slider.style.scrollBehavior = 'smooth';
    slider.scrollLeft += slider.offsetWidth;
    setTimeout(handleInfiniteScroll, 500);
    nextButton.blur(); // <-- დაამატე ეს ხაზი
});
prevButton.addEventListener("click", () => {
    slider.style.scrollBehavior = 'smooth';
    slider.scrollLeft -= slider.offsetWidth;
    setTimeout(handleInfiniteScroll, 500);
    prevButton.blur(); // <-- დაამატე ეს ხაზი
});

// 5. LIGHTBOX LOGIC (The Click Event)
slider.addEventListener('click', (e) => {
    // Only open if it's an image and we didn't drag it
    if (e.target.tagName === 'IMG' && !dragMoved) {
        lightboxImg.src = e.target.src;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
    }
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    setTimeout(() => lightbox.style.display = 'none', 300);
});

// 6. Dot Sync & Mobile Native Scroll
function updateActiveDot() {
    const width = slider.offsetWidth;
    let index = Math.round(slider.scrollLeft / width) - 1;
    if (index < 0) index = dots.length - 1;
    if (index >= dots.length) index = 0;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

let scrollTimeout;
slider.addEventListener("scroll", () => {
    updateActiveDot();
    window.clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleInfiniteScroll, 150);
}, { passive: true });

window.addEventListener('resize', () => slider.scrollLeft = slider.offsetWidth);