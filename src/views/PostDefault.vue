<script setup>
import { onMounted } from 'vue';
import Header from '../components/Header.vue';
import PostWallMenu from '../components/PostWallMenu.vue';
// import ChatRoom from '../components/ChatRoom.vue';
import ChatContainer from '@/components/ChatContainer.vue';
import ToolBar from '../components/ToolBar';
import { useUserStore } from '@/store';
const useStore = useUserStore();
onMounted(() => {
  useStore.getUser();
});
</script>

<template>
  <Header />
  <div
    class="flex justify-between lg:pt-16 pt-2 px-2 w-full lg:w-[869px] m-auto"
  >
    <section class="w-full lg:w-[533px]">
      <router-view />
      <ToolBar />
    </section>
    <aside class="hidden lg:block">
      <PostWallMenu />
    </aside>
    <chat-container />
  </div>
</template>
