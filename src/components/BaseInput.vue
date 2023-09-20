<template>
  <div>
    <input
      class="form__input"
      v-bind="$attrs"
      :value="modelValue"
      :class="{
        'request__form__error-input': !isValid,
        'form__input_dark-mode': !globalState.isDarkMode,
      }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <ol v-if="errorMessages.length" class="request__form__error-message">
      <li v-for="(errorMessage, idx) of errorMessages" :key="idx">
        {{ errorMessage }}
      </li>
    </ol>
  </div>
</template>

<script>
import globalState from "@/globalState.js";

export default {
  props: {
    isValid: {
      type: Boolean,
      required: false,
      default: true,
    },
    errorMessages: {
      type: Array,
      required: false,
      default: () => [],
    },
    modelValue: {
      type: [String, Date],
      required: false,
    },
  },

  data() {
    return {
      globalState,
    };
  },
};
</script>

<style>
.form__input {
  padding: 14px 12px;

  border: none;
  border-radius: 8px;
  background-color: var(--main-white);
}

.form__input_dark-mode,
.form__input_dark-mode:focus {
  outline: 1px solid var(--main-black);
}

.request__form__error-input {
  outline: 2px solid var(--error);
}

.request__form__error-input.request__form__error-input:focus {
  outline: 2px solid var(--error);
}

.request__form__error-message {
  position: absolute;
  margin-top: 4px;
  max-width: 203px;
  max-height: 78px;
  overflow-y: auto;
  color: var(--error);
  font-size: var(--fs-very-small);
}

.form__input_dark-mode {
}
</style>