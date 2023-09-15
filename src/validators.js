import { helpers } from "@vuelidate/validators";

const onlyLetters = helpers.regex(/^[a-zA-Zа-яА-Яё ]+$/);

function minDate(minDateParam) {
  return helpers.withParams(
    { type: "minDate", value: minDateParam },
    (value) => !helpers.req(value) || minDateParam < new Date(value)
  );
}

export { onlyLetters, minDate };