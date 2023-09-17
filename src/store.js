// [] Think about another way for TheForm.vue to get carName from store.
// Maybe try localStorage to store carName in

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

function getItemFromStore(storeItemName) {
  return store[storeItemName].value;
}

export { updateStore, getItemFromStore, subscribeToUpdate };