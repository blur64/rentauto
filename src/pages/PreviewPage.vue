<template>
  <section class="preview-section" id="preview-section__id">
    <div class="container">
      <div class="preview__wrapper">
        <div class="preview__data">
          <h1 class="title preview__title">
            Аренда автомобилей в Санкт-Петербурге
          </h1>
          <ul class="preview__advantages">
            <li class="preview__advantages__item">
              Поддержка пользователей больше чем на 20 языках
            </li>
            <li class="preview__advantages__item">
              Бесплатное аннулирование большинства заказов
            </li>
            <li class="preview__advantages__item">
              Больше 10 пунктов проката в Санкт-Петербурге
            </li>
            <li class="preview__advantages__item">Гибкие условия аренды</li>
            <li class="preview__advantages__item">Гарантия лучшей цены</li>
          </ul>
          <div class="contacts">
            <div class="contacts__address">
              Наш офис:
              <span class="contacts__address__text"
                >г. Санкт-Петербург, московский проспект дом 27б</span
              >
            </div>
            <div>
              <span class="contacts__phone__text">+7 (999) 228 14 88</span>
              <span class="contacts__phone__secondary-text">Круглосуточно</span>
            </div>
          </div>
          <button class="button" @click="$router.pushPath('/car')">
            <a>Выбрать автомобиль</a>
          </button>
        </div>
        <div class="preview__img-wrapper"></div>
      </div>
    </div>
  </section>
</template>

<style>
/* PreviewSection */

.preview-section {
  color: var(--main-black);
}

.preview__wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 24px;
}

.preview__data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 638px;
  margin: 78px 0;
  max-width: 448px;
  position: relative;
}

.preview__img-wrapper {
  width: 843px;
  height: 720px;
  position: absolute;
  top: 32px;
  right: -80px;

  background-image: url("@/assets/imgs/preview_img.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.preview__title {
  font-size: var(--fs-very-big);
  font-weight: var(--w-regular);
  letter-spacing: 1px;
  margin: 0;
}

.preview__advantages {
  margin-bottom: 56px;

  font-size: var(--fs-small);
  font-weight: var(--w-light);
}

.preview__advantages__item {
  margin-top: 12px;
}

.preview__advantages__item::before {
  content: url("@/assets/imgs/check.svg");

  margin-right: 11px;
}

/* PreviewSection Contacts */

.contacts {
  margin-bottom: 64px;
}

.contacts__address {
  margin-bottom: 20px;

  font-size: var(--fs-small);
  font-weight: var(--w-light);
}

.contacts__address__text {
  font-weight: var(--w-medium);
}

.contacts__phone__text {
  font-size: var(--fs-small);
  font-weight: var(--w-medium);
}

.contacts__phone__secondary-text {
  display: block;

  font-size: var(--fs-very-small);
  font-weight: var(--w-light);
}

/* Media Rules */

@media (max-width: 1200px) {
  .preview__img-wrapper {
    width: 640px;
    height: 545px;
    top: 102px;
    right: -80px;
  }
}

@media (max-width: 800px) {
  .preview__img-wrapper {
    width: 640px;
    height: 545px;
    top: 102px;
    right: -392px;
  }
}

@media (max-width: 550px) {
  .preview__img-wrapper {
    display: none;
  }

  .preview__data {
    margin: 32px auto;
    min-height: 616px;
  }

  .preview__data > button {
    margin: 0 auto;
  }

  .preview__title {
    text-align: center;
  }
}
</style>