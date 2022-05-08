<script setup>
import Header from '../components/Header.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
// import ChatRoom from '../components/ChatRoom.vue';
import ChatContainer from '@/components/ChatContainer.vue';
import ToolBar from '../components/ToolBar';
</script>

<template>
<Header />
<div class="flex justify-between md:pt-16 pt-2 px-2  w-full md:w-[869px] m-auto">
  <section class="w-full md:w-[533px]">
    <router-view/>
    <ToolBar />
  </section>
  <aside class=" hidden md:block">
    <PostWallMenu />
  </aside>
  <chat-container />
</div>

</template>
