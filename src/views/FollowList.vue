<script setup>
import { getAPIData } from '@/utils/api/ajax';
import FollowListItem from '../components/FollowListItem.vue';
import { reactive, onMounted, inject } from 'vue';
const followList = reactive([]);
const controlLoading = inject('controlLoading');
const getFollowList = async () => {
  try {
    controlLoading(true);
    followList.length = 0;
    const res = await getAPIData('/users/following');
    res.status === 'success' && Object.assign(followList, res.following);
  } catch (error) {
    console.log('error', error);
  } finally {
    controlLoading(false);
  }
};

onMounted(() => {
  getFollowList();
});
</script>

<template>
  <section>
    <h1 class="title">追蹤名單</h1>
    <ul class="pt-4">
      <template v-for="item in followList" :key="item._id">
        <FollowListItem :followInfo="item" />
      </template>
    </ul>
  </section>
</template>
