<script setup>
import Header from '../components/Header.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
import ToolBar from '../components/ToolBar.vue';
</script>

<template>
<Header />
<div class="flex justify-between pt-2 sm:pt-12 w-full sm:w-[869px] m-auto">
  <section class="w-full sm:w-[533px]">
    <router-view/>
    <ToolBar />
  </section>
  <aside class=" hidden sm:block">
    <PostWallMenu />
  </aside>
</div>
</template>
