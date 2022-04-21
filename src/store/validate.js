import { defineStore } from 'pinia';

export default defineStore('groupPath', {
  state: () => ({
    validateList: [],
    errorFlag: false
  }),
  actions: {
    updateValidateList (arr) {
      this.validateList = arr;
    },
    updateErrorFlag (boolean) {
      this.errorFlag = boolean;
    },
    resetVaild () {
      this.errorFlag = false;
      this.validateList = [];
    }
  }
});
