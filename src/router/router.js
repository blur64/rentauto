import { reactive } from "vue";

const route = reactive({
  path: "",
});

const router = {
  push(path) {
    const pathName = location.pathname;
    history.pushState(
      null,
      "",
      pathName.substring(0, pathName.lastIndexOf("/")) + path
    );
    dispatchEvent(new Event("popstate"));
  },
};

import routerViewComponent from "@/router/RouterView.vue";

export default (app) => {
  app.config.globalProperties.$router = router;
  app.config.globalProperties.$route = route;
  app.component("router-view", routerViewComponent);
};
