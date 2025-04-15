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
// Анимация раскрытия проектов
document.addEventListener('DOMContentLoaded',()=>{
    const wrapper = document.getElementById('projects');
    const cards   = [...wrapper.querySelectorAll('.project-view')];
  
    // запуск видео у развёрнутой карточки
    wrapper.querySelector('.is-expanded video')?.play().catch(()=>{});
  
    cards.forEach(card=>{
      card.addEventListener('click',e=>{
        // если кликнули по ссылке — ничего не переключаем
        if(e.target.closest('a')) return;
  
        // если кликнули по кнопке или по свёрнутой карточке — переключаем
        if(e.target.matches('.toggle-btn') || card.classList.contains('is-collapsed')){
          toggle(card);
        }
      });
    });
  
    function toggle(toExpand){
      if(toExpand.classList.contains('is-expanded')) return; // уже раскрыта
  
      const expanded = wrapper.querySelector('.is-expanded');
  
      // сворачиваем текущую
      expanded.classList.remove('is-expanded');
      expanded.classList.add('is-collapsed');
      expanded.querySelector('video')?.pause();
  
      // раскрываем выбранную
      toExpand.classList.remove('is-collapsed');
      toExpand.classList.add('is-expanded');
      toExpand.querySelector('video')?.play().catch(()=>{});
    }
  });
  // Анимация раскрытия проектов


  // Swiper-слайдер логотипов компаний
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 60,
    loop: true,
    speed: 8000, // чем выше — тем медленнее крутится
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
  });
  
  // Swiper-слайдер логотипов компаний