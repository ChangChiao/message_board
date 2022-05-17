<script setup>
import { defineProps, toRefs } from 'vue';
import dayjs from 'dayjs';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';
import { useRoomStore } from '@/store';
const roomStore = useRoomStore();
const router = useRouter();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const { userName, message: msg, avatar, roomId, _id } = toRefs(props.room);
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD ');
};
const isMobile = () => {
  return document.body.clientWidth < 768;
};
const goChatRoom = () => {
  console.log('channelId', roomId.value);
  roomStore.updateRoom({ roomId, userName, avatar, receiver: _id });
  if (isMobile()) {
    router.push('/chatroom');
    return;
  }
  eventBus.emit('handleRoom', true);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="box-rounded flex items-baseline p-4 h-[77px] mb-4 justify-between cursor-pointer"
  >
    <div class="flex">
      <img class="w-10 h-10 avatar" :src="avatar" alt="avatar" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ userName }}</p>
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
