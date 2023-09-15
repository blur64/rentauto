<template>
  <section class="request-section" id="request-section__id">
    <div class="container">
      <v-form />
    </div>
  </section>
</template>

<script>
import VForm from "./VForm.vue";

export default {
  components: { VForm },
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