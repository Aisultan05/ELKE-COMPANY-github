
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Удаляем активные классы
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        // Добавляем активный класс к выбранному
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        const content = document.getElementById(target);
        if (content) content.classList.add('active');
      });
    });
  });

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

  document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Deactivate all tabs and panels
            tabLinks.forEach(link => link.classList.remove('active-tab'));
            tabPanels.forEach(panel => panel.classList.remove('active-panel'));

            // Activate clicked tab and corresponding panel
            this.classList.add('active-tab');
            document.getElementById(tabId).classList.add('active-panel');
        });
    });

    // Optional: Handle Partnership arrows if they are meant to do something
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Previous clicked');
            // Add carousel or navigation logic here
        });
    }

     if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next clicked');
            // Add carousel or navigation logic here
        });
    }
});