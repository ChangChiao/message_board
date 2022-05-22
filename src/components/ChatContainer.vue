<script setup>
import { onBeforeUnmount, ref } from 'vue';
import ChatRoom from './ChatRoom.vue';
import eventBus from '../utils/eventBus';
import { useRoomStore } from '@/store';
import { storeToRefs } from 'pinia';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
const showRoom = ref(false);
eventBus.on('handleRoom', ({ isOpen, roomId }) => {
  showRoom.value = isOpen;
  console.log('roomId', roomId, room.value.roomId);
  if (isOpen && roomId === room.value.roomId) return;
  if (roomId !== room.value.roomId) {
    showRoom.value = false;
    setTimeout(() => {
      showRoom.value = true;
    }, 300);
  }
  console.warn('roomId', roomId.value);
});

onBeforeUnmount(() => {
  eventBus.all.clear();
});
</script>

<template>
  <chat-room v-if="showRoom" />
</template>
