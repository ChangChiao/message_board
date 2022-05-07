<script setup>
import Header from '../components/Header.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
import ChatRoom from '../components/ChatRoom.vue';
import ChatRoomList from '../components/ChatRoomList.vue';
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
  <chat-room />
  <chat-room-list />
</div>

</template>
