<script setup>
import Post from "../components/Post.vue";
import SearchBar from "../components/SearchBar.vue";
import PostWallMenu from "../components/PostWallMenu.vue";
</script>

<template>
  <section>
    <Post />
    <SearchBar />
  </section>
  <aside>
    <PostWallMenu />
  </aside>
</template>



