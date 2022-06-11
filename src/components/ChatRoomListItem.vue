<script setup>
import { toRefs, defineProps } from 'vue';
import dayjs from 'dayjs';
import useChat from '@/use/useChat';
const { handleRoom } = useChat();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const { name, message: msg, avatar } = toRefs(props.room);
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD HH:MM');
};
const provideDefault = () => {
  return (
    avatar.value ??
    new URL('../assets/images/user_default.png', import.meta.url)
  );
};
const goChatRoom = () => {
  handleRoom(props.room);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="box-rounded flex items-baseline p-4 h-[77px] mb-4 justify-between cursor-pointer"
  >
    <div class="flex">
      <img class="w-10 h-10 avatar" :src="provideDefault()" alt="avatar" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ name }}</p>
        <p
          class="w-[200px] md:w-80 h-10 whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-slate-700"
        >
          {{ msg?.[0]?.message }}
        </p>
      </div>
    </div>
    <span class="text-gray text-xs">{{
      formateTime(msg?.[0]?.createdAt)
    }}</span>
  </li>
</template>
