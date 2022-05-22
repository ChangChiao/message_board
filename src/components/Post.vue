<script setup>
import dayjs from 'dayjs';
import { defineProps } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  postData: {
    type: Object,
    default: () => {}
  }
});
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD HH:mm');
};
</script>
<template>
  <div class="box-rounded w-full smw-[533px] min-h-[133px] p-6 mb-6">
    <div class="flex">
      <!-- <img src="../assets/images/user.png" alt="" /> -->
      <img
        class="avatar w-[50px] h-[50px]"
        :src="postData.user?.avatar"
        alt=""
      />
      <div class="pl-3">
        <p class="text-base text-bold">{{ postData.user?.name }}</p>
        <p class="text-gray text-xs">{{ formateTime(postData.createdAt) }}</p>
      </div>
    </div>
    <p class="py-2">{{ postData.content }}</p>
    <img
    v-if='postData.cover'
      class="border-2 rounded-lg overflow-hidden"
      :src="postData.cover"
      alt=""
    />
  </div>
</template>
