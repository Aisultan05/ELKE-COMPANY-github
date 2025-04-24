document.addEventListener('DOMContentLoaded', () => {

    // --- Desktop Tabs Logic ---
    const desktopSection = document.querySelector('#tabs-section-desktop');
    if (desktopSection) {
         const desktopTabLinks = desktopSection.querySelectorAll('.tab-link');
         const desktopTabPanels = desktopSection.querySelectorAll('.tab-panel');

         if (desktopTabLinks.length && desktopTabPanels.length) {
             desktopTabLinks.forEach(link => {
                 link.addEventListener('click', (e) => {
                     e.preventDefault();
                     const targetId = link.getAttribute('aria-controls');
                     const targetPanel = desktopSection.querySelector(`#${targetId}`);
                     if (!targetPanel) return;

                     desktopTabLinks.forEach(l => {
                         l.classList.remove('active-tab');
                         l.setAttribute('aria-selected', 'false');
                     });
                     desktopTabPanels.forEach(p => {
                         p.classList.remove('active-panel');
                     });

                     link.classList.add('active-tab');
                     link.setAttribute('aria-selected', 'true');
                     targetPanel.classList.add('active-panel');
                 });
             });

             const activeTab = desktopSection.querySelector('.tab-link.active-tab');
             if (!activeTab && desktopTabLinks.length > 0) {
                 desktopTabLinks[0].classList.add('active-tab');
                 desktopTabLinks[0].setAttribute('aria-selected', 'true');
                 const firstPanelId = desktopTabLinks[0].getAttribute('aria-controls');
                 const firstPanel = desktopSection.querySelector(`#${firstPanelId}`);
                 if (firstPanel) firstPanel.classList.add('active-panel');
             }
         }
    }

    // --- Mobile Accordion Logic ---
    const mobileSection = document.querySelector('#tabs-section-mobile');
    if (mobileSection) {
        const mobileTabs = mobileSection.querySelectorAll('.collapsible-tab');
        const mobileContents = mobileSection.querySelectorAll('.collapsible-content');

        if (mobileTabs.length && mobileContents.length && mobileTabs.length === mobileContents.length) {

            mobileTabs.forEach((tab, index) => {
                const content = mobileContents[index];
                const iconImg = tab.querySelector('.tab-icon-img'); 

                // ARIA setup
                const contentId = content.id;
                if (!contentId) {
                    console.warn("Collapsible content needs an ID for ARIA.");
                } else {
                     tab.setAttribute('aria-controls', contentId);
                }
                 content.setAttribute('aria-hidden', 'true');
                 if(iconImg) iconImg.alt = "Раскрыть";

                tab.addEventListener('click', () => {
                    const isExpanded = tab.getAttribute('aria-expanded') === 'true';

                    // --- Close all other items ---
                    mobileTabs.forEach((otherTab, otherIndex) => {
                        if (otherTab !== tab) {
                            const otherContent = mobileContents[otherIndex];
                            const otherIconImg = otherTab.querySelector('.tab-icon-img');
                            otherTab.setAttribute('aria-expanded', 'false');
                            otherContent.classList.remove('active');
                            otherContent.setAttribute('aria-hidden', 'true');
                            if (otherIconImg) otherIconImg.alt = "Раскрыть";
                        }
                    });

                    // --- Toggle the clicked item ---
                    if (!isExpanded) {
                        // Open
                        tab.setAttribute('aria-expanded', 'true');
                        content.classList.add('active'); 
                        content.setAttribute('aria-hidden', 'false');
                        if (iconImg) iconImg.alt = "Свернуть";
                    } else {
                        // Close
                        tab.setAttribute('aria-expanded', 'false');
                        content.classList.remove('active'); 
                        content.setAttribute('aria-hidden', 'true');
                        if (iconImg) iconImg.alt = "Раскрыть";
                    }
                });
            });
        }
    }

}); // End DOMContentLoaded