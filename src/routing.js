function pushPath(path) {
  history.pushState(null, document.title, path);
  dispatchEvent(new Event("popstate"));
}

export { pushPath };