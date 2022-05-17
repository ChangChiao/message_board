<script setup>
import { nextTick, reactive, onMounted, onBeforeUnmount, ref } from 'vue';
import ChatRoomMessage from './ChatRoomMessage.vue';
import ChatRoomInputBox from './ChatRoomInputBox.vue';
import Close from '../icons/Close.vue';
import Back from '../icons/Back.vue';
import eventBus from '../utils/eventBus';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
import { useRoomStore } from '@/store';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
const router = useRouter();
const messageContainer = ref(null);
const messageList = reactive([]);
// socket初始化
const socket = io('http://localhost:3008/chat');
const roomInfo = reactive({});
// const socket = io('http://localhost:3008' + '/socket.io/');
// 建立連線
socket.on('connect', () => {
  socket.emit('no no no', 1122);
  console.log('connect'); // true
});

socket.on('receiveMsg', (msg) => {
  console.log('接收到別人傳的訊息', msg);
  messageList.push(msg);
  console.log(scrollBottom);
  //   scrollBottom();
});

const sendMessage = (msg) => {
  const sendMsg = {
    roomId: room.value.roomId,
    message: msg,
    sender: room.value.receiver
  };
  socket.emit('sendMsg', sendMsg);
  //   scrollBottom();
};

const scrollBottom = async () => {
  console.log(nextTick);
  //   await nextTick();
  //   console.log('messageContainer', messageContainer);
  messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
};

const closeRoom = () => {
  eventBus.emit('handleRoom', false);
};

const toPrevPage = () => {
  router.go(-1);
};

const isMobile = () => {
  return document.body.clientWidth < 768;
};

onMounted(() => {
  // 鎖ios橡皮筋效果
  isMobile() && (document.body.style = 'overflow: hidden;position:fixed');
});

onBeforeUnmount(() => {
  document.body.style = '';
  const { roomId, avatar, userName, receiver } = localStorage.getItem('room');
  Object.assign(roomInfo, { roomId, avatar, userName, receiver });
  console.log('roomInfo', roomInfo);
});
</script>

<template>
  <div
    class="md:fixed md:border-2 bottom-0 right-10 w-screen md:w-[338px] h-screen md:h-[455px] rounded-tl-lg rounded-tr-lg"
  >
    <div
      class="h-14 flex px-2 md:px-4 py-2 justify-between items-center border-b-2"
    >
      <div class="flex items-center">
        <Back @click="toPrevPage" class="block md:hidden w-8 h-8 mr-2" />
        <img class="avatar w-10 h-10" :src="room.avatar" alt="" />
        <span class="pl-4 font-bold">{{ room.userName }}</span>
      </div>
      <span @click="closeRoom" class="text-xs text-gray"
        >對方正在輸入中...</span
      >
      <Close
        class="cursor-pointer hidden md:block hover:opacity-50"
        @click="closeRoom"
      />
    </div>
    <div ref="messageContainer" class="inner bg-slate-100 overflow-y-auto">
      <template v-for="message in messageList" :key="message._id">
        <chat-room-message :message="message" />
      </template>
    </div>
    <chat-room-input-box @sendMessage="sendMessage" />
  </div>
</template>

<style scoped>
.inner {
  height: 350px;
}
@media only screen and (max-width: 640px) {
  .inner {
    height: calc(100vh - 56px - 48px);
  }
}
@supports (-webkit-touch-callout: none) {
  .h-screen {
    height: -webkit-fill-available;
  }
  .inner {
    height: calc(-webkit-fill-available - 56px - 48px);
  }
}
</style>
