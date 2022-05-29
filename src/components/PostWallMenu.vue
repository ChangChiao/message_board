<script setup>
import Bell from '../icons/Bell.vue';
import Thumbs from '../icons/Thumbs.vue';
import Send from '../icons/Send.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store';
const useStore = useUserStore();
const { user } = storeToRefs(useStore);
</script>

<template>
  <div class="box w-[309px] p-8">
    <button class="button w-[261px] h-[54px]">
      <router-link
        class="block w-full"
        to="/postadd"
      >
        張貼動態
      </router-link>
    </button>
    <ul class="pt-4">
      <li class="pb-4">
        <router-link class="flex items-center w-full" to="/userInfo">
          <img
            class="avatar w-[50px] h-[50px]"
            :src="user.avatar"
            alt=""
          />
          <span class="pl-4 font-bold">{{ user.name }}</span>
        </router-link>
      </li>
      <li class="pb-4">
        <router-link class="flex items-center w-full hover:text-primary" to="/follow">
          <div
            class="w-[50px] h-[50px] border-2 flex items-center justify-center bg-sky rounded-full"
          >
            <Bell />
          </div>
          <span class="pl-4 text-bold">追蹤名單</span>
        </router-link>
      </li>
      <li class="pb-4">
        <router-link class="flex items-center w-full hover:text-primary" to="/likes">
          <div
            class="w-[50px] h-[50px] border-2 flex items-center justify-center bg-sky rounded-full"
          >
            <Thumbs />
          </div>
          <span class="pl-4 text-bold">我按讚的文章</span>
        </router-link>
      </li>
      <li class="">
        <router-link class="flex items-center w-full hover:text-primary" to="/chatroomlist">
          <div
            class="w-[50px] h-[50px] border-2 flex items-center justify-center bg-sky rounded-full"
          >
            <Send />
          </div>
          <span class="pl-4 text-bold">聊天室</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
