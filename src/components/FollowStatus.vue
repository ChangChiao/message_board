<script setup>
import { ref } from 'vue';
import { postAPIData } from '@/utils/api/ajax';
import eventBus from '../utils/eventBus';
import { useRoomStore } from '@/store';
import { deviceType } from '@/utils/common';
import { useRouter } from 'vue-router';
import { Loading } from '@/icons/Loading';
const router = useRouter();
const roomStore = useRoomStore();
const pending = ref(false);
const sendMessage = async () => {
  if (pending.value) return;
  const sendData = {
    // receiver: '628c3a476e56188da0aec6c7'
  };
  try {
    pending.value = true;
    const res = await postAPIData('/chat/room-info', sendData);
    const { status, roomId, name, avatar, _id } = res;
    if (status === 'success') {
      console.log('res', res);
      roomStore.updateRoom({ roomId, name, avatar, receiver: _id });
      eventBus.emit('handleRoom', true);
      if (deviceType() !== 'desktop') {
        router.push('/chat-room');
        return;
      }
      eventBus.emit('handleRoom', true);
    }
  } catch (error) {
    console.log('error', error);
  } finally {
    pending.value = false;
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
    <button
      @click="sendMessage"
      class="button text-black bg-[#EFECE7] w-32 h-9 mr-2"
    >
      發送訊息
      <Loading v-show="pending" class="ml-1 h-4 w-4 animate-spin" />
    </button>
    <button class="button text-black bg-[#EFECE7] w-32 h-9">取消追蹤</button>
  </div>
</template>
