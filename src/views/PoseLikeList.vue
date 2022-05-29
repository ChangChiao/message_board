<script setup>
import { getAPIData, deleteAPIData } from '@/utils/api/ajax';
import PoseLikeListItem from '../components/PoseLikeListItem.vue';
import { reactive, onMounted } from 'vue';
const likeList = reactive([]);

const getFollowList = async () => {
  try {
    likeList.length = 0;
    const res = await getAPIData('/users/like_list');
    res.status === 'success' && Object.assign(likeList, res.likeList);
  } catch (error) {
    console.log('error', error);
  }
};

const handleCancel = async (id) => {
  try {
    const res = await deleteAPIData(`/posts/${id}/unlikes`);
    res.status === 'success' && getFollowList();
  } catch (error) {
    console.log('error', error);
  }
};

onMounted(() => {
  getFollowList();
});
</script>
<template>
  <h1 class="title">我按讚的貼文</h1>
  <ul class="w-full pt-4">
    <template v-for="item in likeList" :key="item._id">
      <PoseLikeListItem @handleCancel="handleCancel" :likePost="item" />
    </template>
  </ul>
</template>
