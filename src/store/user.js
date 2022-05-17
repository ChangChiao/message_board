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
        const { userName, avatar, gender } = result.user;
        console.log('user', result.user);
        this.user.userName = userName;
        this.user.avatar = avatar;
        this.user.gender = gender;
      } catch (error) {
        console.log('error', error);
      }
    }
  }
});
