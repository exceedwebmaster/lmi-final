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


// ================= Update Year =================
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("year-mobile").textContent = new Date().getFullYear();


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
