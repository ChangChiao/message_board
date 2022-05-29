<script setup>
import { onMounted, computed, reactive, provide, watch, inject } from 'vue';
import { getAPIData, postAPIData, deleteAPIData } from '../utils/api/ajax.js';
import { useRoute } from 'vue-router';
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
import FollowStatus from '../components/FollowStatus.vue';
import NoRecord from '../components/NoRecord.vue';
const controlLoading = inject('controlLoading');
const postList = reactive([]);
const route = useRoute();

const isPersonal = computed(() => {
  return route.path.startsWith('/post');
});

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

const fetchData = async (needLoading = true) => {
  needLoading && controlLoading(true);
  let queryString = `/?timeSort=${searchData.sort}`;
  searchData.keyword && (queryString += `&keyword=${searchData.keyword}`);
  try {
    const result = await getAPIData('/posts', queryString);
    const { status, posts } = result;
    postList.length = 0;
    status === 'success' && Object.assign(postList, posts);
  } catch (error) {
    console.log('error', error);
  }
  controlLoading(false);
};

const handleLike = async ({ id, setLike }) => {
  const queryWay = setLike
    ? postAPIData(`/posts/${id}/likes`)
    : deleteAPIData(`/posts/${id}/likes`);
  try {
    const result = await queryWay;
    result.status === 'success' && fetchData(false);
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
  fetchData();
});
</script>

<template>
  <FollowStatus v-if="isPersonal" />
  <div v-else class="md:flex justify-between">
    <Select v-model="searchData.sort" :option="selectOption" />
    <SearchBar />
  </div>
  <template v-for="item in postList" :key="item._id">
    <Post @handleLike="handleLike" :postData="item" />
  </template>
  <NoRecord v-if="postList.length === 0" />
</template>
