/**
 * dataByTab — объект, где ключи соответствуют вкладкам (Kazakhstan, Europe, Asia, CIS, Saudi, Africa).
 * Внутри каждого ключа — объект, где ключи соответствуют названиям областей/стран,
 * а значение — массив объектов компаний (name, city, logo, description).
 */

const dataByTab = {
  /******************************************************
   * 1. Казахстан (пример, как раньше)
   ******************************************************/
  "Kazakhstan": {
    "Akmola": [
      {
        name: "Coca-Cola Kazakhstan",
        city: "Астана",
        logo: "images/coca-cola-logo.png",
        description: "Производство напитков и соков"
      },
      {
        name: "KazAgro",
        city: "Кокшетау",
        logo: "images/kazagro-logo.png",
        description: "Агропромышленный комплекс"
      }
    ],
    "Aktobe": [
      {
        name: "Aktobe Steel",
        city: "Актобе",
        logo: "images/aktobe-steel.png",
        description: "Металлургический завод"
      },
      {
        name: "OilService",
        city: "Актобе",
        logo: "images/oilservice-logo.png",
        description: "Сервис нефтедобычи"
      }
    ],
    "Almaty Region": [
      {
        name: "KazFruit",
        city: "Талдыкорган",
        logo: "images/kazfruit-logo.png",
        description: "Фруктовые сады и переработка"
      }
    ],
    "Almaty": [
      {
        name: "Bank RBK",
        city: "Алматы",
        logo: "images/bank-rbk.png",
        description: "Финансовые услуги"
      },
      {
        name: "TechCorp",
        city: "Алматы",
        logo: "images/techcorp.png",
        description: "Разработка ПО"
      }
    ]
    // ... добавьте другие регионы, например, Atyrau, Karaganda и т.д.
  },

  /******************************************************
   * 2. Европа
   ******************************************************/
  "Europe": {
    "France": [
      {
        name: "Paris Wine",
        city: "Париж",
        logo: "images/paris-wine.png",
        description: "Винодельческое производство"
      },
      {
        name: "Eiffel Tech",
        city: "Париж",
        logo: "images/eiffel-tech.png",
        description: "IT-интегратор"
      }
    ],
    "Germany": [
      {
        name: "Brewery Berlin",
        city: "Берлин",
        logo: "images/germany-brew.png",
        description: "Производство пива"
      },
      {
        name: "AutoMunich",
        city: "Мюнхен",
        logo: "images/auto-munich.png",
        description: "Автомобильный концерн"
      }
    ]
    // ... добавляйте страны (Italy, Spain и т.д.)
  },

  /******************************************************
   * 3. Азия
   ******************************************************/
  "Asia": {
    "Indonesia": [
      {
        name: "Jakarta Mills",
        city: "Джакарта",
        logo: "images/jakarta-mills.png",
        description: "Пищевая промышленность"
      },
      {
        name: "Bali Resorts",
        city: "Бали",
        logo: "images/bali-resort.png",
        description: "Туризм и отели"
      }
    ],
    "China": [
      {
        name: "Beijing Soda",
        city: "Пекин",
        logo: "images/beijing-soda.png",
        description: "Производство газировки"
      }
    ],
    "Japan": [
      {
        name: "Tokyo Robotics",
        city: "Токио",
        logo: "images/tokyo-robotics.png",
        description: "Инновации в робототехнике"
      }
    ]
    // ... добавьте другие страны Азии
  },

  /******************************************************
   * 4. СНГ
   ******************************************************/
  "CIS": {
    "Russia": [
      {
        name: "Moscow Plant",
        city: "Москва",
        logo: "images/moscow-plant.png",
        description: "Завод"
      }
    ]
    // ... добавьте другие страны СНГ
  },

  /******************************************************
   * 5. Саудовская Аравия
   ******************************************************/
  "Saudi": {
    "Riyadh": [
      {
        name: "Saudi Co",
        city: "Эр-Рияд",
        logo: "images/saudi-co.png",
        description: "Производство..."
      }
    ]
  },

  /******************************************************
   * 6. Африка
   ******************************************************/
  "Africa": {
    "Egypt": [
      {
        name: "Cairo Foods",
        city: "Каир",
        logo: "images/cairo-foods.png",
        description: "Пищевая промышленность"
      }
    ],
    "South Africa": [
      {
        name: "Cape Breweries",
        city: "Кейптаун",
        logo: "images/cape-breweries.png",
        description: "Пивоваренная промышленность"
      },
      {
        name: "Johannesburg Tech",
        city: "Йоханнесбург",
        logo: "images/johannesburg-tech.png",
        description: "Информационные технологии"
      }
    ],
    "Nigeria": [
      {
        name: "Lagos Innovations",
        city: "Лагос",
        logo: "images/lagos-innovations.png",
        description: "Стартапы и технологии"
      },
      {
        name: "Nigerian Oil Co.",
        city: "Абуджа",
        logo: "images/nigerian-oil.png",
        description: "Нефтяная промышленность"
      }
    ],
    "Kenya": [
      {
        name: "Nairobi Foods",
        city: "Найроби",
        logo: "images/nairobi-foods.png",
        description: "Пищевая промышленность"
      },
      {
        name: "Mombasa Shipping Co.",
        city: "Момбаса",
        logo: "images/mombasa-shipping.png",
        description: "Морские перевозки"
      }
    ],
    "Morocco": [
      {
        name: "Casablanca Fashion",
        city: "Касабланка",
        logo: "images/casablanca-fashion.png",
        description: "Текстиль и мода"
      },
      {
        name: "Rabat Tech",
        city: "Рабат",
        logo: "images/rabat-tech.png",
        description: "Инновационные технологии"
      }
    ]
    // ... добавьте другие страны Африки при необходимости
  }
};
