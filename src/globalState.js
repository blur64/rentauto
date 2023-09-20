import { reactive } from 'vue';

const globalState = {
  _isDarkMode: false,
  _selectedCarName: '',

  toggleDarkMode() {
    this._isDarkMode = !this.isDarkMode;
  },

  get isDarkMode() {
    return this._isDarkMode;
  },

  set selectedCarName(newName) {
    // if (typeof(newName) !== 'string' || ) {
    //   throw new Error('incorrect newName');
    // }
    this._selectedCarName = newName;
  },

  get selectedCarName() {
    return this._selectedCarName;
  }
};

export default reactive(globalState);