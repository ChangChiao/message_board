<script setup>
import { defineProps, toRefs, computed } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/store';
import { storeToRefs } from 'pinia';
const useStore = useUserStore();
const { user: userInfo } = storeToRefs(useStore);
const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const { message: content, sender, createdAt } = toRefs(props.message);
const isSelf = computed(() => {
  return userInfo?.value._id === sender.value;
});
// console.log('isSelf', isSelf.value, userInfo.value._id, sender.value._id);
const isToday = (time) => {
  return new Date().getDate() === new Date().getDate(time);
};

const formateTime = (time) => {
  const formateStr = isToday(time) ? 'HH:mm' : 'MM/DD HH:mm';
  return dayjs(time).format(formateStr);
};
</script>

<template>
  <div class="m-4">
    <!-- <div class="text-sm text-center pb-2">{{ formateTime(createdAt) }}</div> -->
    <div :class="['flex items-end', { 'flex-row-reverse': isSelf }]">
      <div
        :class="[
          'inline-flex max-w-[300px] p-2 m-h-[20px] border-2 rounded-2xl',
          isSelf ? 'bg-slate-300' : 'bg-slate-200'
        ]"
      >
        {{ content }}
      </div>
      <span class="text-xs px-2">{{ formateTime(createdAt) }}</span>
    </div>
  </div>
</template>
