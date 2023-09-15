<template>
  <select
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="form__select"
  >
    <option v-for="(option, idx) of options" :key="idx" :value="option">
      {{ option }}
    </option>
  </select>
</template>

<script>
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
};
</script>

<style>
.form__select {
  padding: 14px 12px;

  border: none;
  border-radius: 8px;
  background-color: var(--main-white);
}
</style>