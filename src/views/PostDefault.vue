<script setup>
import Header from '../components/Header.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
</script>

<template>
<Header />
<div class="flex justify-between pt-12 w-[869px] m-auto">
  <section class="w-[533px]">
    <router-view/>
  </section>
  <aside>
    <PostWallMenu />
  </aside>
</div>
</template>
