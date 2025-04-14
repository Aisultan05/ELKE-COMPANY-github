document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');
  
    tabLinks.forEach(link => {
      link.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        tabLinks.forEach(link => link.classList.remove('active-tab'));
        tabPanels.forEach(panel => panel.classList.remove('active-panel'));
  
        this.classList.add('active-tab');
        document.getElementById(tabId).classList.add('active-panel');
      });
    });
  });