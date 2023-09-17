const router = {
  pushPath(path) {
    history.pushState(null, document.title, path);
    dispatchEvent(new Event("popstate"));
  }
}

export default (app) =>
  app.config.globalProperties.$router = router;
