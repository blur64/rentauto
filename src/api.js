const carsData = [
  {
    name: "Mazda RX 8",
    cost: 10000,
    pledge: 20000,
    mainImgSrc: "imgs/cars/mazda_rx_8/main.png",
    characteristics: [
      "2 места",
      "коробка автомат",
      "6.1 л/100 км",
      "Биксеноновые фары",
      "подогрев сидений",
      "обогрев зеркал",
      "датчик света",
    ],
    miniImgsSrcs: [
      "imgs/cars/mazda_rx_8/1.jpg",
      "imgs/cars/mazda_rx_8/2.jpg",
      "imgs/cars/mazda_rx_8/3.jpg",
    ],
  },

  {
    name: "Mercedes Benz E300",
    cost: 15000,
    pledge: 23000,
    mainImgSrc: "imgs/cars/mercedes_benz_e300/main.png",
    characteristics: [
      "mercedes_benz_e300",
      "2 места",
      "коробка автомат коробка автомат коробка",
      "6.1 л/100 км",
      "Биксеноновые фары",
      "подогрев сидений",
      "обогрев зеркал",
      "датчик света",
      "датчик света",
      "датчик света",
      "датчик света",
      "датчик света",
      "датчик света",
      "датчик света",
    ],
    miniImgsSrcs: [
      "imgs/cars/mercedes_benz_e300/1.jpg",
      "imgs/cars/mercedes_benz_e300/2.jpg",
      "imgs/cars/mercedes_benz_e300/3.jpg",
    ],
  },

  {
    name: "BMW X5",
    cost: 12000,
    pledge: 21000,
    mainImgSrc: "imgs/cars/bmw_x5/main.png",
    characteristics: [
      "bmw_x5",
      "2 места",
      "коробка автомат",
      "6.1 л/100 км",
      "Биксеноновые фары",
      "подогрев сидений",
      "обогрев зеркал",
      "датчик света",
    ],
    miniImgsSrcs: [
      "imgs/cars/bmw_x5/1.jpg",
      "imgs/cars/bmw_x5/2.jpg",
      "imgs/cars/bmw_x5/3.jpg",
    ],
  },
];

const formData = {
  addresses: [
    "Наш офис: г. Санкт-Петербург, московский проспект дом 27б",
    "Удобный вам аэропорт",
    "Удобный вам вокзал",
    "Любой удобный вам адрес",
    "Удобная вам станция метро",
  ],
};

const navigationData = [
  { path: "/", title: "Главная" },
  { path: "/car", title: "Автомобили" },
  { path: "/request", title: "Форма заявки" },
  { path: "/about", title: "О нас" },
];

function fetchCars() {
  return Promise.resolve(carsData)
    .then(result => result);
}

function fetchAddresses() {
  return Promise.resolve(formData.addresses)
    .then(result => result);
}

function fetchCarsNames() {
  return Promise.resolve(carsData
    .map(carData => carData.name))
    .then(result => result);
}

const CURRENT_CAR_LOCAL_STORAGE_KEY = "rentauto-car";

function setCurrentCar(carName) {
  localStorage.setItem(CURRENT_CAR_LOCAL_STORAGE_KEY, carName);
}

function getCurrentCar() {
  return localStorage.getItem(CURRENT_CAR_LOCAL_STORAGE_KEY);
}

export {
  fetchCars,
  fetchAddresses,
  fetchCarsNames,
  navigationData,
  setCurrentCar,
  getCurrentCar
};