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

const fetchData = (needLoading = true) => {
  isPersonal.value ? fetchSingle(needLoading) : fetchAll(needLoading);
};

const fetchSingle = async (needLoading) => {
  needLoading && controlLoading(true);
  const id = route.params.id;
  try {
    const result = await getAPIData(`/posts/user/${id}`);
    const { status, posts } = result;
    postList.length = 0;
    status === 'success' && Object.assign(postList, posts);
  } catch (error) {
    console.log('error', error);
  }
  controlLoading(false);
};

const fetchAll = async (needLoading) => {
  needLoading && controlLoading(true);
  let queryString = `/?timeSort=${searchData.sort}`;
  searchData.keyword && (queryString += `&keyword=${searchData.keyword}`);
  try {
    const result = await getAPIData('/posts' + queryString);
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
    : deleteAPIData(`/posts/${id}/unlikes`);
  try {
    const result = await queryWay;
    result.status === 'success' && fetchData(false);
  } catch (error) {
    console.log('error', error);
  }
};

const handleComment = async ({ id, content }) => {
  try {
    const result = await postAPIData(`/posts/${id}/comment`, {
      comment: content
    });
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

watch(route, () => {
  fetchData();
});

provide('updateKeyword', updateKeyword);
provide('searchData', searchData);
provide('fetchData', fetchData);
onMounted(() => {
  fetchData();
});
</script>

<template>
  <FollowStatus v-if="isPersonal" />
  <div v-else class="lg:flex justify-between">
    <Select
      v-model="searchData.sort"
      @change="fetchAll"
      :option="selectOption"
    />
    <SearchBar />
  </div>
  <template v-for="item in postList" :key="item._id">
    <Post
      @handleComment="handleComment"
      @handleLike="handleLike"
      :postData="item"
    />
  </template>
  <NoRecord v-if="postList.length === 0" />
</template>
