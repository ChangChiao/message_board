<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store';
const useStore = useUserStore();
const {
  user
} = storeToRefs(useStore);
console.log('userName', user.value.userName);
</script>
<template>
  <header class="bg-white border-b-2 p-4">
    <div class="md:w-[869px] mx-auto flex justify-between items-center">
      <router-link class="text-[26px] block font-logo" to="/">MetaWall</router-link>
      <div class="flex items-center">
        <img
          class="avatar w-[30px] h-[30px]"
          :src="user.avatar"
          alt=""
        />
        <span class="text-bold font-logo pl-2">{{ user.userName }}</span>
      </div>
    </div>
  </header>
</template>
