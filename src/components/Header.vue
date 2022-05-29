<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
const useStore = useUserStore();
const { user } = storeToRefs(useStore);
const router = useRouter();
const isMenuShow = ref(false);
const signOut = () => {
  localStorage.setItem('token', '');
  router.push('/login');
};
console.log('name', user.value.name);
</script>
<template>
  <header class="bg-white border-b-2 p-4 relative">
    <div class="md:w-[869px] mx-auto flex justify-between items-center">
      <router-link class="text-[26px] block font-logo" to="/"
        >MetaWall</router-link
      >
      <div
        class="flex items-center relative p-2"
        @mouseover="() => (isMenuShow = true)"
        @mouseleave="() => (isMenuShow = false)"
      >
        <img class="avatar w-[30px] h-[30px]" :src="user.avatar" alt="" />
        <span class="text-bold font-logo pl-2">{{ user.name }}</span>
        <div
          v-show="isMenuShow"
          class="absolute right-0 top-12 z-10 grid w-[180px] border-2 border-black text-center"
        >
          <router-link :to="`/${11}`" class="bg-white py-2 hover:bg-secondary"
            >我的貼文牆</router-link
          >
          <router-link
            to="/userInfo"
            class="border-t-2 border-b-2 border-black bg-white py-2 hover:bg-secondary"
            >修改個人資料</router-link
          >
          <button
            type="button"
            class="bg-white py-2 hover:bg-secondary"
            @click="signOut"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
