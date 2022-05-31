<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { postAPIData, getAPIData, deleteAPIData } from '@/utils/api/ajax';
import { storeToRefs } from 'pinia';
import { useRoomStore, useUserStore } from '@/store';
import { deviceType } from '@/utils/common';
import { useToast } from 'vue-toastification';
import { useRouter, useRoute } from 'vue-router';
import Loading from '@/icons/Loading';
const toast = useToast();
const router = useRouter();
const route = useRoute();
const useStore = useUserStore();
const roomStore = useRoomStore();
const { user } = storeToRefs(useStore);
const { room } = storeToRefs(roomStore);
const pending = ref(false);
const profile = reactive({});
const paramId = computed(() => route.params.id);
const isSelf = computed(() => {
  return paramId.value === user.value._id;
});

const getProfile = async () => {
  try {
    const res = await getAPIData(`/users/profile/${paramId.value}`);
    res.status === 'success' && Object.assign(profile, res.user);
    console.log('profile', profile);
  } catch (error) {
    console.log('error', error);
  }
};

const isFollowed = computed(() => {
  const following = user.value.following?.map((item) => item.user);
  return following.includes(paramId.value);
});

console.log('isFollowed', isFollowed.value);

const handleFollow = async () => {
  try {
    const queryWay = isFollowed.value
      ? deleteAPIData(`/users/${paramId.value}/unfollow`)
      : postAPIData(`/users/${paramId.value}/follow`);
    const res = await queryWay;
    if (res.status === 'success') {
      useStore.getUser();
      getProfile();
    }
    console.log('profile', profile);
  } catch (error) {
    console.log('error', error);
  }
};
const sendMessage = async () => {
  if (pending.value) return;
  const sendData = {
    receiver: paramId.value
  };
  try {
    pending.value = true;
    const res = await postAPIData('/chat/room-info', sendData);
    const { status, roomId, name, avatar } = res;
    if (status === 'success') {
      console.log('res', res);
      if (room.value.length === 3) {
        toast.error('您最多只能跟三個人聊天呦！');
        return;
      }
      const roomObj = { roomId, name, avatar };
      roomStore.updateRoom([...room.value, roomObj]);
      if (deviceType() !== 'desktop') {
        router.push('/chat-room');
        return;
      }
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
      <p>{{ profile?.followers?.length }}人追蹤</p>
    </div>
    <button
      v-show="!isSelf"
      @click="sendMessage"
      class="flex items-center justify-center button text-black bg-secondary w-32 h-9 mr-2"
    >
      <span>發送訊息</span>
      <Loading v-if="pending" class="ml-1 h-4 w-4 animate-spin" />
    </button>
    <button
      @click="handleFollow"
      v-show="!isSelf"
      class="button text-black bg-secondary w-32 h-9"
    >
      {{ isFollowed ? '取消追蹤' : '追蹤' }}
    </button>
  </div>
</template>
