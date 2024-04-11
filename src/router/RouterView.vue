<template>
  <component :is="currentRoute.component"></component>
</template>

<script>
import PreviewPage from "@/pages/PreviewPage.vue";
import AboutUsPage from "@/pages/AboutUsPage.vue";
import CarSelectPage from "@/pages/CarSelectPage.vue";
import RequestPage from "@/pages/RequestPage.vue";

const routes = [
  { path: "/", component: "PreviewPage", isDarkMode: false },
  { path: "/car", component: "CarSelectPage", isDarkMode: true },
  { path: "/request", component: "RequestPage", isDarkMode: true },
  { path: "/about", component: "AboutUsPage", isDarkMode: false },
];

export default {
  components: {
    PreviewPage,
    AboutUsPage,
    CarSelectPage,
    RequestPage,
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
    currentPath(newVal) {
      this.$route.path = newVal;
    },
  },
};
</script>