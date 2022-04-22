<script setup>
import UserCard from '../components/UserCard.vue';
import Thumbs from '../icons/Thumbs.vue';
import ArrowRight from '../icons/ArrowRight.vue';
</script>
<template>
  <li class="box-rounded flex items-center p-4 pr-10 justify-between h-[77px]">
    <UserCard />
    <div class="flex">
      <div class="flex flex-col items-center justify-between">
        <Thumbs />
        取消
      </div>
      <div class="pl-6 flex flex-col items-center justify-between">
        <ArrowRight />
        查看
      </div>
    </div>
  </li>
</template>
