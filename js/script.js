// ================= Accordion =================
// Accordion hover event bindings
const accordionItems = document.querySelectorAll('.accordionItem');
accordionItems.forEach(item => {
  // Accordion expand on hover
  item.addEventListener('mouseenter', function () {
    const accordionDescription = this.querySelector('.accordionDescription');
    const plusIcon = this.querySelector('.plusIcon');
    const minusIcon = this.querySelector('.minusIcon');

    if (accordionDescription) {
      accordionDescription.style.maxHeight = accordionDescription.scrollHeight + 'px';
    }
    if (plusIcon) plusIcon.style.display = 'none';
    if (minusIcon) minusIcon.style.display = 'block';
  });

  // Accordion collapse on leave
  item.addEventListener('mouseleave', function () {
    const accordionDescription = this.querySelector('.accordionDescription');
    const plusIcon = this.querySelector('.plusIcon');
    const minusIcon = this.querySelector('.minusIcon');

    if (accordionDescription) {
      accordionDescription.style.maxHeight = null;
    }
    if (plusIcon) plusIcon.style.display = 'block';
    if (minusIcon) minusIcon.style.display = 'none';
  });
});

// ================= HEADER COLOR CHANGE ON SCROLL =================
// Navbar background color on scroll
/* Dynamically changes navbar background color based on scroll position */
/* Helps navbar blend with different section backgrounds */
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  /* If user scrolled more than 100px down, change navbar background */
  if (window.scrollY > 100) {
    navbar.style.background = '#F2F4F5';
  } else {
    /* Reset to transparent when near top of page */
    navbar.style.background = 'transparent';
  }
});

// ================= Shared Navbar/Footer Components =================
// Get current page filename
function getCurrentPageFile() {
  const rawPath = (window.location.pathname || '').toLowerCase();
  const normalizedPath = rawPath.replace(/\\/g, '/');
  const segments = normalizedPath.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment || !lastSegment.includes('.')) {
    return 'index.html';
  }

  return lastSegment;
}

// Fetch partial with path fallback
async function fetchPartialWithFallback(filename) {
  const candidates = [
    `components/${filename}`,
    `../components/${filename}`,
  ];

  let lastError;

  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }
      return await response.text();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Unable to load partial: ${filename}`);
}

// Update footer year values
function updateFooterYears() {
  const year = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  const yearMobileEl = document.getElementById('year-mobile');

  if (yearEl) yearEl.textContent = year;
  if (yearMobileEl) yearMobileEl.textContent = year;
}

// Disable AOS on injected footer
function makeInjectedFooterAlwaysVisible(footerRoot) {
  if (!footerRoot) return;

  // AOS can keep footer items hidden near the bottom of the page
  // if they never cross the animation offset threshold. Disable AOS on footer content.
  footerRoot.querySelectorAll('[data-aos]').forEach((el) => {
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-duration');
    el.removeAttribute('data-aos-offset');
    el.removeAttribute('data-aos-once');
    el.classList.remove('aos-init', 'aos-animate');
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
    el.style.removeProperty('transition');
  });
}

// Apply standard navbar classes
function applyStandardNavbarVariant(nav, pageFile) {
  if (!nav) return;

  const container = nav.querySelector('.container-fluid');
  const navList = nav.querySelector('.navbar-nav');
  const topLevelDropdowns = nav.querySelectorAll('.nav-item > .dropdown');
  const logoImg = nav.querySelector('.navbar-brand img');

  const defaultVariant = {
    navClass: 'navbar position-fixed bg-white w-100 top-0 navbar-expand-xl p-3 ',
    containerClass: 'container-fluid d-flex p-0 ',
    listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end',
    navStyle: '',
  };

  const variantByPage = {
    'index.html': {
      navClass: 'navbar position-fixed w-100 top-0 navbar-expand-xl p-3 p-xl-3 ',
      containerClass: 'container-fluid d-flex  p-0 ',
      listClass: 'navbar-nav navbar-nav-home me-auto mb-2 mb-lg-0 p-2 w-100 d-flex justify-content-end',
      productsDropdownClass: 'dropdown border-none products-dropdown',
      specialtyDropdownClass: 'dropdown border-none specialty-dropdown',
      logoAos: 'fade-right',
    },
    'about.html': {
      navClass: 'navbar position-fixed bg-white w-100 top-0 navbar-expand-xl p-3',
      containerClass: 'container-fluid d-flex p-0 ',
      listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end',
      navId: 'top-page',
      productsDropdownClass: 'dropdown border-none products-dropdown',
      specialtyDropdownClass: 'dropdown border-none specialty-dropdown ',
    },
    'contact.html': {
      navClass: 'navbar position-fixed bg-white w-100 top-0 navbar-expand-xl p-3 contact-nav-border',
      containerClass: 'container-fluid d-flex p-0 ',
      listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end ',
    },
    'expertise.html': {
      navClass: 'navbar position-fixed b  g-white w-100 top-0 navbar-expand-xl p-3 ',
    },
    'privacy-policy.html': {  
      navClass: 'navbar  bg-white w-100 top-0 navbar-expand-xl p-3 ',
      navStyle: 'background: linear-gradient(to bottom, #404040, #A6A6A6);',
    },
    'terms-and-conditions.html': {
      navClass: 'navbar  bg-white w-100 top-0 navbar-expand-xl p-3 ',
      navStyle: 'background: linear-gradient(to bottom, #404040, #A6A6A6);',
    },
  };

  const variant = { ...defaultVariant, ...(variantByPage[pageFile] || {}) };

  nav.className = variant.navClass;
  if (variant.navStyle) {
    nav.setAttribute('style', variant.navStyle);
  } else {
    nav.removeAttribute('style');
  }

  if (variant.navId) {
    nav.id = variant.navId;
  } else {
    nav.removeAttribute('id');
  }

  if (container && variant.containerClass) {
    container.className = variant.containerClass;
  }

  if (navList && variant.listClass) {
    navList.className = variant.listClass;
  }

  if (topLevelDropdowns[0] && variant.productsDropdownClass) {
    topLevelDropdowns[0].className = variant.productsDropdownClass;
  }

  if (topLevelDropdowns[1] && variant.specialtyDropdownClass) {
    topLevelDropdowns[1].className = variant.specialtyDropdownClass;
  }

  if (logoImg) {
    if (variant.logoAos) {
      logoImg.setAttribute('data-aos', variant.logoAos);
    } else {
      logoImg.removeAttribute('data-aos');
    }
  }
}

// Apply resources navbar modifications
function applyResourcesNavbarVariant(nav) {
  if (!nav) return;

  nav.className = 'navbar position w-100 top-0 navbar-expand-xl p-3 p-md-4';
  nav.removeAttribute('style');
  nav.removeAttribute('id');

  const container = nav.querySelector('.container-fluid');
  if (container) {
    container.className = 'container-fluid d-flex p-0 max-width-1920';
  }

  const navList = nav.querySelector('.navbar-nav');
  if (!navList) return;
  navList.className = 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end';

  const navItems = Array.from(navList.children);
  const aboutItem = navItems[0];
  const productsItem = navItems[1];
  const specialtyItem = navItems[2];
  const contactItem = navItems[3];

  const aboutLink = aboutItem?.querySelector('a.nav-link');
  if (aboutLink) {
    aboutLink.className = 'nav-link active fw-medium font-size-18 font-lato';
  }

  const productsDropdown = productsItem?.querySelector('.dropdown');
  if (productsDropdown) {
    productsDropdown.className = 'dropdown border-none specialty-dropdown';
  }

  const productsButton = productsItem?.querySelector('.dropdown > a');
  if (productsButton) {
    productsButton.className = 'btn btn-secondary dropdown-toggle bg-transparent font-color-black font-lato font-size-18 border-0 ';
    productsButton.textContent = 'PRODUCTS';
  }

  const productsMenu = productsItem?.querySelector('.dropdown-menu');
  if (productsMenu) {
    productsMenu.className = 'dropdown-menu font-size-16 ';

    const productLinks = [
      { href: '/html/enclosures.html', text: 'SHOWER ENCLOSURES SERIES' },
      { href: '/html/mirror+frames.html', text: 'MIRROS | FRAMES | LED' },
      { href: '/html/wardrobe-doors.html', text: 'WARDROBE DOORS' },
      { href: '/html/room-dividers.html', text: 'ROOM DIVIDERS' },
      { href: '/html/organizers.html', text: 'ORGANIZERS + SHELVING' },
      { href: '/html/wine-rooms.html', text: 'GLASS WINE CELLARS' },
    ];

    productsMenu.innerHTML = productLinks
      .map(
        (item) =>
          `<li><a class="dropdown-item font-lato" href="${item.href}">${item.text}</a></li>`
      )
      .join('');
  }

  // Replace specialty dropdown with link
  if (specialtyItem) {
    const specialtyPlainItem = document.createElement('li');
    specialtyPlainItem.className = 'nav-item ';
    specialtyPlainItem.innerHTML = `
      <a class="nav-link fw-medium font-lato font-size-18 text-xl-center" href="/html/expertise.html">EXPERTISE
             </a>
    `;
    navList.replaceChild(specialtyPlainItem, specialtyItem);
  }

  // Insert resources nav item
  const resourcesItem = document.createElement('li');
  resourcesItem.className = 'nav-item';
  resourcesItem.innerHTML = '<a class="nav-link fw-medium font-lato font-size-18" href="/html/resources.html">RESOURCES</a>';

  if (contactItem && contactItem.parentNode === navList) {
    navList.insertBefore(resourcesItem, contactItem);
    const contactLink = contactItem.querySelector('a.nav-link');
    if (contactLink) {
      contactLink.className = 'nav-link font-lato font-size-18';
    }
  } else {
    navList.appendChild(resourcesItem);
  }
}

// Route navbar variant selection
function applyNavbarVariant(nav) {
  if (!nav) return;

  const pageFile = getCurrentPageFile();
  if (pageFile === 'resources.html') {
    applyResourcesNavbarVariant(nav);
    return;
  }

  applyStandardNavbarVariant(nav, pageFile);
}

// Inject shared navbar and footer
async function injectSharedComponents() {
  const navbarTarget = document.getElementById('site-navbar');
  const footerTarget = document.getElementById('site-footer');

  if (!navbarTarget && !footerTarget) {
    updateFooterYears();
    return;
  }

  try {
    const [navbarHtml, footerHtml] = await Promise.all([
      navbarTarget ? fetchPartialWithFallback('navbar.html') : Promise.resolve(null),
      footerTarget ? fetchPartialWithFallback('footer.html') : Promise.resolve(null),
    ]);

    if (navbarTarget && navbarHtml) {
      navbarTarget.innerHTML = navbarHtml;
      applyNavbarVariant(navbarTarget.querySelector('nav'));
    }

    if (footerTarget && footerHtml) {
      footerTarget.innerHTML = footerHtml;
      makeInjectedFooterAlwaysVisible(footerTarget);
    }

    updateFooterYears();
    applyScrollPadding();
    scrollToHashWithOffset();

    if (window.AOS) AOS.refreshHard();

    document.dispatchEvent(new CustomEvent('site-components:loaded'));
  } catch (error) {
    console.error('Failed to inject shared components:', error);
    updateFooterYears();
  }
}

// DOM ready initializers
document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();
  initLandingParallax();
});

// Landing parallax scroll effect
function initLandingParallax() {
  const landing = document.getElementById('landing');
  if (!landing) return;

  let ticking = false;

  const update = () => {
    const rect = landing.getBoundingClientRect();
    const offset = -rect.top * 0.35;
    landing.style.setProperty('--landing-parallax', `${offset}px`);
    ticking = false;
  };

  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  update();
}


// ================= Update Year =================
// Update footer years on load
updateFooterYears();


// ================= Product Footer Button =================
// Toggle products footer accordion
const productFooterBtn = document.querySelector('.product-footer-button');
if (productFooterBtn) {
  productFooterBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const productsFooter = document.querySelector('.products-footer');
    if (!productsFooter) return;

    productsFooter.classList.toggle('show');
    const toggleText = productsFooter.classList.contains('show') ? '▲' : '▼';
    this.textContent = `PRODUCTS ${toggleText}`;
  });
}

// ================= Fancybox =================
// Fancybox image zoom toggle setup
if (typeof Fancybox !== "undefined") {
  Fancybox.bind("[data-fancybox]", {
    Images: {
      Panzoom: {
        zoom: true,
        maxScale: 2,
      },
    },
    on: {
      done: (fancybox) => {
        const slide = fancybox.getSlide();
        if (!slide || !slide.Panzoom) return;

        const panzoom = slide.Panzoom;
        const img = slide.$content?.querySelector("img");
        if (!img) return;

        img.onclick = (event) => {
          event.preventDefault();
          if (panzoom.scale === 1) {
            panzoom.zoomTo(2, { event });
          } else {
            panzoom.zoomTo(1);
          }
        };
      },
    },
  });
}

// ================= Email =================
// Email form submit handler
function sendEmail(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#user-name");
  const companyInput = document.querySelector("#user-company");
  const positionInput = document.querySelector("#user-position");
  const emailInput = document.querySelector("#user-email");
  const phoneInput = document.querySelector("#user-phone");
  const nameValue = nameInput?.value.trim() || "";
  const companyValue = companyInput?.value.trim() || "";
  const positionValue = positionInput?.value.trim() || "";
  const emailValue = emailInput?.value.trim() || "";
  const phoneValue = phoneInput?.value.trim() || "";

  if (emailInput) emailInput.setCustomValidity("");
  if (phoneInput) phoneInput.setCustomValidity("");

  // Ensure email is properly formatted.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput && !emailPattern.test(emailValue)) {
    emailInput.setCustomValidity("Please enter a valid email address.");
    emailInput.reportValidity();
    return;
  }

  // Ensure phone contains digits only.
  const phonePattern = /^[0-9]+$/;
  if (phoneInput && !phonePattern.test(phoneValue)) {
    phoneInput.setCustomValidity("Phone number must contain numbers only.");
    phoneInput.reportValidity();
    return;
  }

  const templateParams = {
    name: nameValue,
    company: companyValue,
    position: positionValue,
    useremail: emailValue,
    userphone: phoneValue,
    usermessage: document.querySelector("#user-message")?.value.trim() || "",
    // Backward-compatible keys for existing EmailJS templates
    firstname: nameValue,
    lastname: companyValue,
  };

  if (typeof emailjs !== "undefined") {
    emailjs
      .send("service_i5gcrxf", "template_jeeab2l", templateParams)
      .then(() => alert("Email sent!!"))
      .catch(() => alert("Email not sent!!"));
  }
}

  // Measure nav and set global offset so normal hash jumps also respect it
  // Set scroll padding from navbar height
  function applyScrollPadding() {
    const nav = document.querySelector('nav');
    const h = nav ? nav.offsetHeight : 0;
    document.documentElement.style.scrollPaddingTop = h + 'px';
  }

  // Scroll to the element AFTER layout is stable
  // Smooth scroll to hash with offset
  function scrollToHashWithOffset() {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (!el) return;

    const nav = document.querySelector('nav');
    const offset = nav ? nav.offsetHeight : 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }

  // Handle normal load, BFCache restore, and resizes
  // Hash jump handling on load/restore
  window.addEventListener('load', () => {
    applyScrollPadding();
    scrollToHashWithOffset();
  });
  window.addEventListener('resize', applyScrollPadding);
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { 
      applyScrollPadding();
      scrollToHashWithOffset();
    }
  });