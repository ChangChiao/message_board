import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    user: {
      userName: 'joe'
    }
  }),
  actions: {
    updateUser (obj) {
      this.user = obj;
    }
  }
});
