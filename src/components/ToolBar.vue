<script setup>
import UserCard from '../components/UserCard.vue';
import { reactive } from 'vue';
const menuList = reactive([
  { icon: 'fa-regular fa-thumbs-up', path: '' },
  { icon: 'fa-solid fa-plus', path: '' },
  { icon: 'fa-solid fa-house', path: '' },
  { icon: 'fa-regular fa-bell', path: '' },
]);
</script>
<template>
  <div class="rounded-[32px]">
    <ul class="flex justify-between">
      <li class="border-2 rounded-full flex items-center justify-center">
        <font-awesome-icon icon="fa-solid fa-user-secret" />
      </li>
    </ul>
  </div>
</template>
