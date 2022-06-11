<script setup>
import ChatRoom from '../components/ChatRoom';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/store';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
</script>

<template>
  <chat-room :roomInfo="room?.[0]" />
</template>
