<script setup>
import UploadFile from '../components/UploadFile.vue';
import Input from '../components/Input.vue';
</script>
<template>
  <div class="flex flex-col items-center">
    <img class="avatar w-[107px] h-[107px]" src="../assets/images/user_default.png" alt="" />
    <UploadFile />
    <div class="pt-2">
      <h3 class="">暱稱</h3>
    <Input />
    </div>
    <div class="w-full">
      <h3 class="">性別</h3>
      <div class="flex items-center">
        <input id="male" value="1" type="radio" checked />
        <label class="pl-2 pr-4" for="male">男性 </label>
        <input id="female" value="0" type="radio" />
        <label class="pl-2 pr-4" for="female">女性</label>
      </div>
    </div>
    <p class="text-red  w-full">1.圖片寬高比必需為 1:1，請重新輸入</p>
    <p class="text-red  w-full">2. 解析度寬度至少 300像素以上，請重新輸入</p>
    <button class="button bg-yellow text-black w-[373px] h-[54px] mt-6">送出更新</button>
  </div>
</template>
