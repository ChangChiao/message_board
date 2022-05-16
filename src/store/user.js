import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => {
    return {
      user: {}
    };
  },
  persist: true,
  actions: {
    updateUser (obj) {
      this.user = obj;
    }
  }
});
