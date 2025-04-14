// Переключение вкладок

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });
});
// Переключение вкладок

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

// Анимация раскрытия проектов
function toggleProject(projectToShow) {
  const ids = [1, 2];
  ids.forEach(id => {
    const expanded = document.querySelector(`#project${id} .expanded-card`);
    const collapsed = document.querySelector(`#project${id} .collapsed-card`);

    if (id === projectToShow) {
      collapsed.classList.add('fade-out');
      expanded.classList.remove('hidden');
      expanded.classList.add('fade-in');
      collapsed.classList.remove('fade-in');

      setTimeout(() => {
        collapsed.classList.add('hidden');
        collapsed.classList.remove('fade-out');
      }, 400);
    } else {
      expanded.classList.add('fade-out');
      collapsed.classList.remove('hidden');
      collapsed.classList.add('fade-in');
      expanded.classList.remove('fade-in');

      setTimeout(() => {
        expanded.classList.add('hidden');
        expanded.classList.remove('fade-out');
      }, 400);
    }
  });
}
// Анимация раскрытия проектов

// Стрелки карусели партнерства
document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      console.log('Previous clicked');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      console.log('Next clicked');
    });
  }
});
// Стрелки карусели партнерства

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

// Swiper-слайдер логотипов компаний
if (document.querySelector('.companies-swiper')) {
  const swiper = new Swiper('.companies-swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: { slidesPerView: 4 },
      480: { slidesPerView: 2 },
      0:   { slidesPerView: 1 }
    }
  });
}

// Swiper-слайдер логотипов компаний