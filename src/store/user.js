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
        const { name, avatar, gender, _id } = result.user;
        console.log('user', result.user);
        this.user.name = name;
        this.user.avatar = avatar;
        this.user.gender = gender;
        this.user._id = _id;
      } catch (error) {
        console.log('error', error);
      }
    }
  }
});
