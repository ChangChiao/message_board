<script setup>
import { onMounted, reactive, provide, watch } from 'vue';
import { getAPIData } from '../utils/api/ajax.js';
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
// import FollowStatus from '../components/FollowStatus.vue';
import NoRecord from '../components/NoRecord.vue';

const postList = reactive([]);

const selectOption = [
  { key: 'desc', content: '從新到舊' },
  { key: 'asc', content: '舊到最新' }
];

const searchData = reactive({
  keyword: '',
  sort: 'desc'
});

const updateKeyword = (e) => {
  searchData.keyword = e.target.value;
};

const fetchData = async () => {
  let queryString = `/?timeSort=${searchData.sort}`;
  searchData.keyword && (queryString += `&keyword=${searchData.keyword}`);
  try {
    const result = await getAPIData(queryString);
    const { status, posts } = result;
    postList.length = 0;
    status === 'success' && Object.assign(postList, posts);
    console.log('fetch Data', result);
  } catch (error) {
    console.log('error', error);
  }
};

watch(
  () => searchData.sort,
  (first, second) => {
    fetchData();
  }
);

provide('updateKeyword', updateKeyword);
provide('searchData', searchData);
provide('fetchData', fetchData);
onMounted(() => {
  console.log('aaa', postList);
  fetchData();
});
</script>

<template>
  <!-- <FollowStatus /> -->
  <div class="sm:flex justify-between">
    <Select v-model="searchData.sort" :option="selectOption" />
    <SearchBar />
  </div>
  <template v-for="item in postList" :key="item._id">
    <Post :postData="item" />
  </template>
  <NoRecord />
</template>
