<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { postAPIData, getAPIData } from '@/utils/api/ajax';
import { storeToRefs } from 'pinia';
import eventBus from '../utils/eventBus';
import { useRoomStore, useUserStore } from '@/store';
import { deviceType } from '@/utils/common';
import { useRouter, useRoute } from 'vue-router';
import { Loading } from '@/icons/Loading';
const router = useRouter();
const route = useRoute();
const useStore = useUserStore();
const roomStore = useRoomStore();
const { user } = storeToRefs(useStore);
const pending = ref(false);
const profile = reactive({});
const isSelf = computed(() => {
  return route.params.id === user.value._id;
});

const getProfile = async () => {
  try {
    const res = await getAPIData(`/users/profile/${route.params.id}`);
    res.status === 'success' && Object.assign(profile, res.user);
    console.log('profile', profile);
  } catch (error) {
    console.log('error', error);
  }
};
const sendMessage = async () => {
  if (pending.value) return;
  const sendData = {
    receiver: route.params.id
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

onMounted(() => {
  getProfile();
});
</script>
<template>
  <div
    class="mb-4 pr-4 border-2 rounded-md flex items-center justify-between border-l-none bg-white h-[80px] relative before:-z-10 before:w-full before:h-full before:bg-white before:content-[''] before:border-2 before:absolute before:-bottom-1.5 before:-left-1.5 before:rounded-md"
  >
    <img
      class="rounded-l-sm border-r-2 w-[76px] h-[76px]"
      :src="profile.avatar"
    />
    <!-- <UserCard /> -->
    <div class="pl-4 flex-1">
      <p class="font-bold">{{ profile.name }}</p>
      <p>{{ profile?.following?.length }}人追蹤</p>
    </div>
    <button
      v-show="!isSelf"
      @click="sendMessage"
      class="button text-black bg-secondary w-32 h-9 mr-2"
    >
      發送訊息
      <Loading v-show="pending" class="ml-1 h-4 w-4 animate-spin" />
    </button>
    <button v-show="!isSelf" class="button text-black bg-secondary w-32 h-9">
      取消追蹤
    </button>
  </div>
</template>
