<template>
  <div class="gallery__slider__pre-wrapper">
    <div class="gallery__slider__wrapper">
      <base-button
        class="gallery__slider__button-left"
        @clicked="showPrevImg"
        :imgSrc="require('@/assets/imgs/left_arrow.svg')"
      />
      <div class="gallery__slider">
        <div
          class="gallery__slider__images__wrapper"
          :style="{ translate: `${currentPixelsShift}px 0` }"
          ref="slider"
        >
          <img
            v-for="(imgSrc, idx) of imgsSrcs"
            :key="idx"
            :src="imgSrc"
            class="gallery__slider__images__item"
          />
        </div>
      </div>
      <base-button
        class="gallery__slider__button-right"
        @clicked="showNextImg"
        :imgSrc="require('@/assets/imgs/right_arrow.svg')"
      />
    </div>
    <div class="gallery__slider__pagination__wrapper">
      <div class="gallery__slider__pagination">
        <div
          v-for="(_, idx) in imgsSrcs"
          :key="idx"
          :class="{
            colored: idx === currentImgIndex,
          }"
          @click="currentImgIndex = idx"
          class="gallery__slider__pagination__item"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  name: "BaseSlider",
  components: { BaseButton },
  emits: ["showingImgChanged"],
  props: {
    imgsSrcs: {
      type: Array,
      validator(value) {
        return value.every((v) => typeof v === "string");
      },
      default: () => [],
    },
  },
  data() {
    return {
      unitOfPixelsShift: 0,
      currentImgIndex: 0,
    };
  },
  computed: {
    currentPixelsShift() {
      return -(this.unitOfPixelsShift * this.currentImgIndex);
    },
  },
  methods: {
    showPrevImg() {
      const canDecreaseImgIndex = this.currentImgIndex - 1 >= 0;
      if (canDecreaseImgIndex) {
        this.currentImgIndex--;
      }
    },
    showNextImg() {
      const canIncreaseImgIndex =
        this.currentImgIndex + 1 < this.imgsSrcs.length;
      if (canIncreaseImgIndex) {
        this.currentImgIndex++;
      }
    },
    calculateUnitOfPixelsShift() {
      if (this.$refs.slider) {
        this.unitOfPixelsShift = this.$refs.slider.clientWidth;
      }
    },
  },
  watch: {
    currentImgIndex(newVal) {
      this.$emit("showingImgChanged", newVal);
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.calculateUnitOfPixelsShift);
      this.calculateUnitOfPixelsShift();
    });
  },
  beforeUnmounted() {
    window.removeEventListener("resize", this.calculateUnitOfPixelsShift);
  },
};
</script>

<style>
/* GallerySection Slider */

.gallery__slider__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery__slider {
  width: 980px;
  overflow: hidden;
}

.gallery__slider__images__wrapper {
  display: flex;
  align-items: center;
  max-height: 488px;
  transition: translate 1s;
}

.gallery__slider__images__item {
  max-width: 100%;
}

.gallery__slider__button-left,
.gallery__slider__button-right {
  min-width: 62px;
  min-height: 62px;
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

@media (max-width: 800px) {
  .gallery__slider__button-left,
  .gallery__slider__button-right {
    min-width: 52px;
    min-height: 52px;
  }

  .gallery__slider__button-left img,
  .gallery__slider__button-right img {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 550px) {
  .gallery__slider__button-left,
  .gallery__slider__button-right {
    min-width: 42px;
    min-height: 42px;
  }

  .gallery__slider__button-left img,
  .gallery__slider__button-right img {
    width: 18px;
    height: 18px;
  }
}
</style>