<template>
  <button
    class="button"
    :disabled="isDisabled"
    v-bind="$attrs"
    @click="$emit('clicked')"
  >
    <a v-if="title">{{ title }}</a>
    <img v-if="imgSrc" :src="imgSrc" />
  </button>
</template>

<script>
export default {
  emits: {
    clicked: null,
  },

  props: {
    title: {
      type: String,
      required: false,
    },
    imgSrc: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style>
.button {
  border: 1px solid;
  border-color: inherit;
  border-radius: 1000px;

  background-color: transparent;
  color: inherit;

  font-size: var(--fs-medium);
  font-weight: var(--w-regular);
}

.button a {
  display: block;
  padding: 14px 20px;
}

.button:hover {
  cursor: pointer;
  opacity: 0.5;
}
</style>