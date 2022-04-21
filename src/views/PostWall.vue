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
</template>
