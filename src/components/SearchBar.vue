<script setup>
import { defineProps, inject } from 'vue';
import Search from '../icons/Search.vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: null
});

const fetchData = inject('fetchData');
const updateKeyword = inject('updateKeyword');
const searchData = inject('searchData');
</script>

<template>
  <div
    class="pl-2 bg-white border-2 flex mt-4 md:mt-0 justify-between border-black w-full md:w-[356px] h-[46px] mb-4"
  >
    <input
      :value="searchData.keyword"
      @change="updateKeyword"
      class="block w-100% md:w-[280px]"
      type="text"
      placeholder="搜尋貼文"
    />
    <button
      @click="fetchData"
      class="bg-primary text-white w-[46px] h-full border-l-2 border-black flex items-center justify-center"
    >
      <Search />
    </button>
  </div>
</template>
