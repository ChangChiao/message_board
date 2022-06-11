<script setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { defineProps, defineEmits, ref } from 'vue';
import { useUserStore } from '@/store';
import { deleteAPIData, postAPIData } from '../utils/api/ajax.js';
import { useToast } from 'vue-toastification';
import Loading from '../icons/Loading.vue';
import Like from '@/icons/Like.vue';
import Comment from '@/components/Comment';
const content = ref('');
const useStore = useUserStore();
const { user } = storeToRefs(useStore);
const toast = useToast();
const likeLoading = ref(false);
const emit = defineEmits(['fetchData', 'handleComment']);
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  postData: {
    type: Object,
    default: () => {}
  }
});
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD HH:mm');
};

const setLike = async ({ id, isLike }) => {
  if (likeLoading.value) return;
  const queryWay = isLike
    ? postAPIData(`/posts/${id}/likes`)
    : deleteAPIData(`/posts/${id}/unlikes`);
  try {
    likeLoading.value = true;
    const result = await queryWay;
    result.status === 'success' && emit('fetchData', false);
  } catch (error) {
    console.log('error', error);
  } finally {
    likeLoading.value = false;
  }
};

const handleLike = () => {
  const isLike = props.postData.likes.includes(user.value._id);
  setLike({ id: props.postData.id, isLike: !isLike });
};

const handleComment = () => {
  if (content.value.length === 0) {
    toast.error('請至少輸入一個字');
    return;
  }
  emit('handleComment', { id: props.postData.id, content: content.value });
  content.value = '';
};
</script>
<template>
  <div class="box-rounded w-full smw-[533px] min-h-[133px] p-6 mb-6">
    <div class="cursor-pointer">
      <router-link class="flex" :to="`/post/${postData.user._id}`">
        <img
          class="avatar w-[50px] h-[50px]"
          :src="postData.user?.avatar"
          alt=""
        />
        <div class="pl-3">
          <p class="text-base text-bold">{{ postData.user?.name }}</p>
          <p class="text-gray text-xs pt-1">
            {{ formateTime(postData.createdAt) }}
          </p>
        </div>
      </router-link>
    </div>
    <p class="py-2">{{ postData.content }}</p>
    <img
      v-if="postData.cover"
      class="border-2 rounded-lg overflow-hidden"
      :src="postData.cover"
      alt=""
    />
    <div class="flex items-center py-2">
      <Like class="cursor-pointer text-primary" @click="handleLike" />
      <Loading v-show="likeLoading" class="ml-1 h-4 w-4 animate-spin" />
      <span class="pl-1" v-show="!likeLoading">
        {{ postData.likes.length }}
      </span>
    </div>
    <div class="pt-2 flex items-center justify-between">
      <img class="avatar w-[50px] h-[50px]" :src="user.avatar" alt="" />
      <div
        class="w-[calc(100%-60px)] h-10 border-2 flex justify-between items-center"
      >
        <input
          @keyup.enter="handleComment"
          class="pl-2 w-[calc(100%-6rem)]"
          maxlength="100"
          type="text"
          placeholder="留言..."
          v-model="content"
        />
        <button
          @click="handleComment"
          class="bg-primary h-full w-24 text-white"
        >
          留言
        </button>
      </div>
    </div>
    <div class="pt-10">
      <template v-for="item in postData.comments" :key="item._id">
        <Comment :comment="item" />
      </template>
    </div>
  </div>
</template>
