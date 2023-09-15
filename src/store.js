const store = {
  car: {
    value: "",
    handlers: []
  }
};

function subscribeToUpdate(storeItem, callback) {
  store[storeItem].handlers.push(callback);
}

function updateStore(storeItemName, newStoreItemValue) {
  const storeItem = store[storeItemName];
  storeItem.value = newStoreItemValue;
  storeItem.handlers.forEach(handler => handler(storeItem.value));
}

export { subscribeToUpdate, updateStore };