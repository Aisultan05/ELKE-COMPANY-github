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

// Кнопка «Сбросить выделение»
const resetBtn = document.querySelector(".reset-selection-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    console.log("Reset selection on all maps");
    // Снимаем выделение (класс .selected) со всех карт (Казахстан, Европа, Азия)
    d3.selectAll(".kz-region").classed("selected", false);
    d3.selectAll(".eu-region").classed("selected", false);
    d3.selectAll(".asia-region").classed("selected", false);

    // Очищаем списки компаний
    renderCompaniesList("projectsListKazakhstan", []);
    renderCompaniesList("projectsListEurope", []);
    renderCompaniesList("projectsListAsia", []);
  });
}

/********************************************
 * A) КАРТА КАЗАХСТАНА (Без изменений)
 ********************************************/

// Если у вас уже есть код для Казахстана — оставляйте его.
// Ниже примерный шаблон (он может совпадать с тем,
// что у вас сейчас в проекте).

const widthKZ = 900;
const heightKZ = 600;

// То же самое имя <svg id="kzMap">, та же проекция
const svgKZ = d3.select("#kzMap")
  .attr("width", widthKZ)
  .attr("height", heightKZ);

const tooltipKZ = d3.select("#kz-map-tooltip");

const projectionKZ = d3.geoMercator()
  .center([66.9237, 48.0196]) // Центр Казахстана (не трогаем)
  .scale(1200)
  .translate([widthKZ / 2, heightKZ / 2]);

const pathKZ = d3.geoPath().projection(projectionKZ);

// Загружаем "kz.json"
d3.json("kz.json").then((geoData) => {
  // Рисуем пути, как было
  svgKZ.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "kz-region")
    .attr("d", pathKZ)
    .on("mouseover", (event, d) => {
      tooltipKZ
        .style("display", "block")
        .html(d.properties.name);
    })
    .on("mousemove", (event) => {
      tooltipKZ
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", () => {
      tooltipKZ.style("display", "none");
    })
    .on("click", (event, d) => {
      // Выделяем регион, показываем компании
      svgKZ.selectAll(".kz-region").classed("selected", false);
      d3.select(event.currentTarget).classed("selected", true);

      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Kazakhstan"]?.[regionName] || [];
      renderCompaniesList("projectsListKazakhstan", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки kz.json:", err));




/////////////////////////////
// 2) КАРТА ЕВРОПЫ
/////////////////////////////

const widthEU = 700, heightEU = 600;
const svgEU = d3.select("#euMap")
  .attr("width", widthEU)
  .attr("height", heightEU);

const tooltipEU = d3.select("#eu-map-tooltip");

// Можно подобрать подходящий .center / .scale для Европы
// Либо использовать fitSize, но для примера оставим geoMercator
const projectionEU = d3.geoMercator()
  .center([10, 50])    // примерно центр Европы
  .scale(400)          // подбирайте опытно
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
      tooltipEU
        .style("display", "block")
        .html(d.properties.name);
    })
    .on("mousemove", (event) => {
      tooltipEU
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseleave", () => {
      tooltipEU.style("display", "none");
    })
    .on("click", (event, d) => {
      // Снимаем выделение
      svgEU.selectAll(".eu-region").classed("selected", false);
      // Кликнутый регион выделяем
      d3.select(event.currentTarget).classed("selected", true);

      const regionName = d.properties.name; // "France", "Germany", etc.
      const regionCompanies = dataByTab["Europe"]?.[regionName] || [];
      renderCompaniesList("projectsListEurope", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки Europe.json:", err));


/////////////////////////////
// 3) КАРТА АЗИИ
/////////////////////////////

const widthAS = 900, heightAS = 600;
const svgAS = d3.select("#asiaMap")
  .attr("width", widthAS)
  .attr("height", heightAS);

const tooltipAS = d3.select("#asia-map-tooltip");

// Параметры для Азии
const projectionAS = d3.geoMercator()
  .center([100, 40])  // примерно центр Азии
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
      tooltipAS
        .style("display", "block")
        .html(d.properties.name);
    })
    .on("mousemove", (event) => {
      tooltipAS
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseleave", () => {
      tooltipAS.style("display", "none");
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

const widthAF = 700, heightAF = 500;
const svgAF = d3.select("#africaMap")
  .attr("width", widthAF)
  .attr("height", heightAF);

const tooltipAF = d3.select("#africa-map-tooltip");

// Настройте проекцию для Африки
const projectionAF = d3.geoMercator()
  .center([20, 0])  
  .scale(350)       
  .translate([widthAF / 2, heightAF / 2]);

const pathAF = d3.geoPath().projection(projectionAF);

// Загружаем GeoJSON для Африки
d3.json("Africa.json").then((geoData) => {
  svgAF.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "africa-region")
    .attr("d", pathAF)
    .on("mouseenter", (event, d) => {
      tooltipAF
        .style("display", "block")
        .html(d.properties.name);
    })
    .on("mousemove", (event) => {
      tooltipAF
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseleave", () => {
      tooltipAF.style("display", "none");
    })
    .on("click", (event, d) => {
      // Снимаем выделение со всех регионов карты Африки
      svgAF.selectAll(".africa-region").classed("selected", false);
      // Выделяем кликнутый регион
      d3.select(event.currentTarget).classed("selected", true);

      // Получаем название региона и список компаний
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["Africa"]?.[regionName] || [];
      renderCompaniesList("projectsListAfrica", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки Africa.json:", err));

/////////////////////////////
// 5) КАРТА СНГ
/////////////////////////////

// Задаём размеры для карты СНГ
const widthCIS = 750, heightCIS = 600;

// Выбираем контейнер для карты с id "cisMap"
const svgCIS = d3.select("#cisMap")
  .attr("width", widthCIS)
  .attr("height", heightCIS);

// Выбираем элемент тултипа для СНГ
const tooltipCIS = d3.select("#cis-map-tooltip");

// Настраиваем проекцию для карты СНГ
const projectionCIS = d3.geoMercator()
  .center([100, 60])   // Настройте центр проекции в зависимости от ваших данных (здесь примерно центральная часть СНГ)
  .scale(200)          // Масштаб можно подбирать экспериментально для оптимального отображения
  .translate([widthCIS / 2, heightCIS / 2]);

const pathCIS = d3.geoPath().projection(projectionCIS);

// Загружаем GeoJSON для СНГ (убедитесь, что файл CIS.json доступен и корректен)
d3.json("CIS.json").then(geoData => {
  svgCIS.selectAll("path")
    .data(geoData.features)
    .enter()
    .append("path")
    .attr("class", "cis-region")
    .attr("d", pathCIS)
    .on("mouseenter", (event, d) => {
      tooltipCIS
        .style("display", "block")
        .html(d.properties.name);
    })
    .on("mousemove", (event) => {
      tooltipCIS
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseleave", () => {
      tooltipCIS.style("display", "none");
    })
    .on("click", (event, d) => {
      // Снимаем выделение со всех регионов СНГ
      svgCIS.selectAll(".cis-region").classed("selected", false);
      // Выделяем кликнутый регион
      d3.select(event.currentTarget).classed("selected", true);

      // Получаем название выбранного региона и формируем список компаний
      const regionName = d.properties.name;
      const regionCompanies = dataByTab["CIS"]?.[regionName] || [];
      renderCompaniesList("projectsListCIS", regionCompanies);
    });
})
.catch(err => console.error("Ошибка загрузки CIS.json:", err));


// Новый JS-код для отображения карты на основе структуры GeoJSON

// Задаём размеры SVG контейнера
const widthMap = 700;
const heightMap = 500;

// Создаем SVG-контейнер для карты, предполагается, что в HTML есть элемент с id "saudiMap"
const svg = d3.select("#saudiMap")
    .attr("width", widthMap)
    .attr("height", heightMap);

// Создаем элемент tooltip для отображения названия региона, предполагается существование элемента с id "saudi-map-tooltip"
const tooltip = d3.select("#saudi-map-tooltip");

// Настройка проекции с использованием d3.geoMercator
const projection = d3.geoMercator()
    .center([45, 25]) // Центр карты; подберите значения под ваши данные
    .scale(1300)       // Масштаб отображения; подбирается экспериментально
    .translate([widthMap / 2, heightMap / 2]);

// Создаем генератор путей
const path = d3.geoPath().projection(projection);

// Загружаем GeoJSON данные (файл "Saudi.json" должен содержать вашу структуру данных)
d3.json("sa.json").then(function(geoData) {
    // geoData должно быть объектом с типом "FeatureCollection"
    svg.selectAll("path")
        .data(geoData.features)
        .enter()
        .append("path")
        .attr("d", path)  // Генерация атрибута "d" для каждого пути на основе геометрии
        .attr("class", "saudi-region")
        .on("mouseover", function(event, d) {
            // При наведении отображаем tooltip с названием региона (свойство name из d.properties)
            tooltip.style("display", "block")
                   .html(d.properties.name);
        })
        .on("mousemove", function(event) {
            // Обновляем позицию tooltip относительно курсора
            tooltip.style("left", (event.pageX + 10) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function() {
            // Скрываем tooltip, когда курсор покидает область пути
            tooltip.style("display", "none");
        })
        .on("click", function(event, d) {
            // При клике: снимаем выделение со всех регионов и выделяем текущий
            svg.selectAll(".saudi-region").classed("selected", false);
            d3.select(this).classed("selected", true);
            
            // Пример: получение списка компаний по выбранному региону из dataByTab и вызов функции renderCompaniesList
            const regionName = d.properties.name;
            const regionCompanies = dataByTab["Saudi"]?.[regionName] || [];
            renderCompaniesList("projectsListSaudi", regionCompanies);
        });
}).catch(function(error) {
    console.error("Ошибка загрузки GeoJSON данных:", error);
});


/////////////////////////////
//  ФУНКЦИЯ ВЫВОДА КОМПАНИЙ
/////////////////////////////

/**
 * Выводит список компаний в div#containerId
 * @param {string} containerId - ID блока, например "projectsListKazakhstan"
 * @param {Array} companiesArr - массив объектов {name, city, logo, description}
 */
function renderCompaniesList(containerId, companiesArr) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Очищаем
  container.innerHTML = "";

  if (!companiesArr || companiesArr.length === 0) {
    container.innerHTML = "<p>Нет данных по выбранному региону</p>";
    return;
  }

  // Генерируем карточки (упрощённый вариант)
  companiesArr.forEach((company) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "project-card-image";
    imgWrap.innerHTML = `<img src="img/img.svg" alt="${company.name}">`;
    card.appendChild(imgWrap);

    const infoWrap = document.createElement("div");
    infoWrap.className = "project-card-info";
    infoWrap.innerHTML = `
      <img src="${company.logo}" alt="${company.name}" class="project-logo"/>
      <h3>«${company.name}»</h3>
      <p>${company.city}${company.description ? (", " + company.description) : ""}</p>
    `;
    card.appendChild(infoWrap);

    container.appendChild(card);
  });
}
