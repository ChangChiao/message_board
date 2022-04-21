<script setup>
import Header from '../components/Header.vue';
import Post from '../components/Post.vue';
import SearchBar from '../components/SearchBar.vue';
import Select from '../components/Select.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
</script>

<template>
<Header />
<div class="flex justify-between pt-12 w-[869px] m-auto">
  <section>
    <div class="flex justify-between">
      <Select />
      <SearchBar />
    </div>
      <Post />
  </section>
  <aside>
    <PostWallMenu />
  </aside>
</div>
</template>
