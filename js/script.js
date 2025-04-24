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

document.addEventListener('DOMContentLoaded', () => {

  // Get references to elements
  const servicesToggle = document.getElementById('services-toggle');
  const aboutToggle = document.getElementById('about-toggle');
  const dynamicHeading = document.getElementById('dynamic-heading');
  const dynamicList = document.getElementById('dynamic-list');

  // --- Define SVGs ---
  const plusIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.5 16.5H12.5V12.5H16.5V11.5H12.5V7.5H11.5V11.5H7.5V12.5H11.5V16.5ZM12.0033 21C10.7588 21 9.58867 20.7638 8.493 20.2915C7.3975 19.8192 6.4445 19.1782 5.634 18.3685C4.8235 17.5588 4.18192 16.6067 3.70925 15.512C3.23642 14.4175 3 13.2479 3 12.0033C3 10.7588 3.23617 9.58867 3.7085 8.493C4.18083 7.3975 4.82183 6.4445 5.6315 5.634C6.44117 4.8235 7.39333 4.18192 8.488 3.70925C9.5825 3.23642 10.7521 3 11.9967 3C13.2413 3 14.4113 3.23617 15.507 3.7085C16.6025 4.18083 17.5555 4.82183 18.366 5.6315C19.1765 6.44117 19.8181 7.39333 20.2908 8.488C20.7636 9.5825 21 10.7521 21 11.9967C21 13.2413 20.7638 14.4113 20.2915 15.507C19.8192 16.6025 19.1782 17.5555 18.3685 18.366C17.5588 19.1765 16.6067 19.8181 15.512 20.2908C14.4175 20.7636 13.2479 21 12.0033 21ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#FCFCFC"/>
  </svg>
  `;

  const minusIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7.5 12.5H16.5V11.5H7.5V12.5ZM12.0033 21C10.7588 21 9.58867 20.7638 8.493 20.2915C7.3975 19.8192 6.4445 19.1782 5.634 18.3685C4.8235 17.5588 4.18192 16.6067 3.70925 15.512C3.23642 14.4175 3 13.2479 3 12.0033C3 10.7588 3.23617 9.58867 3.7085 8.493C4.18083 7.3975 4.82183 6.4445 5.6315 5.634C6.44117 4.8235 7.39333 4.18192 8.488 3.70925C9.5825 3.23642 10.7521 3 11.9967 3C13.2413 3 14.4113 3.23617 15.507 3.7085C16.6025 4.18083 17.5555 4.82183 18.366 5.6315C19.1765 6.44117 19.8181 7.39333 20.2908 8.488C20.7636 9.5825 21 10.7521 21 11.9967C21 13.2413 20.7638 14.4113 20.2915 15.507C19.8192 16.6025 19.1782 17.5555 18.3685 18.366C17.5588 19.1765 16.6067 19.8181 15.512 20.2908C14.4175 20.7636 13.2479 21 12.0033 21ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#FCFCFC"/>
  </svg>
  `;

  // Define the content states
  const servicesState = {
      id: 'services',
      heading: 'Услуги',
      listHTML: `
          <li><a href="#">Механический монтаж</a></li>
          <li><a href="#">Электрический монтаж</a></li>
          <li><a href="#">Монтаж трубопроводов</a></li>
          <li><a href="#">Теплоизоляция трубопроводов</a></li>
          <li><a href="Detailed services.html">Инжиниринг</a></li>
          <li><a href="#">Купажные отделения</a></li>
          <li><a href="#">Запуск объекта "под ключ"</a></li>
      `
  };
  const aboutUsState = {
      id: 'about',
      heading: 'О нас',
      listHTML: `
          <li><a href="vacancy.html">Вакансии</a></li>
          <li><a href="Staff.html">Сотрудники</a></li>`
  };

  // Function to update UI based on which state to show
  function setActiveState(stateToShow) {
      // Check if elements exist before manipulating
      if (!dynamicHeading || !dynamicList || !servicesToggle || !aboutToggle) {
          console.error("One or more required elements not found.");
          return;
      }

      if (stateToShow.id === servicesState.id) {
          // Update content
          dynamicHeading.textContent = servicesState.heading;
          dynamicList.innerHTML = servicesState.listHTML;

          // Update Toggles: Services = minus, About = plus
          servicesToggle.innerHTML = minusIconSVG;
          aboutToggle.innerHTML = plusIconSVG;

          // Optional: Add/remove active class if using for other CSS
          servicesToggle.classList.add('active');
          aboutToggle.classList.remove('active');

      } else if (stateToShow.id === aboutUsState.id) {
          // Update content
          dynamicHeading.textContent = aboutUsState.heading;
          dynamicList.innerHTML = aboutUsState.listHTML;

          // Update Toggles: Services = plus, About = minus
          servicesToggle.innerHTML = plusIconSVG;
          aboutToggle.innerHTML = minusIconSVG;

           // Optional: Add/remove active class
          servicesToggle.classList.remove('active');
          aboutToggle.classList.add('active');
      }
  }

  // --- Event Listeners ---
  if (servicesToggle) {
      servicesToggle.addEventListener('click', (event) => {
          event.preventDefault(); // IMPORTANT: Prevent the link from navigating
          event.stopPropagation(); // IMPORTANT: Stop click from bubbling to the <a>
          setActiveState(servicesState);
      });
  } else {
      console.error("Services toggle element not found.");
  }


  if (aboutToggle) {
      aboutToggle.addEventListener('click', (event) => {
          event.preventDefault(); // IMPORTANT: Prevent the link from navigating
          event.stopPropagation(); // IMPORTANT: Stop click from bubbling to the <a>
          setActiveState(aboutUsState);
      });
  } else {
       console.error("About toggle element not found.");
  }


  // --- Initial Setup ---
  // Set the initial state when the page loads (e.g., default to "Услуги")
  setActiveState(servicesState);

}); // End DOMContentLoaded

// +/- футер
const plusSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.5 16.5H12.5V12.5H16.5V11.5H12.5V7.5H11.5V11.5H7.5V12.5H11.5V16.5ZM12.0033 21C10.7588 21 9.58867 20.7638 8.493 20.2915C7.3975 19.8192 6.4445 19.1782 5.634 18.3685C4.8235 17.5588 4.18192 16.6067 3.70925 15.512C3.23642 14.4175 3 13.2479 3 12.0033C3 10.7588 3.23617 9.58867 3.7085 8.493C4.18083 7.3975 4.82183 6.4445 5.6315 5.634C6.44117 4.8235 7.39333 4.18192 8.488 3.70925C9.5825 3.23642 10.7521 3 11.9967 3C13.2413 3 14.4113 3.23617 15.507 3.7085C16.6025 4.18083 17.5555 4.82183 18.366 5.6315C19.1765 6.44117 19.8181 7.39333 20.2908 8.488C20.7636 9.5825 21 10.7521 21 11.9967C21 13.2413 20.7638 14.4113 20.2915 15.507C19.8192 16.6025 19.1782 17.5555 18.3685 18.366C17.5588 19.1765 16.6067 19.8181 15.512 20.2908C14.4175 20.7636 13.2479 21 12.0033 21ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#FCFCFC"/>
</svg>`;

const minusSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.5 12.5H12.5H16.5V11.5H12.5H11.5H7.5V12.5H11.5ZM12.0033 21C10.7587 21 9.58867 20.7638 8.493 20.2915C7.3975 19.8192 6.4445 19.1782 5.634 18.3685C4.8235 17.5588 4.18192 16.6067 3.70925 15.512C3.23642 14.4175 3 13.2479 3 12.0033C3 10.7587 3.23617 9.58867 3.7085 8.493C4.18083 7.3975 4.82183 6.4445 5.6315 5.634C6.44117 4.8235 7.39333 4.18192 8.488 3.70925C9.5825 3.23642 10.7521 3 11.9967 3C13.2413 3 14.4113 3.23617 15.507 3.7085C16.6025 4.18083 17.5555 4.82183 18.366 5.6315C19.1765 6.44117 19.8181 7.39333 20.2908 8.488C20.7636 9.5825 21 10.7521 21 11.9967C21 13.2413 20.7638 14.4113 20.2915 15.507C19.8192 16.6025 19.1782 17.5555 18.3685 18.366C17.5588 19.1765 16.6067 19.8181 15.512 20.2908C14.4175 20.7636 13.2479 21 12.0033 21ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#FCFCFC"/>
</svg>`;

const toggles = document.querySelectorAll('[data-toggle]');

toggles.forEach(toggle => {
  toggle.innerHTML = plusSVG;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();

    toggles.forEach(el => {
      el.innerHTML = plusSVG;
      el.classList.remove('active');
    });

    this.innerHTML = minusSVG;
    this.classList.add('active');
  });
});
// +/- футер

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

  // единые опции
  const itiOptions = {
    initialCountry: 'auto',
    geoIpLookup: cb => {
      fetch('https://ipwhois.app/json/')
        .then(r => r.json())
        .then(d => cb(d.country_code))
        .catch(() => cb('kz'));           
    },
    loadUtils: () =>
      import('https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js'),
    separateDialCode: true
  };

  // инициализируем все поля с классом .phone-input
  document.querySelectorAll('.phone-input').forEach(input => {
    window.intlTelInput(input, itiOptions);
  });

// Выбор страны

// Обратная связь
        // Basic JS for file input functionality (like in provided example)
        function displayFileName(input) {
          const label = input.nextElementSibling;
          const fileNameDisplay = label.querySelector('.file-name-display');
          // data-placeholder is handled by CSS now

          if (input.files && input.files.length > 0) {
              const file = input.files[0];
              // Rough size calculation
              const fileSizeKB = file.size / 1024;
              let fileSizeDisplay;
              if (fileSizeKB < 1) {
                  fileSizeDisplay = '(менее 1 Кб)'; // Less than 1 KB
              } else {
                  fileSizeDisplay = `(${fileSizeKB.toFixed(0)} Кб)`; // Show KB
              }

              fileNameDisplay.textContent = `${file.name} ${fileSizeDisplay}`;
              label.classList.add('has-file'); // Add class to show filename and delete btn
          } else {
              fileNameDisplay.textContent = ''; // Clear text content (CSS shows placeholder)
              label.classList.remove('has-file'); // Remove class
          }
      }

      function clearFileInput(event) {
          // Find the label and input associated with the clicked button
          const label = event.target.closest('.file-input-label');
          if (!label) return;
          const inputId = label.getAttribute('for');
          const input = document.getElementById(inputId);
          if (!input) return;
          const fileNameDisplay = label.querySelector('.file-name-display');

          input.value = ''; // Clear the file input
          fileNameDisplay.textContent = ''; // Clear the display span (CSS will show placeholder)
          label.classList.remove('has-file'); // Remove class to hide delete btn and show placeholder

          // Optional: Trigger change event if needed by other scripts
          // const changeEvent = new Event('change', { bubbles: true });
          // input.dispatchEvent(changeEvent);
      }

       // Initialize display on load in case browser remembers file selection (like after back button)
       document.addEventListener('DOMContentLoaded', () => {
         const fileInput = document.getElementById('resume-file');
         // Check if the input exists and has a file selected by the browser
         if(fileInput && fileInput.files && fileInput.files.length > 0){
            // If yes, trigger the display function to update the label correctly
            displayFileName(fileInput);
         } else if (fileInput) {
            // Otherwise, ensure it's in the default state (no file)
            // This handles the case where HTML might have stale text but no actual file
            const label = fileInput.nextElementSibling;
            if (label && label.classList.contains('has-file')) {
               const fileNameDisplay = label.querySelector('.file-name-display');
               fileNameDisplay.textContent = '';
               label.classList.remove('has-file');
            }
         }
      });
// Обратная связь

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
document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.burger-menu-button');
  const mobileNav = document.getElementById('mobileNav'); // Use ID for reliability
  const closeButton = mobileNav.querySelector('.close-menu-button');
  const body = document.body;

  const openMenu = () => {
      burgerButton.classList.add('active');
      burgerButton.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('active');
      mobileNav.setAttribute('aria-hidden', 'false');
      body.classList.add('mobile-nav-active'); // Lock body scroll
  };

  const closeMenu = () => {
      burgerButton.classList.remove('active');
      burgerButton.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('active');
      mobileNav.setAttribute('aria-hidden', 'true');
      body.classList.remove('mobile-nav-active'); // Unlock body scroll

      // Optional: Close all submenus when main menu closes
      mobileNav.querySelectorAll('.has-submenu.submenu-expanded').forEach(submenu => {
          submenu.classList.remove('submenu-expanded');
          const sublist = submenu.querySelector('.mobile-submenu');
          if (sublist) {
              sublist.style.maxHeight = null;
              sublist.setAttribute('aria-hidden', 'true');
              const toggle = submenu.querySelector('.submenu-toggle');
              if (toggle) toggle.setAttribute('aria-expanded', 'false');
          }
      });
  };

  if (burgerButton && mobileNav && closeButton) {
      // Toggle menu with Burger button
      burgerButton.addEventListener('click', () => {
          if (mobileNav.classList.contains('active')) {
              closeMenu();
          } else {
              openMenu();
          }
      });

      // Close menu with Close button
      closeButton.addEventListener('click', closeMenu);

      // Optional: Close menu if clicking outside of it (on overlay if you add one)
      // Or close if clicking on a nav link (for single-page apps or smooth scroll)
      mobileNav.addEventListener('click', (event) => {
          // Close only if a direct link inside the main nav list is clicked
          if (event.target.matches('.mobile-nav-item') && !event.target.matches('.submenu-toggle')) {
              closeMenu();
          }
      });

  } else {
      console.error('Burger menu elements not found!');
  }

  // --- Accordion Submenu Logic ---
  const submenuToggles = mobileNav.querySelectorAll('.submenu-toggle');

  submenuToggles.forEach(toggle => {
      const sublist = toggle.closest('.has-submenu').querySelector('.mobile-submenu');
      if (!sublist) return; // Skip if no submenu found

      // Set initial ARIA states
      toggle.setAttribute('aria-expanded', 'false');
      sublist.setAttribute('aria-hidden', 'true');
      sublist.style.maxHeight = null; // Ensure it's collapsed initially

      toggle.addEventListener('click', (e) => {
          e.preventDefault(); // Prevent default link behavior
          const parentLi = toggle.closest('.has-submenu');
          const isExpanded = parentLi.classList.toggle('submenu-expanded');

          toggle.setAttribute('aria-expanded', isExpanded.toString());
          sublist.setAttribute('aria-hidden', (!isExpanded).toString());

          if (isExpanded) {
              // Calculate and set max-height for opening transition
              sublist.style.maxHeight = sublist.scrollHeight + 'px';
          } else {
              // Remove max-height for closing transition
              sublist.style.maxHeight = null;
          }
      });
  });

}); // End DOMContentLoaded
