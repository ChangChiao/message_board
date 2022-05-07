<script setup>
import { reactive } from 'vue';
import ChatRoomMessage from './ChatRoomMessage.vue';
import ChatRoomInputBox from './ChatRoomInputBox.vue';
import Close from '../icons/Close.vue';

const messageList = reactive([
  {
    _id: 1,
    user: {
      userName: 'Dora',
      _id: '2266'
    },
    userName: 'Dora',
    message: '結果你的晚餐還在被延',
    createdAt: '2022-05-05T12:28:19.793Z'
  },
  {
    _id: 2,
    user: {
      userName: 'Dora',
      _id: '2266'
    },
    message: '原來新北市跟台北市一樣',
    createdAt: '2022-05-05T12:28:19.813Z'
  },
  {
    _id: 3,
    user: {
      userName: 'joe',
      _id: '5566'
    },
    message: '等到我花都謝了',
    createdAt: '2022-05-05T12:28:19.999Z'
  },
  {
    _id: 4,
    user: {
      userName: 'Dora',
      _id: '2266'
    },
    message: '點外送練習修身養性',
    createdAt: '2022-05-05T12:29:19.793Z'
  },
  {
    _id: 5,
    user: {
      userName: 'Dora',
      _id: '2266'
    },
    message: '我在晚餐開店的第一分鐘就點餐了',
    createdAt: '2022-05-05T12:30:19.793Z'
  },
  {
    _id: 6,
    user: {
      userName: 'joe',
      _id: '5566'
    },
    message: '雨越大等越久',
    createdAt: '2022-05-05T12:30:19.899Z'
  },
  {
    _id: 7,
    user: {
      userName: 'Dora',
      _id: '2266'
    },
    message: '你的晚餐竟然被四延了',
    createdAt: '2022-05-05T12:32:19.793Z'
  },
  {
    _id: 8,
    user: {
      userName: 'joe',
      _id: '5566'
    },
    message: '傻眼',
    createdAt: '2022-05-05T12:33:19.793Z'
  },
  {
    _id: 9,
    user: {
      userName: 'joe',
      _id: '5566'
    },
    message: '等待時間直接變成一個半小時',
    createdAt: '2022-05-05T12:33:19.793Z'
  }
]);
</script>

<template>
  <div class="fixed border-2 bottom-0 right-10 w-[338px] h-[455px] rounded-tl-lg rounded-tr-lg">
    <div class="h-14 flex px-4 py-2 justify-between items-center border-b-2">
      <div class="flex items-center">
          <img class="avatar w-10 h-10" src="https://i.pravatar.cc/150?img=19" alt="" />
          <span class="pl-4 font-bold">Dora</span>
      </div>
      <Close class="cursor-pointer hover:opacity-50" />
    </div>
    <ul>
      <template v-for="message in messageList" :key="message._id">
        <chat-room-message :message="message" />
      </template>
    </ul>
    <chat-room-input-box />
  </div>
</template>
