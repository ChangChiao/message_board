<script setup>
import { useToast } from 'vue-toastification';
import { nextTick, reactive, onMounted, onBeforeUnmount, ref } from 'vue';
import ChatRoomMessage from './ChatRoomMessage.vue';
import ChatRoomInputBox from './ChatRoomInputBox.vue';
import Close from '../icons/Close.vue';
import Back from '../icons/Back.vue';
import Loading from '../icons/Loading.vue';
import eventBus from '../utils/eventBus';
import { deviceType } from '../utils/common';
import { API_URL } from '@/global/constant';
import { storeToRefs } from 'pinia';
import { useRoomStore, useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
const toast = useToast();
const useStore = useUserStore();
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
const { user } = storeToRefs(useStore);
const router = useRouter();
const isLoading = ref(false);
const typingFlag = ref(false);
const messageContainer = ref(null);
const fetchAllFlag = ref(false);
const newMsgFlag = ref(false);
const flagHistory = ref(false);
const scrollRecord = ref(0);
const messageList = reactive([]);
let timer = null;

const token = localStorage.getItem('token');
if (!token) {
  toast.error('請先登入喔！');
  router.push('/');
}

// socket初始化
const socket = io(`${API_URL}/chat`, {
  query: {
    token: localStorage.getItem('token'),
    room: room.value.roomId
  },
  // autoConnect: false,
  forceNew: true
});
// 建立連線
socket.on('connect', () => {
  console.log('connect----');
  // TODO 不用setTimeout getHistory會偶發性失效
  setTimeout(() => {
    getHistory();
  }, 200);
});

socket.emit('joinRoom', room.value.roomId);
// 接收到別人傳的訊息
socket.on('chatMessage', (msg) => {
  console.log('接收到別人傳的訊息', msg);
  messageList.push(msg);
  eventBus.emit('updateChatRecord', { roomId: room.value.roomId, msg });
  if (
    messageContainer.value.scrollHeight - messageContainer.value.scrollTop >
    messageContainer.value.clientHeight
  ) {
    user.value._id !== msg.sender && (newMsgFlag.value = true);
  } else {
    scrollBottom();
  }
});

// 接收歷史訊息
socket.on('history', (msgList) => {
  isLoading.value = false;
  console.log('接收到歷史訊息', msgList);
  const newArray = [...msgList, ...messageList];
  Object.assign(messageList, newArray);
  console.log('messageList', messageList);
  msgList.length < 30 && (fetchAllFlag.value = true);
  if (!flagHistory.value) {
    scrollBottom();
    flagHistory.value = true;
  } else {
    scrollToCorrect();
  }
  // 滾輪調整
});

const scrollToCorrect = async () => {
  await nextTick();
  messageContainer.value.scrollTop =
    messageContainer.value.scrollHeight - scrollRecord.value;
};

socket.on('typing', (boolean) => {
  typingFlag.value = boolean;
});

// 接收錯誤
socket.on('error', (error) => {
  toast.error(error);
  router.go('/');
});

const getHistory = () => {
  console.log('getHistory', fetchAllFlag.value);
  if (fetchAllFlag.value) return;
  const info = {
    lastTime: messageList[0]?.createdAt
  };
  isLoading.value = true;
  console.warn('getHistory---', socket.connected);
  socket.emit('history', info);
};

const endTyping = () => {
  socket.emit('typing', false);
};

const userTyping = (key) => {
  if (key === 'Enter') {
    endTyping();
    return;
  }
  socket.emit('typing', true);
  clearTimeout(timer);
  timer = setTimeout(() => {
    endTyping();
  }, 1500);
};

const sendMessage = (msg) => {
  const sendMsg = {
    message: msg,
    sender: user.value._id
  };
  socket.emit('chatMessage', sendMsg);
};

const scrollBottom = async () => {
  await nextTick();
  newMsgFlag.value = false;
  messageContainer.value.scrollTop = messageContainer.value?.scrollHeight;
};

const closeRoom = () => {
  eventBus.emit('handleRoom', false);
};

const detectTop = () => {
  messageContainer.value.addEventListener(
    'scroll',
    () => {
      if (messageContainer.value.scrollTop === 0) {
        scrollRecord.value = messageContainer.value.scrollHeight;
        getHistory();
      }
    },
    false
  );
};

const toPrevPage = () => {
  router.go(-1);
};
const provideDefault = () => {
  console.log('room', room);
  return (
    room.value.avatar ??
    new URL('../assets/images/user_default.png', import.meta.url)
  );
};

onMounted(() => {
  console.warn('mounted');
  // 鎖ios橡皮筋效果
  deviceType() !== 'desktop' &&
    (document.body.style = 'overflow: hidden;position:fixed');
  detectTop();
});

onBeforeUnmount(() => {
  console.warn('onBeforeUnmount');
  roomStore.updateRoom({});
  socket.emit('leaveRoom', room.value.roomId);
  socket.off();
  socket.disconnect();
  document.body.style = '';
  clearTimeout(timer);
});
</script>

<template>
  <div
    class="md:fixed md:border-2 bottom-0 right-10 w-screen md:w-[338px] overflow-hidden h-screen md:h-[455px] rounded-tl-lg rounded-tr-lg"
  >
    <div
      class="h-14 flex px-2 md:px-4 py-2 bg-white justify-between items-center border-b-2"
    >
      <div class="flex items-center">
        <Back @click="toPrevPage" class="block md:hidden w-8 h-8 mr-2" />
        <img class="avatar w-10 h-10" :src="provideDefault()" alt="" />
        <span class="pl-4 font-bold">{{ room.name }}</span>
      </div>
      <span v-if="typingFlag" class="text-xs text-gray"
        >對方正在輸入中...</span
      >
      <Close
        class="cursor-pointer hidden md:block hover:opacity-50"
        @click="closeRoom"
      />
    </div>
    <div
      id="messageContainer"
      ref="messageContainer"
      class="inner relative bg-slate-100 overflow-y-auto"
    >
      <div class="text-center py-2 text-sm" v-if="messageList.length === 0">
        開始聊天吧！
      </div>
      <div
        class="flex items-center justify-center pt-2 text-slate-700"
        v-if="isLoading"
      >
        載入中<Loading class="ml-1 h-4 w-4 animate-spin" />
      </div>
      <template v-for="message in messageList" :key="message._id">
        <chat-room-message :message="message" />
      </template>
    </div>
    <div
      v-if="newMsgFlag"
      @click="scrollBottom"
      class="w-full h-12 absolute bottom-10 left-0 p-2 bg-black bg-opacity-40 text-white"
    >
      您有新訊息
    </div>
    <chat-room-input-box @userTyping="userTyping" @sendMessage="sendMessage" />
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
