<template>
  <div class="main__wrapper">
    <the-header :currentPath="currentPath" />
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

import { routes } from "./api.js";

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
    };
  },

  computed: {
    currentRoute() {
      return routes.find((route) => route.path === this.currentPath);
    },

    isDarkMode() {
      return this.currentRoute?.isDarkMode;
    },
  },

  methods: {
    changeLocation() {
      const path = location.pathname;
      this.currentPath = path.substring(path.lastIndexOf("/"));
    },
  },

  created() {
    this.changeLocation();
    window.addEventListener("popstate", this.changeLocation);
  },

  watch: {
    isDarkMode() {
      document.documentElement.setAttribute(
        "data-theme",
        this.isDarkMode ? "dark" : "light"
      );
    },
  },
};
</script>

<style>
/* Project Variables */

:root {
  --border-secondary: rgba(38, 36, 36, 0.15);
  --background-primary: #fafafa;
  --background-primary-inverse: #262424;
  --text-primary: #262424;
  --text-primary-inverse: #fafafa;
  --secondary: #d0af38;
  --error: #da0000;
  --shadow: #262424;

  color-scheme: light;

  --fs-very-big: 32px;
  --fs-big: 24px;
  --fs-medium: 20px;
  --fs-small: 16px;
  --fs-very-small: 14px;

  --w-light: 300;
  --w-regular: 400;
  --w-medium: 500;
  --w-bold: 700;

  --logo-img-url: url("@/assets/imgs/logo.png");
}

[data-theme="dark"] {
  --border-secondary: rgba(250, 250, 250, 0.15);
  --background-primary: #262424;
  --background-primary-inverse: #fafafa;
  --text-primary: #fafafa;
  --text-primary-inverse: #262424;

  color-scheme: dark;

  --logo-img-url: url("@/assets/imgs/logo_white.png");
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
  background-color: var(--background-primary);
  color: var(--text-primary);
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
</style>