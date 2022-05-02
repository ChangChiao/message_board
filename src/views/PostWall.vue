<script setup>
import { onMounted, reactive } from 'vue';
import { getAPIData } from '../utils/api/ajax.js';
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
import FollowStatus from '../components/FollowStatus.vue';
import NoRecord from '../components/NoRecord.vue';

const postList = reactive([]);

onMounted(() => {
  console.log('aaa', postList);
  getAPIData('/posts', {});
});
</script>

<template>
    <FollowStatus />
    <div class="sm:flex justify-between">
      <Select />
      <SearchBar />
    </div>
      <Post />
      <NoRecord />
</template>
