<script setup>
// import { onMounted } from 'vue';
import UploadFile from '../components/UploadFile.vue';

// onMounted(() => {

// });

</script>
<template>
  <h1 class="title mb-4">張貼動態</h1>
  <div class="box-rounded p-8">
    <h3 class="pb-2">貼文內容</h3>
    <textarea
      class="border-2 border-black w-full p-2"
      placeholder="輸入您的貼文內容"
      name=""
      id=""
      cols="30"
      rows="10"
    ></textarea>
    <UploadFile />
    <div class="my-4 border-2 rounded-md overflow-hidden w-full h-[157px]">
      <img src="https://fakeimg.pl/800x300/">
    </div>
    <p class="text-red  w-full">圖片檔案過大，僅限 1mb 以下檔案 </p>
    <p class="text-red  w-full">圖片格式錯誤，僅限 JPG、PNG 圖片</p>
    <button class="w-[323px] h-[54px] rounded-md border-2 relative -translate-x-1/2 left-1/2 my-8 mx-auto bg-[#A8B0B9]">送出貼文</button>
  </div>
</template>
