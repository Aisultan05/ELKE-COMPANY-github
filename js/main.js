// Галерея с кнопками прокрутки
document.addEventListener('DOMContentLoaded', () => {
  // --- Configuration ---
  const images = [
    'img/Preview_Print.png', // Your initial image
    'img/image2.jpg',       // Add path to your second image
    'img/image3.png',       // Add path to your third image
    // Add more image paths here
  ];
  // ---------------------

  const galleryImage = document.getElementById('gallery-image');
  const prevArrow = document.querySelector('.arrow-left');
  const nextArrow = document.querySelector('.arrow-right');

  let currentIndex = 0;

  // Function to update the displayed image
  function updateImage() {
    if (galleryImage) {
        galleryImage.src = images[currentIndex];
        // Optional: Update alt text if needed (more complex)
        // galleryImage.alt = `Image ${currentIndex + 1}`;
    } else {
        console.error("Gallery image element not found!");
    }
  }

  // Event listener for the "next" arrow
  if (nextArrow) {
      nextArrow.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= images.length) {
          currentIndex = 0; // Loop back to the first image
        }
        updateImage();
      });
  } else {
      console.error("Next arrow element not found!");
  }


  // Event listener for the "previous" arrow
   if (prevArrow) {
       prevArrow.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = images.length - 1; // Loop back to the last image
        }
        updateImage();
      });
   } else {
       console.error("Previous arrow element not found!");
   }


  // Initialize: Ensure the first image is displayed correctly
  // (This is mostly redundant if the HTML src matches the first array item, but good practice)
  if (images.length > 0) {
      updateImage();
  } else {
      console.warn("Image array is empty!");
      // Optionally hide arrows if no images
      if (prevArrow) prevArrow.style.display = 'none';
      if (nextArrow) nextArrow.style.display = 'none';
  }

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      nextArrow.click(); // Simulate click on next arrow
    } else if (event.key === 'ArrowLeft') {
      prevArrow.click(); // Simulate click on previous arrow
    }
  });

}); // End DOMContentLoaded
// Галерея с кнопками прокрутки

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

// ВАЖНО: Убедитесь, что в вашем CSS НЕТ правила animation: scroll-once... для .swiper-wrapper

window.addEventListener('load', () => {
  // Регистрируем плагины GSAP, если они еще не были зарегистрированы
  // gsap.registerPlugin(...); // ScrollTrigger больше не нужен

  const section = document.getElementById('clients-section'); // На всякий случай, вдруг понадобится
  const swiperWrapper = section?.querySelector('.swiper-wrapper');
  const fadeWrapper = section?.querySelector('.client-logos-fade-wrapper');

  if (!swiperWrapper || !fadeWrapper) {
      console.error("GSAP Error: Не найдены .swiper-wrapper или .client-logos-fade-wrapper.");
      return;
  }
  console.log("GSAP: Элементы для карусели найдены.");

  // --- Функция для создания и запуска зацикленной анимации ---
  function setupLoopingAnimation() {
      const containerWidth = fadeWrapper.offsetWidth;
      const contentWidth = swiperWrapper.scrollWidth;

      console.log(`GSAP: Расчет размеров. Container: ${containerWidth}, Content: ${contentWidth}`);

      // 1. Проверяем, нужно ли вообще анимировать
      if (contentWidth <= containerWidth) {
          console.log("GSAP: Ширина контента недостаточна для анимации. Цикл не запускается.");
          // Убедимся, что позиция сброшена, если вдруг что-то было
          gsap.set(swiperWrapper, { x: 0 });
          return; // Выходим, анимация не нужна
      }

      // 2. Определяем конечную точку анимации
      // Прокручиваем так, чтобы весь контент ушел за левый край
      const endX = -contentWidth;

      // 3. Устанавливаем начальное положение перед запуском таймлайна
      gsap.set(swiperWrapper, { x: 0 });
      console.log(`GSAP: Начальная позиция установлена x: 0. Запуск таймлайна.`);

      // 4. Создаем GSAP Timeline
      const tl = gsap.timeline({
          repeat: -1, // Повторять бесконечно
          // Не используем repeatDelay здесь, т.к. нам нужен сброс *перед* задержкой
          // repeatRefresh: true // Может помочь при ресайзе, но усложнит логику сброса и задержки. Сделаем проще.
          onRepeat: () => { // Функция, вызываемая ПЕРЕД каждым повтором (кроме первого раза)
              console.log("GSAP Timeline: Повтор цикла, сброс позиции на x: 0");
               // Сбрасываем позицию мгновенно перед началом следующего цикла прокрутки
               // gsap.set(swiperWrapper, { x: 0 }); // Перенесено в .set() внутри таймлайна
          }
      });

      // 5. Добавляем шаги в Timeline:
      tl
          // Шаг 1: Анимация прокрутки влево
          .to(swiperWrapper, {
              x: endX,
              duration: 30, // Длительность прокрутки (можно настроить)
              ease: "none" // Линейная скорость
          })
          // Шаг 2: Мгновенный сброс позиции и затем пауза
          // Используем позиционный параметр "+=3"
          // Это означает: "начать этот шаг через 3 секунды ПОСЛЕ ЗАВЕРШЕНИЯ предыдущего шага"
          .set(swiperWrapper, {
              x: 0 // Мгновенно ставим x в 0
           }, "+=3"); // Задержка в 3 секунды перед выполнением .set()

      console.log("GSAP: Бесконечный цикл анимации карусели запущен.");

      // Опционально: Пауза при уходе со страницы/вкладки и возобновление при возврате
      document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
              console.log("GSAP: Вкладка неактивна, пауза таймлайна.");
              tl.pause();
          } else {
              console.log("GSAP: Вкладка активна, возобновление таймлайна.");
              tl.play();
          }
      });

       // Опционально: Обработка изменения размера окна
       let resizeTimeout;
       window.addEventListener('resize', () => {
           clearTimeout(resizeTimeout);
           resizeTimeout = setTimeout(() => {
               console.log("GSAP: Изменение размера окна, перезапуск анимации с новыми размерами.");
               tl.kill(); // Убиваем старый таймлайн
               setupLoopingAnimation(); // Запускаем настройку заново
           }, 250); // Небольшая задержка после окончания ресайза
       });


  } // --- Конец функции setupLoopingAnimation ---

  // Запускаем настройку анимации после загрузки страницы
  setupLoopingAnimation();

}); // --- Конец window.onload ---


// Анимация раскрытия проектов
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('projects');
  if (!wrapper) {
      console.error("Project wrapper #projects not found.");
      return;
  }

  // Debounce function (без изменений)
  function debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      };
  };

  // Video functions (без изменений)
  const playVideo = debounce(async (videoElement) => {
    if (videoElement && videoElement.paused) {
      try {
        if (videoElement.offsetParent !== null) { await videoElement.play(); }
      } catch (err) { console.info("Video play blocked:", err); }
    }
  }, 150);

  const pauseVideo = debounce((videoElement) => {
    if (videoElement && !videoElement.paused) { videoElement.pause(); }
  }, 50);

  // --- Initial state check ---
  // Убедимся, что ТОЛЬКО ОДНА карточка развернута при загрузке
  const allCards = wrapper.querySelectorAll('.project-view');
  let expandedCardFound = false;
  allCards.forEach((card, index) => {
      if (card.classList.contains('is-expanded')) {
          if (!expandedCardFound) {
              // Нашли первую развернутую - оставляем
              expandedCardFound = true;
              const initialVideo = card.querySelector('video');
              if (initialVideo && window.innerWidth >= 768) {
                  setTimeout(() => playVideo(initialVideo), 300);
              }
          } else {
              // Нашли вторую (или больше) развернутую - сворачиваем
              card.classList.replace('is-expanded', 'is-collapsed');
              updateCardAppearance(card, false); // Обновляем кнопку/детали
          }
      } else {
         // Убедимся, что у свернутых карточек правильное состояние кнопки/деталей
         updateCardAppearance(card, false);
      }
  });

  // Если ПОСЛЕ проверки НЕ найдено НИ ОДНОЙ развернутой (и есть карточки), развернем первую
  if (!expandedCardFound && allCards.length > 0) {
      console.warn("No card initially expanded. Expanding the first one.");
      const firstCard = allCards[0];
      firstCard.classList.remove('is-collapsed'); // Убираем is-collapsed если был
      firstCard.classList.add('is-expanded');     // Добавляем is-expanded
      updateCardAppearance(firstCard, true);     // Обновляем кнопку/детали
      const initialVideo = firstCard.querySelector('video');
      if (initialVideo && window.innerWidth >= 768) {
          setTimeout(() => playVideo(initialVideo), 300);
      }
  }


  // --- Обработчик КЛИКОВ (Делегированный - ОБНОВЛЕННАЯ ЛОГИКА) ---
  wrapper.addEventListener('click', (e) => {
    const card = e.target.closest('.project-view');
    if (!card) return; // Клик мимо карточки

    // --- 1. Обработка клика по кнопке ДЕТАЛЕЙ (без изменений) ---
    if (e.target.matches('.details-toggle-btn')) {
      e.preventDefault();
      // ... (остальной код для кнопки деталей без изменений) ...
      const detailsButton = e.target;
      const textBlock = detailsButton.closest('.text-block');
      const detailsList = textBlock?.querySelector('.details');
      if (textBlock && detailsList) {
        const isDetailsExpanded = textBlock.classList.toggle('details-expanded');
        detailsButton.setAttribute('aria-expanded', isDetailsExpanded);
        detailsList.setAttribute('aria-hidden', !isDetailsExpanded);
        detailsButton.textContent = isDetailsExpanded ? 'Свернуть детали' : 'Развернуть детали';
      }
      return;
    }

    // --- 2. Обработка клика для ПЕРЕКЛЮЧЕНИЯ КАРТОЧКИ ---
    const link = e.target.closest('a');
    const isRealLink = link && link.getAttribute('href') && link.getAttribute('href') !== '#';
    const isMainButton = e.target.matches('.black-button') || e.target.closest('.black-button');

    // Важно: Мы переключаем карточку ТОЛЬКО если кликнули на СВЕРНУТУЮ
    if (card.classList.contains('is-collapsed')) {
        // Кликнули на свернутую карточку.
        // Не важно, куда именно (кнопка '+' или сама карточка),
        // результат один - развернуть ЭТУ, свернуть ДРУГУЮ.

        // Предотвращаем переход по ссылке '#' или действие кнопки по умолчанию,
        // так как мы сами управляем переключением.
        e.preventDefault();

        // Вызываем функцию для переключения на эту карточку
        switchToCard(card);

    } else if (card.classList.contains('is-expanded')) {
        // Кликнули на УЖЕ РАЗВЕРНУТУЮ карточку.
        // Согласно новым правилам, НИЧЕГО НЕ ДЕЛАЕМ для сворачивания.
        // НО! Если это была реальная ссылка (не кнопка сворачивания и не кнопка деталей),
        // то позволяем ей сработать.
        if (isRealLink && !isMainButton && !e.target.matches('.toggle-btn') && !e.target.closest('.toggle-btn') && !e.target.matches('.details-toggle-btn')) {
            // Это настоящая ссылка внутри развернутой карточки (и не кнопка "Перейти к проекту" или toggle/details)
            // - позволяем ей работать, не вызываем preventDefault.
            return;
        } else {
            // Кликнули на кнопку сворачивания '-', кнопку "Перейти к проекту" или просто на тело развернутой карточки
            // (но не на другую ссылку внутри) - ИГНОРИРУЕМ действие сворачивания/переключения.
            // Если это была кнопка "Перейти к проекту", её стандартное поведение сработает само.
             if (e.target.matches('.toggle-btn') || e.target.closest('.toggle-btn')) {
                 e.preventDefault(); // Запрещаем действие по умолчанию для кнопки '-'
             }
             // Для кнопки "Перейти к проекту" preventDefault не нужен, она должна работать.
            console.log("Clicked on expanded card or its toggle button. No collapse action.");
            return; // Явно выходим, не делая переключения
        }
    }
  });


  // --- Функция ПЕРЕКЛЮЧЕНИЯ на указанную карточку ---
  function switchToCard(cardToExpand) {
    const currentlyExpanded = wrapper.querySelector('.project-view.is-expanded');
    const videoToPlay = cardToExpand.querySelector('video');
    const isMobile = window.innerWidth < 768;

    // --- ШАГ 1: Свернуть ТЕКУЩУЮ развернутую (если она есть и это не та же самая карточка) ---
    if (currentlyExpanded && currentlyExpanded !== cardToExpand) {
      currentlyExpanded.classList.replace('is-expanded', 'is-collapsed');
      const videoToPause = currentlyExpanded.querySelector('video');
      if (videoToPause) pauseVideo(videoToPause);
      updateCardAppearance(currentlyExpanded, false); // Обновляем кнопку/детали для свернутой
    }

    // --- ШАГ 2: Развернуть НОВУЮ карточку ---
    cardToExpand.classList.replace('is-collapsed', 'is-expanded');
    if (videoToPlay && !isMobile) { // Запускаем видео (если не мобильный)
        setTimeout(() => playVideo(videoToPlay), 150);
    }
    updateCardAppearance(cardToExpand, true); // Обновляем кнопку/детали для развернутой
  }


  // --- Вспомогательная функция для обновления вида карточки (кнопка +/- и сброс деталей) ---
  function updateCardAppearance(card, isExpanding) {
      const button = card.querySelector('.toggle-btn');
      const textBlock = card.querySelector('.text-block');
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;

      if (button) {
          if (isExpanding) {
              button.setAttribute('data-action', 'collapse');
              button.setAttribute('aria-label', 'Свернуть проект');
          } else {
              button.setAttribute('data-action', 'expand');
              button.setAttribute('aria-label', 'Развернуть проект');
          }
      }

      // Сбрасываем состояние деталей ТОЛЬКО при СВОРАЧИВАНИИ карточки
      // и только на мобильных/планшетах, где детали могут быть скрыты
      if (!isExpanding && (isMobile || isTablet)) {
          resetDetailsState(textBlock);
      }
      // При разворачивании детали не трогаем
  }


  // --- Вспомогательная функция для сброса состояния деталей --- (без изменений)
  function resetDetailsState(textBlock) {
      if (!textBlock) return;
      const detailsButton = textBlock.querySelector('.details-toggle-btn');
      const detailsList = textBlock.querySelector('.details');

      // Только если детали были раскрыты
      if (textBlock.classList.contains('details-expanded')) {
          textBlock.classList.remove('details-expanded');
          if (detailsButton) {
              detailsButton.setAttribute('aria-expanded', 'false');
              detailsButton.textContent = 'Развернуть детали';
          }
          if (detailsList) {
              detailsList.setAttribute('aria-hidden', 'true');
          }
      }
  }

}); // End DOMContentLoaded for projects