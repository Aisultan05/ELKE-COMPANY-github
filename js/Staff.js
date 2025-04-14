// Разворачивание карточек сотрудников
document.addEventListener('DOMContentLoaded', () => {
    const staffCards = document.querySelectorAll('.staff-card');
  
    staffCards.forEach(card => {
      const toggleButton = card.querySelector('.toggle-button');
      const detailsBlock = card.querySelector('.staff-details');
      
      const ANIMATION_TIME = 300;
  
      toggleButton.addEventListener('click', () => {
        const isExpanded = card.classList.contains('is-expanded');
  
        if (!isExpanded) {
          card.classList.add('is-expanded');
          toggleButton.disabled = true;
  
          setTimeout(() => {
            toggleButton.textContent = 'Свернуть';
            toggleButton.disabled = false;
          }, ANIMATION_TIME);
        } else {
          card.classList.remove('is-expanded');
          toggleButton.disabled = true;
  
          setTimeout(() => {
            toggleButton.textContent = 'Развернуть';
            toggleButton.disabled = false;
          }, ANIMATION_TIME);
        }
      });
    });
  });
  // Разворачивание карточек сотрудников