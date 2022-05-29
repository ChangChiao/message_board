import { defineStore } from 'pinia';
import { getAPIData } from '../utils/api/ajax';
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
    },
    async getUser () {
      try {
        const result = await getAPIData('/users/profile');
        console.log('user', result.user);
        result.status === 'success' && (this.user = result.user);
      } catch (error) {
        console.log('error', error);
      }
    }
  }
});
