<script setup>
import UserCard from '../components/UserCard.vue';
</script>
<template>
  <li class="box-rounded flex items-center p-4 justify-between h-[77px]">
    <UserCard />
    <div class="flex">
      <div>
        <i class="fa-solid fa-thumbs-up block text-lg"></i>
        取消
      </div>
      <div class="pl-6">
        <i class="fa-solid fa-circle-arrow-right block text-lg"></i>
        查看
      </div>
    </div>
  </li>
</template>
