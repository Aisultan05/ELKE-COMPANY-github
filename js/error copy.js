document.addEventListener('DOMContentLoaded', () => {

    let mobile404Swiper = null; // Переменная для хранения экземпляра Swiper
    const breakpoint = window.matchMedia('(max-width: 767px)'); // Точка перелома

    const initializeMobileSwiper = () => {
        // Инициализируем Swiper только если он еще не создан
        if (breakpoint.matches && mobile404Swiper === null) {
            mobile404Swiper = new Swiper('.error-graphic.swiper', {
                // Настройки из вашего примера
                slidesPerView: 'auto', // Очень важно для разной ширины слайдов или авто-ширины
                spaceBetween: 15, // Расстояние между слайдами (подберите по макету)
                loop: true,          // Бесконечная прокрутка
                speed: 8000,         // Скорость анимации (в миллисекундах)
                autoplay: {
                    delay: 0,                 // Без задержки
                    disableOnInteraction: false, // Не останавливать при взаимодействии
                    pauseOnMouseEnter: false,     // Не останавливать при наведении мыши
                },
                allowTouchMove: false, // Запретить перетаскивание
                freeMode: true, // Добавляет эффект "свободного" скольжения, хорошо с delay: 0
                freeModeMomentum: false, // Отключаем инерцию во freeMode
            });
            console.log('Mobile 404 Swiper initialized');
        }
    };

    const destroyMobileSwiper = () => {
        // Уничтожаем Swiper только если он существует и экран стал шире
        if (!breakpoint.matches && mobile404Swiper !== null) {
            mobile404Swiper.destroy(true, true); // Уничтожить экземпляр и удалить обработчики
            mobile404Swiper = null;
            console.log('Mobile 404 Swiper destroyed');
            // Восстанавливаем нужные стили если Swiper их изменил (например, transform)
            const wrapper = document.querySelector('.error-graphic .swiper-wrapper');
            if(wrapper) wrapper.style.transform = '';
        }
    };

    // --- Инициализация при загрузке ---
    initializeMobileSwiper(); // Попробовать инициализировать при первой загрузке
    destroyMobileSwiper();    // Попробовать уничтожить, если экран уже широкий

    // --- Отслеживание изменения размера окна ---
    // Устаревший метод, но поддерживается везде:
    // window.addEventListener('resize', () => {
    //    initializeMobileSwiper();
    //    destroyMobileSwiper();
    // });

    // Современный метод:
    if (breakpoint.addEventListener) {
        breakpoint.addEventListener('change', () => {
             initializeMobileSwiper();
             destroyMobileSwiper();
        });
    } else if (breakpoint.addListener) { // Для старых браузеров
        breakpoint.addListener(() => {
             initializeMobileSwiper();
             destroyMobileSwiper();
        });
    }

    // ... (остальной ваш JS код, например, для попапа, бургер-меню)

}); // Конец DOMContentLoaded

const swiper404 = new Swiper('.my-404-swiper', {
    // Параметры Swiper
    direction: 'horizontal', // Горизонтальная прокрутка
    loop: true,              // Бесконечная прокрутка
    slidesPerView: 1,        // Показывать 1 слайд за раз
    spaceBetween: 20,        // Пространство между слайдами
    centeredSlides: true,    // Центрировать активный слайд

    // Навигация (стрелки)
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});