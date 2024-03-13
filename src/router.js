const router = {
  pushPath(path) {
    const pathName = location.pathname;
    history.pushState(
      null,
      "",
      pathName.substring(0, pathName.lastIndexOf("/")) + path
    );
    dispatchEvent(new Event("popstate"));
  }
}

export default (app) =>
  app.config.globalProperties.$router = router;
