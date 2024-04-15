<template>
  <section class="gallery-section" id="gallery-section__id" v-if="cars.length">
    <base-modal
      v-if="fullSizeMiniImageSrc"
      @backgroundClicked="closeFullImage"
      @closeBtnClicked="closeFullImage"
    >
      <img
        :src="require(`@/assets/${fullSizeMiniImageSrc}`)"
        class="gallery__full-image"
      />
    </base-modal>
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
  </section>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseSlider from "../components/BaseSlider.vue";
import BaseModal from "../components/BaseModal.vue";
import { fetchCars, setCurrentCar } from "@/api.js";

export default {
  components: { BaseButton, BaseSlider, BaseModal },
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
    closeFullImage() {
      this.fullSizeMiniImageSrc = null;
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
  padding-bottom: 40px;
}

.gallery__car-info__wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  gap: 32px;
  max-height: 282px;
}

.gallery__car-info__main-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 242px;
  flex-basis: 300px;
  min-width: 160px;
}

.gallery__car-info__name {
  margin-bottom: 14px;
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
}

.gallery__car-info__characteristics__wrapper {
  flex-basis: 200px;
  min-width: 160px;
  max-height: 282px;
  overflow-y: auto;
}

.gallery__car-info__characteristics {
  list-style-type: initial;
  margin-left: 12px;
}

.gallery__car-info__mini-imgs {
  display: flex;
  justify-content: space-between;
  min-width: 640px;
  width: 640px;
  gap: 16px;
  height: 160px;
}

.gallery__car-info__mini-imgs__item {
  width: calc(100% / 3);
  border-radius: 8px;

  object-fit: cover;
}

.gallery__car-info__mini-imgs__item:hover {
  cursor: pointer;
}

/* GallerySection FullImage */

.gallery__full-image {
  display: block;
  max-width: 100%;
  object-fit: cover;
}

/* Media Rules */

@media (max-width: 1200px) {
  .gallery__car-info__mini-imgs {
    min-width: 494px;
    gap: 12px;
    height: 130px;
  }
}

@media (max-width: 1000px) {
  .gallery__car-info__wrapper {
    gap: 16px;
  }
  .gallery__car-info__mini-imgs {
    flex-wrap: wrap;
    height: initial;
    max-width: 332px;
    min-width: 332px;
  }
  .gallery__car-info__mini-imgs__item {
    flex-grow: 1;
    max-height: 115px;
  }
}

@media (max-width: 766px) {
  .gallery__car-info__mini-imgs {
    width: 332px;
    min-width: 232px;
  }
  .gallery__car-info__mini-imgs__item {
    min-height: 115px;
  }
  .gallery__car-selection-button {
    font-size: var(--fs-small);
  }
  .gallery__car-info__name {
    font-size: var(--fs-big);
  }
  .gallery__car-info__cost__wrapper {
    font-size: var(--fs-medium);
  }
  .gallery__car-info__main-info {
    flex-basis: 256px;
  }
}

@media (max-width: 666px) {
  .gallery__car-info__wrapper {
    max-height: none;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .gallery__car-info__main-info {
    height: auto;
  }
  .gallery__car-info__mini-imgs {
    width: auto;
    max-width: none;
    min-width: auto;
    flex-grow: 1;
    margin-top: 12px;
  }
  .gallery__car-info__characteristics__wrapper {
    height: 220px;
    flex-grow: 1;
  }
}

@media (max-width: 527px) {
  .gallery__car-info__wrapper {
    flex-wrap: nowrap;
    flex-direction: column;
    padding-top: 20px;
  }
  .gallery__car-info__main-info {
    flex-basis: initial;
  }
  .gallery__car-selection-button {
    width: 100%;
    margin-top: 24px;
  }
  .gallery__car-info__characteristics__wrapper {
    overflow-y: initial;
    height: auto;
    flex-basis: initial;
  }
}
</style>