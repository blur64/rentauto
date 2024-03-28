<template>
  <form
    class="request__form"
    action="#"
    method="post"
    name="form"
    @submit.prevent="submitForm"
  >
    <h2 class="request__form__title">Оставить заявку на аренду авто</h2>

    <section class="request__form__section">
      <h3 class="request__form__section-title">Получение автомобиля</h3>
      <div class="request__form__controls">
        <div class="request__form__control-wrapper">
          <base-select :options="addresses" v-model="gettingAddress" />
        </div>
        <div class="request__form__control-wrapper">
          <base-input
            v-model="gettingDate"
            :min="getCurrentDateString()"
            :errorMessages="getErrorMessages('gettingDate')"
            :isValid="getValidity('gettingDate')"
            type="datetime-local"
          />
        </div>
      </div>
    </section>

    <section class="request__form__section">
      <h3 class="request__form__section-title">Возврат автомобиля</h3>
      <div class="request__form__controls">
        <div class="request__form__control-wrapper">
          <base-select :options="addresses" v-model="returningAddress" />
        </div>
        <div class="request__form__control-wrapper">
          <base-input
            v-model="returningDate"
            :errorMessages="getErrorMessages('returningDate')"
            :isValid="getValidity('returningDate')"
            :min="getCurrentDateString()"
            type="datetime-local"
          />
        </div>
      </div>
    </section>

    <section class="request__form__section">
      <h3 class="request__form__section-title">Автомобиль</h3>
      <div class="request__form__controls">
        <div class="request__form__control-wrapper">
          <base-select
            class="request__form__car-selection-section__input"
            v-model="carName"
            :options="carsNames"
          />
        </div>
        <!-- <div class="request__form__car-selection-section__total-cost__wrapper">
              <span class="request__form__car-selection-section__total-cost__text">Предварительная сумма:</span>
              <span class="request__form__car-selection-section__total-cost">12 500 руб.</span>
        </div> -->
      </div>
    </section>

    <section class="request__form__section">
      <h3 class="request__form__section-title">
        Укажите ваши контактные данные
      </h3>

      <div class="request__form__controls">
        <div class="request__form__control-wrapper">
          <base-input
            v-model="userName"
            :errorMessages="getErrorMessages('userName')"
            :isValid="getValidity('userName')"
            maxlength="20"
            placeholder="Имя..."
            class="request__form__personal-data-section__name-input"
            type="text"
          />
        </div>
        <div class="request__form__control-wrapper">
          <base-input
            v-model="userPhone"
            :errorMessages="getErrorMessages('userPhone')"
            :isValid="getValidity('userPhone')"
            maxlength="11"
            placeholder="Номер телефона..."
            class="request__form__personal-data-section__phone-input"
            type="tel"
          />
        </div>
        <base-button
          :disabled="!isFormValid"
          :title="'Отправить'"
          type="submit"
          class="request__form__request-button"
        />
      </div>
    </section>

    <p
      class="request__notification"
      :class="{
        'visible-mode': isFormSubmitted,
        'unvisible-mode': !isFormSubmitted,
      }"
    >
      Заявка успешно отправлена.
    </p>
  </form>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseButton from "@/components/BaseButton.vue";

import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { required, minLength, numeric } from "@vuelidate/validators";
import { onlyLetters, minDate } from "@/validators.js";

import {
  fetchCarsNames,
  fetchAddresses,
  getCurrentCar,
  setCurrentCar,
} from "@/api.js";

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
  },

  setup() {
    return {
      v$: useVuelidate({ $autoDirty: true, $lazy: true }),
    };
  },

  data() {
    return {
      gettingAddress: "",
      returningAddress: "",
      carName: "",
      userName: "",
      userPhone: "",
      gettingDate: "",
      returningDate: "",

      carsNames: [],
      addresses: [],
      isFormSubmitted: false,
    };
  },

  computed: {
    isFormValid() {
      return !this.v$.$invalid && this.v$.$dirty;
    },
  },

  validations() {
    return {
      userName: {
        required: helpers.withMessage("Введите имя", required),
        minLength: helpers.withMessage(
          ({ $params }) => `Минимальная длина поля ${$params.min}`,
          minLength(4)
        ),
        onlyLetters: helpers.withMessage(
          "Поле должно содержать только буквы",
          onlyLetters
        ),
      },

      userPhone: {
        required: helpers.withMessage("Введите номер телефона", required),
        numeric: helpers.withMessage(
          "Поле должно содержать только числа",
          numeric
        ),
        minLength: helpers.withMessage(
          ({ $params }) => `Минимальная длина поля ${$params.min}`,
          minLength(11)
        ),
      },

      gettingDate: {
        required: helpers.withMessage("Введите дату получения", required),
        minDate: helpers.withMessage(
          "Дата получения должна быть не раньше, чем сегодня",
          minDate(new Date())
        ),
      },

      returningDate: {
        required: helpers.withMessage("Введите дату возврата", required),
        minDate: helpers.withMessage(
          "Дата возврата должна быть не раньше, чем сегодня",
          minDate(new Date())
        ),
        moreThanGettingDate: helpers.withMessage(
          "Дата возврата должна быть не раньше, чем дата получения",
          minDate(new Date(this.gettingDate))
        ),
      },
    };
  },

  methods: {
    getErrorMessages(field) {
      return this.v$[field].$errors.map((error) => error.$message);
    },

    getValidity(field) {
      return !this.v$[field].$invalid;
    },

    getCurrentDateString() {
      const now = new Date();

      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      return `${year}-${this.formatNumberForDate(
        month
      )}-${this.formatNumberForDate(day)}T00:00`;
    },

    formatNumberForDate(value) {
      return value - 10 < 0 ? "0" + value : value;
    },

    submitForm() {
      this.v$.$validate().then((validationResult) => {
        if (validationResult) {
          this.isFormSubmitted = true;
        }
      });
    },
  },

  created() {
    fetchAddresses().then((addresses) => {
      this.addresses = addresses;
      this.gettingAddress = this.addresses[0];
      this.returningAddress = this.addresses[0];
    });

    fetchCarsNames().then((carsNames) => {
      this.carsNames = carsNames;
      this.carName = getCurrentCar() ?? this.carsNames[0];
    });
  },

  watch: {
    carName(newValue) {
      setCurrentCar(newValue);
    },
  },
};
</script>

<style>
.visible-mode {
  visibility: visible;
}

.unvisible-mode {
  visibility: hidden;
}

.request__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 700px;
}

.request__form__title {
  font-size: var(--fs-very-big);
  font-weight: var(--w-light);
}

.request__form__section-title {
  margin-bottom: 12px;

  font-size: var(--fs-medium);
  font-weight: var(--w-medium);
}

.request__form__car-selection-section__total-cost__text {
  font-size: var(--fs-medium);
  font-weight: var(--w-light);
}

.request__form__car-selection-section__total-cost {
  font-size: var(--fs-medium);
  font-weight: var(--w-bold);
}

.request__form__section {
  width: 828px;
}

.personal-data_form-section {
  margin-top: 112px;
}

.request__form__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.request__form__personal-data-section__name-input:hover,
.request__form__personal-data-section__phone-input:hover {
  cursor: initial;
}

.request__form__request-button:disabled:hover,
.request__form__request-button:disabled {
  cursor: default;
  opacity: 40%;
}

.request__form__control-wrapper {
  position: relative;
}

.request__notification {
  font-size: var(--fs-medium);
}

/* Media Rules */

@media (max-width: 800px) {
  .request-section {
    padding: 0;
  }

  .request__form {
    height: auto;
    align-items: flex-start;
  }

  .request__form__title {
    margin: 0 auto 40px auto;
  }

  .request__form__section {
    width: 600px;
    margin-bottom: 20px;
  }

  .request__form__controls {
    display: block;
  }

  .request__form__controls > div {
    margin-bottom: 20px;
  }

  .request__form__error-message {
    margin-top: 0;
    max-width: 400px;
    max-height: 78px;
    left: 284px;
    top: 0;

    color: var(--error);
    font-size: var(--fs-very-small);
  }
}

@media (max-width: 550px) {
  .request__form__title {
    text-align: center;
  }

  .request__form__error-message {
    position: initial;
    margin-top: 4px;
  }
}
</style>