<template>
  <section
    class="gallery-section"
    id="gallery-section__id"
    v-if="haveCarsLoaded"
  >
    <div v-if="fullSizeMiniImageSrc" class="gallery__shadow"></div>
    <div class="container">
      <div class="gallery__car-info__wrapper">
        <div class="gallery__car-info__main-info">
          <div>
            <h2 class="gallery__car-info__name">{{ currentCar.name }}</h2>
            <div>
              <div class="gallery__car-info__cost__wrapper">
                от
                <span class="gallery__car-info__cost">{{
                  currentCar.cost
                }}</span>
                руб.
              </div>
              <div class="gallery__car-info__pledge__wrapper">
                Залог
                <span class="gallery__car-info__pledge">{{
                  currentCar.pledge
                }}</span>
                руб.
              </div>
            </div>
          </div>
          <base-button
            @clicked="selectCar"
            :title="'Арендовать'"
            class="gallery__car-selection-button"
          />
        </div>
        <div class="gallery__car-info__characteristics__wrapper">
          <ul class="gallery__car-info__characteristics">
            <li
              v-for="(char, idx) of currentCar.characteristics"
              :key="idx"
              class="gallery__car-info__characteristics__item"
            >
              {{ char }}
            </li>
          </ul>
        </div>
        <div class="gallery__car-info__mini-imgs">
          <img
            v-for="(imgSrc, idx) of currentCar.miniImgsSrcs"
            :key="idx"
            :src="require(`@/assets/${imgSrc}`)"
            @click="fullSizeMiniImageSrc = imgSrc"
            class="gallery__car-info__mini-imgs__item"
          />
        </div>
      </div>
      <!-- gallery start -->
      <div class="gallery__slider__pre-wrapper">
        <div class="gallery__slider__wrapper">
          <base-button
            class="gallery__slider__button-left"
            @clicked="showPrevCar"
            :imgSrc="require('@/assets/imgs/left_arrow.svg')"
          />
          <!-- slider start -->
          <div class="gallery__slider">
            <div
              class="gallery__slider__images__wrapper"
              :style="{ translate: `${currentSliderShift}px 0` }"
              ref="slider"
            >
              <img
                v-for="(sliderImgSrc, idx) of sliderImgsSrcs"
                :key="idx"
                :src="require(`@/assets/${sliderImgSrc}`)"
                class="gallery__slider__images__item"
              />
            </div>
          </div>
          <!-- slider end -->
          <base-button
            class="gallery__slider__button-right"
            @clicked="showNextCar"
            :imgSrc="require('@/assets/imgs/right_arrow.svg')"
          />
        </div>
        <div class="gallery__slider__pagination__wrapper">
          <div class="gallery__slider__pagination">
            <div
              v-for="(_, idx) in cars"
              :key="idx"
              :class="{
                colored: idx === currentCarIndex,
                'dark-mode__for-items': true,
              }"
              @click="currentCarIndex = idx"
              class="gallery__slider__pagination__item"
            ></div>
          </div>
        </div>
      </div>
      <!-- gallery end -->
    </div>
    <div v-if="fullSizeMiniImageSrc" class="gallery__full-image__wrapper">
      <button class="button gallery__full-image__close-button">
        <img
          class="gallery__full-image__close-button__img"
          @click="fullSizeMiniImageSrc = null"
          src="@/assets/imgs/close.svg"
        />
      </button>
      <img
        :src="require(`@/assets/${fullSizeMiniImageSrc}`)"
        class="gallery__full-image"
      />
    </div>
  </section>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";

import { fetchCars } from "@/api.js";
import globalState from "../globalState.js";

export default {
  components: {
    BaseButton,
  },

  data() {
    return {
      haveCarsLoaded: false,

      cars: [],

      sliderImgsSrcs: [],
      fullSizeMiniImageSrc: null,

      currentCarIndex: 0,

      // shifts in pixels
      currentSliderShift: 0,
      oneSliderShift: 0,

      globalState,
    };
  },

  computed: {
    currentCar() {
      return this.cars[this.currentCarIndex];
    },
  },

  methods: {
    showNextCar() {
      const canIncreaseCarIndex = this.currentCarIndex + 1 < this.cars.length;

      if (canIncreaseCarIndex) {
        this.currentCarIndex++;
      }
    },

    showPrevCar() {
      const canDecreaseCarIndex = this.currentCarIndex - 1 >= 0;

      if (canDecreaseCarIndex) {
        this.currentCarIndex--;
      }
    },

    selectCar() {
      globalState.selectedCarName = this.currentCar.name;
      this.$router.pushPath("/request");
    },

    calculateOneSliderShift() {
      if (this.$refs.slider) {
        this.oneSliderShift = this.$refs.slider.clientWidth;
      }
    },
  },

  watch: {
    currentCarIndex(current, prev) {
      const shiftFactor = current - prev;
      this.currentSliderShift -= this.oneSliderShift * shiftFactor;
    },
  },

  mounted() {
    fetchCars().then((cars) => {
      this.cars = cars;
      this.sliderImgsSrcs = cars.map((car) => car.mainImgSrc);
      this.haveCarsLoaded = true;

      this.$nextTick(() => {
        window.addEventListener("resize", this.calculateOneSliderShift);
        this.calculateOneSliderShift();
      });
    });
  },

  beforeUnmounted() {
    window.removeEventListener("resize", this.calculateOneSliderShift);
  },
};
</script>

<style>
/* GallerySection */

.gallery-section {
  position: relative;
  padding-bottom: 80px;
}

.gallery__car-info__wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
}

.gallery__car-info__main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 242px;
}

.gallery__car-info__name {
  margin-bottom: 14px;
  width: 300px;

  font-size: var(--fs-very-big);
  font-weight: var(--w-bold);
  letter-spacing: 1px;
}

.gallery__car-info__cost__wrapper {
  font-size: var(--fs-big);
  font-weight: var(--w-medium);
}

.gallery__car-info__pledge__wrapper {
  margin-top: 5px;
}

.gallery__car-info__pledge__wrapper,
.gallery__car-info__characteristics__item {
  font-size: var(--fs-very-small);
  font-weight: var(--w-light);
}

.gallery__car-info__characteristics__item {
  margin-bottom: 4px;
  width: 200px;
}

.gallery__car-info__characteristics {
  list-style-type: initial;
}

.gallery__car-info__mini-imgs {
  display: flex;
  justify-content: space-between;
  width: 640px;
  height: 160px;
}

.gallery__car-info__mini-imgs__item {
  width: 200px;
  border-radius: 8px;

  object-fit: cover;
}

.gallery__car-info__mini-imgs__item:hover {
  cursor: pointer;
}

/* GallerySection FullImage */

.gallery__full-image__wrapper {
  position: fixed;
  width: 1200px;
  left: 0;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  margin: 0 auto;

  z-index: 2;
}

.gallery__full-image {
  display: block;
  max-width: 1200px;
  max-height: 700px;
  margin: 0 auto;

  object-fit: cover;
}

.gallery__full-image__close-button {
  position: absolute;
  left: 1210px;
  top: -60px;
  border: none !important;

  background: transparent;
}

.gallery__full-image__close-button__img {
  height: 50px;
}

.gallery__shadow {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 2;
  top: 0;
  left: 0;

  background-color: var(--main-black);
  opacity: 90%;
}

/* GallerySection Slider */

.gallery__slider__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery__slider {
  width: 980px;
  height: 488px;
  overflow: hidden;
}

.gallery__slider__images__wrapper {
  display: flex;
  align-items: center;
  height: 488px;
  transition: translate 1s;
}

.gallery__slider__images__item {
  width: 980px;
}

.gallery__slider__button-left,
.gallery__slider__button-right {
  width: 62px;
  height: 62px;
}

/* GallerySection Slider Pagination */

.gallery__slider__pagination__wrapper {
  text-align: center;
}

.gallery__slider__pagination {
  display: inline-flex;
}

.gallery__slider__pagination__item {
  width: 11px;
  height: 11px;
  border-radius: 100%;
  margin: 0 8px;

  background-color: var(--background-primary-inverse);
  opacity: 60%;
}

.gallery__slider__pagination__item:hover {
  cursor: pointer;
  opacity: 80%;
}

.colored {
  background-color: var(--secondary) !important;
  opacity: 100%;
}

/* Media Rules */

@media (max-width: 1200px) {
  .gallery__car-info__mini-imgs__item {
    width: 160px;
    height: 130px;
  }

  .gallery__slider {
    width: 880px;
    height: 500px;
  }

  .gallery__slider__images__item {
    width: 880px;
  }

  .gallery__full-image {
    max-width: 900px;
    max-height: 600px;
  }

  .gallery__full-image__wrapper {
    width: 900px;
  }

  .gallery__full-image__close-button {
    left: 930px;
  }
}

@media (max-width: 800px) {
  .gallery__slider {
    width: 600px;
    height: 380px;
  }

  .gallery__slider__images__item {
    width: 600px;
  }

  .gallery__slider__button-left,
  .gallery__slider__button-right {
    width: 52px;
    height: 52px;
    margin-bottom: 190px;
  }

  .gallery__slider__button-left img,
  .gallery__slider__button-right img {
    width: 22px;
    height: 22px;
  }

  .gallery__car-selection-button {
    font-size: var(--fs-small);
  }

  .gallery__car-info__name {
    font-size: var(--fs-big);
    width: 200px;
  }

  .gallery__car-info__cost__wrapper {
    font-size: var(--fs-medium);
  }

  .gallery__car-info__mini-imgs {
    flex-direction: column;
    width: auto;
    height: auto;
  }

  .gallery__car-info__mini-imgs__item {
    margin-bottom: 8px;
    width: 200px;
    height: 110px;
  }

  .gallery__car-info__main-info {
    height: 200px;
  }

  .gallery__full-image {
    max-width: 600px;
    max-height: 400px;
  }

  .gallery__full-image__wrapper {
    width: 600px;
  }

  .gallery__full-image__close-button {
    left: 620px;
    top: -60px;
  }
}

@media (max-width: 550px) {
  .gallery-section {
    padding-bottom: 180px;
  }

  .gallery__slider {
    width: 300px;
    height: 0;
  }

  .gallery__slider__images__wrapper {
    display: none;
  }

  .gallery__car-info__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .gallery__car-info__main-info {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  .gallery__car-info__characteristics__wrapper {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .gallery__car-info__mini-imgs {
    flex-direction: row;
    margin-top: 100px;
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }

  .gallery__car-info__mini-imgs__item {
    margin: 0;
    width: 156px;
  }

  .gallery__slider__button-left,
  .gallery__slider__button-right {
    margin: 0;
    z-index: 1;
  }

  .gallery__slider__pre-wrapper {
    position: relative;
    margin-top: 28px;
  }

  .gallery__slider__pagination__wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translate(0, -50%);
  }

  .gallery__full-image {
    max-width: 494px;
    max-height: 370px;
  }

  .gallery__full-image__wrapper {
    width: 494px;
  }

  .gallery__full-image__close-button {
    left: 444px;
    top: -60px;
  }
}
</style>