<template>
  <select
    class="form__select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    <!-- <select
    class="form__select"
    :class="{ 'form__select_dark-mode': !globalState.isDarkMode }"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  > -->
    <option v-for="(option, idx) of options" :key="idx" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
// import globalState from "../globalState.js";

export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    modelValue: {
      type: String,
      required: false,
    },
  },

  // data() {
  //   return {
  //     globalState,
  //   };
  // },
};
</script>

<style>
.form__select {
  padding: 14px 12px;

  border: none;
  border-radius: 8px;
  background-color: var(--main-white);
}

.form__select_dark-mode {
  outline: 1px solid var(--main-black);
}
</style>