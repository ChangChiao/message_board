<script setup>
import UserCard from '../components/UserCard.vue';
import Thumbs from '../icons/Thumbs.vue';
// import ArrowRight from '../icons/ArrowRight.vue';
import { defineProps, defineEmits } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  likePost: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const emit = defineEmits(['sendMessage', 'userTyping']);
const handleCancel = () => {
  emit('handleCancel', props.likePost.id);
};

// const handleCheck = () => {};
</script>
<template>
  <li class="box-rounded flex items-center p-4 mb-4 pr-10 justify-between h-[77px]">
    <UserCard :followInfo="likePost" />
    <div class="flex">
      <div
        @click="handleCancel"
        class="flex cursor-pointer flex-col items-center justify-between"
      >
        <Thumbs />
        取消
      </div>
      <!-- <div
        @click="handleCheck"
        class="pl-6 flex flex-col items-center justify-between"
      >
        <ArrowRight />
        查看
      </div> -->
    </div>
  </li>
</template>
