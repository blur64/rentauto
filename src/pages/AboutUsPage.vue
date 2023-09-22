<template>
  <section class="advantages-section" id="advantages-section__id">
    <div class="container">
      <h2 class="title advantages__title">Хотите арендовать автомобиль?</h2>
      <div class="advantages__wrapper devided-childs-padding">
        <div class="advantages__item">
          <img
            class="advantages__item__image"
            src="@/assets/imgs/coin.png"
            alt=""
          />
          <h2 class="advantages__item__title">Арендуйте бесплатно</h2>
          <p class="advantages__item__text">
            Копите мили с помощью бонусной карты и арендуйте автомобили
            бесплатно! Предложение действительно для всех городов и стран, где
            есть наши станции проката. На карту клиента зачисляется не менее 10%
            от стоимости дневной аренды, а 1 миля равна 1 рублю.
          </p>
        </div>
        <div class="advantages__item">
          <img
            class="advantages__item__image"
            src="@/assets/imgs/steering_wheel.png"
            alt=""
          />
          <h2 class="advantages__item__title">Только новые</h2>
          <p class="advantages__item__text">
            Все машины, которые предлагает в аренду компания RentAuto — новые:
            не раньше 2015 года выпуска. Парк автомобилей постоянно обновляется,
            так как по специально разработанным стандартам машины нашей компании
            не должны эксплуатироваться более двух лет.
          </p>
        </div>
        <div class="advantages__item">
          <img
            class="advantages__item__image"
            src="@/assets/imgs/map.png"
            alt=""
          />
          <h2 class="advantages__item__title">Подача по городу</h2>
          <p class="advantages__item__text">
            Арендованный Вами автомобиль может быть подан в любую точку города,
            туда, где Вам будет удобно забрать его. Это может быть Ваш адрес,
            любая станция метро, вокзал или аэропорт. В аэропорт «Пулково» и на
            Московский вокзал автомобили подаются бесплатно.
          </p>
        </div>
        <div class="advantages__item">
          <img
            class="advantages__item__image"
            src="@/assets/imgs/wallet.png"
            alt=""
          />
          <h2 class="advantages__item__title">Гарантия низких цен</h2>
          <p class="advantages__item__text">
            Мы — первая компания-дискаунтер на рынке аренды автомобилей. У нас
            Вы всегда найдете интересующий Вас автомобиль любого класса по
            лучшей цене в своем регионе. Клиентам гарантированы низкие цены на
            аренду автомобилей в сочетании с их высоким качеством.
          </p>
        </div>
      </div>
      <div class="advantages__extra-advantages__wrapper devided-childs-margin">
        <div class="advantages__extra-advantages__item">
          <p class="advantages__extra-advantages__item__text">
            Бесплатная подача в аэропорт и на вокзал
          </p>
        </div>
        <div class="advantages__extra-advantages__item">
          <p class="advantages__extra-advantages__item__text">
            Зарядки для мобильных и навигаторы бесплатно по запросу
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* AdvantagesSection */

.advantages-section {
  padding-top: 36px;
}

.advantages__title {
  margin-bottom: 46px;
  text-align: center;
}

.advantages__wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.advantages__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 350px;
}

.advantages__item__image {
  align-self: center;
  max-width: 100px;
  margin-bottom: 34px;

  opacity: 0.75;
}

.advantages__item__title {
  margin-bottom: 22px;

  font-size: var(--fs-medium);
  font-weight: var(--w-medium);
}

.advantages__item__text {
  max-width: 278px;

  font-size: var(--fs-small);
  font-weight: var(--w-light);
}

/* AdvantagesSection ExtraAdvantages */

.advantages__extra-advantages__wrapper {
  display: flex;
  justify-content: space-between;
  margin: 32px 0;
}

.advantages__extra-advantages__item {
  width: 600px;
  min-height: 314px;
  padding: 32px;
  border-radius: 8px;
}

.advantages__extra-advantages__item__text {
  font-size: var(--fs-very-big);
  font-weight: var(--w-medium);
  color: var(--main-white);
}

.advantages__extra-advantages__item:first-child,
.advantages__extra-advantages__item:last-child {
  background-image: url("@/assets/imgs/advantage_1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.advantages__extra-advantages__item:last-child {
  background-image: url("@/assets/imgs/advantage_2.jpg");
}

/* Media Rules */

@media (max-width: 1200px) {
  .advantages__extra-advantages__item {
    width: 500px;
  }
}

@media (max-width: 800px) {
  .advantages__wrapper {
    flex-wrap: wrap;
    padding: 0 40px;
    justify-content: center;
  }

  .advantages__item:first-child,
  .advantages__item:nth-child(2) {
    margin-bottom: 40px;
  }

  .advantages__extra-advantages__wrapper {
    display: block;
  }

  .advantages__extra-advantages__item {
    width: auto;
    margin-bottom: 28px !important;
  }
}

@media (max-width: 550px) {
  .advantages__wrapper {
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
  }

  .advantages__item {
    align-items: center;
    margin-bottom: 40px;
  }

  .advantages__extra-advantages__wrapper {
    display: block;
    margin: 0;
  }

  .advantages__extra-advantages__item {
    width: auto;
  }
}
</style>