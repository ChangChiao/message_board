<script setup>
import { ref } from 'vue-demi';
import UserInfoReset from '../components/UserInfoReset.vue';
import UserInfoUpdate from '../components/UserInfoUpdate.vue';

const menuType = ref(0);
const setMenuType = (val) => {
  menuType.value = val;
};
</script>

<template>
<h1 class="title">修改個人資料</h1>
<div class="pt-8">
    <ul class="flex items-center relative left-2">
      <li
      @click="setMenuType(0)"
        :class="[
          'bg-white border-2 rounded-t-lg px-5 leading-10 w-28 h-10  border-b-0 cursor-pointer',
          { 'bg-black text-white': menuType === 0 },
        ]"
      >
        暱稱修改
      </li>
      <li
      @click="setMenuType(1)"
        :class="[
          'bg-white border-2 rounded-t-lg px-5 leading-10 w-28 h-10  border-b-0 cursor-pointer',
          { 'bg-black text-white': menuType === 1 },
        ]"
      >
        重設密碼
      </li>
    </ul>
    <div class="min-h-[350px] w-full rounded-r-md border-2 px-[80px] py-8 ">
      <UserInfoUpdate v-if="menuType === 0" />
      <UserInfoReset v-else />
    </div>

</div>
</template>
