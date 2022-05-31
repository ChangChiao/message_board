<script setup>
import { onBeforeUnmount } from 'vue';
import ChatRoom from './ChatRoom.vue';
// import eventBus from '@/utils/eventBus';

import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/store';

const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
// const handleRoom = (isOpen) => {
//   showRoom.value = isOpen;
//   console.warn('handleRoom----', isOpen);
// };
// eventBus.on('handleRoom', handleRoom);

onBeforeUnmount(() => {
  console.log('onBeforeUnmount!!!');
  roomStore.updateRoom([]);
  // eventBus.off('handleRoom', handleRoom);
});
</script>

<template>
  <div class="flex justify-end w-4/5 fixed bottom-0">
    <template v-for="item in room" :key="item.roomId">
      <chat-room :roomInfo="item" />
    </template>
  </div>
  <!-- <chat-room v-if="showRoom" /> -->
</template>
