<template>
  <section class="request-section" id="request-section__id">
    <div class="container">
      <the-form />
    </div>
  </section>
</template>

<script>
import TheForm from "../components/TheForm.vue";

export default {
  components: { TheForm },
};
</script>

<style>
/* RequestSection */

.request-section {
  padding-top: 36px;

  background-color: var(--main-black);
  color: var(--main-white);
}
</style>