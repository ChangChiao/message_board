<script setup>
import Search from '../icons/Search.vue';

</script>

<template>
<div class="pl-2 border-2 flex mt-4 sm:mt-0 justify-between border-black w-full sm:w-[356px] h-[46px] mb-4">
  <input class="block w-100% sm:w-[280px]" type="text" placeholder="搜尋貼文">
  <button class=" bg-primary text-white w-[46px] h-full border-l-2 border-black flex items-center justify-center">
    <Search />
  </button>
</div>
</template>
