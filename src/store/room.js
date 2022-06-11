import { defineStore } from 'pinia';
export default defineStore('room', {
  state: () => {
    return {
      room: []
    };
  },
  persist: true,
  actions: {
    updateRoom (arr) {
      this.room = arr;
    }
  }
});
