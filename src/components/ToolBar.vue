<script setup>
import { reactive } from 'vue';
import Bell from '../icons/Bell.vue';
import Thumbs from '../icons/Thumbs.vue';
import Plus from '../icons/Plus.vue';
import Home from '../icons/Home.vue';
const menuList = reactive([
  { icon: Home, path: '/postwall' },
  { icon: Bell, path: '/follow' },
  { icon: Thumbs, path: '/likes' },
  { icon: Plus, path: '/postadd' }
]);

</script>
<template>
  <div class="block sm:hidden border-2 bg-[#EFECE7] px-6 fixed bottom-10 rounded-[32px] w-11/12 h-[65px]">
    <ul class="flex h-full justify-between items-center">
      <li
        v-for="(item, i) in menuList"
        :key="i"
        :class="[{'bg-primary text-white':i===3},'border-2 w-12 h-12 bg-white rounded-full flex items-center justify-center']"
      >
        <router-link class="block" :to="item.path">
          <component :is="item.icon" />
        </router-link>
      </li>
    </ul>
  </div>
</template>
