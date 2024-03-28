<template>
  <select
    class="form__select"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
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
  background-color: var(--background-primary-inverse);
  color: var(--text-primary-inverse);
}
</style>