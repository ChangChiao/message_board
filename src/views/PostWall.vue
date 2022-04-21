<script setup>
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
</script>

<template>
    <div class="flex justify-between">
      <Select />
      <SearchBar />
    </div>
      <Post />
      <div class="box-rounded h-[132px]">
        <ul class="h-[42px] flex items-center pl-4 border-b-2">
          <li class="dot bg-[#DE4B63]"></li>
          <li class="dot bg-[#FAA722]"></li>
          <li class="dot bg-[#83C51D]"></li>
        </ul>
        <p class="text-gray pt-8">目前尚無動態，新增一則貼文吧！</p>
      </div>
</template>
