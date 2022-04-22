<script setup>
import Bell from '../icons/Bell.vue';
import Thumbs from '../icons/Thumbs.vue';
import Plus from '../icons/Plus.vue';
import Home from '../icons/Home.vue';
import { reactive } from 'vue';
const menuList = reactive([
  { icon: 'Home', path: '/postwall' },
  { icon: 'Bell', path: '/follow' },
  { icon: 'Thumbs', path: '/likes' },
  { icon: 'Plus', path: '/postadd' }
]);
</script>
<template>
  <div class="rounded-[32px] w-9/10 h-[65px]">
    <ul class="flex justify-between">
      <li
        v-for="(item, i) in menuList"
        :key="i"
        class="border-2 rounded-full flex items-center justify-center"
      >
        <router-link to="">
          <component :is="item.icon" />
        </router-link>
      </li>
    </ul>
  </div>
</template>
