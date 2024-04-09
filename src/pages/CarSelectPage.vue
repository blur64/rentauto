<template>
  <section class="gallery-section" id="gallery-section__id" v-if="cars.length">
    <div v-if="fullSizeMiniImageSrc" class="gallery__shadow"></div>
    <div class="container">
      <div class="gallery__car-info__wrapper">
        <div class="gallery__car-info__main-info">
          <div>
            <h2 class="gallery__car-info__name">{{ currentCar.name }}</h2>
            <div>
              <div class="gallery__car-info__cost__wrapper">
                от
                <span class="gallery__car-info__cost">
                  {{ currentCar.cost }}
                </span>
                руб.
              </div>
              <div class="gallery__car-info__pledge__wrapper">
                Залог
                <span class="gallery__car-info__pledge">
                  {{ currentCar.pledge }}
                </span>
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
      <base-slider
        :imgsSrcs="sliderImgsSrcs"
        @showingImgChanged="setCurrentCarIndex"
      />
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
import BaseSlider from "../components/BaseSlider.vue";
import { fetchCars, setCurrentCar } from "@/api.js";

export default {
  components: { BaseButton, BaseSlider },
  data() {
    return {
      cars: [],
      sliderImgsSrcs: [],
      fullSizeMiniImageSrc: null,
      currentCarIndex: 0,
    };
  },
  computed: {
    currentCar() {
      return this.cars[this.currentCarIndex];
    },
  },
  methods: {
    selectCar() {
      setCurrentCar(this.currentCar.name);
      this.$router.push("/request");
    },
    setCurrentCarIndex(index) {
      this.currentCarIndex = index;
    },
  },
  mounted() {
    fetchCars().then((cars) => {
      this.cars = cars;
      this.sliderImgsSrcs = cars.map((car) =>
        require(`@/assets/${car.mainImgSrc}`)
      );
    });
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

  background-color: var(--shadow);
  opacity: 90%;
}

/* Media Rules */

@media (max-width: 1200px) {
  .gallery__car-info__mini-imgs__item {
    width: 160px;
    height: 130px;
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