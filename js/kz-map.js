/////////////////////////////
//  ЛОГИКА ВКЛАДОК (ТАБЫ)  //
/////////////////////////////

// По умолчанию выбрана вкладка "Kazakhstan"
window.currentTab = "Kazakhstan";

// Находим все кнопки табов
const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Удаляем "active" у всех вкладок
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Прячем все блоки .geo-content
    document.querySelectorAll(".geo-content").forEach(gc => gc.classList.remove("active-geo-content"));

    // Показываем нужный блок
    const selectedTab = tab.getAttribute("data-tab"); // "Kazakhstan", "Europe", "Asia"...
    const targetContent = document.querySelector(`.geo-content[data-tab-content="${selectedTab}"]`);
    if (targetContent) {
      targetContent.classList.add("active-geo-content");
    }

    // Запоминаем текущую вкладку
    window.currentTab = selectedTab;
  });
});

// Кнопка «Сбросить выделение» - Ищет ВСЕ кнопки с этим классом (и desktop и mobile)
// Обработчик сработает на той, которая видима и на которую кликнули
const resetBtns = document.querySelectorAll(".reset-selection-btn");
resetBtns.forEach(resetBtn => {
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            console.log("Reset selection on all maps");
            // Снимаем выделение (класс .selected) со ВСЕХ карт
            d3.selectAll(".kz-region, .eu-region, .asia-region, .cis-region, .saudi-region, .africa-region")
                .classed("selected", false);

            // Очищаем ВСЕ списки компаний
            renderCompaniesList("projectsListKazakhstan", []);
            renderCompaniesList("projectsListEurope", []);
            renderCompaniesList("projectsListAsia", []);
            renderCompaniesList("projectsListCIS", []);
            renderCompaniesList("projectsListSaudi", []);
            renderCompaniesList("projectsListAfrica", []);
        });
    }
});


///////////////////////////////////////////
//  ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ТУЛТИПОВ //
///////////////////////////////////////////

/**
 * Показывает и наполняет тултип контентом.
 * @param {d3.Selection} tooltipSelection - Выборка D3 для элемента тултипа.
 * @param {string} htmlContent - HTML для вставки в тултип.
 */
function showTooltip(tooltipSelection, htmlContent) {
    if (!tooltipSelection.node()) return; // Проверка на существование тултипа
    tooltipSelection.html(htmlContent).style("display", "block");
}

/**
 * Скрывает тултип.
 * @param {d3.Selection} tooltipSelection - Выборка D3 для элемента тултипа.
 */
function hideTooltip(tooltipSelection) {
    if (!tooltipSelection.node()) return;
    tooltipSelection.style("display", "none");
}

/**
 * Позиционирует тултип относительно курсора, стараясь остаться в границах SVG.
 * @param {d3.Selection} tooltipSelection - Выборка D3 для элемента тултипа.
 * @param {Event} event - Событие мыши (mousemove).
 * @param {SVGSVGElement} svgNode - DOM-узел SVG-элемента карты.
 */
function positionTooltip(tooltipSelection, event, svgNode) {
    const tooltipNode = tooltipSelection.node();
    if (!tooltipNode || !svgNode) return;

    const [mx, my] = d3.pointer(event, svgNode); // Координаты мыши внутри SVG

    // Получаем размеры SVG и тултипа ПОСЛЕ установки контента
    const svgRect = svgNode.getBoundingClientRect(); // Размеры SVG на экране
    const tooltipWidth = tooltipNode.offsetWidth;
    const tooltipHeight = tooltipNode.offsetHeight;

    // Базовые смещения
    const offsetX = 15;
    const offsetY = 15;

    // Рассчитываем позицию
    let finalLeft = mx + offsetX;
    let finalTop = my + offsetY; // По умолчанию - справа-снизу от курсора

    // Корректировка по горизонтали: если уходит за правую границу SVG
    // Используем clientWidth SVG, т.к. getBoundingClientRect может включать padding/border контейнера
     if (finalLeft + tooltipWidth > svgNode.clientWidth) {
        finalLeft = mx - tooltipWidth - offsetX; // Перемещаем влево от курсора
    }
    // Предотвращаем уход за левую границу
    if (finalLeft < 0) {
        finalLeft = offsetX;
    }

    // Корректировка по вертикали: если уходит за нижнюю границу SVG
     if (finalTop + tooltipHeight > svgNode.clientHeight) {
        finalTop = my - tooltipHeight - offsetY; // Перемещаем вверх от курсора
    }
    // Предотвращаем уход за верхнюю границу
     if (finalTop < 0) {
        finalTop = offsetY;
    }

    tooltipSelection
        .style("left", finalLeft + "px")
        .style("top", finalTop + "px");
}


/**
 * Создает HTML-разметку для тултипа карты.
 * @param {string} regionName Название региона/страны.
 * @param {Array|null} companies Массив объектов компаний или null/undefined, если показывать только название.
 * @returns {string} HTML-строка для innerHTML тултипа.
 */
function createTooltipHtml(regionName, companies) {
  let html = `<h4>${regionName || 'Регион'}</h4>`;
  // Показываем список компаний только если companies передан и не пуст
  if (companies && companies.length > 0) {
    html += '<ul>';
    companies.forEach(company => {
      const name = company.name || 'Компания';
      const city = company.city ? ` (${company.city})` : '';
      html += `<li><strong>${name}</strong>${city}</li>`;
    });
    html += '</ul>';
  } else if (companies) { // Если companies был передан, но пуст
    html += '<p class="no-companies">Данные по компаниям отсутствуют.</p>';
  }
  // Если companies не был передан (null/undefined), показываем только заголовок <h4>
  return html;
}


/********************************************
 * A) КАРТА КАЗАХСТАНА
 ********************************************/

const widthKZ = 900;
const heightKZ = 600;

const svgKZ = d3.select("#kzMap")
  .attr("viewBox", `0 0 ${widthKZ} ${heightKZ}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipKZ = d3.select("#kz-map-tooltip");

const projectionKZ = d3.geoMercator()
  .center([66.9237, 48.0196])
  .scale(1200)
  .translate([widthKZ / 2, heightKZ / 2]);

const pathKZ = d3.geoPath().projection(projectionKZ);

d3.json("kz.json").then((geoData) => {
  svgKZ.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "kz-region")
    .attr("d", pathKZ)
    .on("mouseenter", (event, d) => {
      const targetElement = event.currentTarget;
      const isSelected = d3.select(targetElement).classed("selected");
      const regionName = d.properties.name;
      let tooltipHtml;
      if (isSelected) {
        const tabKey = "Kazakhstan";
        const companies = dataByTab[tabKey]?.[regionName] || [];
        tooltipHtml = createTooltipHtml(regionName, companies);
      } else {
        tooltipHtml = createTooltipHtml(regionName, null);
      }
      showTooltip(tooltipKZ, tooltipHtml);
    })
    .on("mousemove", (event) => {
      const svgNode = svgKZ.node();
      positionTooltip(tooltipKZ, event, svgNode);
    })
    .on("mouseleave", () => {
      hideTooltip(tooltipKZ);
    })
    .on("click", (event, d) => {
      svgKZ.selectAll(".kz-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Kazakhstan"]?.[regionName] || [];
      renderCompaniesList("projectsListKazakhstan", regionCompanies);
      // Опционально: Обновляем тултип, чтобы он сразу показал детали
      // const tooltipHtml = createTooltipHtml(regionName, regionCompanies);
      // showTooltip(tooltipKZ, tooltipHtml);
      // // Понадобится немного скорректировать positionTooltip или вызвать mousemove
      // positionTooltip(tooltipKZ, event, svgKZ.node()); // Попробуем спозиционировать по клику
    });
})
.catch(err => console.error("Ошибка загрузки kz.json:", err));


/////////////////////////////
// 2) КАРТА ЕВРОПЫ
/////////////////////////////

const widthEU = 700;
const heightEU = 600;

const svgEU = d3.select("#euMap")
  .attr("viewBox", `0 0 ${widthEU} ${heightEU}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipEU = d3.select("#eu-map-tooltip");

const projectionEU = d3.geoMercator()
  .center([10, 50])
  .scale(400)
  .translate([widthEU / 2, heightEU / 2]);

const pathEU = d3.geoPath().projection(projectionEU);

d3.json("Europe.json").then(geoData => {
  svgEU.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "eu-region")
    .attr("d", pathEU)
    .on("mouseenter", (event, d) => {
       const targetElement = event.currentTarget;
       const isSelected = d3.select(targetElement).classed("selected");
       const regionName = d.properties.name;
       let tooltipHtml;
       if (isSelected) {
           const tabKey = "Europe";
           const companies = dataByTab[tabKey]?.[regionName] || [];
           tooltipHtml = createTooltipHtml(regionName, companies);
       } else {
           tooltipHtml = createTooltipHtml(regionName, null);
       }
       showTooltip(tooltipEU, tooltipHtml);
    })
    .on("mousemove", (event) => {
      const svgNode = svgEU.node();
      positionTooltip(tooltipEU, event, svgNode);
    })
    .on("mouseleave", () => {
       hideTooltip(tooltipEU);
    })
    .on("click", (event, d) => {
      svgEU.selectAll(".eu-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Europe"]?.[regionName] || [];
      renderCompaniesList("projectsListEurope", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки Europe.json:", err));

/////////////////////////////
// 3) КАРТА АЗИИ
/////////////////////////////

const widthAS = 700;
const heightAS = 600;

const svgAS = d3.select("#asiaMap")
  .attr("viewBox", `0 0 ${widthAS} ${heightAS}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipAS = d3.select("#asia-map-tooltip");

const projectionAS = d3.geoMercator()
  .center([100, 40])
  .scale(250)
  .translate([widthAS / 2, heightAS / 2]);

const pathAS = d3.geoPath().projection(projectionAS);

d3.json("Asia.json").then(geoData => {
  svgAS.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "asia-region")
    .attr("d", pathAS)
     .on("mouseenter", (event, d) => {
       const targetElement = event.currentTarget;
       const isSelected = d3.select(targetElement).classed("selected");
       const regionName = d.properties.name;
       let tooltipHtml;
       if (isSelected) {
           const tabKey = "Asia";
           const companies = dataByTab[tabKey]?.[regionName] || [];
           tooltipHtml = createTooltipHtml(regionName, companies);
       } else {
           tooltipHtml = createTooltipHtml(regionName, null);
       }
       showTooltip(tooltipAS, tooltipHtml);
    })
    .on("mousemove", (event) => {
      const svgNode = svgAS.node();
      positionTooltip(tooltipAS, event, svgNode);
    })
    .on("mouseleave", () => {
      hideTooltip(tooltipAS);
    })
    .on("click", (event, d) => {
      svgAS.selectAll(".asia-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Asia"]?.[regionName] || [];
      renderCompaniesList("projectsListAsia", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки Asia.json:", err));


/////////////////////////////
// 4) КАРТА АФРИКИ
/////////////////////////////

const widthAF = 700;
const heightAF = 500;

const svgAF = d3.select("#africaMap")
  .attr("viewBox", `0 0 ${widthAF} ${heightAF}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipAF = d3.select("#africa-map-tooltip");

const projectionAF = d3.geoMercator()
  .center([20, 0])
  .scale(350)
  .translate([widthAF / 2, heightAF / 2]);

const pathAF = d3.geoPath().projection(projectionAF);

d3.json("Africa.json").then((geoData) => {
  svgAF.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "africa-region")
    .attr("d", pathAF)
    .on("mouseenter", (event, d) => {
      const targetElement = event.currentTarget;
      const isSelected = d3.select(targetElement).classed("selected");
      const regionName = d.properties.name;
      let tooltipHtml;
      if (isSelected) {
          const tabKey = "Africa";
          const companies = dataByTab[tabKey]?.[regionName] || [];
          tooltipHtml = createTooltipHtml(regionName, companies);
      } else {
          tooltipHtml = createTooltipHtml(regionName, null);
      }
      showTooltip(tooltipAF, tooltipHtml);
    })
    .on("mousemove", (event) => {
      const svgNode = svgAF.node();
      positionTooltip(tooltipAF, event, svgNode);
    })
    .on("mouseleave", () => {
      hideTooltip(tooltipAF);
    })
    .on("click", (event, d) => {
      svgAF.selectAll(".africa-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Africa"]?.[regionName] || [];
      renderCompaniesList("projectsListAfrica", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки Africa.json:", err));


/////////////////////////////
// 5) КАРТА СНГ
/////////////////////////////

const widthCIS = 750;
const heightCIS = 600;

const svgCIS = d3.select("#cisMap")
  .attr("viewBox", `0 0 ${widthCIS} ${heightCIS}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipCIS = d3.select("#cis-map-tooltip");

const projectionCIS = d3.geoMercator()
  .center([90, 60])
  .scale(280)
  .translate([widthCIS / 2, heightCIS / 2]);

const pathCIS = d3.geoPath().projection(projectionCIS);

d3.json("CIS.json").then(geoData => {
  svgCIS.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "cis-region")
    .attr("d", pathCIS)
    .on("mouseenter", (event, d) => {
      const targetElement = event.currentTarget;
      const isSelected = d3.select(targetElement).classed("selected");
      const regionName = d.properties.name;
      let tooltipHtml;
      if (isSelected) {
          const tabKey = "CIS";
          const companies = dataByTab[tabKey]?.[regionName] || [];
          tooltipHtml = createTooltipHtml(regionName, companies);
      } else {
          tooltipHtml = createTooltipHtml(regionName, null);
      }
      showTooltip(tooltipCIS, tooltipHtml);
    })
    .on("mousemove", (event) => {
      const svgNode = svgCIS.node();
      positionTooltip(tooltipCIS, event, svgNode);
    })
    .on("mouseleave", () => {
      hideTooltip(tooltipCIS);
    })
    .on("click", (event, d) => {
      svgCIS.selectAll(".cis-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["CIS"]?.[regionName] || [];
      renderCompaniesList("projectsListCIS", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки CIS.json:", err));


/////////////////////////////
// 6) КАРТА САУДОВСКОЙ АРАВИИ
/////////////////////////////

const widthSA = 700;
const heightSA = 500;

const svgSA = d3.select("#saudiMap")
    .attr("viewBox", `0 0 ${widthSA} ${heightSA}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

const tooltipSA = d3.select("#saudi-map-tooltip");

const projectionSA = d3.geoMercator()
    .center([45, 25])
    .scale(1300)
    .translate([widthSA / 2, heightSA / 2]);

const pathSA = d3.geoPath().projection(projectionSA);

d3.json("sa.json").then(function(geoData) {
    svgSA.selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", pathSA)
        .attr("class", "saudi-region")
        .on("mouseenter", function(event, d) {
            const targetElement = event.currentTarget;
            const isSelected = d3.select(targetElement).classed("selected");
            const regionName = d.properties.name;
            let tooltipHtml;
            if (isSelected) {
                const tabKey = "Saudi";
                const companies = dataByTab[tabKey]?.[regionName] || [];
                tooltipHtml = createTooltipHtml(regionName, companies);
            } else {
                tooltipHtml = createTooltipHtml(regionName, null);
            }
            showTooltip(tooltipSA, tooltipHtml);
        })
        .on("mousemove", function(event) {
           const svgNode = svgSA.node();
           positionTooltip(tooltipSA, event, svgNode);
        })
        .on("mouseleave", function() {
            hideTooltip(tooltipSA);
        })
        .on("click", function(event, d) {
            svgSA.selectAll(".saudi-region").classed("selected", false);
            d3.select(this).classed("selected", true);
            const regionName = d.properties.name;
            const regionCompanies = dataByTab["Saudi"]?.[regionName] || [];
            renderCompaniesList("projectsListSaudi", regionCompanies);
        });
}).catch(function(error) {
    console.error("Ошибка загрузки GeoJSON данных для Сауд. Аравии:", error);
});


/////////////////////////////
//  ФУНКЦИЯ ВЫВОДА КОМПАНИЙ
/////////////////////////////

/**
 * Выводит список компаний в div#containerId
 * @param {string} containerId - ID блока, например "projectsListKazakhstan"
 * @param {Array} companiesArr - массив объектов {name, city, logo, image, description}
 */
function renderCompaniesList(containerId, companiesArr) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Элемент с ID "${containerId}" не найден.`);
    return;
  }

  container.innerHTML = ""; // Очищаем контейнер

  if (!companiesArr || companiesArr.length === 0) {
    // Возвращаем плейсхолдер по умолчанию или специфичный для списка
    let placeholderText = "Нет данных по выбранному региону";
    if (containerId === 'projectsListKazakhstan') placeholderText = "Нажмите на регион карты Казахстана, чтобы увидеть компании";
    else if (containerId === 'projectsListEurope') placeholderText = "Нажмите на страну в Европе, чтобы увидеть проекты";
    else if (containerId === 'projectsListAsia') placeholderText = "Нажмите на страну в Азии, чтобы увидеть проекты";
    else if (containerId === 'projectsListCIS') placeholderText = "Нажмите на страну СНГ, чтобы увидеть проекты";
    else if (containerId === 'projectsListSaudi') placeholderText = "Нажмите на регион Саудовской Аравии, чтобы увидеть проекты";
    else if (containerId === 'projectsListAfrica') placeholderText = "Нажмите на страну в Африке, чтобы увидеть проекты";

    container.innerHTML = `<p>${placeholderText}</p>`;
    return;
  }

  // Генерируем карточки
  companiesArr.forEach((company) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "project-card-image";
    const imageSrc = company.image || 'img/img.svg'; // Используем company.image или заглушку
    const altText = company.name ? `Фото для ${company.name}` : 'Фото компании';
    imgWrap.innerHTML = `<img src="${imageSrc}" alt="${altText}">`;
    card.appendChild(imgWrap);

    const infoWrap = document.createElement("div");
    infoWrap.className = "project-card-info";
    const logoSrc = company.logo || 'img/default-logo.svg'; // Используем company.logo или заглушку
    const logoAlt = company.name ? `Логотип ${company.name}` : 'Логотип компании';
    const companyName = company.name ? `«${company.name}»` : 'Название компании';
    const cityText = company.city || 'Город не указан';
    const descriptionText = company.description ? `, ${company.description}` : "";

    infoWrap.innerHTML = `
      <img src="${logoSrc}" alt="${logoAlt}" class="project-logo"/>
      <h3>${companyName}</h3>
      <p>${cityText}${descriptionText}</p>
    `;
    card.appendChild(infoWrap);

    container.appendChild(card);
  });
}

/////////////////////////////
//  SWIPER (Если используется)
/////////////////////////////
// Инициализация если Swiper доступен
if (typeof Swiper !== 'undefined') {
    try {
        const swiper = new Swiper('.swiper', { // Убедитесь, что есть элемент с классом .swiper в HTML
            slidesPerView: 'auto',
            spaceBetween: 60,
            loop: true,
            speed: 8000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
        });
    } catch (e) {
        console.error("Ошибка инициализации Swiper:", e);
    }
} else {
    console.warn("Библиотека Swiper не найдена. Слайдер логотипов не будет инициализирован.");
}