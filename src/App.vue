<template>
  <div class="main__wrapper">
    <the-header :navigationData="navigationData" :currentPath="currentPath" />
    <component :is="currentRoute.component"></component>
  </div>
</template>

<script>
// checked: App.vue, AboutUsPage.vue, VPreview.vue, TheHeader.vue,
// main.js, VInput.vue, VSelect.vue, CarSelectPage.vue, api.js,

// prepared:

// [x] rename components following best vue practices
// [x] add routing.js as a plugin to Vue or find out another way
// to not call pushPath method in pushPath method
// [x] think about moving isDarkMode flag to store
// [] check correctness of BEM using
// [] think about class names in template
// [x] think about fetch requests in api (maybe it will be better to
// delete all data requests because this data is very small and it
// just can be loaded together with .js files)
// [x] think about moving of fetchCarsNames function to App.vue
// ? [] Add dark theme switcher feature

// [x] move routes from data() attribute to api.js
// [x] add to every routes item isDarkMode property
// [x] change logic with darkMode using the isDarkMode property
// [x] delete currentMainComponent, add currentRoute computed
// instead, in :is use currentRoute.component
// [x] resolve how to not pass :isDarkMode prop to Header.vue component
// [x] add changeLocation method
// [x] make sure location.pathname is safe to use

import PreviewPage from "@/pages/PreviewPage.vue";
import AboutUsPage from "@/pages/AboutUsPage.vue";
import CarSelectPage from "@/pages/CarSelectPage.vue";
import RequestPage from "@/pages/RequestPage.vue";
import TheHeader from "@/components/TheHeader.vue";

import { fetchRoutes, fetchColors } from "./api";
import { isDarkModeGlobal } from "./reactiveStore.js";

export default {
  components: {
    PreviewPage,
    AboutUsPage,
    CarSelectPage,
    RequestPage,
    TheHeader,
  },

  data() {
    return {
      currentPath: "",
      routes: [],
      darkModePaths: [],
      backgroundColors: {},
      navigationData: [],
      isDarkModeGlobal,
    };
  },

  computed: {
    currentRoute() {
      return this.routes.find((route) => route.path === this.currentPath);
    },

    isDarkMode() {
      return this.darkModePaths.includes(this.currentPath);
    },
  },

  methods: {
    changeLocation() {
      this.currentPath = location.pathname;
    },
  },

  created() {
    this.routes = fetchRoutes();
    this.navigationData = this.routes.map((r) => ({
      path: r.path,
      title: r.title,
    }));
    this.backgroundColors = fetchColors();

    this.darkModePaths = this.routes
      .filter((r) => r.isDarkMode)
      .map((r) => r.path);

    this.changeLocation();

    window.addEventListener("popstate", this.changeLocation);
  },

  watch: {
    isDarkMode(newValue) {
      if (newValue === true) {
        document.body.style.backgroundColor = this.backgroundColors.darkMode;
        isDarkModeGlobal.state = true;
      } else {
        document.body.style.backgroundColor = this.backgroundColors.default;
        isDarkModeGlobal.state = false;
      }
    },
  },
};
</script>

<style>
/* Project Variables */

:root {
  --main-white: #fafafa;
  --main-black: #262424;
  --secondary: #d0af38;
  --error: #da0000;

  --fs-very-big: 32px;
  --fs-big: 24px;
  --fs-medium: 20px;
  --fs-small: 16px;
  --fs-very-small: 14px;

  --w-light: 300;
  --w-regular: 400;
  --w-medium: 500;
  --w-bold: 700;
}

/* Project Fonts */

@font-face {
  font-family: "Inter";
  src: local("Inter"), url("@/assets/fonts/ttf/Inter-Light.ttf") format("ttf"),
    url("@/assets/fonts/woff/Inter-Light.woff") format("woff");
  font-weight: 300;
}

@font-face {
  font-family: "Inter";
  src: local("Inter"), url("@/assets/fonts/ttf/Inter-Regular.ttf") format("ttf"),
    url("@/assets/fonts/woff/Inter-Regular.woff") format("woff");
  font-weight: 400;
}

@font-face {
  font-family: "Inter";
  src: local("Inter"), url("@/assets/fonts/ttf/Inter-Medium.ttf") format("ttf"),
    url("@/assets/fonts/woff/Inter-Medium.woff") format("woff");
  font-weight: 500;
}

@font-face {
  font-family: "Inter";
  src: local("Inter"), url("@/assets/fonts/ttf/Inter-Bold.ttf") format("ttf"),
    url("@/assets/fonts/woff/Inter-Bold.woff") format("woff");
  font-weight: 700;
}

/* Basic Rules */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}

a {
  text-decoration: none;
  /* color: var(--main-black); */
}

input:focus,
input:active,
input:focus-visible {
  outline: none;
}

select:hover {
  cursor: pointer;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
  background-color: var(--main-white);
  color: var(--main-black);
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
}

/* Basic Media Rules */

@media (max-width: 800px) {
  .container {
    padding: 0 40px;
    overflow: hidden;
  }
}

@media (max-width: 550px) {
  .container {
    padding: 0 28px;
  }

  input,
  select {
    padding: 8px 8px;
    max-width: 494px;
  }
}

/* Visible Class */

.visible {
  display: block;
}

/* Title */

.title {
  font-size: var(--fs-very-big);
  font-weight: var(--w-regular);
}

/* Button */

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