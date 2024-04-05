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