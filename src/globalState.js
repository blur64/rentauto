import { reactive } from 'vue';

const globalState = {
  _selectedCarName: '',

  set selectedCarName(newName) {
    this._selectedCarName = newName;
  },

  get selectedCarName() {
    return this._selectedCarName;
  }
};

export default reactive(globalState);