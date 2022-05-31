<script setup>
import { toRefs, defineProps } from 'vue';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { deviceType } from '../utils/common';
import { useRoomStore } from '@/store';
const roomStore = useRoomStore();
const toast = useToast();
const { room } = storeToRefs(roomStore);
const router = useRouter();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const { name, message: msg, avatar, roomId } = toRefs(props.room);
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
  if (room.value.length === 3) {
    toast.error('您最多只能跟三個人聊天呦！');
    return;
  }
  const roomObj = { roomId, name, avatar };
  console.log('roomObj====', roomObj);
  roomStore.updateRoom([...room.value, roomObj]);
  console.log('deviceType()', deviceType());
  if (deviceType() !== 'desktop') {
    router.push('/chat-room');
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
