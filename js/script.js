// ================= Accordion =================
const accordionItems = document.querySelectorAll('.accordionItem');
accordionItems.forEach(item => {
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

// ================= Shared Navbar/Footer Components =================
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

async function fetchPartialWithFallback(filename) {
  const candidates = [
    `/components/${filename}`,
    `../components/${filename}`,
    `components/${filename}`,
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

function updateFooterYears() {
  const year = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  const yearMobileEl = document.getElementById('year-mobile');

  if (yearEl) yearEl.textContent = year;
  if (yearMobileEl) yearMobileEl.textContent = year;
}

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

function applyStandardNavbarVariant(nav, pageFile) {
  if (!nav) return;

  const container = nav.querySelector('.container-fluid');
  const navList = nav.querySelector('.navbar-nav');
  const topLevelDropdowns = nav.querySelectorAll('.nav-item > .dropdown');
  const logoImg = nav.querySelector('.navbar-brand img');

  const defaultVariant = {
    navClass: 'navbar bg-white w-100 top-0 navbar-expand-xl p-3 ',
    containerClass: 'container-fluid d-flex p-0 ',
    listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end',
    navStyle: '',
  };

  const variantByPage = {
    'index.html': {
      navClass: 'navbar position-absolute w-100 top-0 navbar-expand-xl p-3 p-xl-5 ',
      containerClass: 'container-fluid d-flex  p-0 ',
      listClass: 'navbar-nav navbar-nav-home me-auto mb-2 mb-lg-0 p-2 w-100 d-flex justify-content-end',
      productsDropdownClass: 'dropdown border-none products-dropdown',
      specialtyDropdownClass: 'dropdown border-none specialty-dropdown',
      logoAos: 'fade-right',
    },
    'about.html': {
      navClass: 'navbar bg-white w-100 top-0 navbar-expand-xl p-3',
      containerClass: 'container-fluid d-flex p-0 ',
      listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end',
      navId: 'top-page',
      productsDropdownClass: 'dropdown border-none products-dropdown',
      specialtyDropdownClass: 'dropdown border-none specialty-dropdown ',
    },
    'contact.html': {
      navClass: 'navbar  bg-white w-100 top-0 navbar-expand-xl p-3 contact-nav-border',
      containerClass: 'container-fluid d-flex p-0 ',
      listClass: 'navbar-nav me-auto mb-2 mb-lg-0 w-100 d-flex justify-content-end ',
    },
    'specialty-products.html': {
      navClass: 'navbar position-absolute bg-white w-100 top-0 navbar-expand-xl p-3 ',
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

  if (specialtyItem) {
    const specialtyPlainItem = document.createElement('li');
    specialtyPlainItem.className = 'nav-item ';
    specialtyPlainItem.innerHTML = `
      <a class="nav-link fw-medium font-lato font-size-18 text-xl-center" href="/html/specialty-products.html">SPECIALTY PRODUCTS
              + SERVICES</a>
    `;
    navList.replaceChild(specialtyPlainItem, specialtyItem);
  }

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

function applyNavbarVariant(nav) {
  if (!nav) return;

  const pageFile = getCurrentPageFile();
  if (pageFile === 'resources.html') {
    applyResourcesNavbarVariant(nav);
    return;
  }

  applyStandardNavbarVariant(nav, pageFile);
}

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

    if (typeof AOS !== 'undefined' && typeof AOS.refreshHard === 'function') {
      requestAnimationFrame(() => AOS.refreshHard());
    }

    document.dispatchEvent(new CustomEvent('site-components:loaded'));
  } catch (error) {
    console.error('Failed to inject shared components:', error);
    updateFooterYears();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();
});


// ================= Update Year =================
updateFooterYears();


// ================= Product Footer Button =================
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
function sendEmail(e) {
  e.preventDefault();
  const templateParams = {
    firstname: document.querySelector("#first-name")?.value.trim() || "",
    lastname: document.querySelector("#last-name")?.value.trim() || "",
    useremail: document.querySelector("#user-email")?.value.trim() || "",
    userphone: document.querySelector("#user-phone")?.value.trim() || "",
    usermessage: document.querySelector("#user-message")?.value.trim() || "",
  };

  if (typeof emailjs !== "undefined") {
    emailjs
      .send("service_i5gcrxf", "template_jeeab2l", templateParams)
      .then(() => alert("Email sent!!"))
      .catch(() => alert("Email not sent!!"));
  }
}

  // Measure nav and set global offset so normal hash jumps also respect it
  function applyScrollPadding() {
    const nav = document.querySelector('nav');
    const h = nav ? nav.offsetHeight : 0;
    document.documentElement.style.scrollPaddingTop = h + 'px';
  }

  // Scroll to the element AFTER layout is stable
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


  
