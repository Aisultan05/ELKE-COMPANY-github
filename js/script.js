// Галерея с кнопками прокрутки
const galleryImages = document.querySelector('.gallery-images');
const btnLeft = document.querySelector('.arrow-left');
const btnRight = document.querySelector('.arrow-right');

if (galleryImages && btnLeft && btnRight) {
  const scrollStep = 600;

  btnLeft.addEventListener('click', () => {
    galleryImages.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });

  btnRight.addEventListener('click', () => {
    galleryImages.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });
}
// Галерея с кнопками прокрутки

  // поп-ап "Заказать звонок"
  document.addEventListener('DOMContentLoaded', () => {
  
    // --- Contact Popup ---
    const icon = document.getElementById('openPopupIcon');
    const popup = document.getElementById('contactPopup');
    const overlay = document.getElementById('popupOverlay');
    const bodyForPopup = document.body;
  
    if (icon && popup && overlay) {
      function placePopupDesktop() {
        popup.style.transform = 'scale(0.95)';
  
        const off = 10;
        const pW = popup.offsetWidth || 358;
        const pH = popup.offsetHeight;
        const iconRect = icon.getBoundingClientRect();
  
        let topPos = iconRect.bottom + off;
        let leftPos = iconRect.left - pW - off;
  
        if (leftPos < off) {
          leftPos = iconRect.right + off;
          if (leftPos + pW > window.innerWidth - off) {
            leftPos = window.innerWidth - pW - off;
          }
        }
  
        if (topPos + pH > window.innerHeight - off) {
          topPos = window.innerHeight - pH - off;
          if (topPos < off) topPos = off;
        }
  
        if (topPos < off) {
          topPos = off;
        }
  
        popup.style.top = `${topPos}px`;
        popup.style.left = `${leftPos}px`;
      }
  
      function openPopup(e) {
        e && e.preventDefault();
  
        if (window.innerWidth >= 768) {
          placePopupDesktop();
        } else {
          popup.style.top = '';
          popup.style.left = '';
        }
  
        overlay.classList.add('active');
        popup.classList.add('active');
        bodyForPopup.classList.add('popup-active');
  
        const firstFocusable = popup.querySelector('input, button, a[href]');
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
  
      function closePopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        bodyForPopup.classList.remove('popup-active');
      }
  
      icon.addEventListener('click', openPopup);
      overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && popup.classList.contains('active')) closePopup(); });
  
      window.addEventListener('resize', () => {
        if (popup.classList.contains('active') && window.innerWidth >= 768) {
          placePopupDesktop();
        } else if (popup.classList.contains('active') && window.innerWidth < 768) {
          popup.style.top = '';
          popup.style.left = '';
        }
      });
  
      // Кнопка "Заказать звонок"
      const requestBtn = document.getElementById('requestCallBtn');
      const phoneInput = document.getElementById('popupPhoneInput');
      if (requestBtn && phoneInput) {
        requestBtn.addEventListener('click', () => {
          const raw = phoneInput.value.trim();
          if (!raw) { alert('Введите номер телефона'); phoneInput.focus(); return; }
          if (!/^[\d\s()-]+$/.test(raw)) { alert('Номер телефона содержит недопустимые символы.'); phoneInput.focus(); return; }
          const cleanedNumber = raw.replace(/[\s()-]/g, '');
          if (cleanedNumber.length < 5) {
            alert('Пожалуйста, введите корректный номер телефона.'); phoneInput.focus(); return;
          }
          alert('Спасибо! Мы свяжемся по номеру: +7 ' + raw);
          closePopup();
          phoneInput.value = '';
        });
      }
    }
  
  });
  // поп-ап "Заказать звонок"

// Выбор страны
document.addEventListener('DOMContentLoaded', function () {
  const select  = document.getElementById('countrySelect');
  const toggle  = document.getElementById('countryToggle');
  const list    = document.getElementById('countryList');
  const isoSpan = toggle?.querySelector('.country-iso');
  const codeSpan= toggle?.querySelector('.country-code');

  if (select && toggle && list && isoSpan && codeSpan) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      select.classList.toggle('open');
    });

    list.addEventListener('click', function (e) {
      const li = e.target.closest('li');
      if (!li) return;
      isoSpan.textContent = li.dataset.iso;
      codeSpan.textContent = li.dataset.code + ' ▾';
      select.classList.remove('open');
    });

    document.addEventListener('click', function (e) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    });
  }
});
// Выбор страны

// Маска ввода телефона
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("phoneInput");

  input.addEventListener("input", function () {
    let x = input.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '+7 ';

    if (x.length > 0) formatted += '(' + x.substring(0, 3);
    if (x.length >= 4) formatted += ') ' + x.substring(3, 6);
    if (x.length >= 7) formatted += '-' + x.substring(6, 8);
    if (x.length >= 9) formatted += '-' + x.substring(8, 10);

    input.value = formatted;
  });
});
// Маска ввода телефона

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
  const burgerButton = document.querySelector('.burger-menu-button');
  const mobileNav = document.getElementById('mobileNav');
  const closeButton = document.querySelector('.close-menu-button');

  if (burgerButton && mobileNav) {
    burgerButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      burgerButton.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
      const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true';
      burgerButton.setAttribute('aria-expanded', !isExpanded);
    });
  }

  if (closeButton && mobileNav) {
    closeButton.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      burgerButton.classList.remove('active');
      document.body.style.overflow = '';
      burgerButton.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', function(event) {
    if (mobileNav && burgerButton && mobileNav.classList.contains('active')) {
      const isClickInsideNav = mobileNav.contains(event.target);
      const isClickOnBurger = burgerButton.contains(event.target);

      if (!isClickInsideNav && !isClickOnBurger) {
        mobileNav.classList.remove('active');
        burgerButton.classList.remove('active');
        document.body.style.overflow = '';
        burgerButton.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (mobileNav) {
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (!link.href.startsWith('#') || link === closeButton) {
          mobileNav.classList.remove('active');
          burgerButton.classList.remove('active');
          document.body.style.overflow = '';
          burgerButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
// Мобильное меню
