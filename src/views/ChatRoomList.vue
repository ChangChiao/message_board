<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { getAPIData } from '@/utils/api/ajax';
import ChatRoomListItem from '@/components/ChatRoomListItem.vue';
import eventBus from '../utils/eventBus';
import Loading from '@/icons/Loading.vue';
const chatList = reactive([]);
const pending = ref(false);
const updateChatRecord = ({ roomId, msg }) => {
  const targetIndex = chatList.findIndex((item) => item.roomId === roomId);
  targetIndex > -1 && (chatList[targetIndex].message = [msg]);
};

eventBus.on('updateChatRecord', updateChatRecord);

const queryRoomList = async () => {
  pending.value = true;
  try {
    const res = await getAPIData('/chat/chat-record');
    const { status, chatRecord } = res;
    if (status === 'success') {
      console.log('res', res);
      Object.assign(chatList, chatRecord);
      console.log('chatList', chatList);
    }
  } catch (error) {
    console.log('error', error);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  queryRoomList();
});

onBeforeUnmount(() => {
  eventBus.off('updateChatRecord', updateChatRecord);
});
// const chatList = reactive([
//   {
//     roomId: 124234234,
//     receiver: {
//       _id: '2266',
//       name: 'Dora',
//       avatar: 'https://i.pravatar.cc/150?img=19'
//     },
//     // 以下使用關聯
//     channelId: 1,
//     message: {
//       _id: 9,
//       user: {
//         name: 'joe',
//         _id: '5566'
//       },
//       content: '等待時間直接變成一個半小時',
//       createdAt: '2022-05-05T12:33:19.793Z'
//     }
//   },
//   {
//     roomId: 124234238,
//     receiver: {
//       _id: '8866',
//       name: 'May',
//       avatar: 'https://i.pravatar.cc/150?img=27'
//     },
//     // 以下使用關聯
//     channelId: 2,
//     message: {
//       _id: 10,
//       user: {
//         name: 'joe',
//         _id: '5566'
//       },
//       content:
//         '我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽',
//       createdAt: '2022-05-05T12:33:19.793Z'
//     }
//   }
// ]);
</script>

<template>
  <section>
    <h1 class="title">聊天室</h1>
    <ul class="pt-4">
      <li v-show="pending" class="text-center flex items-center justify-center py-6">載入中...<Loading class="pl-1" /></li>
      <template v-for="room in chatList" :key="room._id">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
