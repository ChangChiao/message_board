<script setup>
// import UserCard from '../components/UserCard.vue';
import { postAPIData } from '@/utils/api/ajax';
import eventBus from '../utils/eventBus';

const sendMessage = async () => {
  const sendData = {
    receiver: '627f20ae7c384160be65d107'
  };
  try {
    const res = await postAPIData('/chat/room-info', sendData);
    const { status, roomId } = res;
    if (status === 'success') {
      console.log('res', res);
      localStorage.setItem('roomId', roomId);
      false && eventBus.emit('handleRoom', true);
    }
  } catch (error) {
    console.log('error', error);
  }
};
</script>
<template>
  <div
    class="mb-4 pr-4 border-2 rounded-md flex items-center justify-between border-l-none bg-white h-[80px] relative before:-z-10 before:w-full before:h-full before:bg-white before:content-[''] before:border-2 before:absolute before:-bottom-1.5 before:-left-1.5 before:rounded-md"
  >
    <img
      class="rounded-l-sm border-r-2 w-[76px] h-[76px]"
      src="https://fakeimg.pl/200/"
    />
    <!-- <UserCard /> -->
    <div class="pl-4 flex-1">
      <p>阿阿</p>
      <p>8777人追蹤</p>
    </div>
    <button @click="sendMessage" class="button text-black bg-[#EFECE7] w-32 h-9 mr-2">
      發送訊息
    </button>
    <button
      class="button text-black bg-[#EFECE7] w-32 h-9"
    >
      取消追蹤
    </button>
  </div>
</template>
