<script setup>
import { defineProps } from 'vue';
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  comment: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD HH:mm');
};
</script>

<template>
  <div class="bg-secondary/50 p-2 rounded-md mb-4">
    <div class="flex">
      <img
        class="avatar w-[50px] h-[50px]"
        :src="comment.user?.avatar"
        alt=""
      />
      <div class="pl-3">
        <p class="text-base text-bold">{{ comment.user?.name }}</p>
        <p class="text-gray text-xs pt-1">
          {{ formateTime(comment.createdAt) }}
        </p>
      </div>
    </div>
    <p class="pl-16">{{ comment.comment }}</p>
  </div>
</template>
