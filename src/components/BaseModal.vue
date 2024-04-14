<template>
  <div class="modal__wrapper" @click="$emit('backgroundClicked')">
    <div class="modal__content-wrapper" @click.stop="">
      <slot></slot>
    </div>
    <base-button
      class="modal__close-btn"
      @click.stop="$emit('closeBtnClicked')"
      :imgSrc="require('@/assets/imgs/close.svg')"
    />
  </div>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  components: { BaseButton },
};
</script>

<style>
.modal__wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 500;
  top: 0;
  left: 0;
  background-color: var(--shadow);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content-wrapper {
  max-width: 80%;
}

.modal__close-btn {
  border: none;
  border-radius: 0;
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 16px;
}
</style>