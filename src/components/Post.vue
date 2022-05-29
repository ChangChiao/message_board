<script setup>
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { defineProps, defineEmits, ref } from 'vue';
import { useUserStore } from '@/store';
import { useToast } from 'vue-toastification';
import Like from '@/icons/Like.vue';
import Comment from '@/components/Comment';
const content = ref('');
const useStore = useUserStore();
const { user } = storeToRefs(useStore);
const toast = useToast();
const emit = defineEmits(['handleLike', 'handleComment']);
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

const handleLike = () => {
  if (props.postData.likes.includes(user.value._id)) {
    emit('handleLike', { id: props.postData.id, setLike: false });
  } else {
    emit('handleLike', { id: props.postData.id, setLike: true });
  }
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
      <span class="pl-1">
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
