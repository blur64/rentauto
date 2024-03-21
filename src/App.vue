<template>
  <div class="main__wrapper" :data-theme="isDarkMode ? 'dark' : 'light'">
    <!-- <div
    class="main__wrapper"
    :class="{ 'dark-mode__for-layout': globalState.isDarkMode }"
  > -->
    <the-header :navigationData="navigationData" :currentPath="currentPath" />
    <main class="main">
      <component :is="currentRoute.component"></component>
    </main>
  </div>
</template>

<script>
import PreviewPage from "@/pages/PreviewPage.vue";
import AboutUsPage from "@/pages/AboutUsPage.vue";
import CarSelectPage from "@/pages/CarSelectPage.vue";
import RequestPage from "@/pages/RequestPage.vue";
import TheHeader from "@/components/TheHeader.vue";

import { fetchRoutes } from "./api";
import globalState from "./globalState.js";

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
      // darkModePaths: [],
      // backgroundColors: {},
      navigationData: [],

      globalState,
    };
  },

  computed: {
    currentRoute() {
      return this.routes.find((route) => route.path === this.currentPath);
    },

    // isDarkModeOn() {
    //   return this.darkModePaths.includes(this.currentPath);
    // },
    isDarkMode() {
      return this.currentRoute.isDarkMode;
    },
  },

  methods: {
    changeLocation() {
      const path = location.pathname;
      this.currentPath = path.substring(path.lastIndexOf("/"));
    },
  },

  created() {
    this.routes = fetchRoutes();
    this.navigationData = this.routes.map((r) => ({
      path: r.path,
      title: r.title,
    }));
    // this.backgroundColors = fetchColors();

    // this.darkModePaths = this.routes
    //   .filter((r) => r.isDarkMode)
    //   .map((r) => r.path);

    this.changeLocation();
    window.addEventListener("popstate", this.changeLocation);
  },

  watch: {
    // isDarkModeOn() {
    //   globalState.toggleDarkMode();
    // },
  },
};
</script>

<style>
/* Project Variables */

/* :root {
  --main-white: #fafafa;
  --main-black: #262424;
  --main-black-light: rgba(38, 36, 36, 0.15);
  --main-white-light: rgba(250, 250, 250, 0.15);
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
} */

:root {
  --border-secondary: rgba(38, 36, 36, 0.15);

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

[data-theme="dark"] {
  --border-secondary: rgba(250, 250, 250, 0.15);
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

.main__wrapper {
  min-height: 100vh;
}

.devided-childs-padding > * {
  padding: 0 8px 0 8px;
}

.devided-childs-padding:first-child {
  padding-left: 0;
}

.devided-childs-padding:last-child {
  padding-right: 0;
}

.devided-childs-margin > * {
  margin: 0 8px 0 8px;
}

.devided-childs-margin:first-child {
  margin-left: 0;
}

.devided-childs-margin:last-child {
  margin-right: 0;
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

/* Dark mode */

/* .dark-mode__for-layout {
  background-color: var(--main-black);
  color: var(--main-white);
}

.dark-mode__for-items,
.dark-mode__for-items::after,
.dark-mode__for-items::before {
  background-color: var(--main-white);
} */
</style>