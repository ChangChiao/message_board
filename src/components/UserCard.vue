<script setup>
import { defineProps } from 'vue';
import dayjs from 'dayjs';
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD HH:MM');
};
  // eslint-disable-next-line no-unused-vars
const props = defineProps({
  followInfo: {
    type: Object,
    required: true,
    default: () => {}
  }
});
</script>

<template>
  <div class="flex">
    <img class="w-10 h-10 avatar" :src="followInfo?.user?.avatar" alt="" />
    <div class="flex-1 pl-2">
      <p class="">{{ followInfo?.user?.name }}</p>
      <p class="text-gray text-sm">追蹤時間: {{ formateTime(followInfo?.createdAt) }}</p>
    </div>
  </div>
</template>
